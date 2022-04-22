# gha-github-to-nulab-backlog

githubのイシューとnulab backlogの課題を連携させるアクション。

github actionsを通してイシューの作成などをトリガーにbacklogのapiを利用して課題などを作成する

# workflows/yml例

secretsに

Backlogの下記パラメーターを設定する

ProjectId. 

IssueTypeId. 

Apikey. 

APIURLのドメイン


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
