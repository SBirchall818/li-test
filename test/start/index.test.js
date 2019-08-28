import start from '../../src/start';

var should = require('should');
var sinon = require('sinon');

describe('fluff :: ', () => {
  it('should exist', () => {
    should.exist(start);
  });

  it('should call processSingleFile for each file path', () => {
    var processSingleFileSpy = sinon.spy();
    var fileArray = ['path1', 'path2', 'path3'];
    start(fileArray, processSingleFileSpy);
    processSingleFileSpy.calledThrice.should.be.true();
  });
});