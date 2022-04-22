const core = require('@actions/core');
const github = require('@actions/github');
const create_comment = require('./create_comment');
const create_task = require('./create_task');

async function run() {
  try {

    const pr = github.context.payload.pull_request;
    if (!pr) {
      create_comment();
      return;
    }else{
      create_task();
      return;
    }
    
  } catch (error) {
    core.setFailed(error.message);
  }
  
}

module.exports = run;
