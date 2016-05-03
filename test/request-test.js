/* eslint no-new:0 */
'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');

const Generator = require('../lib/generator');

nock.disableNetConnect();

lab.experiment('Requests', () => {
  lab.test('GET that returns 400 with non-object returns error with 400', (done) => {
    let template = {
      basePath: 'http://testapi',
      apis: [{
        path: '/{organizationKey}/status',
        operations: [{
          method: 'GET',
          parameters: [{
            name: 'organizationKey',
            paramType: 'path',
            dataType: 'string'
          }]
        }]
      }],
      models: {}
    };

    nock(template.basePath)
      .get('/test-org/status')
      .reply(401, {
        message: 'Unauthorized'
      }, {
        'Content-Type': 'application/json'
      });

    let Mock = Generator('Mock', template);
    let mock = new Mock();
    mock.getStatus('test-org', (err, body, resp) => {
      expect(err).to.exist();
      expect(err.message).to.contain('Unauthorized');
      expect(resp.statusCode).to.equal(401);
      done();
    });
  });
});
