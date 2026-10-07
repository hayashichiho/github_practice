# Quest 9: 進捗表示を実際のタスク状態に合わせる

## やること

完了数・全件数・進捗バーを、現在のタスク状態から計算して表示してください。あわせて別ブランチからmainを更新し、作業中のブランチへ取り込む練習をします。

## 完了条件

- 追加・完了・削除に応じて、完了数 / 全件数と進捗バーが更新される
- フィルターで表示を絞っても、進捗は全タスクを基準に計算される
- タスクが0件でもエラーにならず、進捗は0%になる
- 状態に応じたテストがあり、テストとビルドが通る
- 別ブランチでmainへmergeした変更を、作業ブランチに取り込んでいる
- 課題PRをmergeし、このIssueがClosedになっている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `feature/9-live-progress` ブランチを作る。
2. `src/App.tsx` の固定の完了数 `1` を計算した値へ置き換え、全件数と進捗バーも確認する。0件の扱いを決め、`tests/App.test.tsx` に状態変化と0件のテストを書く。
3. テストとビルドを確認し、作業内容をcommitする。未commitの変更を残さず、VS Codeでmainへ切り替えて `git pull origin main` を実行する。その後、VS Codeで補助ブランチ `docs/main-update-practice` を作る。

4. READMEの説明を1文だけ改善するなど、別ファイルを小さく変更する。commitし、`git push -u origin docs/main-update-practice` でpushする。自分のForkのmain宛てに補助PRを作り、先にmergeする。**補助PRには `Closes` を書かない。**
5. VS Codeで `feature/9-live-progress` へ切り替える。その上で、次を実行してリモートの最新mainを取り込む。

```bash
git fetch origin
git merge origin/main
```

6. READMEの変更が取り込まれたことを確認し、もう一度 `npm test` と `npm run build` を実行する。
7. `git push -u origin feature/9-live-progress` でpushし、課題PRを作る。本文に変更内容・テスト結果・mainを取り込んだこと・`Closes #9` を書く。
8. 差分を確認してmergeし、IssueがClosedになったらVS Codeでmainへ切り替え、`git pull origin main` で更新する。

チーム開発では、作業中に他の人がmainを更新します。今回はその役割も自分で行い、更新を取り込んでから確認する流れを練習します。競合した場合は[Conflictの解消手順](../04_conflict.md)を参照してください。

<!-- github-practice:quest:07-progress-and-sync.md -->
