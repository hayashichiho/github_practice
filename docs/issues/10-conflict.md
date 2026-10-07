# Quest 10: Conflictを解消する

## やること

2つのブランチで同じファイルの同じ行を異なる内容に変更し、Conflict（競合）を起こして解消してください。1人で作業ブランチ側とmain側の両方を用意します。

## 完了条件

- 2つのブランチの変更で競合を起こし、競合マーカーをすべて解消している
- 最終的な見出しが、自分で決めた解消方針に沿っている
- `npm test` と `npm run build` が通る
- 課題PRに競合の原因と解消方法を書き、mergeしてIssueを閉じている

## 手順

ブランチの作成・切り替えはQuest 2、PR画面の操作は[Quest 3](03-add-task.md)を参照してください。

1. VS Codeでmainへ切り替え、ターミナルで `git pull origin main` を実行して更新する。その後、VS Codeで `practice/10-conflict` ブランチを作る。
2. `src/App.tsx` の `<h1>` の行を文言Aに変更する。テスト・ビルドを確認してcommitし、`git push -u origin practice/10-conflict` でpushする。自分のForkのmain宛てに課題PRを作る。本文に `Closes #10` を書くが、**まだmergeしない。**
3. VS Codeでmainへ切り替えて `git pull origin main` を実行する。その後、VS Codeで補助ブランチ `practice/main-side-heading` を作る。

4. 同じ `<h1>` の行を文言Aとは異なる文言Bに変更する。テスト・ビルドを確認してcommitし、`git push -u origin practice/main-side-heading` でpushする。補助PRを自分のForkのmainへ先にmergeする。**補助PRには `Closes` を書かない。**
5. VS Codeで `practice/10-conflict` へ切り替える。その上で、次を実行してリモートの最新mainを取り込む。

```bash
git fetch origin
git merge origin/main
```

6. 競合したファイルを開き、文言A・Bの意図から残す内容を決める。`<<<<<<<`、`=======`、`>>>>>>>` のマーカーをすべて消して保存する。詳しくは[Conflictの解消手順](../04_conflict.md)を参照する。
7. テスト・ビルドを確認し、解消した変更をcommit・pushする。

```bash
npm test
npm run build
git add src/App.tsx
git commit -m "merge: resolve heading conflict"
git push
```

8. 課題PRに競合の原因と残した内容を追記し、差分を確認してmergeする。IssueがClosedになったらVS Codeでmainへ切り替え、`git pull origin main` で更新する。

競合しない場合は、同じ起点の同じ行を異なる内容に変更したか確認してください。チーム開発では、相手の変更意図を確認してから解消します。

<!-- github-practice:quest:08-conflict.md -->
