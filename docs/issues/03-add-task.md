# Quest 3: タスクを追加できるフォームを作る

## 背景

今は初期タスクが表示されるだけです。チームで取り組むタスクを自分たちで登録できるようにしましょう。

## やること

`src/App.tsx` にタスク名の入力欄と「追加」ボタンを作り、送信したタスクを一覧の末尾に表示してください。

## 完了条件

- 文字を入力して追加すると、一覧に新しいタスクが表示される
- 空文字や空白だけでは追加されない
- 追加後に入力欄が空になる
- 追加処理のテストを用意し、`npm test` と `npm run build` が通る

## Git Quest

branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。

最新のmainから `feature/3-add-task-form` を作成し、このIssueの変更だけをcommitしてください。PR本文には `Closes #3` を入れます。

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/3-add-task-form
```

Quest 2の練習branchからmainへ戻って作ります。`3` は実際のIssue番号に置き換えてください。

## commitして最初のPRを作る

commitはローカルに変更を記録し、pushはそのcommitをGitHubへ送る操作です。ハッカソンでは、意味が伝わる小さな単位でcommitすると、変更を追いやすくなります。

```bash
npm test
npm run build
git status
git diff
git add src/App.tsx tests/App.test.tsx
git diff --cached
git commit -m "feat: add task form"
git push -u origin feature/3-add-task-form
```

自分のForkでPull requests → New pull requestを開き、base repository・head repositoryを両方とも自分のForkにします。baseはmain、compareは作業branchです。変更内容・テスト結果・`Closes #3` を書いてPRを作ります。番号はこのIssueの実際の番号に合わせてください。

自分で差分を確認・修正してmergeし、Issueが閉じることを確認します。最後に `git switch main` と `git pull --ff-only origin main` でローカルmainを更新します。詳しい確認の観点は `docs/03_pull_request_review.md` にあります。

<!-- github-practice:quest:01-add-task.md -->
