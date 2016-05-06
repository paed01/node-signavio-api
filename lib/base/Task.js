'use strict';

const util = require('util');
const EventEmitter = require('events').EventEmitter;

const internals = {};

module.exports = internals.Task = function() {};
util.inherits(internals.Task, EventEmitter);

internals.Task.prototype.getFormFieldByName = function(task, fieldName) {
  if (!task.form) {
    return null;
  }
  const field = task.form.fields.find((f) => {
    return f.name === fieldName;
  });

  return field || null;
};
