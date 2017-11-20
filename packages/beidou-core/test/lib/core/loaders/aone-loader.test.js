
const path = require('path');
const mm = require('egg-mock');
const basePath = path.join(__dirname, '../../../..');

mm.consoleLevel('NONE');
describe('test/lib/core/loaders/aone-loader.test.js', function() {
  afterEach(() => {
    mm.restore();
  });

  before(function() {
  });
  const AoneLoader = require(`${basePath}/lib/core/loaders/aone-loader.js`);
  describe('not Aone environment', function() {
    const aoneLoader = new AoneLoader({ baseDir: basePath });
    it('should return empty object {} when aoneEnv.json does not exist', function() {
      aoneLoader.aoneEnv.should.be.Object;
      aoneLoader.aoneEnv.hasOwnProperty().should.equal(false);
    });

  });
  describe('Aone environment', function() {
    const aoneLoader = new AoneLoader({ baseDir: `${basePath}/test/fixtures/apps/aone-loader-node-only` });
    it('should return an object and have appDeployType propterty', function() {
      aoneLoader.aoneEnv.should.be.Object;
      aoneLoader.aoneEnv.should.have.ownProperty('appDeployType', 'NODEJS');
    });
  });
});
