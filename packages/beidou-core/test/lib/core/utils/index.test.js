'use strict';

const path = require('path');

const basePath = path.join(__dirname, '../../../..');
const fixtures = path.join(basePath, '/test/fixtures');

describe('test/lib/core/utils/index.test.js', () => {
  const utils = require(`${basePath}/lib/core/utils/index`);

  afterEach(() => {});

  describe('existsModule', () => {
    it('should return false when module does not exist', () => {
      utils.existsModule('/AN_NON_EXIST_MODULE').should.equal(false);
    });

    it('should return true when module exists', () => {
      utils.existsModule(`${fixtures}/lib/utils/`).should.equal(true);
    });
  });

  describe('tryRequire function', () => {
    it('should return empty object when module does not exist', () => {
      utils.tryRequire('/AN_NON_EXIST_MODULE').should.be.Object;
      utils
        .tryRequire('/AN_NON_EXIST_MODULE')
        .hasOwnProperty()
        .should.equal(false);
    });

    it('should return {test: true} when module exists', () => {
      utils
        .tryRequire(`${fixtures}/lib/utils/`)
        .should.have.property('test', true);
    });

    it('assert module must exists', () => {
      utils
        .tryRequire(`${fixtures}/lib/utils/`, true)
        .should.have.property('test', true);
    });
  });
});
