const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function create_comment(){
    try {
        // Get client and context
        const context = github.context;
        const payload = context.payload;
console.log(payload);
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        var issuekey = "";
        const apikey = process.env.apikey;
        const domain = process.env.domain;
            
        // Retrieve GITHUB_TOKEN from environment variable
        // Do nothing when GITHUB_TOKEN does not exist
        const token = process.env['GITHUB_TOKEN'];

        if (!token) {
          console.log('GITHUB_TOKEN not exist');
          return;
        }
    
        // Create octokit clients
        const octokit = new github.getOctokit(token);
    
        const repoWithOwner = process.env['GITHUB_REPOSITORY'];
        const [owner, repo] = repoWithOwner.split('/');
    
        //Githubイシューのコメントを取得
        const response = await octokit.rest.issues.listComments({
          owner,
          repo,
          issue_number: context.issue.number,
        });
    
        //GithubイシューのコメントからBacklogの課題キーを正規表現で取得する
        if(response.data != null){
          let re = /.*-\d*/g;
            console.log(re);
          issuekey = response.data.filter(v => re.exec(v.body))
          console.log(issuekey[0].body)
        }
    
        //payloadからGithubに投稿されたコメントを取得する
        const data = {
          content: `${payload.comment.body}`
        };
    
        //BacklogAPIでコメントを投稿する
        const res = await axios.post(`https://${domain}/api/v2/issues/${issuekey[0].body}/comments?apiKey=${apikey}`, data,headers).catch((err) => {
              console.error(err);
          });        
      } catch (error) {
        core.setFailed(error.message);
      }
}

module.exports = create_comment;
