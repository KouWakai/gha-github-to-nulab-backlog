const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

async function run() {
  try {

    //inputsを取得
    const priorityid = core.getInput('priorityid');
    const summary = core.getInput('summary');

    const data = {
      projectId:process.env.projectid,
      issueTypeId:process.env.issuetypeid,
      priorityId: `${priorityid}`,
      summary: `${summary}`
    };

    // headerでコンテンツタイプを指定
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    // Get client and context
    const client = new github.GitHub(
      core.getInput('repo-token', {required: true})
    );
    const context = github.context;
    console.log(context.issue);

    
  
    // Sending post data to API URL
    axios.post('https://ss0413.backlog.com/api/v2/issues?apiKey=ChdR8p4c2WtOfPh5tvTdVjF5rQmci448Z6mnTtPgdHXgEo4sIOX8Ey8FALk89LKP', data,headers)
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
}

module.exports = run;
