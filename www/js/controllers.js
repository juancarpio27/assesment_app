angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.goShoppingCart = function(){
    console.log('MOVE TO SHOPPING CART VIEW');
  }
})


.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('ProfileCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope, $http, $location, loginService) {
  $scope.loginData = {};
  $scope.doLogin = function(){
    var loginData = {
      email: $scope.loginData.email,
      password: $scope.loginData.password
    };
    loginService.login(loginData).then(function(data){
      if (data.data.success){
        $location.url('/app/home');
      }
    });
  }
})

.controller('RegisterCtrl', function($scope,  $location,registerService) {
  $scope.registerData = {};
  $scope.doRegister = function(){
    var userData = {
      name: $scope.registerData.name,
      lastname: $scope.registerData.lastname,
      email: $scope.registerData.email,
      password: $scope.registerData.password,
      password_confirmation: $scope.registerData.password_confirmation,
      age: $scope.registerData.age,
      sex: $scope.registerData.sex,
    };
    var user = {
      user: userData
    }
    registerService.register(user).then(function(data){
      console.log(data);
      $location.url('/login');
    }, function(error){
      console.log('ERROR',error);
    });
  }
});
