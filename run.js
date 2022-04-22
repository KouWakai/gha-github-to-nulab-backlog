const core = require('@actions/core');
const github = require('@actions/github');

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

    if(response.data != null){
      response.data[0].foreach(v => console.log(v.body))
    }
    
    //response.data.foreach(v => console.log(v))
    
    console.log(context.issue.number);

    
  } catch (error) {
    core.setFailed(error.message);
  }
  
}

module.exports = run;
