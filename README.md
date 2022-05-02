# gha-github-to-nulab-backlog

githubのイシューとnulab backlogの課題を連携させるアクション。

github actionsを通してイシューの作成などをトリガーにbacklogのapiを利用して課題などを作成する

現在は課題の作成とコメントの作成に対応

# workflows/yml例

secretsに

Backlog APIの下記パラメーターを設定する（必須）

ProjectId プロジェクトのID、URLなどに記載されている

IssueTypeId 課題の種類を表すID、プロジェクトや課題によるためAPIを手動で叩くなどして取得する

Apikey 自身で発行したものを入れる

Domain APIURLのドメイン 例：https://test.com/api~　ならtest.comをsecretにDomainとして登録する

```yml
name: sync-backlog
on:
  issues:
    types: [ opened ]
  issue_comment:
    types: [ created ]

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: KouWakai/gha-github-to-nulab-backlog@v1-v2-merge
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        GITHUB_REPOSITORY: ${{ secrets.GITHUB_REPOSITORY }}
        projectid: ${{ secrets.PROJECTID }}
        issuetypeid: ${{ secrets.ISSUETYPEID }}
        apikey: ${{ secrets.APIKEY }}
        domain: ${{ secrets.DOMAIN }}
      with:
        priorityid: 1
```
