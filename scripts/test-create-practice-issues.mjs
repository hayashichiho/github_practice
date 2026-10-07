import assert from 'node:assert/strict';
import { test } from 'node:test';
import { githubClient, issueBody, loadQuests, registerQuests } from './create-practice-issues.mjs';

function fakeApi(issues = []) {
  let number = 12;
  return {
    issues,
    created: 0,
    updates: [],
    repository: async () => ({ has_issues: true }),
    listIssues: async () => structuredClone(issues),
    async createIssue(body) {
      this.created++;
      const issue = { ...body, number: number++, state: 'open' };
      issues.push(issue);
      return issue;
    },
    async updateIssue(number, body) {
      this.updates.push({ number, ...body });
      Object.assign(issues.find((issue) => issue.number === number), body);
    },
  };
}

test('実際の10原稿から作成し、PRが必要な課題に実際のIssue番号を反映する', async () => {
  const api = fakeApi();
  await registerQuests(api, await loadQuests());
  assert.equal(api.created, 10);
  api.issues.forEach((issue, index) => {
    if (index >= 2) {
      assert.match(issue.body, new RegExp(`Closes #${issue.number}\\b`));
      assert.match(issue.body, new RegExp(`(?:feature|practice)/${issue.number}-`));
    } else {
      assert.doesNotMatch(issue.body, /Closes #/);
    }
    assert.doesNotMatch(issue.body, /github-practice:pending/);
  });
});

test('再実行でタイトルと本文を更新し、Issue番号・Closed状態・コメントは保持する', async () => {
  const api = fakeApi();
  const quests = await loadQuests();
  await registerQuests(api, quests);
  api.issues[0].title = '変更したタイトル';
  api.issues[0].state = 'closed';
  api.issues[0].body += '\n参加者のメモ';
  api.issues[0].comments = [{ body: '確認結果のメモ' }];
  const number = api.issues[0].number;
  const updatedQuests = quests.map((quest, index) => index === 0
    ? { ...quest, title: `${quest.title}（更新）`, body: `${quest.body}\n新しい手順` }
    : quest);
  const results = await registerQuests(api, updatedQuests);
  assert.equal(api.created, 10);
  assert.equal(api.issues[0].number, number);
  assert.equal(api.issues[0].title, updatedQuests[0].title);
  assert.equal(api.issues[0].body, issueBody(updatedQuests[0], number));
  assert.equal(api.issues[0].state, 'closed');
  assert.deepEqual(api.issues[0].comments, [{ body: '確認結果のメモ' }]);
  assert.equal(results[0].status, '更新');
  assert.ok(api.updates.every((update) => !('state' in update) && !('comments' in update)));
});

test('原稿に変更がない再実行では、Issueを重複作成せず更新APIも呼ばない', async () => {
  const api = fakeApi();
  const quests = await loadQuests();
  await registerQuests(api, quests);
  api.updates.length = 0;
  const results = await registerQuests(api, quests);
  assert.equal(api.created, 10);
  assert.equal(api.updates.length, 0);
  assert.ok(results.every((result) => result.status === '変更なし'));
});

test('画像と資料リンクを同じForkのIssue用パスに変換し、外部URLは保持する', async () => {
  const quests = await loadQuests();
  const branchBody = issueBody(quests[1], 12);
  const formBody = issueBody(quests[2], 13);
  const conflictBody = issueBody(quests[9], 20);
  assert.match(branchBody, /\.\.\/blob\/main\/docs\/issues\/image\/02-branches\/\d+\.png\?raw=true/);
  assert.match(formBody, /\.\.\/blob\/main\/docs\/issues\/image\/03-add-task\/\d+\.png\?raw=true/);
  assert.match(formBody, /Closes #13/);
  assert.match(conflictBody, /\[Quest 3\]\(\.\.\/blob\/main\/docs\/issues\/03-add-task\.md\)/);
  assert.match(conflictBody, /\.\.\/blob\/main\/docs\/04_conflict\.md/);
  assert.match(branchBody, /https:\/\/code\.visualstudio\.com\/docs\/sourcecontrol\/branches-worktrees/);
  for (const quest of quests) {
    assert.doesNotMatch(issueBody(quest, 99), /\]\((?:image\/|\.\.\/04_conflict|03-add-task)/);
  }
});

test('同名の手動Issueも原稿へ更新し、同名のPRは登録済み課題とみなさない', async () => {
  const quests = await loadQuests();
  const manual = { title: quests[0].title, number: 5, body: '手動の本文' };
  const api = fakeApi([manual, { title: quests[1].title, number: 6, pull_request: {} }]);
  await registerQuests(api, quests);
  assert.equal(api.created, 9);
  assert.equal(manual.body, issueBody(quests[0], 5));
  assert.ok(api.issues.some((issue) => issue.title === quests[1].title && !issue.pull_request));
});

test('作成後の番号反映が失敗しても再実行で復旧し、Issueを増やさない', async () => {
  const quests = (await loadQuests()).slice(2);
  const api = fakeApi();
  const update = api.updateIssue;
  api.updateIssue = async () => { throw new Error('通信失敗'); };
  await assert.rejects(registerQuests(api, quests), /通信失敗/);
  assert.equal(api.created, 1);
  api.updateIssue = update;
  await registerQuests(api, quests);
  assert.equal(api.created, 8);
  assert.match(api.issues[0].body, /Closes #12/);
  assert.match(api.issues[0].body, /feature\/12-add-task-form/);
  assert.doesNotMatch(api.issues[0].body, /github-practice:pending/);
});

test('旧8課題は番号を保って最新版へ更新し、基礎2件だけを追加する', async () => {
  const quests = await loadQuests();
  const previous = quests.slice(2).map((quest, index) => ({
    title: `以前の課題 ${index + 1}`, number: index + 1, body: quest.marker,
  }));
  assert.match(previous[0].body, /quest:01-add-task.md/);
  const api = fakeApi(previous);
  await registerQuests(api, quests);
  assert.equal(api.created, 2);
  assert.equal(api.issues.length, 10);
  assert.equal(api.issues[0].title, quests[2].title);
  assert.equal(api.issues[0].number, 1);
  assert.match(api.issues[0].body, /Closes #1\b/);
  assert.match(api.issues[0].body, /feature\/1-add-task-form/);
});

test('Issuesが無効なら作成を始めず、設定方法を案内する', async () => {
  const api = fakeApi();
  api.repository = async () => ({ has_issues: false });
  await assert.rejects(registerQuests(api, await loadQuests()), /Issuesを有効/);
  assert.equal(api.created, 0);
});

test('閉じたIssueも含め、100件を超える一覧を最後まで取得する', async () => {
  const paths = [];
  const api = githubClient('team/practice', 'test-token', async (url) => {
    paths.push(url);
    return { ok: true, json: async () => url.endsWith('page=1') ? Array(100).fill({ number: 1 }) : [{ number: 101 }] };
  });
  assert.equal((await api.listIssues()).length, 101);
  assert.equal(paths.length, 2);
  assert.ok(paths.every((path) => path.includes('state=all')));
});
