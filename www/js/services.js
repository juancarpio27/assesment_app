angular.module('starter.services', [])

.factory('loginService', function($http){

    var loginService = {};
    var url = '/api/sessions/plain';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/sessions/plain'
    loginService.login = function(loginData) {
        return $http({
            method: 'POST',
            url: url,
            data: loginData
        });
    }
    return loginService;

})

.factory('registerService', function($http){

    var registerServic = {};
    var url = '/api/users';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/users'
    registerServic.register = function(userData) {
        return $http({
            method: 'POST',
            url: url,
            data: userData
        });
    }
    return registerServic;

});