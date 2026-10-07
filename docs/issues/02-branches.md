# Quest 2: 作業branchを作り、名前を付ける

## 学ぶこと

branchは変更の履歴を分ける作業場所です。ハッカソンでは担当機能ごとにbranchを分けると、他の人の作業を邪魔せず、PRの差分も確認しやすくなります。mainは取り込み済みのコードを集める場所です。

branch名は `<種類>/<実際のIssue番号>-<短い説明>` にします。

- `feature`: 機能追加（例: `feature/3-add-task-form`）
- `fix`: 不具合修正（例: `fix/3-empty-title`）
- `docs`: 文書の変更
- `practice`: Git操作の練習

小文字とハイフンを使い、目的が伝わる名前を付けます。**Quest番号とGitHubのIssue番号は別です。** この原稿の番号は例なので、実際のIssueに合わせてください。

## やること

```bash
git status
git switch main
git pull --ff-only origin main
git switch -c practice/2-branch-basics
git branch --show-current
```

未commitの変更がある場合は、切り替える前に変更を確認・保存します。`git switch -c` は新しいbranchを作って切り替える操作です。branchを作っただけではGitHubには反映されません。

次のQuestではこのbranchからmainへ戻り、最新mainから機能追加用のbranchを作ります。この練習branchは残しておいて構いません。

## 完了条件

- `git branch --show-current` で作業branch名が表示される
- branchを分ける理由と名前の意味を、このIssueにコメントする
- **Close issue** でこのIssueを閉じる（変更・commit・PRはまだ不要）
