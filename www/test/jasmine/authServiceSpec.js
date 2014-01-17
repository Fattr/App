'use strict';

/* jasmine specs for services go here */

describe('fittr', function() {
  beforeEach(module('fittr.services'));


  describe('AuthService', function() {
    it('should return current version', inject(function(auth) {
      expect(auth).toEqual('0.1');
    }));
  });
});