#!/usr/bin/env node

/* eslint no-console:0 */
'use strict';

const _ = require('lodash');
const Api = require('../');
const util = require('util');
const debug = require('debug')('signavio-api:doc');
const pkge = require('../package.json');

let nameOnly, fnameOnly;
if (process.argv.length > 2) {
  nameOnly = process.argv[2];
}
if (process.argv.length > 3) {
  fnameOnly = process.argv[3];
}

let models = {};

console.log(util.format('%s API Reference (v%s)', pkge.version, Api.Task.version));
console.log('===');
console.log('Auto-generated Api documentation.');
console.log('Base path: %s', Api.Task.basePath);

function printToc() {
  console.log('**Table of contents:**');

  Object.keys(Api).forEach((name) => {
    if (nameOnly && name !== nameOnly) return;

    let Intfc = Api[name];

    console.log('-', '[' + name + '](#' + name.toLowerCase() + ')');

    // var inst = new Intfc();
    let protos = Object.keys(Intfc.prototype);

    protos.forEach((fname) => {
      if (fname !== 'log' && fname.indexOf('_') !== 0) {
        console.log('  -', '[`' + fname + '`](#' + name.toLowerCase() + '-' + fname.toLowerCase() + ')');
      }
    });
  });
}

function addModel(model, interfaceName, operationName) {
  if (!interfaceName) return;

  let title = 'Model ' + model;

  if (!models[title]) {
    models[title] = {
      name: model,
      interfaceName: interfaceName,
      operations: {}
    };
  }

  if (operationName) {
    models[title].operations[interfaceName + '.' + operationName] = {
      interface: interfaceName,
      operation: operationName
    };
  }
}

function getOriginalType(schemaDesc) {
  let itemModel = schemaDesc;
  if (schemaDesc.type === 'array' && _.get(schemaDesc, 'items.length') > 0) {
    itemModel = schemaDesc.items[0].type === 'object' ? schemaDesc.items[0] : schemaDesc;
  }

  let isModel = itemModel.tags && itemModel.tags.indexOf('model') > -1;
  if (!isModel) return null;

  return _.get(itemModel, 'meta[0].originalType');
}

function formatUnknownType(itemType, apiItemType) {
  if (!apiItemType) return '';
  if (apiItemType.toLowerCase() === itemType) return '';
  return ' _api type ' + apiItemType + '_';
}

function getSchemaType(schemaDesc) {
  if (schemaDesc.flags && schemaDesc.flags.func) return 'function';

  let originalType = getOriginalType(schemaDesc);
  let type = schemaDesc.type;
  let apiItemType, itemType;

  switch (schemaDesc.type) {
    case 'array':
      if (originalType) {
        return util.format('%s [%s](#model-%s)', schemaDesc.type, originalType, originalType.toLowerCase());
      } else if (schemaDesc.items && schemaDesc.items.length) {
        itemType = _.get(schemaDesc, 'items[0].type');
        apiItemType = formatUnknownType(itemType, _.get(schemaDesc, 'items[0].meta[0].originalType'));

        return util.format('%s %s%s', type, itemType, apiItemType);
      }
    case 'object':
      if (originalType) {
        return util.format('%s [%s](#model-%s)', schemaDesc.type, originalType, originalType.toLowerCase());
      }
    case 'any':
      apiItemType = formatUnknownType(itemType, _.get(schemaDesc, 'meta[0].originalType'));
      return util.format('%s%s', schemaDesc.type, apiItemType);
    default:
      return schemaDesc.type;
  }
}

function printSchema(schema, interfaceName, operation, padding, ignoreChildren) {
  let descr = schema.describe ? schema.describe() : schema;
  let children = descr.children;
  if (!padding) padding = '';

  Object.keys(children).forEach((name) => {
    let child = children[name];
    let meta = child.meta && child.meta[0];

    if (meta && meta.header) {
      return;
    }

    let required = (child.flags && child.flags.presence === 'required') || (meta && meta.path);
    let originalType = getOriginalType(child);

    if (originalType) {
      addModel(originalType, interfaceName, operation);
    }

    let msg = '';
    msg += util.format('%s- `%s`:', padding, name);

    if (required) msg += util.format(' **required**');

    msg += util.format(' %s', getSchemaType(child));

    if (child.description) msg += util.format(' - %s', child.description);
    if (child.notes) msg += util.format('. %s', child.notes.join(', '));

    console.log(msg);

    if (!ignoreChildren && child.children && Object.keys(child.children).length > 0) {
      printSchema(child, interfaceName, operation, padding + '  ');
    }
  });
}

function printFunctions() {
  Object.keys(Api).forEach((name) => {
    if (nameOnly && name !== nameOnly) return;

    console.log('\n#', name);

    let Intfc = Api[name];

    console.log('**Constructor:**');
    console.log('- `options`');
    printSchema(Intfc.ctorSchema, null, null, '  ');

    // var inst = new Intfc();
    let protos = Object.keys(Intfc.prototype);

    protos.forEach((fname) => {
      if (fnameOnly && fname !== fnameOnly) return;

      let op = Intfc.prototype[fname];

      if (fname !== 'log' && fname.indexOf('_') !== 0) {
        console.log('\n##', name, fname);
        if (op.path) {
          console.log('Represents call to:');
          console.log('`%s %s`', op.method, op.path);
        }

        if (op.requiresAuthorization) {
          console.log('');
          console.log('> Requires authorization');
        }
        if (op.schemas) {
          debug(fname, op.schemas.input.describe().children);
          console.log('\n**Arguments:**');
          printSchema(op.schemas.input, name, fname, '', true);
          console.log('');

          if (op.schemas.output) {
            console.log('\n**Callback:**');
            console.log('- `error`: Error or null');

            let output = op.schemas.output.describe();
            let originalType = output.label;

            if (originalType) {
              addModel(originalType, name, fname);
            }

            console.log('- `body`:', '[' + output.label + '](' + '#model-' + output.label.toLowerCase() + ')');

            console.log('- `resp`: Http response');
          }
        }
      }
    });
  });
}

function printModels() {
  console.log('\n# Models');

  Object.keys(models).forEach((title) => {
    let model = models[title];

    let Intfc = Api[model.interfaceName];
    let modelSchema = Intfc.models[model.name];

    console.log('\n##', title);

    if (modelSchema) {
      printSchema(modelSchema);
      console.log('');
    }

    let operations = Object.keys(model.operations);
    if (operations.length > 0) {
      console.log('\n**Used by:**');
      operations.forEach((opTitle) => {
        let op = model.operations[opTitle];
        console.log(util.format('[`%s`](#%s-%s)', opTitle, op.interface.toLowerCase(), op.operation.toLowerCase()));
      });
    }
  });
}

printToc();
printFunctions();
printModels();
