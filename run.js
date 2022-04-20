const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

async function run() {
  try {
    // Get client and context
    const context = github.context;

    // Retrieve GITHUB_TOKEN from environment variable
    // Do nothing when GITHUB_TOKEN does not exist
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.log('GITHUB_TOKEN not exist');
      return;
    }

    // Create octokit client
  const octokit = new github.GitHub(token);

    // GITHUB_REPOSITORY is GitHub Action's built-in environment variable
    // https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
    const repoWithOwner = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repoWithOwner.split('/');

    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: context.issue.number,
      body: 1,
    });

  } catch (error) {
    core.setFailed(error.message);
  }
  
}

module.exports = run;
