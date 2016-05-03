'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
// const Code = require('code');
// const expect = Code.expect;
const nock = require('nock');

const Cases = require('../.').Case;
const cases = new Cases({
  authorization: 'token'
});

lab.experiment('Cases', () => {
  let scope;
  lab.before((done) => {
    nock.disableNetConnect();

    scope = nock(Cases.apiDoc.basePath);
    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('#close', () => {
    lab.before((done) => {
      scope
        .post('/test-org/cases/case-1/close')
        .reply(200);
      done();
    });

    lab.test('closes case', (done) => {
      cases.close('test-org', 'case-1', (err) => {
        if (err) return done(err);
        scope.done();
        done();
      });
    });
  });

  lab.experiment('#cancel', () => {
    lab.before((done) => {
      scope
        .post('/test-org/cases/case-1/cancel')
        .reply(200);
      done();
    });

    lab.test('cancel case', (done) => {
      cases.cancel('test-org', 'case-1', (err) => {
        if (err) return done(err);
        scope.done();
        done();
      });
    });
  });

});
