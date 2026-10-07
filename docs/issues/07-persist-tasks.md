# Quest 7: タスクをブラウザーに保存する

## やること

タスク一覧をlocalStorageへ保存し、再読み込み後も追加・完了切り替え・削除の結果が残るようにしてください。

## 完了条件

- 再読み込み後も保存したタスクの状態が復元される
- 保存データがない場合は初期タスクが表示される
- 空の一覧を保存した場合は、再読み込み後も空のままになる
- 保存データが不正でもアプリがクラッシュしない
- 保存・読み込みのテストがあり、テストとビルドが通る
- PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/7-persist-tasks` ブランチを作る。
2. 初回表示時にlocalStorageから読み込み、データがない場合は初期タスクを使う。読めないデータをどう扱うか決める。
3. タスクの変更を保存し、ブラウザーで追加・完了・削除してから再読み込みして確認する。
4. `tests/App.test.tsx` に保存・復元・不正データのテストを書く。テストごとにlocalStorageを初期化し、他のテストへ影響させない。
5. `npm test` と `npm run build` が通ったら、差分を確認してcommitし、`git push -u origin feature/7-persist-tasks` でpushする。
6. 自分のForkのmain宛てにPRを作り、変更内容・テスト結果・`Closes #7` を書く。
7. PRの差分を確認・修正し、自分でmergeする。IssueがClosedになったら、VS Codeでmainへ切り替え、`git pull origin main` で更新する。



<!-- github-practice:quest:05-persist-tasks.md -->
