/* eslint no-new:0 */
'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');
const request = require('request');

const Generator = require('../lib/generator');

nock.disableNetConnect();

lab.experiment('Generator', () => {

  lab.experiment('#generate', () => {
    lab.test('returns Module', (done) => {
      let template = {
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
      let Mock = Generator('Mock', template);
      expect(Mock).to.be.a.function();
      expect(Mock.prototype).to.be.an.object();
      expect(Mock.prototype.getProcesses).to.be.an.function();
      done();
    });

    lab.test('returns Module with function applyDefaults', (done) => {
      let template = {
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
      let Mock = Generator('Mock', template);
      expect(Mock).to.be.a.function();
      expect(Mock.prototype).to.be.an.object();
      expect(Mock.prototype._applyDefaults).to.be.a.function();
      done();
    });

    lab.test('returns Module with function that contains input and output schema', (done) => {
      let template = {
        apis: [{
          path: '/{organizationKey}/processes',
          operations: [{
            method: 'GET',
            type: 'Simple',
            parameters: [{
              name: 'organizationKey',
              paramType: 'path',
              dataType: 'string'
            }]
          }]
        }],
        models: {
          Simple: {
            id: 'Simple',
            properties: {
              name: {
                type: 'string'
              }
            }
          }
        }
      };
      let Mock = Generator('Mock', template);
      expect(Mock.prototype.getProcesses).to.be.an.function();
      let mock = new Mock();

      expect(mock.getProcesses).to.be.a.function();
      expect(mock.getProcesses.schemas).to.be.an.object();
      expect(mock.getProcesses.schemas.input).to.be.an.object();
      expect(mock.getProcesses.schemas.output).to.be.an.object();
      done();
    });

    lab.test('returns Module without input if parameters are not passed', (done) => {
      let template = {
        apis: [{
          path: '/info',
          operations: [{
            method: 'GET'
          }]
        }],
        models: {}
      };
      let Mock = Generator('Mock', template);
      expect(Mock).to.be.a.function();
      expect(Mock.prototype).to.be.an.object();
      done();
    });


    lab.test('#_applyDefaults retrieves headers from ctor options', (done) => {
      let template = {
        apis: [{
          path: '/{organizationKey}/processes',
          operations: [{
            method: 'GET',
            parameters: [{
              name: 'Authorization',
              paramType: 'header',
              dataType: 'string'
            }, {
              name: 'organizationKey',
              paramType: 'path',
              dataType: 'string'
            }]
          }]
        }],
        models: {}
      };
      let Mock = Generator('Mock', template);
      let mock = new Mock({
        authorization: 'token'
      });

      let args = mock._applyDefaults({
        organizationKey: 'test'
      }, Mock.schemas.getProcesses.input);
      expect(args).to.include(['Authorization', 'organizationKey']);

      done();
    });

    lab.test('#_applyDefaults accepts header options in lowerCase', (done) => {
      let template = {
        apis: [{
          path: '/{organizationKey}/processes',
          operations: [{
            method: 'GET',
            parameters: [{
              name: 'Authorization',
              paramType: 'header',
              dataType: 'string'
            }, {
              name: 'organizationKey',
              paramType: 'path',
              dataType: 'string'
            }]
          }]
        }],
        models: {}
      };
      let Mock = Generator('Mock', template);
      let mock = new Mock();

      // Set deafults
      mock.defaults = {
        Authorization: 'token'
      };

      let args = mock._applyDefaults({
        organizationKey: 'test'
      }, Mock.schemas.getProcesses.input);

      expect(args).to.include(['Authorization', 'organizationKey']);
      done();
    });

    lab.experiment('function names', () => {

      lab.test('returns second endpoint part with capitalized letter', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes/{processId}/tasks',
            operations: [{
              method: 'GET',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }, {
                name: 'processId',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {}
        };
        let Mock = Generator('Mock', template);
        expect(Mock.prototype.getProcessTasks).to.be.an.function();
        done();
      });

      lab.test('endpoint with empty section part is ignored', (done) => {
        let template = {
          apis: [{
            path: '/bad//path',
            operations: [{
              method: 'GET',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }, {
                name: 'processId',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {}
        };
        let Mock = Generator('Mock', template);
        expect(Mock.prototype.getBadPath).to.be.an.function();
        done();
      });
    });

    lab.experiment('function arguments', () => {
      lab.test('ignores argument type if not a header, path, or body', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes/{processId}/tasks',
            operations: [{
              method: 'GET',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }, {
                name: 'processId',
                paramType: 'path',
                dataType: 'string'
              }, {
                name: 'obscureParm',
                paramType: 'ignored',
                dataType: 'string'
              }]
            }]
          }],
          models: {}
        };
        let Mock = Generator('Mock', template);
        let inputSchema = Mock.schemas.getProcessTasks.input.describe();

        expect(Object.keys(inputSchema.children).length).to.equal(3);
        expect(inputSchema.children).to.include(['organizationKey', 'processId', 'callback']);

        done();
      });
    });

    lab.experiment('Models', () => {

      lab.test('with properties returns Joi.object with children', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes',
            operations: [{
              method: 'GET',
              type: 'Simple',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {
            Simple: {
              id: 'Simple',
              properties: {
                name: {
                  type: 'string'
                }
              }
            }
          }
        };
        let Mock = Generator('Mock', template);
        expect(Mock.schemas.getProcesses.output.describe().children).to.be.an.object();
        done();
      });

      lab.test('with Authorization header returns schema with requiresAuthorization tag', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes',
            operations: [{
              method: 'GET',
              type: 'Simple',
              parameters: [{
                name: 'Authorization',
                paramType: 'header',
                dataType: 'string'
              }, {
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {
            Simple: {
              id: 'Simple',
              properties: {
                name: {
                  type: 'string'
                }
              }
            }
          }
        };
        let Mock = Generator('Mock', template);
        expect(Mock.schemas.getProcesses.output.describe().children).to.be.an.object();
        done();
      });

      lab.test('without properties returns Joi.object', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes',
            operations: [{
              method: 'GET',
              type: 'Empty',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {
            Empty: {
              id: 'Empty'
            }
          }
        };
        let Mock = Generator('Mock', template);
        expect(Mock.schemas.getProcesses.output).to.be.an.object();
        done();
      });

      lab.test('with undefined Joi sets type to any', (done) => {
        let template = {
          apis: [{
            path: '/{organizationKey}/processes',
            operations: [{
              method: 'GET',
              type: 'UnkownType',
              parameters: [{
                name: 'organizationKey',
                paramType: 'path',
                dataType: 'string'
              }]
            }]
          }],
          models: {
            UnkownType: {
              id: 'UnkownType',
              properties: {
                name: {
                  type: '_undefined-type'
                }
              }
            }
          }
        };

        let Mock = Generator('Mock', template);
        expect(Mock.schemas.getProcesses.output).to.be.an.object();
        expect(Mock.schemas.getProcesses.output.describe().children.name.type).to.equal('any');
        done();
      });

      lab.describe('array', () => {

        lab.test('item type is validated', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'List1',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              List1: {
                id: 'List1',
                properties: {
                  a: {
                    type: 'array',
                    items: {
                      $ref: 'string'
                    }
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);

          Mock.schemas.getProcesses.output.validate({
            a: ['test']
          }, done);
        });

        lab.test('with invalid item type returns error', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'List2',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              List2: {
                id: 'List2',
                properties: {
                  a: {
                    type: 'array',
                    items: {
                      $ref: 'string'
                    }
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);
          Mock.schemas.getProcesses.output.validate({
            a: [{}]
          }, (err) => {
            expect(err).to.exist();
            done();
          });
        });

        lab.test('without item type validates to any', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'List3',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              List3: {
                id: 'List3',
                properties: {
                  a: {
                    type: 'array'
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);
          Mock.schemas.getProcesses.output.validate({
            a: [{}]
          }, done);
        });

        lab.test('with complex item type validates', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'ComplexList1',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              Complex1: {
                id: 'Complex1',
                properties: {
                  b: {
                    type: 'Long'
                  }
                }
              },
              ComplexList1: {
                id: 'ComplexList1',
                properties: {
                  a: {
                    type: 'array',
                    items: {
                      $ref: 'Complex1'
                    }
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);
          Mock.schemas.getProcesses.output.validate({
            a: [{
              b: 1
            }]
          }, done);
        });

        lab.test('with complex item type validation returns error if incorrect', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'ComplexList1',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              Complex1: {
                id: 'Complex1',
                properties: {
                  b: {
                    type: 'Long'
                  }
                }
              },
              ComplexList1: {
                id: 'ComplexList1',
                properties: {
                  a: {
                    type: 'array',
                    items: {
                      $ref: 'Complex1'
                    }
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);
          Mock.schemas.getProcesses.output.validate({
            a: [{
              b: 'NaN'
            }]
          }, (err) => {
            expect(err).to.exist();
            done();
          });
        });

        lab.test('with circular complex item type validates any (TODO: not optimal)', (done) => {
          let template = {
            apis: [{
              path: '/{organizationKey}/processes',
              operations: [{
                method: 'GET',
                type: 'CircularList1',
                parameters: [{
                  name: 'organizationKey',
                  paramType: 'path',
                  dataType: 'string'
                }]
              }]
            }],
            models: {
              Complex2: {
                id: 'Complex2',
                properties: {
                  children: {
                    type: 'Complex2'
                  }
                }
              },
              CircularList1: {
                id: 'CircularList1',
                properties: {
                  a: {
                    type: 'array',
                    items: {
                      $ref: 'Complex2'
                    }
                  }
                }
              }
            }
          };
          let Mock = Generator('Mock', template);
          Mock.schemas.getProcesses.output.validate({
            a: [{
              children: [{}, () => {}]
            }]
          }, done);
        });

      });
    });

    lab.test('GET that returns non-object returns body un-altered', (done) => {
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
        .reply(200, 'OK');

      let Mock = Generator('Mock', template);
      let mock = new Mock();
      mock.getStatus('test-org', (err, body, resp) => {
        expect(err).to.not.exist();
        expect(body).to.be.a.string();
        expect(body).to.equal('OK');
        expect(resp).to.exist();
        done();
      });
    });

    lab.experiment('function callback response', () => {
      let Mock, template, scope;
      lab.before((done) => {
        template = {
          basePath: 'http://testapi',
          apis: [{
            path: '/{organizationKey}/test',
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
        Mock = Generator('Mock', template);
        scope = nock(template.basePath);
        done();
      });

      lab.test('operation without return type but responds with content-type application/json returns json as body', (done) => {
        let mock = new Mock();

        scope
          .get('/test-org/test')
          .reply(200, {
            test: true
          }, {
            'content-type': 'application/json'
          });

        mock.getTest('test-org', (err, body, resp) => {
          if (err) return done(err);
          expect(body).to.deep.equal({
            test: true
          });
          scope.done();
          done();
        });

      });

      lab.test('operation responds with content-type application/json but bad json returns error', (done) => {
        let mock = new Mock();

        scope
          .get('/test-org/test')
          .reply(200, 'OK', {
            'content-type': 'application/json'
          });

        mock.getTest('test-org', (err) => {
          expect(err).to.exist();
          scope.done();
          done();
        });
      });

      lab.test('operation failure returns error in callback', (done) => {
        let mock = new Mock();

        mock.getTest('test-org', (err) => {
          expect(err).to.exist();
          done();
        });
      });

      lab.test('operation failure returns error with message in callback', (done) => {
        let mock = new Mock();

        scope
          .get('/test-org/test')
          .reply(405, 'Bad request');

        mock.getTest('test-org', (err) => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal('Call to signavio-api failed with 405: Bad request');
          scope.done();
          done();
        });
      });

      lab.test('operation failure returns error with message in callback and the actual HTTP response', (done) => {
        let mock = new Mock();

        scope
          .get('/test-org/test')
          .reply(500, {
            message: 'Serfer failed'
          });

        mock.getTest('test-org', (err, body, resp) => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal('Serfer failed');

          expect(resp, 'HTTP response').to.exist();
          expect(resp.statusCode, 'HTTP response statusCode').to.equal(500);

          scope.done();
          done();
        });
      });

      lab.test('operation failure without message returns actual body', (done) => {
        let mock = new Mock();

        scope
          .get('/test-org/test')
          .reply(500);

        mock.getTest('test-org', (err, body, resp) => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal('Call to signavio-api failed with 500');

          expect(resp, 'HTTP response').to.exist();
          expect(resp.statusCode, 'HTTP response statusCode').to.equal(500);

          scope.done();
          done();
        });
      });
    });
  });

  lab.experiment('instance', () => {
    let Mock, template;
    lab.before((done) => {
      template = {
        basePath: 'http://testapi',
        apis: [{
          path: '/{organizationKey}/test',
          operations: [{
            method: 'GET',
            parameters: [{
              paramType: 'header',
              name: 'Authorization',
              description: 'The authentication token can be obtained from /users/login.',
              dataType: 'string',
              required: true
            }, {
              name: 'organizationKey',
              paramType: 'path',
              dataType: 'string'
            }]
          }]
        }, {
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

      Mock = Generator('Mock', template);
      done();
    });

    lab.experiment('#getUserInstance', () => {
      lab.test('throws if not overridden by module', (done) => {
        let mock = new Mock();

        expect(() => {
          mock.getUserInstance();
        }).to.throw('User interface is not loaded');

        done();
      });
    });

    lab.describe('#ctor options', () => {

      lab.experiment('#onUnauthorized', () => {

        lab.test('override instance function', (done) => {
          nock(template.basePath)
            .get('/test-org/test')
            .reply(401, 'OK');

          let mock = new Mock({
            authorization: 'token',
            credentials: {
              username: 'a',
              password: 'b'
            },
            users: {
              login: () => {}
            },
            onUnauthorized: (reqOpt, callback) => {
              done();
            }
          });

          mock.getTest('test-org', done);
        });
      });

      lab.describe('log', () => {

        lab.test('uses console if not defined', (done) => {
          /* eslint no-unused-vars:0 */
          let mock = new Mock({});
          // expect(mock.log).to.equal(console);
          done();
        });

        lab.test('sets log function on generated interface', (done) => {
          function log() {
            return 'weee';
          }
          let MockLog = Generator('Mock', template, {
            log: log
          });
          let mock = new MockLog();

          expect(mock._debug.log()).to.equal('weee');
          expect(mock._debugError.log()).to.equal('weee');
          done();
        });

        lab.test('can be passed to generated interface via options', (done) => {
          function log() {
            return 'true that';
          }

          let mock = new Mock({
            log: log
          });

          expect(mock._debug.log()).to.equal('true that');
          expect(mock._debugError.log()).to.equal('true that');
          done();
        });
      });

      lab.describe('users', () => {
        lab.test('takes options.users', (done) => {
          let users = {
            name: 'overridden users',
            login: () => {}
          };

          let mock = new Mock({
            users: users
          });
          expect(mock.getUserInstance(), 'getUserInstance').to.equal(users);
          done();
        });

        lab.test('throws if options.users is not an object', (done) => {
          expect(() => {
            new Mock({
              users: () => {}
            });
          }).to.throw(/must be an object/i);
          done();
        });

        lab.test('throws if options.users is missing login function', (done) => {
          let users = {};
          expect(() => {
            new Mock({
              users: users
            });
          }).to.throw(/login/i);
          done();
        });
      });

      lab.describe('baseRequest', () => {

        lab.test('can be passed to override request', (done) => {
          const scope = nock(template.basePath);
          scope
            .get('/test-org/status')
            .matchHeader('x-testing-signavio-api', 'yep')
            .reply(200, {});

          let baseRequest = request.defaults({
            headers: {
              'x-testing-signavio-api': 'yep'
            }
          });

          let mock = new Mock({
            authorization: 'token',
            baseRequest: baseRequest
          });

          mock.getStatus('test-org', (err, body, resp) => {
            if (err) return done(err);
            expect(resp.statusCode).to.equal(200);
            scope.done();
            done();
          });
        });

        lab.test('can be passed to override authorized request', (done) => {
          const scope = nock(template.basePath);
          scope
            .get('/test-org/test')
            .matchHeader('x-testing-signavio-api', 'yep')
            .matchHeader('authorization', 'token')
            .reply(200, {});

          let baseRequest = request.defaults({
            headers: {
              'x-testing-signavio-api': 'yep'
            }
          });

          let mock = new Mock({
            authorization: 'token',
            baseRequest: baseRequest
          });

          mock.getTest('test-org', (err, body, resp) => {
            if (err) return done(err);
            expect(resp.statusCode).to.equal(200);
            scope.done();
            done();
          });
        });

      });
    });

    lab.experiment('operation', () => {

      lab.test('throws if no arguments are passed to function', (done) => {
        let mock = new Mock();

        function fn() {
          mock.getTest();
        }
        expect(fn).to.throw(Error, 'getTest requires callback');
        done();
      });

    });
  });
});
