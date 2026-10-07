# Quest 6: タスクを状態で絞り込む

## やること

一覧の上に「すべて」「未完了」「完了」のフィルターボタンを作ってください。

## 完了条件

- 「すべて」で全件、「未完了」「完了」で該当するタスクだけが表示される
- 表示を絞っても、タスク自体の状態は変わらない
- フィルター切り替えのテストがあり、テストとビルドが通る
- PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/6-filter-tasks` ブランチを作る。
2. `src/App.tsx` に選択中のフィルターを保持する状態と、3つのボタンを追加する。
3. 元のタスク一覧を残したまま、選択に応じて表示するタスクを絞る。
4. `tests/App.test.tsx` に、各フィルターの表示と「すべて」へ戻したときのテストを書く。
5. `npm test` と `npm run build` が通ったら、差分を確認してcommitし、`git push -u origin feature/6-filter-tasks` でpushする。
6. 自分のForkのmain宛てにPRを作り、変更内容・テスト結果・`Closes #6` を書く。
7. PRの差分を確認・修正し、自分でmergeする。IssueがClosedになったら、VS Codeでmainへ切り替え、`git pull origin main` で更新する。



<!-- github-practice:quest:04-filter-tasks.md -->
