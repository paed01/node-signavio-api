node signavio workflow api
==========================

[![Build Status](https://secure.travis-ci.org/paed01/node-signavio-api.png)](http://travis-ci.org/paed01/node-signavio-api)[![Coverage Status](https://coveralls.io/repos/paed01/node-signavio-api/badge.svg?branch=master)](https://coveralls.io/r/paed01/node-signavio-api?branch=master)

Unofficial node [signavio][1] workflow [api][2] wrapper.

**Table of contents**
- [Interface](#interface)
  - [Constructor](#constructor)
  - [Events](#events)
  - [Cases](#cases)
    - [Initiate new case with form trigger](#initiate-new-case-with-form-trigger)
  - [Tasks](#tasks)
    - [`#getFormFieldByName`](#getformfieldbyname)
  - [Users](#users)
    - [`#login`](#login)
- [API Generator](#api-generator)
  - [Naming of operations](#naming-of-operations)
  - [Operation callback](#operation-callback)
- [Debug](#debug)
- [API](/docs/API.md)
- [Changelog](/CHANGELOG.md)

# Introduction

The module is auto-generated from the signavio documentation [json-endpoint][3].

# Usage

Some examples of haow to use the API-wrapper.

## Initiate new case with form trigger

First off you need to get the start form to trigger, then initiate a new case with the form fields:

```javascript
const SignavioApi = require('signavio-api');
const options = {
  credentials: {
    username: 'me@example.com',
    password: 'sup3rs3cr3t'
  }
};

const workflows = new SignavioApi.Workflow(options);
const cases = new SignavioApi.Case(options);

const organisationKey = '<organisationKey>';
const workflowId = '<workflow-id>';

// Get workflow start form
workflows.getProcessStartForm(organisationKey, workflowId, (err, startForm, resp) => {
  console.log(err, startForm, resp.statusCode);

  // Fill the form with values - example
  startForm.fields[0].value = 'start-value-1';
  startForm.fields[1].value = 'start-value-2';

  const startProcessPayload = {
    triggerInstance: {
      sourceWorkflowId: workflowId,
      data: {
        formInstance: {
          value: startForm
        }
      }
    }
  };

  // Initiate new process
  cases.createCases(startProcessPayload, (err, newCase, resp) => {
    console.log(err, newCase, resp.statusCode);
  });

});
```

## Complete next task

Get pending tasks from the previously initiated case. Set form field values, if any. Call `completeTask`.

```javascript
const SignavioApi = require('signavio-api');
const options = {
  credentials: {
    username: 'me@example.com',
    password: 'sup3rs3cr3t'
  }
};

const cases = new SignavioApi.Case(options);
const tasks = new SignavioApi.Task(options);

const organisationKey = '<organisationKey>';
// Case Id from when initiating new case
const caseId = '<case-id>';

// Get pending tasks
cases.getCaseTasks(organizationKey, caseId, false, (err, pendingTasks, resp) => {
  if (err) return console.log(err);

  const nextTasks = pendingTasks.filter((t) => {
    return !t.completed;
  });
  if (!nextTasks.length) {
    console.log(`case ${caseId} has no incomplete tasks`);
    return;
  }

  const nextTask = nextTasks[0];

  if (nextTask.hasForm) {
    // Set task field values
    const field1 = tasks.getFormFieldByName(nextTask, 'my-field-name');
    field1.value = 'OK';
  }

  tasks.completeTask(organizationKey, nextTask.id, nextTask.form.fields || [], (err, result, resp) => {
    console.log(err, result, resp);
  });
});
```

# Interface

All [Api-endpoints](/API.md) are represented.

## Constructor

The interface constructor takes an object with options.

- `options`: Object with the following properties:
  - `authorization`: optional string - Authorization token, will be set as Authorization http header
  - `credentials`: optional object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: optional string - signavio-api base url, defaults to api endpoint documentation basePath
  - `baseRequest`: optional - Default [request][4]
  - `log`: optional - Logging function, defaults to console.log
  - `users`: optional - [Users](#users) instance
  - [`onUnauthorized`](#onunauthorized-option): optional function that will be called when an unauthorized call is made

Example:

```javascript
const request = require('request');

const Api = require('signavio-api');
const Users = require('signavio-api').User;

const baseRequest = request.defaults({'proxy':'http://localproxy.com'});

const workflows = new Api.Workflow({
  authorization: 'token',
  credentials: {
    username: 'me@example.com',
    password: 'sup3rs3cr3t'
  },
  basePath: 'http://signavio-cluster.local/api'
  baseRequest: baseRequest
});
```

### `onUnauthorized` option

Optional function used to get user authorization token. The function is called when an unauthorized call was made. If a token is returned in callback the operation will be called with then new authorization token. The function is bound to the module instance on execution, i.e. `this` can be used to access module options.

The function signature is:
- `operationArguments`: The actual operation arguments
- `callback`:
  - `error`: Error if any
  - `token`: The new authorization token to use

Example:

```javascript
const db = require('database'); // Arbitrary database module

function onUnauthorized(operationArgs, callback) {
  db.findOne({
    username: this.options.credentials.username
  }).exec((err, doc) => {
    if (err) return callback(err);

    // Return token in callback
    return callback(null, doc.token);
  });
}

let workflows = new Api.Workflow({
  onUnauthorized: onUnauthorized,
  credentials: {
    username: 'me@example.com'
  }
});
```

## `#getUserInstance`

A User instance is created with the same options as the module and this is the function to retrieve it.

Example usage:

```javascript
const Api = require('signavio-api');

function onUnauthorized(operationArgs, callback) {
  let users = this.getUserInstance();

  let loginOptions = {};
  if (operationArgs.organizationKey) loginOptions.organizationKey = operationArgs.organizationKey;

  users.login('me@example.com', 'sup3rs3cr3t', loginOptions, (err, result) => {
    // Return token in callback
    return callback(err, result && result.token);
  });
}

const workflows = new Api.Workflow({
  basePath: 'https://signavio.local/api'
});
```

## Events

All interfaces inherit from EventEmitter.

### `authorized`

The `authorized` event is emitted when a succesfull login was performed.

The listener function will get `username` and `authorization`-token.

```javascript
const Api = require('signavio-api');

let workflows = new Api.Workflow({
  credentials: {
    username: 'me@example.com',
    password: 'sup3rs3cr3t'
  }
});

workflows.on('authorized', (result) => {
  console.log('A good place to store new token', result.authorization, 'for', result.username);
});
```

## Tasks

```javascript
const Api = require('signavio-api');

const Tasks = Api.Task;
const tasks = new Tasks({
  authorization: 'token'
});

tasks.createTasks('test-org', { workflowId: '1' }, (err, body, resp) => {
  if (err) console.log(err);
});
```

### `#getFormFieldByName`

Utility function to get FormField by name from task data.

```javascript
const Api = require('signavio-api');

const Tasks = Api.Task;
const tasks = new Tasks({
  authorization: 'token'
});

tasks.getTask('test-org', '1', (err, resp, task1) => {
  if (err) return console.log(err);

  let field = task1.getFormFieldByName(task, 'myField');

  field.value = '123';

  tasks.updateTaskFormField('test-org', task1.id, field.id, field, (err) => {
    console.log('success?', !!!err);
  });
});
```

## Users

```javascript
const Api = require('signavio-api');

const Tasks = Api.Task;
const tasks = new Tasks({
  authorization: 'token',
  credentials: {
    username: 'me@example.com',
    password: 'sup3rs3cr3t'
  }
});

tasks.createTasks('test-org', { workflowId: '1' }, (err, body, resp) => {
  if (err) console.log(err);
});
```

### `#login`

Utility function to perform user login.

```javascript
const Api = require('signavio-api');
const users = new Api.User();

users.login('me@example.com', 'superse3cret', (err, body) => {
  console.log('new token', body.token);
});
```

# API Generator

Module functions are generated from the api-endpoints.

## Naming of operations

The name is composed of the http-operation and the api-endpoint.

|HTTP-verb |function prefix|
|----------|---------------|
| `GET`    | get           |
| `POST`   | create        |
| `PUT`    | update        |
| `DELETE` | delete        |

Examples:

To call `POST /{organizationKey}/tasks`:

```javascript
const Api = require('signavio-api');
const tasks = new Api.Task({authorization: 'token'});

let newTask = {};

tasks.createTasks(organizationKey, newTask, (err, body) => {
  console.log(err, body);
});
```

or `DELETE /{organizationKey}/workflows/{editorWorkflowId}`:

```javascript
const Api = require('signavio-api');
const workflows = new Api.Workflow({authorization: 'token'});

workflows.deleteWorkflow(organizationKey, workflowId, (err, body) => {
  console.log(err, body);
});
```

The plural ending is removed if the noun is immediately followed by a path parameter.

### Path parameters

The path parameters will build the method signature. They are considered required.

### Query parameters

The query parameters will also be appended to the method signature. All query parametes are considered optional in get-operations.

```javascript
const Api = require('signavio-api');
const workflows = new Api.Workflow({ authorization: 'token'});

workflows.getWorkflows('test-org', (err, body) => {
  console.log('This should work and result in', body);
});
```

If a body is expected, the query parameters must be defined. Since they are optional, a `null` value is accepted.

### Input Schemas

The operation schemas ([joi](https://github.com/hapijs/joi)) are stored with the module.

```javascript
const Api = require('signavio-api');
const inputSchema = Api.Workflow.schemas.getWorkflow.input;

console.log("#getWorkflow input", inputSchema.describe());

const outputSchema = Api.Workflow.schemas.getWorkflow.output;

console.log("#getWorkflow output", outputSchema.describe());
```

The schemas are also stored with the instance methods.

```javascript
const Api = require('signavio-api');
const workflows = new Api.Workflow({ authorization: 'token'});

console.log(workflows.getWorkflows.schemas.output.describe());
```

## Operation callback

All operations takes callback as final argument. The callback is required.

- `error`: Error or null. Api-calls with a http response status code above 399 will be considered an error
- `result`: Operation result
- `httpResponse`: The HTTP response from the call to the actual api. Should be returned even if an error has occurred

# Debug

The module uses [debug](github.com/visionmedia/debug) so run with environment variable `DEBUG=signavio-api*`.

[1]: http://www.signavio.com/
[2]: https://workflow.signavio.com/api-docs/index.html
[3]: https://workflow.signavio.com/api/v1/docs
[4]: https://www.npmjs.com/package/request
