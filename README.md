# gha-github-to-nulab-backlog

githubのイシューとnulab backlogの課題を連携させるアクション。

github actionsを通してイシューの作成などをトリガーにbacklogのapiを利用して課題などを作成する

# workflows/yml例

secretsに

Backlogの下記パラメーターを設定する

ProjectId
IssueTypeId
Apikey

```yml
name: send-backlog
on:
  issues:
    types: [opened, edited]

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: KouWakai/gha-github-to-nulab-backlog@v1.0.1
      env:
        projectid: ${{ secrets.PROJECTID }}
        issuetypeid: ${{ secrets.ISSUETYPEID }}
        apikey: ${{ secrets.APIKEY }}
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        priorityid: 1
```
