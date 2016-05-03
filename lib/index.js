'use strict';

const docs = require('../api/docs.json');
const Generator = require('./generator');
const path = require('path');

let interfaces = {};

docs.apis.forEach(function(d) {
  let name = d.path.replace('/', '');
  interfaces[name] = Generator(name, path.join('../api/', name + '.json'));
});

// Add User interface callback to interfaces
Object.keys(interfaces).forEach(function(key) {
  if (key === 'User') {
    interfaces[key].prototype.getUserInstance = function() {
      return this;
    };
    return;
  }

  interfaces[key].prototype.getUserInstance = function(options) {
    if (this.options.users) return this.options.users;

    if (!options) {
      options = {
        basePath: this.options.basePath
      };
    }

    return new interfaces.User(options);
  };
});

module.exports = interfaces;
