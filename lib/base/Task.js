'use strict';

const _ = require('lodash');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

let internals = {};

module.exports = internals.Task = function() {};
util.inherits(internals.Task, EventEmitter);

internals.Task.prototype.getFormFieldByName = function(task, fieldName) {
  if (!task.form) {
    return null;
  }
  let field = _.find(task.form.fields, (f) => {
    return f.name === fieldName;
  });

  return field || null;
};
