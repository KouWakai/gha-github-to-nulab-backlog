const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // pull_request exists on payload when a pull_request event is triggered
    // Do nothing when pull_request does not exist on payload
    const pr = github.context.payload.pull_request;
    if (!pr) {
      console.log('github.context.payload.pull_request not exist');
      return;
    }

    // Retrieve GITHUB_TOKEN from environment variable
    // Do nothing when GITHUB_TOKEN does not exist
    const token = process.env['GITHUB_TOKEN'];
    if (!token) {
      console.log('GITHUB_TOKEN not exist');
      return;
    }

    // Get input
    const message = core.getInput('message');
    console.log(`message: ${message}`);

    // Create octokit client
    const octokit = new github.GitHub(token);

    // GITHUB_REPOSITORY is GitHub Action's built-in environment variable
    // https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
    const repoWithOwner = process.env['GITHUB_REPOSITORY'];
    const [owner, repo] = repoWithOwner.split('/');

    // Create a comment on PR
    // https://octokit.github.io/rest.js/#octokit-routes-issues-create-comment
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pr.number,
      body: message,
    });
    console.log(`created comment URL: ${response.data.html_url}`);

    core.setOutput('commentUrl', response.data.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
