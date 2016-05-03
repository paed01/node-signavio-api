'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;
const nock = require('nock');

const Workflow = require('../.').Workflow;
const workflows = new Workflow({
  authorization: 'token'
});

lab.experiment('Workflow', () => {
  const scope = nock(Workflow.apiDoc.basePath);
  lab.before((done) => {
    nock.disableNetConnect();
    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('#getWorkflow', () => {
    lab.test('takes organizationKey and offset as argument', (done) => {
      scope.get('/test-org/workflows?offset=1')
        .reply(200, []);
      workflows.getWorkflows('test-org', 1, done);
    });

    lab.test('returns error in callback if offset is not a number', (done) => {
      workflows.getWorkflows('test-org', 'off', (err) => {
        expect(err).to.exist();
        done();
      });
    });

    lab.test('takes null as offset since query strings are considered optional', (done) => {
      scope.get('/test-org/workflows')
        .reply(200, {});

      workflows.getWorkflows('test-org', null, (err, body, resp) => {
        if (err) return done(err);
        expect(resp, 'HTTP response').to.exist();
        done();
      });
    });

    lab.test('takes undefined as offset since query strings are considered optional', (done) => {
      scope.get('/test-org/workflows')
        .reply(200, {});

      workflows.getWorkflows('test-org', undefined, (err, body, resp) => {
        if (err) return done(err);
        expect(resp, 'HTTP response').to.exist();
        done();
      });
    });
  });
});
