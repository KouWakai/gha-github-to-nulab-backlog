const core = require('@actions/core');
const github = require('@actions/github');
const create_comment = require('./src/create_comment');
const create_task = require('./src/create_task');

async function run() {
  try {
    const type = github.context.payload.action;
    if (type == 'created') {
      console.log("comment is posted on Github!!");
      console.log("test");
      create_comment();
    }else if(type == 'opened'){
      console.log("issue is opend in Github!!")
      create_task();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
  
}

module.exports = run;
