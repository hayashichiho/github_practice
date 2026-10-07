# Pull Requestとreview

Pull Request (PR) は、branchの変更をmainへ取り込む提案です。この練習では、自分で差分を読み直し、改善・確認を経てからmergeします。

練習するForkに作業branchをpushし、PRのbase repositoryとhead repositoryは両方ともそのForkにします。baseは `main`、compareは作業branchです。配布元の `hayashichiho/github_practice` へ練習用PRを送らないよう、送り先を確認してください。

## PRを作る前に

```bash
npm test
npm run build
git status
```

意図しない変更がないか確認し、PRは1つのIssueに対応する範囲に絞ります。

## 説明の例

```md
## 変更内容
タスク追加フォームを作り、空欄では追加できないようにしました。

## 確認したこと
- [x] npm test
- [x] npm run build

Closes #1
```

`Closes #1` の `1` は実際の担当Issue番号へ置き換えます。mainをデフォルトbranchに設定したリポジトリでは、mainへのmergeでIssueが自動で閉じます。pushやApproveだけでは閉じません。

## 1人で差分を確認する

自分のPRでは **Files changed** を開き、次を確認します。

- Issueの完了条件をすべて満たしているか。
- 想定外のファイルや無関係な変更が含まれていないか。
- 空入力、0件、キャンセルなど、その機能で起きる境界条件を扱えているか。
- ボタンや入力欄の名前から操作が分かるか。
- テストが追加した機能の動作を確認しているか。

確認を終えたら自分でmergeしてください。
