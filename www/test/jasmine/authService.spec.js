'use strict';

/* jasmine specs for services go here */

describe('Auth Service Specs', function() {
  var AuthService;

  beforeEach(module('fittr.services'));
  beforeEach(inject(function(_AuthService_) {
    AuthService = _AuthService_;
  }));

  describe('beginFbAuth method', function() {
    it('should return an object when invoked', function() {
      var promise = AuthService.beginFbAuth();
      expect(typeof promise).toEqual('object');
    });

    it('should return a promise object when invoked', function() {
      var promise = AuthService.beginFbAuth();
      expect(typeof promise.then).toEqual('function');
    });
  });
});