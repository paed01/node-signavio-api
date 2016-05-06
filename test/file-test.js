'use strict';

const fs = require('fs');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const nock = require('nock');

const Files = require('../.').File;
const files = new Files({
  authorization: 'token'
});

lab.describe('File', () => {
  let scope;
  lab.before((done) => {
    nock.disableNetConnect();

    scope = nock(Files.apiDoc.basePath);

    done();
  });
  lab.after((done) => {
    nock.cleanAll();
    done();
  });

  lab.experiment('#getFileStream', () => {
    lab.test('returns file stream', (done) => {
      scope
        .get('/test-org/files/file-1/stream')
        .reply(200, () => {
          return fs.createReadStream(__filename);
        });

      const stream = files.getFileStream('test-org', 'file-1', (err) => {
        if (err) return done(err);
      });

      stream.on('data', (chunk) => {
        expect(chunk.length).to.be.above(0);
      });
      stream.on('end', done);

    });
  });

});
