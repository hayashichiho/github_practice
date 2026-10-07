# Quest 4: タスクを完了・未完了に切り替える

## やること

各タスクの丸いボタンで、完了・未完了を切り替えられるようにしてください。完了時は現在の取り消し線と「完了」表示を使います。

## 完了条件

- 未完了から完了へ切り替えられ、もう一度押すと未完了に戻る
- 他のタスクの状態は変わらない
- ボタンの名前が「完了にする」「未完了に戻す」など現在の操作を表している
- 状態変更のテストがあり、テストとビルドが通る
- PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/4-toggle-task` ブランチを作る。
2. `src/App.tsx` の丸いボタンを操作できるようにし、押したタスクの完了状態だけを更新する。
3. 完了・未完了で見た目とボタンの名前が切り替わることを確認する。
4. `tests/App.test.tsx` に、切り替え・再切り替え・他のタスクへの影響を確認するテストを書く。
5. `npm test` と `npm run build` が通ったら、差分を確認してcommitし、`git push -u origin feature/4-toggle-task` でpushする。
6. 自分のForkのmain宛てにPRを作り、変更内容・テスト結果・`Closes #4` を書く。
7. PRの差分を確認・修正し、自分でmergeする。IssueがClosedになったら、VS Codeでmainへ切り替え、`git pull origin main` で更新する。

PRは1つの目的に絞るとレビューしやすくなります。今回は完了切り替えだけに集中し、他の機能や無関係な整形を混ぜないようにします。

<!-- github-practice:quest:02-toggle-task.md -->
