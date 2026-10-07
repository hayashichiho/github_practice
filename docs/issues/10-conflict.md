# Quest 10: Conflictを解消する

## やること

自分で2つのbranchの同じファイルの同じ行を異なる内容に変更し、Conflictを起こして解消してください。通常の機能追加ではなく、mergeの練習です。

## 進め方

1. 最新mainから `practice/10-conflict` branchを作る。
2. `src/App.tsx` の `<h1>` の行を文言Aへ変更し、commit・pushして課題PRを作る（まだmergeしない）。
3. mainに戻り、別の `practice/main-side-heading` branchを作る。
4. 同じ `<h1>` の行を異なる文言Bへ変更し、commit・pushして補助PRを作り、先にmainへmergeする。補助PRには `Closes` を書かない。
5. 元の課題branchへ戻り、mainを取り込んで発生したConflictを解消する。
6. 両方の変更意図から残す文言を決め、テスト・commit・pushする。
7. 課題PRに解消方針を書いて自分でmergeする。

## main側の変更を自分で用意する

課題branchの変更をcommitしてから、補助branchを作ります。

```bash
git switch main
git pull --ff-only origin main
git switch -c practice/main-side-heading
```

同じ `<h1>` の行を文言Bに編集し、テストとビルドを確認してcommit・pushします。補助PRを自分のForkのmainへmergeしてから、課題branchへ戻ります。

```bash
git switch practice/10-conflict
git fetch origin
git merge origin/main
```

`10` は実際の課題Issue番号に合わせます。競合後の編集・commit・pushは `docs/04_conflict.md` を参照してください。競合しない場合は、同じ起点の同じ行を異なる内容に変更したか確認します。

## 完了条件

- 競合マーカーをすべて解消している
- 最終的な見出しが自分で決めた解消方針に沿っている
- `npm test` と `npm run build` が通る
- 競合の原因と解消方法をPR本文に説明する

## Git Quest

branch名の数字と `Closes` の番号は例です。Quest番号ではなく、GitHubで作成されたこのIssueの実際の番号に置き換えてください。最新mainからbranchを作ります。

最後まで自分で操作し、`docs/04_conflict.md` を参考にして構いません。同じ起点から作った2つのbranchで、同じ行を異なる内容に変更することが必要です。1人でmain側と作業branch側の両方の役割を行います。

PR本文に `Closes #10` を書きます（`10` は実際のIssue番号へ置き換えてください）。

<!-- github-practice:quest:08-conflict.md -->
