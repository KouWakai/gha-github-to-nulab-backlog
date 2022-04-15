const core = require('@actions/core');
const github = require('@actions/github');
const nock = require('nock');
nock.disableNetConnect();
const run = require('./run');

beforeEach(() => {
  jest.resetModules();

  github.context.payload = {
    action: 'opened',
    pull_request: {
      number: 1,
    },
  };
});

describe('run', () => {
  it('comments on PR', async () => {

    process.env['INPUT_MESSAGE'] = 'Test Comment';
    process.env['GITHUB_REPOSITORY'] = 'testorg/testrepo';
    process.env['GITHUB_TOKEN'] = 'test-github-token';

    nock('https://api.github.com')
      .post('/repos/KouWakai/gha-backlog/issues/6/comments',
        body => body.body === 'Test Comment')
      .reply(200, {html_url: 'https://github.com/KouWakai/gha-backlog/issues/6#issuecomment-1'});
    const setOutputMock = jest.spyOn(core, 'setOutput');

    await run();

    expect(setOutputMock).toHaveBeenCalledWith(
      'commentUrl',
      'https://github.com/KouWakai/gha-backlog/issues/6#issuecomment-1');
  });
});
