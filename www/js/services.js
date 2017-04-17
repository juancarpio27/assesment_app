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

  .factory('orderService',function($http){
    var url = 'api/orders';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/orders'
    var orderService = {};
    var user = JSON.parse(localStorage.getItem('user'));
    var access_token = user.access_token;

    orderService.create = function(order_data,products){
      var data = {order: order_data, products: products};
      return $http({
        method: 'POST',
        url: url,
        headers: {
          Authorization: 'Token '+access_token
        },
        data: data
      });
    };

    orderService.index = function(){
      return $http({
        method: 'GET',
        url: url,
        headers: {
          Authorization: 'Token '+access_token
        }
      });
    };

    orderService.show = function(id){
      return $http({
        method: 'GET',
        url: url+'/'+id,
        headers: {
          Authorization: 'Token '+access_token
        }
      });
    };

    return orderService;
  })

  .factory('cardService',function($http){
    var cardService = {};
    var url = 'api/cards';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/cards'

    cardService.index = function(){
      var user = JSON.parse(localStorage.getItem('user'));
      var access_token = user.access_token;
      return $http({
        method: 'GET',
        url: url,
        headers: {
          Authorization: 'Token '+access_token
        }
      });
    };

    cardService.destroy = function(cardId){
      var user = JSON.parse(localStorage.getItem('user'));
      var access_token = user.access_token;
      return $http({
        method: 'DELETE',
        url: url+'/'+cardId,
        headers: {
          Authorization: 'Token '+access_token
        }
      });
    };

    cardService.create = function(data){
      var user = JSON.parse(localStorage.getItem('user'));
      var access_token = user.access_token;
      var card_data = {
        holder_name: data.holder_name,
        brand: data.brand,
        expiration_year: data.expiration_year,
        expiration_month: data.expiration_month,
        number: data.number
      };
      card_data = {card: card_data};
      return $http({
        method: 'POST',
        url: url,
        data: card_data,
        headers: {
          Authorization: 'Token '+access_token
        }
      });
    };

    return cardService;
  })

  .factory('storeService', function($http){

    var storeService = {};
    var url = '/api/stores';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/stores';

    storeService.index = function(){
      return $http({
        method: 'GET',
        url: url
      });
    };

    storeService.get = function(id){
      return $http({
        method: 'GET',
        url: url+'/'+id
      });
    };

    return storeService;

  })

  .factory('offerService', function($http){

    var offerService = {};
    var url = '/api/offers';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/offers';

    offerService.index = function(){
      return $http({
        method: 'GET',
        url: url
      });
    };


    return offerService;

  })

  .factory('categoryService', function($http){

    var categoryService = {};
    var url = '/api/categories';
    //var url = 'https://murmuring-caverns-11160.herokuapp.com/api/categories';

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
