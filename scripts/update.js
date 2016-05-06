#!/usr/bin/env node

/* eslint no-console:0 */
'use strict';

const async = require('async');
const fs = require('fs');
const path = require('path');
const request = require('request');

const baseDir = path.dirname(process.argv[1]);
let destinationDir = path.join(baseDir, '../tmp');

if (process.argv.length > 2) {
  destinationDir = path.join(baseDir, process.argv[2]);
}

const docUri = 'https://workflow.signavio.com/api/v1/docs';

function update() {
  getDocs(() => {
    console.log('docs completed');

    const docs = require(path.join(destinationDir, 'docs.json'));
    console.log('docs version is v%s', docs.apiVersion);

    getApis(docs, () => {
      console.log('completed!');
    });
  });
}

function getDocs(callback) {
  fs.mkdir(destinationDir, () => {
    const docsFile = path.join(destinationDir, 'docs.json');
    const ws = fs.createWriteStream(docsFile);

    console.log('getting docs at %s to %s', docUri, docsFile);

    request
      .get(docUri)
      .on('error', (err) => {
        console.log(err);
        return callback(err);
      })
      .pipe(ws);

    ws.on('close', callback);
  });
}

function getApis(docs, callback) {
  async.each(docs.apis, getApi, callback);
}

function getApi(api, callback) {
  const ws = fs.createWriteStream(path.join(destinationDir, `${api.path}.json`));
  const apiUri = docUri + api.path;

  console.log('getting api docs at', apiUri);

  request
    .get(apiUri)
    .on('error', (err) => {
      console.log(err);
      return callback(err);
    })
    .pipe(ws);

  ws.on('close', callback);
}

update();
