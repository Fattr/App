describe('entryCtrl tests', function() {
  var $scope; 
  beforeEach(module('fittr.controlllers')); 
  beforeEach(inject(function($ rootScope) { 
    $scope = $rootScope.$new(); 
  }));

  it('should do something', inject(function ($controller) { 
    var teamMember = {}; 
    $controller('entryController', { 
      $scope: $scope
    });


