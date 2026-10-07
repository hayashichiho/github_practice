import { readdir, readFile, appendFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const pendingMarker = '<!-- github-practice:pending -->';

/** 課題原稿をすべて検証して読み込む。既存課題の識別子は番号変更後も保持する。 */
export async function loadQuests(directory = new URL('../docs/issues/', import.meta.url)) {
  const names = (await readdir(directory)).filter((name) => /^\d{2}-.+\.md$/.test(name)).sort();
  if (names.length !== 10 || names.some((name, index) => Number(name.slice(0, 2)) !== index + 1)) {
    throw new Error('docs/issues に01〜10の課題原稿が必要です。');
  }
  return Promise.all(names.map(async (name) => {
    const source = await readFile(new URL(name, directory), 'utf8');
    const match = source.match(/^# (.+)\r?\n+([\s\S]+)$/);
    if (!match) throw new Error(`${name}: タイトルと本文が必要です。`);
    const marker = source.match(/<!-- github-practice:quest:[\w.-]+ -->/)?.[0]
      ?? `<!-- github-practice:quest:${name} -->`;
    return { title: match[1], body: match[2].replace(marker, '').trim(), marker };
  }));
}

/** branchとClosesの例を実際のIssue番号に合わせ、重複判定用マーカーを添える。 */
export function issueBody(quest, number) {
  return `${quest.body
    .replace('branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。',
      '以下のbranch名と `Closes` は、このIssueの実際の番号に合わせて登録されています。最新mainからbranchを作ります。')
    .replace(/（`\d+` は実際のIssue番号へ置き換えてください）/g, '')
    .replace(/\b(feature|fix|docs|practice)\/\d+(?=-)/g, `$1/${number}`)
    .replace(/Closes #\d+/g, `Closes #${number}`)}\n\n${quest.marker}`;
}

/** 未登録課題だけを作成する。番号反映に失敗したIssueは次回の実行で復旧する。 */
export async function registerQuests(api, quests) {
  const repository = await api.repository();
  if (!repository.has_issues) throw new Error('Settings → General → Features でIssuesを有効にしてください。');
  const existing = (await api.listIssues()).filter((issue) => !issue.pull_request);
  const results = [];
  for (const quest of quests) {
    let issue = existing.find((item) => item.body?.includes(quest.marker))
      ?? existing.find((item) => item.title === quest.title);
    let status = '登録済み';
    if (!issue) {
      // Issue番号は作成後に決まる。途中失敗を識別できる本文でまず作成する。
      issue = await api.createIssue({ title: quest.title, body: `${quest.body}\n\n${quest.marker}\n${pendingMarker}` });
      existing.push(issue);
      status = '作成';
    }
    if (issue.body?.includes(quest.marker) && issue.body.includes(pendingMarker)) {
      await api.updateIssue(issue.number, { body: issueBody(quest, issue.number) });
      if (status !== '作成') status = '番号反映を復旧';
    }
    results.push({ title: quest.title, number: issue.number, status });
  }
  return results;
}

/** 実行中リポジトリだけを対象にするAPIクライアント。全状態・全ページを確認する。 */
export function githubClient(repository, token, fetcher = fetch) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? '') || !token) {
    throw new Error('GH_REPOSITORY と GH_TOKEN が必要です。');
  }
  async function request(path, method = 'GET', body) {
    const response = await fetcher(`https://api.github.com/repos/${repository}${path}`, {
      method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    // 認証情報やレスポンス本文をログに出さない。
    if (!response.ok) throw new Error(`GitHub API ${method} ${path}: HTTP ${response.status}`);
    return response.json();
  }
  return {
    repository: () => request(''),
    async listIssues() {
      const issues = [];
      for (let page = 1; ; page++) {
        const batch = await request(`/issues?state=all&per_page=100&page=${page}`);
        issues.push(...batch);
        if (batch.length < 100) return issues;
      }
    },
    createIssue: (body) => request('/issues', 'POST', body),
    updateIssue: (number, body) => request(`/issues/${number}`, 'PATCH', body),
  };
}

/** CLI入口。Actionsの実行先を使い、登録結果だけをログとSummaryに出力する。 */
async function main() {
  const quests = await loadQuests();
  const results = await registerQuests(githubClient(process.env.GH_REPOSITORY, process.env.GH_TOKEN), quests);
  const summary = results.map(({ title, number, status }) => `- ${status}: #${number} ${title}`).join('\n');
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## 練習用Issue\n\n${summary}\n`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
