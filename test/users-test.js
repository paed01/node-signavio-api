'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');

const Users = require('../.').User;
const users = new Users({
  authorization: 'token'
});

lab.experiment('User', () => {
  const scope = nock(Users.apiDoc.basePath);

  lab.before((done) => {
    nock.disableNetConnect();
    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('#createLogin', () => {
    lab.after((done) => {
      scope.done();
      done();
    });

    lab.test('takes providerKey as argument', (done) => {
      scope
        .post('/login/provider-key-1')
        .reply(200, 'OK');

      users.createLogin('provider-key-1', {
        token: users.options.token
      }, done);
    });

    lab.test('does not require authentication token in header', (done) => {
      scope
        .post('/login/provider-key-2')
        .reply(200, 'OK');

      let userNoToken = new Users();
      userNoToken.createLogin('provider-key-2', {
        token: users.options.token
      }, done);
    });
  });

  lab.experiment('#createUsersLogin', () => {
    lab.after((done) => {
      scope.done();
      done();
    });

    lab.test('takes providerKey as argument', (done) => {
      scope
        .post('/users/login')
        .reply(200, 'OK');

      users.createUsersLogin({
        emailAddress: 'test@truntail.local',
        password: 'supers3cret'
      }, done);
    });

    lab.test('does not require authentication token in header', (done) => {
      scope
        .post('/users/login')
        .reply(200, 'OK');

      let userNoToken = new Users();
      userNoToken.createUsersLogin({
        emailAddress: 'test@truntail.local',
        password: 'supers3cret'
      }, done);
    });
  });

  lab.experiment('#login', () => {
    lab.after((done) => {
      scope.done();
      done();
    });

    lab.test('takes username and password as argument', (done) => {
      scope
        .post('/users/login')
        .reply(200, {
          token: 'OK'
        });

      users.login('test@truntail.local', 'supers3cret', done);
    });

    lab.test('does not require authentication token in header', (done) => {
      scope
        .post('/users/login')
        .reply(200, {
          token: 'OK'
        });

      let userNoToken = new Users();
      userNoToken.login('test@truntail.local', 'supers3cret', done);
    });

    lab.test('takes additional arguments', (done) => {
      scope
        .post('/users/login')
        .reply(200, {
          token: 'OK'
        });

      let userNoToken = new Users();
      userNoToken.login('test@truntail.local', 'supers3cret', {
        organizationKey: 'truntail'
      }, done);
    });

    lab.test('takes empty additional arguments', (done) => {
      scope
        .post('/users/login')
        .reply(200, {
          token: 'OK'
        });

      let userNoToken = new Users();
      userNoToken.login('test@truntail.local', 'supers3cret', {}, done);
    });

    lab.test('emits authorized event', (done) => {
      scope
        .post('/users/login')
        .reply(200, {
          token: 'OK'
        });

      let userNoToken = new Users();
      userNoToken.once('authorized', () => {
        done();
      });
      userNoToken.login('test@truntail.local', 'supers3cret', {
        organizationKey: 'truntail'
      }, () => {});
    });

    lab.test('returns error in callback if unsuccessfull', (done) => {
      scope
        .post('/users/login')
        .reply(404, {
          message: 'Not found'
        });

      let userNoToken = new Users();
      userNoToken.login('test@truntail.local', 'supers3cret', {
        organizationKey: 'truntail'
      }, (err, body, resp) => {
        expect(err).to.be.instanceof(Error);
        expect(resp, 'HTTP response').to.exist();
        expect(resp.statusCode).to.equal(404);
        done();
      });
    });
  });
});
