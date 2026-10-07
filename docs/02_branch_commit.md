# Branch名とcommit

branchの基礎と名前は [Quest 2](issues/02-branches.md)、最初のcommit操作は [Quest 3](issues/03-add-task.md) を参照してください。

## Branch名

`<種類>/<Issue番号>-<短い説明>` の形にします。

- `feature/1-add-task-form`
- `feature/2-toggle-task`
- `feature/3-delete-task`
- `docs/7-update-readme`

番号はQuest番号ではなく、GitHubの実際のIssue番号です。これらは例なので自分のIssueに合わせて置き換えてください。競合練習には `practice/<Issue番号>-conflict` を使います。

小文字とハイフンを使い、名前から目的が分かるようにします。

## Commitを小さく分ける

1つのcommitは、ひとまとまりの変更にします。たとえばフォームの実装とそのテストを同じcommitにしてもよいです。作業の意味が別なら分けます。

```bash
git diff
git add src/App.tsx tests/App.test.tsx
git commit -m "feat: add task form"
```

例:

- `feat: add task form`
- `fix: prevent empty task titles`
- `test: cover task completion`
- `docs: explain review workflow`

「update」「修正」だけのメッセージではなく、何をしたcommitかを書きます。
