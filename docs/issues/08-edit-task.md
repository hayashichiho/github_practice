# Quest 8: タスク名を編集する

## やること

タスク名を編集する操作と、「保存」「キャンセル」を追加してください。

## 完了条件

- 編集を始めると、現在のタスク名が入力欄に表示される
- 保存すると対象タスクの名前だけが更新される
- 空文字や空白だけでは保存されない
- キャンセルすると変更前の名前が保たれる
- 編集結果が保存され、再読み込み後も残る
- 編集・保存・キャンセルのテストがあり、テストとビルドが通る
- PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/8-edit-task` ブランチを作る。
2. `src/App.tsx` に編集中のタスクと入力内容を保持する状態を追加し、編集用の入力欄を表示する。
3. 保存時は名前を確認して対象だけを更新し、キャンセル時は元のタスクを変更しない。Quest 7の保存処理でも更新されることを確認する。
4. `tests/App.test.tsx` に保存・キャンセル・空入力のテストを書く。操作ボタンの名前も確認する。
5. `npm test` と `npm run build` が通ったら、差分を確認してcommitし、`git push -u origin feature/8-edit-task` でpushする。
6. 自分のForkのmain宛てにPRを作り、変更内容・テスト結果・`Closes #8` を書く。
7. PRの差分を確認・修正し、自分でmergeする。IssueがClosedになったら、VS Codeでmainへ切り替え、`git pull origin main` で更新する。


<!-- github-practice:quest:06-edit-task.md -->
