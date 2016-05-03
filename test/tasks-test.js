'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');

const Generator = require('../lib/generator');

const Tasks = require('../.').Task;
const tasks = new Tasks({
  authorization: 'token'
});

lab.experiment('Tasks', () => {
  lab.before((done) => {
    nock.disableNetConnect();
    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('#getTask', () => {
    lab.before((done) => {
      nock(Tasks.apiDoc.basePath)
        .get('/test-org/tasks/1').times(2)
        .reply(200, {
          id: 'unique-id'
        });
      done();
    });

    lab.test('takes organizationKey and taskId as argument', (done) => {
      tasks.getTask('test-org', '1', done);
    });
    lab.test('returns error in callback if taskId is not a string', (done) => {
      tasks.getTask('test-org', {}, (err) => {
        expect(err).to.exist();
        done();
      });
    });
    lab.test('returns error in callback if authorization token is missing', (done) => {
      let newTasks = new Tasks();
      newTasks.getTask('test-org', '1', (err) => {
        expect(err).to.exist();
        done();
      });
    });

    lab.test('returns body in callback that valides output schema', (done) => {
      tasks.getTask('test-org', '1', (err, body, resp) => {
        expect(err).to.not.exist();
        expect(body).to.be.an.object();
        expect(resp).to.be.an.object();
        Tasks.schemas.getTask.output.validate(body, done);
      });
    });
  });

  lab.experiment('#createTasks', () => {
    lab.before((done) => {
      nock(Tasks.apiDoc.basePath)
        .post('/test-org/tasks')
        .reply(200, 'OK');
      done();
    });

    lab.test('takes organizationKey and task as argument', (done) => {
      tasks.createTasks('test-org', {
        workflowId: '1'
      }, done);
    });

    lab.test('returns error in callback if task.canceled is not a boolean', (done) => {
      tasks.createTasks('test-org', {
        canceled: 'nej'
      }, (err) => {
        expect(err).to.exist();
        done();
      });
    });
  });

  lab.experiment('#updateTaskFormField', () => {
    lab.test('FormInstanceField schema complete', (done) => {
      let input = {
        id: '23',
        value: 'new name',
        type: {}
      };

      Tasks.models.FormInstanceField.validate(input, done);
    });

    lab.test('FormInstanceField schema value only', (done) => {
      let input = {
        value: 'new name'
      };

      Tasks.models.FormInstanceField.validate(input, done);
    });

    lab.test('takes organizationKey, taskId, and fieldId as argument', (done) => {
      nock(Tasks.apiDoc.basePath)
        .put('/test-org/tasks/1/form/fields/23')
        .reply(200, {
          form: {
            fields: [{
              id: '23',
              name: 'Name',
              value: 'my name',
              type: {}
            }]
          }
        });

      tasks.updateTaskFormField('test-org', '1', '23', {
        id: '23',
        value: 'new name',
        type: {}
      }, done);
    });
  });

  lab.experiment('#getFormFieldByName', () => {
    let taskData = {
      form: {
        fields: [{
          id: '23',
          name: 'Name',
          value: 'my name',
          type: {}
        }]
      }
    };

    lab.test('when argument is TaskXL it returns field', (done) => {
      let f = tasks.getFormFieldByName(taskData, 'Name');
      expect(f).to.exist();
      expect(f.id).to.equal('23');
      done();
    });

    lab.test('returns null if field name not found', (done) => {
      let f = tasks.getFormFieldByName(taskData, 'no');
      expect(f).to.equal(null);
      done();
    });

    lab.test('returns null if task.form is undefined', (done) => {
      let f = tasks.getFormFieldByName({}, 'no');
      expect(f).to.equal(null);
      done();
    });
  });

  lab.experiment('override', () => {
    let taskTemplate = {
      apis: [{
        path: '/{organizationKey}/tasks/{taskId}/complete',
        operations: [{
          method: 'POST',
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

    lab.test('/{organizationKey}/tasks/{taskId}/complete is named completeTask', (done) => {
      let Task = Generator('Task', taskTemplate);
      expect(Task.prototype.completeTask).to.exist();
      done();
    });
  });

  lab.experiment('#completeTask', () => {
    lab.test('accepts array of form instance fields', (done) => {
      nock(Tasks.apiDoc.basePath)
        .post('/test-org-1/tasks/task-1/complete')
        .reply(200, {});

      tasks.completeTask('test-org-1', 'task-1', [{
        id: '11',
        value: 'test'
      }], done);
    });

    lab.test('accepts empty body properties', (done) => {
      nock(Tasks.apiDoc.basePath)
        .post('/test-org-1/tasks/task-1/complete')
        .reply(200, {});

      tasks.completeTask('test-org-1', 'task-1', [{
        description: '',
        id: '11',
        value: 'test'
      }], done);
    });

    lab.test('accepts body properties not defined', (done) => {
      nock(Tasks.apiDoc.basePath)
        .post('/test-org-1/tasks/task-1/complete')
        .reply(200, {});

      tasks.completeTask('test-org-1', 'task-1', [{
        description: '',
        id: '11',
        value: 'test',
        additionalProp: []
      }], done);
    });
  });
});
