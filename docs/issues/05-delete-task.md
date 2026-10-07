# Quest 5: タスクを削除する

## やること

各タスクに削除ボタンを追加し、押したタスクだけ一覧から削除してください。削除ボタンはキーボードとスクリーンリーダーからも使えるようにします。

## 完了条件

- 選んだタスクを削除できる
- 他のタスクは残る
- 削除ボタンにタスク名を含むaccessible nameがある
- 削除動作のテストがある
- `npm test` と `npm run build` が通る

## ハッカソンで役立つ知識: reviewと修正

PRを作った後、Files changedで差分を確認し、改善点を1つコメントします。修正・テスト・commit・pushを同じbranchで行い、PRが更新されることを確認してください。今回は自分で行いますが、チームでは他の人にreviewを依頼し、指摘に対応します。

## Git Quest

branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。

`feature/5-delete-task` branchで実装し、PR本文に `Closes #5` を書きます。削除したとき0件になる場合もテストしてみましょう。

<!-- github-practice:quest:03-delete-task.md -->
