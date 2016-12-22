'use strict';

const debug = require('debug');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;
const nock = require('nock');

const debugEnv = process.env.DEBUG || false;

lab.experiment('Logging', () => {
  lab.before((done) => {
    nock.disableNetConnect();
    done();
  });
  lab.after((done) => {
    debug.disable();
    if (debugEnv) {
      debug.enable(debugEnv);
    }
    delete require.cache[require.resolve('debug')];
    nock.cleanAll();
    done();
  });

  lab.test('outputs debug information to options log function', (done) => {
    const Generator = require('../lib/generator');
    const template = {
      basePath: 'http://api.example.com',
      apis: [{
        path: '/{organizationKey}/processes',
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

    nock(template.basePath).get('/test-org/processes').reply(200);

    const msgs = [];
    const Mock = Generator('logging-test', template, {
      log: function(msg) {
        msgs.push(msg);
      }
    });

    debug.enable('signavio-api:logging-test*');
    const mock = new Mock();

    mock.getProcesses('test-org', () => {
      expect(msgs.length).to.be.above(1, 'No messages');
      done();
    });
  });

  lab.test('outputs debug information to instance options log function', (done) => {
    const Generator = require('../lib/generator');
    const template = {
      basePath: 'http://api.example.com',
      apis: [{
        path: '/{organizationKey}/processes',
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

    nock(template.basePath).get('/test-org/processes').reply(200);

    const msgs = [];
    const Mock = Generator('logging-test-2', template);

    debug.enable('signavio-api:logging-test-2*');
    const mock = new Mock({
      log: function(msg) {
        msgs.push(msg);
      }
    });

    mock.getProcesses('test-org', () => {
      expect(msgs.length).to.be.above(1, 'No messages');
      done();
    });
  });
});
