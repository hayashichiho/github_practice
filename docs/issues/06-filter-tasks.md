# Quest 6: タスクを状態で絞り込む

## やること

一覧の上に「すべて」「未完了」「完了」のフィルターボタンを作ってください。

## 完了条件

- 「すべて」では全タスクを表示する
- 「未完了」では未完了タスクだけを表示する
- 「完了」では完了タスクだけを表示する
- 表示を絞ってもタスク自体の状態は変わらない
- フィルター切り替えのテストがある
- `npm test` と `npm run build` が通る

## ハッカソンで役立つ知識: merge後の同期

GitHubでPRをmergeしてもPCのmainは自動で更新されません。次の課題を古いmainから始めないよう、毎回同期します。`Closes`でIssueを閉じるには、PRをデフォルトbranch（ここではmain）へmergeする必要があります。

```bash
git switch main
git pull --ff-only origin main
```

## Git Quest

branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。

`feature/6-filter-tasks` branchを作成し、PR本文に `Closes #6` を入れます。状態を表す型をどう設計するか考えましょう。

<!-- github-practice:quest:04-filter-tasks.md -->
