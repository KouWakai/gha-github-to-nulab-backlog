const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  try {
    // Get client and context
    const context = github.context;
    const payload = context.payload;

    //console.log(context);
    //console.log(payload);
    
    // Retrieve GITHUB_TOKEN from environment variable
    // Do nothing when GITHUB_TOKEN does not exist
    const token = process.env['GITHUB_TOKEN'];
    console.log(token)
    if (!token) {
      console.log('GITHUB_TOKEN not exist');
      return;
    }

    // Create octokit clients
    const octokit = new github.getOctokit(token);

    const repoWithOwner = process.env['GITHUB_REPOSITORY'];
    const [owner, repo] = repoWithOwner.split('/');



    const response = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: context.issue.number,
    });

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    var issuekey = "";
    const apikey = process.env.apikey;
    const domain = process.env.domain;

    if(response.data != null){
      let re = /ENGINEER.+/g;
      issuekey = response.data.filter(v => re.exec(v.body))
      console.log(issuekey[0].body)
    }

    const data = {
      content: `${payload.comment.body}`
    };

    const res = await axios.post(`https://${domain}/api/v2/${issuekey[0].body}/comments?apiKey=${apikey}`, data,headers).catch((err) => {
          console.error(err);
      });

    //response.data.foreach(v => console.log(v))
    
    console.log(context.issue.number);

    
  } catch (error) {
    core.setFailed(error.message);
  }
  
}

module.exports = run;
