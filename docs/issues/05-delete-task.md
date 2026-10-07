# Quest 5: タスクを削除する

## やること

各タスクに削除ボタンを追加し、選んだタスクだけを一覧から削除してください。

## 完了条件

- 選んだタスクだけが削除され、他のタスクは残る
- 削除ボタンをキーボードでも操作でき、ボタンの名前にタスク名が含まれている
- 全件削除してもエラーにならない
- 削除動作のテストがあり、テストとビルドが通る
- PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/5-delete-task` ブランチを作る。
2. `src/App.tsx` に削除ボタンを追加し、押したタスクだけを一覧から取り除く。
3. ボタンの名前を「○○を削除」などにし、Tabキーで選択して操作できることを確認する。
4. `tests/App.test.tsx` に、対象だけが消える場合と、最後の1件を削除する場合のテストを書く。
5. `npm test` と `npm run build` が通ったら、差分を確認してcommitし、`git push -u origin feature/5-delete-task` でpushする。
6. 自分のForkのmain宛てにPRを作り、変更内容・テスト結果・`Closes #5` を書く。
7. PRの差分を確認・修正し、自分でmergeする。IssueがClosedになったら、VS Codeでmainへ切り替え、`git pull origin main` で更新する。


<!-- github-practice:quest:03-delete-task.md -->
