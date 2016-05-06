'use strict';

const async = require('async');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;
const EventEmitter = require('events').EventEmitter;
const nock = require('nock');
const Workflow = require('../.').Workflow;
const Tasks = require('../.').Task;

lab.experiment('Authorization', () => {
  const scope = nock(Workflow.apiDoc.basePath);

  lab.before((done) => {
    nock.disableNetConnect();
    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('Expired token', () => {

    lab.test('Returns 401 in response', (done) => {
      const instance = new Workflow({
        authorization: 'token'
      });

      scope.get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error, /missing credentials/i);
        scope.done();
        done();
      });
    });

    lab.test('Issues new token if username and password are supplied', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .reply(200, {
          token: 'new-token'
        })
        .get('/test-org/workflows')
        .matchHeader('authorization', 'new-token')
        .reply(200, []);

      instance.getWorkflows('test-org', (err, body, res) => {
        if (err) return done(err);
        scope.done();
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    lab.test('Saves new token to instance', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .reply(200, {
          token: 'newer-token'
        })
        .get('/test-org/workflows')
        .matchHeader('authorization', 'newer-token')
        .reply(200, []);

      instance.getWorkflows('test-org', (err, body, res) => {
        if (err) return done(err);
        scope.done();
        expect(res.statusCode).to.equal(200);
        expect(instance.defaults.authorization).to.equal('newer-token');
        expect(instance.options.authorization).to.equal('newer-token');
        done();
      });
    });

    lab.test('Responds with 401 error if wrong username and password are supplied', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope.get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .reply(401, {
          message: 'Unauthorized'
        });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error, /401/i);
        scope.done();
        done();
      });
    });

    lab.test('Repeated unauthorized calls only calls login once', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .times(4)
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .delay(200)
        .reply(200, {
          token: 'repeat-new-token'
        })
        .get('/test-org/workflows')
        .matchHeader('authorization', 'repeat-new-token')
        .times(4)
        .reply(200, []);

      async.times(4, (n, next) => {
        instance.getWorkflows('test-org', next);
      }, (err) => {
        if (err) return done(err);
        scope.done();
        done();
      });
    });

    lab.test('Repeated unauthorized calls with different modules only calls login once', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      const tasks = new Tasks({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .get('/test-org/tasks/1')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .delay(200)
        .reply(200, {
          token: 'module-new-token'
        })
        .get('/test-org/workflows')
        .times(2)
        .reply(200, [])
        .get('/test-org/tasks/1')
        .times(2)
        .reply(200, {
          id: 'unique-id'
        });

      async.times(4, (n, next) => {
        if (n % 2) return instance.getWorkflows('test-org', next);
        return tasks.getTask('test-org', '1', next);
      }, (err) => {
        if (err) return done(err);
        scope.done();

        expect(instance.defaults.authorization, 'processes token').to.equal('module-new-token');
        expect(tasks.defaults.authorization, 'tasks token').to.equal('module-new-token');

        done();
      });
    });

    lab.test('Repeated unauthorized calls with different users only calls login once per user', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      const tasks = new Tasks({
        authorization: 'token',
        credentials: {
          username: 'signavio-admin',
          password: '@dmin-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows/wf1')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .get('/test-org/tasks/t1')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login').times(2)
        .delay(200)
        .reply(200, (uri, requestBody, cb) => {
          if (!requestBody) {
            return cb(null, [401, JSON.stringify({
              message: 'No credentials'
            })]);
          }

          const respBody = {
            token: requestBody.emailAddress === 'signavio-user' ? 'process-new-token' : 'tasks-new-token'
          };

          return cb(null, [200, JSON.stringify(respBody)]);
        })
        .get('/test-org/workflows/wf1')
        .times(2)
        .reply(200, {})
        .get('/test-org/tasks/t1')
        .times(2)
        .reply(200, {});

      async.times(4, (n, next) => {
        if (n % 2) return instance.getWorkflow('test-org', 'wf1', next);
        return tasks.getTask('test-org', 't1', next);
      }, (err) => {
        if (err) return done(err);
        scope.done();

        expect(instance.defaults.authorization, 'processes token').to.equal('process-new-token');
        expect(tasks.defaults.authorization, 'tasks token').to.equal('tasks-new-token');

        done();
      });
    });

    lab.test('New login emits authorized event once per user', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      const tasks = new Tasks({
        authorization: 'token',
        credentials: {
          username: 'signavio-admin',
          password: '@dmin-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .get('/test-org/tasks/1')
        .times(2)
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login').times(2)
        .delay(200)
        .reply((uri, requestBody, cb) => {
          if (!requestBody) {
            return cb(null, [401, JSON.stringify({
              message: 'No credentials'
            })]);
          }

          const respBody = {
            token: requestBody.emailAddress === 'signavio-user' ? 'process-event-token' : 'tasks-event-token'
          };

          return cb(null, [200, JSON.stringify(respBody)]);
        })
        .get('/test-org/workflows')
        .times(2)
        .reply(200, [])
        .get('/test-org/tasks/1')
        .times(2)
        .reply(200, {
          id: 'unique-id'
        });

      const tokens = [];
      const pushToken = (user) => {
        tokens.push(user);
      };
      instance.on('authorized', pushToken);
      tasks.on('authorized', pushToken);

      async.times(4, (n, next) => {
        if (n % 2) return instance.getWorkflows('test-org', next);
        return tasks.getTask('test-org', '1', next);
      }, (err) => {
        if (err) return done(err);
        scope.done();

        instance.removeListener('authorized', pushToken);
        tasks.removeListener('authorized', pushToken);

        expect(instance.defaults.authorization, 'processes token').to.equal('process-event-token');
        expect(tasks.defaults.authorization, 'tasks token').to.equal('tasks-event-token');

        expect(tokens, 'authorized events').to.have.length(4);

        done();
      });
    });

    lab.test('Login error returns error in callback', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .get('/test-org/workflows')
        .times(4)
        .reply(401, {
          message: 'Unauthorized'
        });

      async.times(4, (n, next) => {
        instance.getWorkflows('test-org', next);
      }, (err) => {
        expect(err).to.exist();
        scope.done();
        done();
      });
    });

    lab.test('return error in callback if body is missing from login call', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope.get('/test-org/workflows')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .delay(200)
        .reply(200);

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('No authorization token');
        scope.done();
        done();
      });
    });

    lab.test('return error in callback if body.token is missing from login call', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope.get('/test-org/workflows')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .reply(200, {});

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('No authorization token');
        scope.done();
        done();
      });
    });

    lab.test('sub-sequent calls use the same token', (done) => {
      const instance = new Workflow({
        authorization: 'token',
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope.get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        })
        .post('/users/login')
        .reply(200, {
          token: 'brand-new-token'
        })
        .get('/test-org/workflows')
        .matchHeader('authorization', 'brand-new-token')
        .reply(200, {})
        .get('/test-org/workflows')
        .matchHeader('authorization', 'brand-new-token')
        .reply(200, {});

      instance.getWorkflows('test-org', (err1) => {
        if (err1) return done(err1);
        instance.getWorkflows('test-org', (err2) => {
          if (err2) return done(err2);
          scope.done();
          done();
        });
      });
    });

  });

  lab.experiment('No default authorization token', () => {

    lab.test('First call is login', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        }
      });

      scope
        .post('/users/login')
        .reply(200, {
          token: 'brand-new-token'
        })
        .get('/no-default-org/workflows')
        .times(4)
        .reply(200, []);

      async.times(4, (n, next) => {
        instance.getWorkflows('no-default-org', next);
      }, (err) => {
        if (err) return done(err);
        scope.done();
        done(err);
      });
    });

    lab.test('instance without credentials returns error', (done) => {
      const instance = new Workflow();
      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('Missing credentials');
        done();
      });
    });

  });

  lab.experiment('Custom user instance', () => {

    lab.test('not inherited by EventEmitter works to', (done) => {
      scope
        .get('/test-org/workflows')
        .matchHeader('authorization', 'custom-token')
        .reply(200, []);

      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: {
          login: (u, p, callback) => {
            callback(null, {
              token: 'custom-token'
            }, {
              statusCode: 200
            });
          }
        }
      });

      instance.getWorkflows('test-org', (err) => {
        if (err) return done(err);
        scope.done();
        done();
      });
    });

    lab.test('Custom login return without body returns error', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: {
          login: (u, p, callback) => {
            callback(null, null, {
              statusCode: 200
            });
          }
        }
      });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('No authorization token');
        scope.done();
        done();
      });
    });

    lab.test('Custom login return without body.token returns error', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: {
          login: (u, p, callback) => {
            callback(null, null, {
              statusCode: 200
            }, {});
          }
        }
      });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('No authorization token');
        scope.done();
        done();
      });
    });

    lab.test('Custom login with statusCode 401 returns error', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: {
          login: (u, p, callback) => {
            callback(null, null, {
              statusCode: 401
            }, {});
          }
        }
      });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('Login failed with 401');
        scope.done();
        done();
      });
    });

    lab.test('Custom login error returns error', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: {
          login: (u, p, callback) => {
            callback(new Error('Custom error'));
          }
        }
      });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.equal('Custom error');
        done();
      });
    });

    lab.test('Custom login inherited from EventEmitter emits authorized', (done) => {
      const users = new EventEmitter();
      users.login = (u, p, callback) => {
        return callback(null, {
          token: 'emit-token'
        }, {
          statusCode: 200
        });
      };

      scope
        .get('/custom-login-20-org/workflows')
        .reply(200, []);

      const instance = new Workflow({
        credentials: {
          username: 'signavio-user',
          password: 'signavio-passw0rd'
        },
        users: users
      });

      instance.once('authorized', () => {
        done();
      });

      instance.getWorkflows('custom-login-20-org', (err) => {
        if (err) return done(err);
        scope.done();
      });
    });
  });

  lab.experiment('option #onUnauthorized', () => {

    lab.test('makes call with callback token', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, callback) => {
          return callback(null, 'token');
        }
      });

      scope.get('/onunauthorized-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(200, {});

      instance.getWorkflows('onunauthorized-org', (err, body, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        scope.done();
        done();
      });
    });

    lab.test('has access to options.credentials', (done) => {
      const instance = new Workflow({
        credentials: {
          username: 'me@example.com'
        },
        onUnauthorized: function(opArgs, callback) {
          return callback(null, this.options.credentials.username);
        }
      });

      scope.get('/test-org/workflows')
        .matchHeader('authorization', 'me@example.com')
        .reply(200, {});

      instance.getWorkflows('test-org', (err, body, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        scope.done();
        done();
      });
    });

    lab.test('returns error in callback', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, callback) => {
          return callback(new Error('Custom error'));
        }
      });

      const ids = ['onunauthorized', 'err', 'token'];

      instance.getWorkflows('test-org', ids, (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.match(/custom error/i);
        done();
      });
    });

    lab.test('returns error in callback if no token is returned', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, callback) => {
          return callback();
        }
      });

      instance.getWorkflows('test-org', (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.match(/missing authorization token/i);
        done();
      });
    });

    lab.test('returns error in callback if token not a string', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, callback) => {
          return callback(null, {});
        }
      });

      const ids = ['onunauthorized', 'object', 'token'];

      instance.getWorkflows('test-org', ids, (err) => {
        expect(err).to.be.instanceof(Error);
        expect(err.message).to.match(/missing authorization token/i);
        done();
      });
    });

    lab.test('returns 401 if token has expired', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, callback) => {
          return callback(null, 'token');
        }
      });

      scope.get('/test-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(401, {
          message: 'Unauthorized'
        });

      instance.getWorkflows('test-org', (err, body, res) => {
        scope.done();
        expect(err).to.be.instanceof(Error);
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    lab.test('requests with token specified in callback', (done) => {
      const instance = new Workflow({
        onUnauthorized: (opArgs, next) => {
          if (opArgs.organizationKey === 'test-org') return next(null, 'test-org-token');
          return next(null, 'token');
        }
      });

      scope
        .get('/test-org/workflows')
        .matchHeader('authorization', 'test-org-token')
        .reply(200, {})
        .get('/other-org/workflows')
        .matchHeader('authorization', 'token')
        .reply(200, {});

      instance.getWorkflows('test-org', (err, body, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        instance.getWorkflows('other-org', (err2, body2, res2) => {
          if (err2) return done(err2);
          scope.done();
          expect(res2.statusCode).to.equal(200);
          done();
        });
      });
    });

  });
});
