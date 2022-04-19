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
      projectId:process.env.projectid,
      issueTypeId:process.env.issuetypeid,
      priorityId: `${priorityid}`,
      summary: `${title}`
    };

    // headerでコンテンツタイプを指定
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    //APIキー
    apikey = process.env.apikey;

    // Sending post data to API URL
    axios.post(`https://ss0413.backlog.com/api/v2/issues?apiKey=${apikey}`, data,headers)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
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
