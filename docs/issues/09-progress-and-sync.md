# Quest 9: 進捗表示を実際のタスク状態に合わせる

## やること

ページ上部の進捗カードとタスクリスト件数を、現在のタスク状態から計算して表示してください。初期コードでは完了数が `1` 固定で、全件数は `tasks.length` です。完了数も現在のタスクから計算し、追加・完了・削除に合わせて更新します。

## 完了条件

- 完了数 / 全タスク数が正しく表示される
- 進捗バーの幅が完了率と一致する
- タスクが0件のときもエラーにならず0%を表示する
- 状態に応じたテストを追加する
- `npm test` と `npm run build` が通る

## Git Quest

branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。

`feature/9-live-progress` branchで実装し、PR本文に `Closes #9` を入れます。このIssueの作業branchで変更をcommitした後、mainに戻って `docs/main-update-practice` という補助branchを作ります。READMEの説明など別ファイルを小さく変更し、commit・pushして補助PRを作り、自分でmainへmergeしてください。補助PRには `Closes` を書きません。その後、元の作業branchへ戻り、mainを取り込んでから課題のPRを作ります。これで他の人がmainを更新した状況を1人で再現できます。

mainの取り込みは `docs/04_conflict.md` の「作業branchにmainを取り込む」を参照してください。

<!-- github-practice:quest:07-progress-and-sync.md -->
