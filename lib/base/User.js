'use strict';

const _ = require('../lodashes');
const crypto = require('crypto');
const debug = require('debug')('signavio-api:user:login');
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const internals = {};

module.exports = internals.User = function() {};
util.inherits(internals.User, EventEmitter);

const loginCallbacks = {};

internals.User.prototype.login = function(username, password, optionsOrCallback, callback) {
  let args = {};
  if (typeof optionsOrCallback === 'function') {
    callback = optionsOrCallback;
  } else {
    args = optionsOrCallback;
  }
  args.emailAddress = username;
  args.password = password;

  performLogin(this, _.assign({}, args), callback);
};

function performLogin(instance, args, callback) {
  const username = args.emailAddress;
  const password = args.password;
  const hash = crypto.createHash('md5').update(username).update(password).digest('hex');

  if (loginCallbacks[hash]) {
    debug('info', 'login for user', args.emailAddress, 'already in progress');
    return loginCallbacks[hash].push(callback);
  } else {
    debug('info', 'login for user', args.emailAddress, 'start', hash);
    loginCallbacks[hash] = [callback];
  }

  return instance.createUsersLogin(args, (err, body, resp) => {
    if (err) debug('error', 'login for', username, 'failed', err);
    else debug('login for', username, 'succeeded with', resp.statusCode);

    if (resp && resp.statusCode === 200 && body && body.token) {
      instance.emit('authorized', {
        username: username,
        authorization: body.token
      });
    }

    loginCallbacks[hash].forEach(function(cb) {
      cb(err, body, resp);
    });

    delete loginCallbacks[hash];
  });
}
