# Quest 1: 開発環境をセットアップする

## やること

自分のForkをPCへcloneし、アプリの起動・テスト・ビルドを確認します。このQuestではコード変更やPRの作成は不要です。

## 完了条件

- `origin` が自分のForkのURLになっている
- ブラウザーでアプリを表示できる
- `npm test` と `npm run build` が通る
- 確認結果をIssueにコメントし、Issueを閉じている

## 手順

1. Git、Node.js 24 LTS、npm、VS Codeを用意する。Node.jsは https://nodejs.org/en/download からインストールできる。ターミナルで `git --version`、`node --version`、`npm --version` を確認する。
2. 自分のForkの **Code → HTTPS** からURLをコピーしてcloneする。`YOUR_USERNAME` は自分のユーザー名に置き換える。

```bash
git clone https://github.com/YOUR_USERNAME/github_practice.git
cd github_practice
git remote -v
```

3. `origin` が自分のForkを指していることを確認する。nvmを使う場合は、このフォルダで `nvm install` と `nvm use` を実行する。
4. 依存パッケージをインストールしてアプリを起動する。

```bash
npm ci
npm run dev
```

`npm ci` はロックファイルに沿って依存パッケージを揃える操作です。このアプリはReactで画面を作り、TypeScriptで型をチェックし、Viteで開発サーバーとビルドを実行します。

5. 表示されたLocalのURL（通常 `http://localhost:5173`）をブラウザーで開く。タスクの追加欄がまだフォームになっておらず、完了ボタンが動かないのは、後のQuestで実装するため。
6. 別のターミナルを同じフォルダで開き、`npm test` と `npm run build` を実行する。開発サーバーの停止は `Ctrl+C`。
7. このIssueに確認結果をコメントし、**Close issue** で閉じる。
