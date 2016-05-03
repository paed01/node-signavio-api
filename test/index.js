'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const Unnecessary = require('unnecessary');
const unnecessary = new Unnecessary({
  excludeDirs: ['tmp', 'scripts']
});
process.on('exit', (code, signal) => {
  if (!signal && code === 0) {
    logUnused();
  }
});

function logUnused() {
  /* eslint no-console:0 */
  let untouched = unnecessary.untouched();
  if (!untouched.length) return;
  console.log(`\n\x1b[31mFound ${untouched.length} potentially unused file${untouched.length > 1 ? 's' : ''}:\x1b[0m`);
  unnecessary.untouched().forEach((file) => {
    console.log(`  \x1b[33m${file}\x1b[0m`);
  });
}

const Api = require('../.');

lab.experiment('Api exports', () => {
  Object.keys(Api).forEach((api) => {
    lab.experiment(api, () => {
      lab.test('functions', (done) => {
        expect(Api[api]).to.be.a.function();
        done();
      });

      lab.test('ctor throws if not instantiated with new', (done) => {
        function ctor() {
          Api[api]();
        }
        expect(ctor).to.throw(Error, api + ' must be instantiated using new');
        done();
      });

      lab.test('schemas', (done) => {
        expect(Api[api].schemas).to.be.an.object();
        done();
      });

      lab.test('have EventEmitter.on functions', (done) => {
        expect(Api[api].prototype.on).to.be.a.function();
        done();
      });

      lab.test('#getUserInstance returns new User instance', (done) => {
        const instance = new Api[api]();
        expect(instance.getUserInstance()).to.be.instanceOf(Api.User);
        expect(instance.getUserInstance().options.basePath, 'basePath').to.equal(instance.options.basePath);
        done();
      });
    });
  });
});
