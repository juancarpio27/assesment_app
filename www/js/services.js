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
    };
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
    };
    return registerServic;

})



  .factory('storeService', function($http){

    var storeService = {};
    var url = '/api/stores';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/stores'

    storeService.index = function(){
      return $http({
        method: 'GET',
        url: url
      });
    };

    return storeService;

  })

  .factory('categoryService', function($http){

    var categoryService = {};
    var url = '/api/categories';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/categories'

    categoryService.index = function(){
      return $http({
        method: 'GET',
        url: url
      });
    };

    categoryService.getProductsByStore = function(category_id,store_id) {
      var data = {
        category_id: category_id,
        store_id:store_id
      };
      return $http({
        method: 'post',
        url: '/api/product_stores/get_products_by_category',
        data: data
      });
    };

    return categoryService;

  });
