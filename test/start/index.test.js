import start from '../../src/start';

var should = require('should');
var sinon = require('sinon');

describe('fluff :: ', () => {
  it('should exist', () => {
    should.exist(start);
  });

  it('should call processSingleFile for each file path', async () => {
    var processSingleFileSpy = sinon.stub().resolves(true);
    var fileArray = ['path1', 'path2', 'path3'];
    await start(fileArray, processSingleFileSpy);
    processSingleFileSpy.calledThrice.should.be.true();
  });
});