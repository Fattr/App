'use strict';

/* jasmine specs for services go here */

describe('User Service Specs', function() {
  var UserService;

  beforeEach(module('fittr.services'));
  beforeEach(inject(function(_UserService_) {
    UserService = _UserService_;
    console.log("user service: ", UserService);
  }));

  it('should not be null', function() {
    expect(true).toBe(true);
  });

  // xdescribe('signup method', function() {

  //   // do i test the http request?

  //   it('should return a promise object when invoked', function() {
  //     var promise = UserService.signup();

  //     expect(typeof promise).toEqual('object');
  //     expect(typeof promise.then).toEqual('function');
  //   });
  // });

  // xdescribe('retrieve method', function() {

  //   // do i test the http request?

  //   it('should return a promise object when invoked', function() {
  //     var promise = UserService.retrieve();

  //     expect(typeof promise).toEqual('object');
  //     expect(typeof promise.then).toEqual('function');
  //   });
  // });

  // describe('saving users', function() {
  //   var user;

  //   beforeEach(function() {
  //     user = {
  //       'email':'karl@gmail.com',
  //       '_id':'007',
  //       'following':[],
  //       'services':[],
  //       'updatedAt':'2014-01-20T20:06:43.598Z',
  //       'createdAt':'2014-01-20T20:06:43.598Z'
  //     };
  //   });

  //   describe('save method', function() {
  //     it('should save user details to user property', function() {
  //       UserService.save(user);
  //       expect(user).toEqual('object');
  //       expect(user.email).toEqual('karl@gmail.com');
  //       expect(user._id).toEqual('007');
  //       expect(user.services).toEqual([]);
  //     });
  //   });

  //   xdescribe('saveToLocal', function() {
  //     it('should save user details to user property', function() {
  //       UserService.saveToLocal(user);
  //       expect(user).toEqual('object');
  //       expect(user.email).toEqual();
  //       expect(user.email).toEqual('');
  //       expect(user.email).toEqual('');
  //     });
  //   });
  // });
});
