# 教材の公開・更新ガイド

このページは教材を配布する人向けです。練習者はREADMEの「練習手順」から1人で進められます。進行役やCollaboratorの招待は不要です。

配布元は [hayashichiho/github_practice](https://github.com/hayashichiho/github_practice) です。構成はReact + TypeScript + Viteです。練習者は自分のForkに課題Issueを登録し、そのForkのmainへPRをmergeします。

## 1. 教材を公開する

すでに元のリポジトリが公開済みなら、以下の新規公開手順は不要です。既存の内容を更新するときは、元のリポジトリをcloneして作業branchとPRを使い、履歴を保ったまま反映してください。

以下は別の練習用リポジトリを新規に用意するときの手順です。

**このフォルダだけがGit管理の対象か確認してください。**

```bash
pwd
git rev-parse --show-toplevel
```

2つのパスが異なる場合、親フォルダのリポジトリに含まれています。そのまま親フォルダで `git add .` / pushをすると、別プロジェクトまで対象になります。このプロジェクトの内容だけを独立した作業フォルダにコピーして準備してください。`.github`、`.gitignore`、`.nvmrc` などの隠しファイルも含め、`.git` や `node_modules`、`dist` はコピーしません。

新しい作業フォルダ内で、まだ独立したGitリポジトリがない場合の例です。GitHub側にはREADME等を追加しない空のリポジトリを作成し、URLを実際のものに置き換えます。既存リポジトリへのpushは、その履歴を確認してから行ってください。

```bash
git init -b main
git rev-parse --show-toplevel
git status --short
```

管理の起点が現在のフォルダであり、対象がこのプロジェクトだけであることを確認して続けます。

```bash
git add .
git diff --cached --stat
git commit -m "chore: prepare team development practice"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

GitHubでmainがデフォルトbranchであること、`.github` と `docs/issues` が公開されていることを確認します。

## 2. 公開前に確認する

- `.github/workflows/create-practice-issues.yml`、`scripts/`、`docs/issues/` が配布元のmainに含まれている。
- `npm run test:issues`、`npm test`、`npm run build` が成功する。
- READMEにFork後のIssues・Actions有効化とRun workflowの操作が記載されている。
- Quest 9・10が進行役なしで再現できる手順になっている。

課題登録workflowは実行したリポジトリにだけIssueを作成・更新します。再実行では登録済み課題のタイトル・本文を最新の原稿に揃え、Issue番号・コメント・Open／Closedの状態を維持します。同じタイトルの手動作成した課題Issueも更新します。重複作成・再オープンは行いません。

## 3. 教材を更新するとき

課題の原稿は `docs/issues/` にあります。原稿をmainへ反映した後、**Run workflow → Branch: main** から新しく実行すると登録済みIssueも更新されます。本文に直接加えたメモや編集内容は上書きされるので、残したいメモはコメントへ書くよう案内してください。既存Forkでは、先にスクリプトと原稿の更新を取り込む必要があります。

練習者のForkには機能追加の履歴があるため、配布元のmainを無条件に取り込む案内は避け、更新内容を確認してから取り込む手順を示してください。
