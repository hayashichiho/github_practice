# Quest 1: 開発環境をセットアップする

## 学ぶこと

Reactは画面を作るライブラリ、TypeScriptは型チェックを備えた言語、Viteは開発サーバーとビルドのツールです。cloneはGitHubのコードと履歴を自分のPCへコピーする操作です。

## やること

1. Git、Node.js 24 LTS、npm、コードエディターを用意する。Node.jsは https://nodejs.org/en/download からインストールできる。
2. ターミナル（WindowsならGit Bashなど）で `git --version`、`node --version`、`npm --version` を確認する。
3. **自分のFork** のCode → HTTPSからURLをコピーしてcloneする。下の `YOUR_USERNAME` は自分のユーザー名に置き換える。

```bash
git clone https://github.com/YOUR_USERNAME/github_practice.git
cd github_practice
git remote -v
npm ci
npm run dev
```

`origin` が自分のForkのURLであることを確認してください。nvmを使う場合は、cloneしたフォルダで `nvm install` と `nvm use` を実行してからnpmのコマンドを使います。

4. ターミナルのLocalのURL（通常 `http://localhost:5173`）をブラウザーで開く。停止は `Ctrl+C`。
5. 別のターミナルを同じフォルダで開き、次を確認する。

```bash
npm test
npm run build
```

`npm ci` はロックファイルに沿って依存関係を揃える操作です。

## 完了条件

- アプリが表示され、テストとビルドが成功する
- `origin` が自分のForkのURLになっている
- 実行結果をこのIssueにコメントし、**Close issue** で閉じる

このQuestではファイルの変更やPRは不要です。追加・完了ボタンが動かないのは後の課題で実装するためです。
![1791358453516](image/01-setup/1791358453516.png)
![1791358476671](image/01-setup/1791358476671.png)
