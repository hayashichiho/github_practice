# GitHub Issue本文案と登録手順

このフォルダは課題本文の原稿です。Fork後、自分のForkでworkflowを手動実行すると、Quest 1〜10をまとめて登録できます。ForkやpushだけではIssueは作成されません。

## workflowで登録する（通常はこちら）

1. **練習するFork** の **Settings → General → Features** でIssuesを有効にする。
2. **Actions** を開き、Forkのworkflow実行を有効にする。Actions自体が無効なら **Settings → Actions → General** で許可する。
3. 左側の **練習用Issueを登録** を選び、**Run workflow → Branch: main → Run workflow** を押す。自分のForkの所有者として実行する。
4. 実行が成功したら、同じForkの **Issues** で10件を確認する。Actionsの実行結果のSummaryにもIssue番号を表示する。

原稿の先頭見出しをタイトル、残りを本文にして登録します。branch名と、PRを作る課題の `Closes #番号` は、作成された実際のIssue番号に自動で合わせます。Quest番号とIssue番号が一致する必要はありません。

再実行では登録済み課題をスキップします。ClosedのIssueも作り直さず、登録後のメモや編集も保持します。重複判定には本文末尾の非表示マーカーを使うため、そのマーカーは残してください。同じタイトルの手動Issueもスキップしますが、手動Issueの番号は自分で確認してください。

## 困ったとき

- **Run workflowがない**: 課題登録workflowがForkのデフォルトbranchにあるか確認する。古いForkには配布元の更新の取り込みが必要です。練習中の場合は取り込む差分を確認してから更新してください。
- **Issuesタブがない／Issuesを有効にするエラー**: Forkの所有者がSettingsでIssuesを有効にする。
- **Actionsを実行できない／HTTP 403**: Actionsの許可設定、実行者の書き込み権限、組織の制限を確認する。workflowにはIssue書き込み権限を指定済みなので、個人アクセストークンの追加は通常不要です。
- **途中で失敗した**: 実行結果の赤いチェックを開き、失敗したstepのエラーを確認する。原因を直して再実行する。作成後の番号反映だけ失敗したIssueは復旧し、まだ作っていない課題から登録を続ける。

workflowは登録済み課題の内容更新・削除・再オープンは行いません。課題をやり直す場合は既存Issueを手動で再オープンしてください。

## Actionsを使えない場合の手動登録

1. 練習するForkの **Issues → New issue** を開く。
2. 下の課題ファイルの先頭見出しをタイトル、残りを本文にコピーする。
3. 作成されたIssueの実際の番号を確認し、本文のbranch名・`Closes #番号` の数字を置き換える。
4. 残りの課題も同じように登録する。

練習用PRはIssueと同じForkのmainへ送ります。Quest 1・2は変更やPRが不要なので、確認結果をIssueにコメントして手動で閉じます。Quest 3以降は前のPRがmergeされてから次へ進みます。

## 課題一覧

1. [セットアップ](01-setup.md)
2. [branchの分け方と名前](02-branches.md)
3. [タスク追加・commit・最初のPR](03-add-task.md)
4. [完了切り替え・PRの変更範囲](04-toggle-task.md)
5. [削除・review後の修正](05-delete-task.md)
6. [フィルター・merge後の同期](06-filter-tasks.md)
7. [保存・エラーの共有](07-persist-tasks.md)
8. [編集・チーム内の分担](08-edit-task.md)
9. [進捗表示・main更新の取り込み](09-progress-and-sync.md)
10. [Conflictの解消](10-conflict.md)

以前の8課題を登録済みの場合、再実行で既存Issueの内容は更新されません。基礎2件だけが追加されるので、既存の課題も新しい原稿に合わせたい場合は手動で編集するか、新しいForkで始めてください。
