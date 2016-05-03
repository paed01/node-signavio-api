'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');

const Generator = require('../lib/generator');

nock.disableNetConnect();

lab.experiment('proxy', () => {
  let Mock, scope;

  lab.before((done) => {
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

    scope = nock(template.basePath);
    Mock = Generator('ProxyMock', template);
    done();
  });

  lab.test('proxies the request with authorization', (done) => {
    let mock = new Mock({
      authorization: 'auth-token'
    });
    scope
      .get('/testing-proxy/test-org/status')
      .matchHeader('authorization', 'auth-token')
      .reply(200);

    mock.proxy({
      method: 'GET',
      path: '/testing-proxy/test-org/status'
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(200);
      scope.done();
      done();
    });
  });

  lab.test('proxies the request to uri if defined', (done) => {
    let mock = new Mock({
      authorization: 'auth-token'
    });
    scope
      .get('/testing-proxy/test-org/status')
      .matchHeader('authorization', 'auth-token')
      .reply(200);

    mock.proxy({
      method: 'GET',
      uri: mock.options.basePath + '/testing-proxy/test-org/status'
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(200);
      scope.done();
      done();
    });
  });

  lab.test('HTTP method GET is default', (done) => {
    let mock = new Mock({
      authorization: 'auth-token'
    });
    scope
      .get('/testing-proxy/test-org/status')
      .matchHeader('authorization', 'auth-token')
      .reply(200);

    mock.proxy({
      path: '/testing-proxy/test-org/status'
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(200);
      scope.done();
      done();
    });
  });

  lab.test('HTTP method POST without body works', (done) => {
    let mock = new Mock({
      authorization: 'auth-token'
    });
    scope
      .post('/testing-proxy/test-org/status')
      .matchHeader('authorization', 'auth-token')
      .reply(200);

    mock.proxy({
      method: 'POST',
      path: '/testing-proxy/test-org/status'
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(200);
      scope.done();
      done();
    });
  });

  lab.test('returns error in callback', (done) => {
    let mock = new Mock({
      authorization: 'auth-token'
    });

    mock.proxy({
      uri: 'not-a-valid-uri'
    }, (err) => {
      expect(err).to.exist();
      done();
    });
  });

  lab.test('proxies the request without authorization if not defined', (done) => {
    let mock = new Mock();
    scope
      .put('/testing-proxy/test-org/without-auth')
      .reply(201);

    mock.proxy({
      method: 'PUT',
      path: '/testing-proxy/test-org/without-auth'
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(201);
      scope.done();
      done();
    });
  });

  lab.test('re-authenticates if call was unauthorized', (done) => {
    let mock = new Mock({
      users: {
        login: (u, p, cb) => {
          cb(null, {
            token: 'new-token'
          }, {
            statusCode: 200
          });
        }
      },
      credentials: {
        username: 'signavio-user',
        password: 'signavio-passw0rd'
      }
    });
    let pathname = '/testing-proxy/test-org/re-auth';
    scope
      .get(pathname)
      .reply(401, {
        message: 'Unauthorized'
      })
      .get(pathname)
      .matchHeader('authorization', 'new-token')
      .reply(200);

    mock.proxy({
      method: 'GET',
      path: pathname,
      authorization: true
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(200);
      scope.done();
      done();
    });
  });

  lab.test('returns error in callback authorization request failed', (done) => {
    let mock = new Mock({
      users: {
        login: (u, p, cb) => {
          return cb(new Error('Nope'));
        }
      },
      credentials: {
        username: 'signavio-user',
        password: 'signavio-passw0rd'
      }
    });

    scope
      .get('/proxy-me')
      .reply(401, {
        message: 'Unauthorized'
      });

    mock.proxy({
      path: '/proxy-me',
      authorization: true
    }, (err) => {
      expect(err).to.exist();
      done();
    });
  });

  lab.test('returns unauthorized if proxy authorization option is false', (done) => {
    let mock = new Mock({
      credentials: {
        username: 'signavio-user',
        password: 'signavio-passw0rd'
      }
    });

    scope
      .get('/proxy-me')
      .reply(401, {
        message: 'Unauthorized'
      });

    mock.proxy({
      path: '/proxy-me',
      authorization: false
    }, (err, body, resp) => {
      if (err) return done(err);
      expect(resp.statusCode).to.equal(401);
      scope.done();
      done();
    });
  });
});
