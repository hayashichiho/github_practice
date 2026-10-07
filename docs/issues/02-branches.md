# Quest 2: 作業ブランチを作り、名前を付ける

## やること

VS Codeでmainから練習用ブランチを作り、mainとの切り替えを試します。このQuestではコード変更・commit・PRは不要です。

## 完了条件

- VS Codeで練習ブランチの作成と切り替えができる
- ブランチを分ける理由と名前の意味を、このIssueにコメントする
- Issueを閉じている

## 手順

ブランチは、変更の履歴を分けるための作業場所です。チーム開発では、`main` から機能ごとの作業ブランチを作り、実装後にPRでレビューを受けてからmainへ統合します。作業をブランチごとに分けることで、複数人が並行して開発しやすくなります。

```mermaid
gitGraph
    commit id: "共通のコード"
    branch feature
    checkout feature
    commit id: "機能を実装"
    commit id: "確認・修正"
    checkout main
    merge feature id: "PRをmerge"
```

### ブランチ名

この練習では `<種類>/<Issue番号>-<短い説明>` の形式にします。たとえば、タスク追加フォームを作る場合は `feature/3-add-task-form` のようにします。

下記は、よく使うブランチの種類の例です。

| 種類 | 用途 |
| --- | --- |
| `feature/` | 新機能の追加 |
| `fix/` | 不具合の修正 |
| `hotfix/` | 本番環境の緊急修正 |
| `refactor/` | 動作を変えずにコードの構造を改善 |
| `docs/` | ドキュメントの変更 |
| `style/` | 動作を変えない書式・整形の変更 |
| `chore/` | 環境設定などの保守作業 |
| `practice/` | この教材でのGit操作の練習 |

1. cloneしたプロジェクトをVS Codeで開く。未commitの変更がないことを確認する。
2. 左下が **main** になっていることを確認し、ブランチ名をクリックする。別のブランチなら一覧からmainを選び、もう一度メニューを開く。

![VS Codeでmainブランチを選択する画面](image/02-branches/1791357124090.png)

3. **「新しいブランチの作成…」** を選ぶ。

![ブランチ選択メニューの「新しいブランチの作成」](image/02-branches/1791356830341.png)

4. ブランチ名として `practice/2-branch-basics` と入力する（数字はIssue番号）。作成後、左下に新しいブランチ名が表示されることを確認する。
5. 左下のブランチ名をクリックして **main** に戻り、同じ操作で作成した練習ブランチへ再び切り替える。

ブランチを作った直後は、mainとファイルの内容は同じです。また、作成したブランチはまだPC上にしかありません。

6. ブランチを分ける理由と名前の意味をIssueにコメントし、**Close issue** で閉じる。

操作の参考: [VS Code公式ドキュメント](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees)
