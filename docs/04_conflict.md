# Conflictを解消する

同じファイルの同じ行を、2つのbranchで異なる内容に変更すると競合することがあります。1人で競合を用意する手順は [Quest 10](issues/10-conflict.md) にあります。

## 最新mainを作業branchへ取り込む

自分の変更をcommitし、`git status` で未commitの変更がないことを確認してから、**作業branch上で**実行します。`origin` は自分のForkです。

```bash
git fetch origin
git merge origin/main
```

競合しなければそのままmergeされます。競合したら `git status` で対象ファイルを確認します。

```text
<<<<<<< HEAD
自分の作業branchの内容
=======
mainから取り込む内容
>>>>>>> origin/main
```

## 競合したとき

1. マーカーの上下から変更意図を確認し、残す内容を決める。チーム開発では相手の変更を勝手に消さず、担当者に確認する。
2. 必要な内容に編集し、3種類の競合マーカーをすべて消して保存する。
3. Quest 10で `src/App.tsx` を解消した場合、次を実行する。他にも競合があればすべて解消・addする。

```bash
git diff
npm test
npm run build
git add src/App.tsx
git diff --cached
git status
git commit -m "merge: resolve heading conflict with main"
git push
```

PR本文に原因と解消方針を書き、確認してからmergeします。取り込みを中止したい場合は、merge途中で `git merge --abort` を使えます。
