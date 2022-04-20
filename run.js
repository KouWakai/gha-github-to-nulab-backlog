const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

async function run() {
  try {

    //inputsを取得
    const priorityid = core.getInput('priorityid');

    // Get client and context
    const context = github.context;
    const payload = context.payload;
    
    const title = getTitle(payload);

    const data = {
      projectId: process.env.projectid,
      issueTypeId: process.env.issuetypeid,
      priorityId: `${priorityid}`,
      summary: `${title}`
    };

    // headerでコンテンツタイプを指定
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    //APIキー
    const apikey = process.env.apikey;

    //課題ID格納用
    var backlogtaskid = ""

    // Sending post data to API URL
    await axios.post(`https://ss0413.backlog.com/api/v2/issues?apiKey=${apikey}`, data,headers)
      .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
          backlogtaskid = res.data.issueKey;
      }).catch((err) => {
          console.error(err);
      });
    // Retrieve GITHUB_TOKEN from environment variable
    // Do nothing when GITHUB_TOKEN does not exist
    const token = process.env['GITHUB_TOKEN'];
    if (!token) {
      console.log('GITHUB_TOKEN not exist');
      return;
    }
    // Create octokit clients
    const octokit = new github.getOctokit(token);
    // GITHUB_REPOSITORY is GitHub Action's built-in environment variable
    // https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
    const repoWithOwner = process.env['GITHUB_REPOSITORY'];
    const [owner, repo] = repoWithOwner.split('/');

    console.log(`issue key is ${backlogtaskid}`)
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: context.issue.number,
      body: `${backlogtaskid}`,
    });

  } catch (error) {
    core.setFailed(error.message);
  }

  //イシュータイトルを取得
  function getTitle(payload) {
    if (payload.issue && payload.issue.title) {
      return payload.issue.title;
    }
  }
  
}

module.exports = run;
