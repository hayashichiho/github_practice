import assert from 'node:assert/strict';
import { test } from 'node:test';
import { githubClient, issueBody, loadQuests, registerQuests } from './create-practice-issues.mjs';

function fakeApi(issues = []) {
  let number = 12;
  return {
    issues,
    created: 0,
    repository: async () => ({ has_issues: true }),
    listIssues: async () => structuredClone(issues),
    async createIssue(body) {
      this.created++;
      const issue = { ...body, number: number++, state: 'open' };
      issues.push(issue);
      return issue;
    },
    async updateIssue(number, body) {
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

test('再実行で、閉じた・改題したIssueも重複せず、編集した本文を保持する', async () => {
  const api = fakeApi();
  const quests = await loadQuests();
  await registerQuests(api, quests);
  api.issues[0].title = '変更したタイトル';
  api.issues[0].state = 'closed';
  api.issues[0].body += '\n参加者のメモ';
  const before = structuredClone(api.issues);
  await registerQuests(api, quests);
  assert.equal(api.created, 10);
  assert.deepEqual(api.issues, before);
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

test('同名の手動Issueは保持し、同名のPRは登録済み課題とみなさない', async () => {
  const quests = await loadQuests();
  const manual = { title: quests[0].title, number: 5, body: '手動の本文' };
  const api = fakeApi([manual, { title: quests[1].title, number: 6, pull_request: {} }]);
  await registerQuests(api, quests);
  assert.equal(api.created, 9);
  assert.equal(manual.body, '手動の本文');
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

test('旧8課題を登録済みなら識別子を引き継ぎ、基礎2課題だけを追加する', async () => {
  const quests = await loadQuests();
  const previous = quests.slice(2).map((quest, index) => ({
    title: `以前の課題 ${index + 1}`, number: index + 1, body: quest.marker,
  }));
  assert.match(previous[0].body, /quest:01-add-task.md/);
  const api = fakeApi(previous);
  await registerQuests(api, quests);
  assert.equal(api.created, 2);
  assert.equal(api.issues.length, 10);
  assert.equal(api.issues[0].title, '以前の課題 1');
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
