'use strict';

const _ = require('lodash');
const Base = require('./base/.');
const EventEmitter = require('events').EventEmitter;
const Joi = require('joi');
const request = require('request');
const querystring = require('querystring');
const util = require('util');
const inspect = util.inspect;

const debug = require('debug')('signavio-api:generator');

const pluralMap = {
  'processes': 'process',
  'activities': 'activity',
  'versions': 'version',
  'fields': 'field',
  'transitions': 'transition',
  'tasks': 'task',
  'parameters': 'parameter',
  'bindings': 'binding',
  'mappings': 'mapping',
  'casecolumns': 'caseColumn',
  'variables': 'variable',
  'accounts': 'account',
  'services': 'service',
  'options': 'option',
  'actioninstances': 'actionInstance',
  'files': 'file',
  'registrations': 'registration',
  'users': 'user',
  'documents': 'document',
  'mails': 'mail',
  'workflows': 'workflow',
  'cases': 'case',
  'events': 'event',
  'instances': 'instance',
  'licenses': 'license'
};

const operationMap = {
  User: {
    'POST /registrations/{code}/activate': {
      name: 'activateRegistration'
    }
  },
  Task: {
    'POST /{organizationKey}/tasks/{taskId}/complete': {
      name: 'completeTask'
    },
    'POST /{organizationKey}/tasks/{taskId}/reopen': {
      name: 'reopenTask'
    }
  },
  Case: {
    'POST /{organizationKey}/cases/{caseId}/cancel': {
      name: 'cancel'
    },
    'POST /{organizationKey}/cases/{caseId}/close': {
      name: 'close'
    }
  }
};

let schemaModels = {};

let ioptionsSchema = Joi.object().keys({
  authorization: Joi.string().optional().description('Authorization token, will be set as Authorization http header'),
  credentials: Joi.object().optional().keys({
    username: Joi.string().description('Username'),
    password: Joi.string().description('Password')
  }).description('Default credentials'),
  basePath: Joi.string().optional().description('Effektif-api base url, defaults to api endpoint documentation basePath'),
  onUnauthorized: Joi.func().optional().description('Excecuted when an unauthorized call was made or authorization token is missing').notes(['Receives operation arguments and callback']),
  users: Joi.object().optional().keys({
    login: Joi.func().required().description('Login function')
  }).unknown(true).description('Users instance'),
  log: Joi.func().optional().description('Logging function, defaults to console.log'),
  baseRequest: Joi.func().optional().description('Default request')
});

module.exports = function(apiName, apiDef, options) {
  let template = apiDef;
  if (typeof apiDef === 'string') {
    template = require(apiDef);
  }
  let api = generate(apiName, template, options || {});
  api.version = template.apiVersion;
  api.basePath = template.basePath;
  return api;
};

function generate(apiName, apiDef, options) {
  let internals = {};
  /* eslint no-console:0 */
  let log = typeof options.log === 'function' ? options.log : console.log.bind(console);
  apiDef.name = apiName;

  // Pre-load models
  preLoadModels(apiName, apiDef);

  internals.Interface = function(ioptions) {
    const Debug = require('debug');
    if (this.constructor !== internals.Interface) {
      throw new Error(apiName + ' must be instantiated using new');
    }
    this.name = apiName.toLowerCase();

    Joi.attempt(ioptions, ioptionsSchema);

    this.options = ioptions || {};
    this.defaults = {};
    if (this.options.authorization) {
      this.defaults.authorization = this.options.authorization;
    }

    this.options.basePath = _.get(ioptions, 'basePath', apiDef.basePath);
    this.baseRequest = this.options.baseRequest || request;

    let logFunction = typeof this.options.log === 'function' ? this.options.log : log;

    this._debug = Debug('signavio-api:' + this.name);
    this._debugError = Debug('signavio-api:' + this.name + ':error');
    this._debug.log = logFunction;
    this._debugError.log = logFunction;
  };
  internals.Interface.ctorSchema = ioptionsSchema;

  if (Base[apiName]) {
    util.inherits(internals.Interface, Base[apiName]);
  } else {
    util.inherits(internals.Interface, EventEmitter);
  }

  internals.Interface.schemas = {};
  internals.Interface.apiName = apiName;
  internals.Interface.apiDoc = apiDef;

  // Placeholder for getting user interface. Set by index.js
  internals.Interface.prototype.getUserInstance = function() {
    if (this.options.users) return this.options.users;

    throw new Error('User interface is not loaded');
  };

  internals.Interface.prototype._onUnauthorized = function(requestArguments, callback) {
    const self = this;
    if (self.options.onUnauthorized) {
      self.log('info', 'using custom onUnauthorized');

      return self.options.onUnauthorized.call(self, requestArguments, (err, token) => {
        if (err) return callback(err);
        if (typeof token !== 'string') return callback(new Error('Missing authorization token or not a string'));

        requestArguments.Authorization = token;

        self.log('info', `custom onUnauthorized responded with ${token}`);

        return callback(null, true);
      });
    }

    if (!self.options.credentials) {
      return callback(new Error('Missing credentials'));
    }

    self.log('info', 'onUnauthorized');

    let users = self._users || self.getUserInstance(self.options);
    if (!self._users) self._users = users;

    function loginCallback(err, body, resp) {
      if (err) return callback(err, false, resp);
      if (resp.statusCode === 200) {
        if (!body || !body.token) return callback(new Error('No authorization token'), false, resp);

        self.log('info', 'received new authorization token');

        // Save new token to instance
        self.defaults.authorization = body.token;
        self.options.authorization = body.token;

        self.emit('authorized', {
          authorization: body.token,
          username: self.options.credentials.username
        });

        // Set authorization token on request arguments
        requestArguments.Authorization = body.token;
      } else {
        self.log('warning', `login returned ${resp.statusCode}`);

        return callback(new Error(`Login failed with ${resp.statusCode}`), false, resp);
      }

      return callback(err, true, resp);
    }

    return users.login(self.options.credentials.username, self.options.credentials.password, loginCallback);
  };

  internals.Interface.prototype._applyDefaults = function(args, schema) {
    const self = this;
    let schemaDescr = schema.describe();

    let argsKeys = Object.keys(args);
    let lastArg = _.last(argsKeys);
    if (typeof args[lastArg] === 'function') {
      args.callback = args[lastArg];
      delete args[lastArg];
    }

    let schemaKeys = Object.keys(schemaDescr.children);

    schemaKeys.forEach((c) => {
      let childMeta = schemaDescr.children[c].meta[0];
      if (childMeta.header && self.defaults) {
        args[childMeta.name] = self.defaults[c] || self.defaults[c.toLowerCase()];
      }
    });

    return args;
  };

  internals.Interface.prototype.log = function(level, message) {
    if (level === 'error') {
      return this._debugError(message);
    }
    return this._debug(message);
  };

  internals.Interface.prototype._getRequestOptions = function(operation, args) {
    const self = this;

    let apiPath = operation.path;
    let descr = operation.schemas.input.describe();
    let qsDefined = false;
    let qs = {};
    let headers = {};
    let body;
    Object.keys(descr.children).forEach((p) => {
      let parm = descr.children[p];
      let argValue = args[p];
      let parmMeta = parm.meta[0];
      if (parmMeta.header) {
        headers[parmMeta.name] = argValue;
      } else if (parmMeta.path) {
        apiPath = apiPath.replace('{' + p + '}', argValue);
      } else if (parmMeta.query) {
        if (typeof argValue !== 'undefined' & argValue !== null) {
          qsDefined = true;
          qs[p] = argValue.toString();
        }
      } else if (parmMeta.body) {
        body = argValue;
      }
    });

    let reqOptions = {
      method: operation.method,
      uri: self.options.basePath + apiPath + (qsDefined ? '?' + querystring.stringify(qs) : ''),
      headers: headers,
      json: body
    };
    if (/GET/i.test(operation.method)) {
      let outputSchema = operation.schemas.output;
      reqOptions.json = (outputSchema && outputSchema.isJoi);
    }

    return reqOptions;
  };

  internals.Interface.prototype.proxy = function(reqOptions, callback) {
    const self = this;
    let roptions = _.clone(reqOptions);

    delete roptions.authorization;

    if (!roptions.uri && reqOptions.path) {
      roptions.uri = self.options.basePath + reqOptions.path;
      delete roptions.path;
    }
    if (this.defaults.authorization) {
      _.set(roptions, 'headers.authorization', this.defaults.authorization);
    }

    let reqSignature = roptions.method || 'GET' + ' ' + roptions.uri;

    self._debug('making call', reqSignature);

    function innerCallback(err, resp, body) {
      if (!err) {
        self._debug('call', roptions.method || 'GET', roptions.uri, 'responded with', resp.statusCode);
      }

      // Check if request is unauthorized
      if (resp && resp.statusCode === 401) {
        self._debug('warning', reqSignature, 'call was unauthorized');
        if (reqOptions.authorization === true) {
          // Make login request
          return self._onUnauthorized(roptions, (authErr, token, authResp) => {
            if (authErr) return callback(authErr, token, authResp);
            // Make authorized request
            _.set(roptions, 'headers.authorization', roptions.Authorization);

            self._debug('reissuing', reqSignature, 'with', inspect(roptions));

            return self.baseRequest(roptions, (err2, resp2, body2) => {
              return callback(err2, body2, resp2);
            });
          });
        }
      }

      return callback.call(self, err, body, resp);
    }

    return self.baseRequest(roptions, innerCallback);
  };

  apiDef.apis.forEach(function(api) {
    api.operations.forEach(function(op) {

      let opName = getOperationName(apiName, api.path, op.method);

      let opArgs = getOperationArguments(apiName, api.path, op);
      let schema;
      let requiresAuthorization = false;
      if (opArgs) {
        schema = mapArguments(opArgs, apiDef);

        let signatureDescr = schema.describe();
        requiresAuthorization = !!signatureDescr.meta[0].requiresAuthorization;

        debug(api.path, op.method, opName, 'requires authorization:', requiresAuthorization);
      }
      let output = mapOutput(op.type, apiDef);

      internals.Interface.schemas[opName] = {
        input: schema,
        output: output
      };
      internals.Interface.models = schemaModels;

      function makeRequest(reqArgs, callback) {
        const self = this;
        let reqOptions = self._getRequestOptions(operation, reqArgs);
        self.log('info', `#${opName} making call ${op.method} ${reqOptions.uri}`);

        function innerCallback(err, resp, body) {
          return requestCallback.call(self, err, resp, body, callback);
        }

        return self.baseRequest(reqOptions, innerCallback);
      }

      function operation() {
        const self = this;
        let callback = arguments.length > 0 ? arguments[arguments.length - 1] : null;
        if (typeof callback !== 'function') {
          throw new Error(opName + ' requires callback');
        }

        // Validate operation arguments schema
        let args = _.assign({}, arguments);
        args = self._applyDefaults(args, schema);

        let validationResult = schema.validate(args);
        let validationError = validationResult.error;
        let operationArgs = validationResult.value;

        self.log('info', `Calling #${opName} with ${inspect(operationArgs)}`);

        if (validationError) {
          // Check if authorization token is missing
          if (/authorization.*required/i.test(validationError.message)) {
            // Make login request
            return self._onUnauthorized(operationArgs, (authErr) => {
              if (authErr) return callback(authErr);
              // Perform request
              return makeRequest.call(self, operationArgs, callback);
            });
          }

          // Leave if other validation error
          self.log('error', util.format('#' + opName, 'validation failed with', validationError, inspect(validationError, false, 3)));
          return callback(validationError);
        }

        // Perform request
        function innerCallback(err, body, resp) {
          // Check if request is unauthorized
          if (resp && resp.statusCode === 401) {
            self.log('warning', util.format('#' + opName, 'call was unauthorized'));
            if (requiresAuthorization) {
              // Make login request
              return self._onUnauthorized(operationArgs, (authErr, token, authResp) => {
                if (authErr) return callback(authErr, token, authResp);
                // Make authorized request
                self.log('info', util.format('Reissuing', '#' + opName, 'with', inspect(operationArgs)));

                return makeRequest.call(self, operationArgs, callback);
              });
            }
          }

          return callback(err, body, resp);
        }

        return makeRequest.call(self, operationArgs, innerCallback);
      }

      operation.schemas = internals.Interface.schemas[opName];
      operation.path = api.path;
      operation.method = op.method;
      operation.requiresAuthorization = requiresAuthorization;

      internals.Interface.prototype[opName] = operation;
    });
  });

  return internals.Interface;
}

function mapMethod(method) {
  switch (method) {
    case 'PUT':
      return 'update';
    case 'POST':
      return 'create';
    default:
      return method.toLowerCase();
  }
}

function splitApiPath(apiPath) {
  let cleanPath = apiPath.replace(/^\//, '');
  let parts = cleanPath.split('/');
  let def = [];

  const pathRegex = /\{\w+\}/;

  parts.forEach((part, i) => {
    if (!pathRegex.test(part)) {
      if (i < parts.length - 1 && pathRegex.test(parts[i + 1])) {
        def.push(pluralMap[part] || part);
      } else {
        def.push(part);
      }
    }
  });

  return def;
}

function getOperationName(interfaceName, apiPath, method) {
  let map = operationMap[interfaceName] || {};
  let opId = util.format(method, apiPath);
  let opName = mapMethod(method);

  if (map[opId] && map[opId].name) {
    let newName = map[opId].name;
    debug(apiPath, method, opName, 'is renamed to', newName);
    return newName;
  }

  let parts = splitApiPath(apiPath);

  parts.forEach((part) => {
    opName += part.replace(/^\w/, (match) => {
      return match.toUpperCase();
    });
  });

  return opName;
}

function getOperationArguments(interfaceName, apiPath, op) {
  let parameters = op.parameters;
  if (!parameters) return parameters;

  // Normalize
  parameters.forEach((parm) => {
    parm.type = parm.dataType;
  });

  return parameters;
}

function mapArrayType(arrayProp, apiDef, parentTypeStack) {
  let model = Joi.array();
  let refType = _.get(arrayProp, 'items.$ref');

  if (!refType) {
    debug('warning', apiDef.name, arrayProp, 'is missing items');
    return model;
  } else if (parentTypeStack[refType]) {
    return model.meta({
      originalType: refType
    }).tags('model');
  }

  let itemsType = mapToJoiType(refType, apiDef, null, parentTypeStack).meta({
    originalType: refType
  });

  model = model.items(itemsType);
  return model;
}

function mapToJoiType(type, apiDef, originalProp, parentTypeStack) {
  if (!type) return null;

  if (schemaModels[type]) {
    return schemaModels[type];
  }

  let model = apiDef.models[type];
  if (!model) {
    switch (type) {
      case 'string':
      case 'object-id':
        model = Joi.string().allow('');
        break;
      case 'LocalDateTime':
        model = Joi.date();
        break;
      case 'integer':
      case 'Long':
        model = Joi.number().integer();
        break;
      case 'FileStream':
      case 'InputStream':
        model = Joi.binary().meta({
          stream: true
        });
        break;
      case 'array':
        model = mapArrayType(originalProp, apiDef, parentTypeStack);
        break;
      default:
        if (typeof Joi[type] !== 'function') {
          debug('warning', apiDef.name + ': type "' + type + '" not found among models');
          model = Joi.any().meta({
            originalType: type
          });
          break;
        }
        model = Joi[type]();
        break;
    }

    return model;
  }

  // Add to parent stack to avoid circular references
  parentTypeStack[type] = true;

  let schema = Joi.object();
  if (model.properties) {
    let keys = {};
    Object.keys(model.properties).forEach((propName) => {
      let prop = model.properties[propName];
      parentTypeStack[prop.type] = false;
      if (prop.type === type) {
        keys[propName] = Joi.any();
      } else {
        keys[propName] = mapToJoiType(prop.type, apiDef, prop, parentTypeStack);
      }
    });
    schema = schema.keys(keys).tags('model');
  }

  schemaModels[type] = schema.unknown();

  return schema;
}

function mapArgumentType(param, argIndex, apiDef) {
  let argSchema;
  let argMeta = {
    name: param.name,
    argument: true
  };
  let parentTypeStack = {};

  argMeta[param.paramType] = true;

  switch (param.paramType) {
    case 'header':
      argSchema = mapToJoiType(param.type, apiDef, param, parentTypeStack);
      argMeta.argument = false;
      argMeta.requiresAuthorization = (param.name.toUpperCase() === 'AUTHORIZATION');
      break;
    case 'path':
    case 'query':
      argSchema = mapToJoiType(param.type, apiDef, param, parentTypeStack).allow(null);
      param.required = false;
      break;
    case 'body':
      if (!param.name) param.name = 'body';
      argSchema = mapToJoiType(param.type, apiDef, param, parentTypeStack);
      argMeta.name = param.name;
      break;
    default:
      break;
  }
  if (!argSchema) {
    return null;
  }

  if (param.required) {
    argSchema = argSchema.required();
  }

  argMeta.originalType = param.type;
  argSchema = argSchema.meta(argMeta);

  return argSchema;
}

function mapArguments(parameters, apiDef) {
  let schema = Joi.object();
  let keys = {};
  let argumentIndex = 0;
  let schemaMeta = {};
  parameters.forEach((param) => {
    let argSchema = mapArgumentType(param, argumentIndex, apiDef);

    if (argSchema) {
      let argMeta = argSchema.describe().meta[0];
      if (argMeta.argument) {
        schema = schema.rename(argumentIndex.toString(), argMeta.name);
        argumentIndex++;
      }

      keys[argMeta.name] = argSchema;
      if (argMeta.requiresAuthorization) {
        schemaMeta.requiresAuthorization = true;
      }
    }
  });
  keys.callback = Joi.func().required().meta({
    argument: true
  }).description('function(err, body, resp)');

  let mSchema = Joi.compile(schema.keys(keys)).meta(schemaMeta);

  return mSchema;
}

function mapOutput(outputType, apiDef) {
  let outputSchema = mapToJoiType(outputType, apiDef);
  if (!outputSchema) {
    return outputSchema;
  }

  let mSchema = Joi.compile(outputSchema).label(outputType).meta({
    'originalType': outputType
  });
  return mSchema;
}

function preLoadModels(apiName, apiDef) {
  Object.keys(apiDef.models).forEach((modelKey) => {
    let model = apiDef.models[modelKey];
    if (!schemaModels[model.id]) {
      mapToJoiType(model.id, apiDef, model, {});
    }
  });
}

function requestCallback(err, resp, body, callback) {
  const self = this;
  if (err) return callback(err, body, resp);

  let result = body;
  let parseErr;
  if (typeof body === 'string') {
    if (/json/i.test(resp.headers['content-type'])) {
      try {
        result = JSON.parse(body);
      } catch (e) {
        parseErr = e;
      }
      if (parseErr) {
        self.log('error', `Failed to parse ${resp.headers['content-type']} json body >${body}<: ${parseErr}`);
      }
    }
  }

  let reqPath = resp.request.path;
  self.log('info', `${resp.request.method} ${reqPath} responded with ${resp.statusCode} ${resp.headers['content-type']}`);
  if (resp.statusCode >= 400) {
    if (result && result.message) err = new Error(result.message);
    else err = new Error(`Call to signavio-api failed with ${resp.statusCode}${_.isEmpty(body) ? '' : ': ' + body}`);
  }

  return callback(err || parseErr, result, resp);
}
