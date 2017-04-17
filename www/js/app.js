// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register',{
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
    .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'HistoryCtrl'
        }
      },
      resolve: {
        getOrders: function(orderService){
          return orderService.index();
        }
      }
    })
    .state('app.history_info', {
      url: '/history/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/history_info.html',
          controller: 'HistoryInfoCtrl'
        }
      },
      resolve: {
        getOrder: function(orderService,$stateParams){
          return orderService.show($stateParams.id);
        }
      }
    })
    .state('app.shop', {
      url: '/shop',
      views: {
        'menuContent': {
          templateUrl: 'templates/shop.html',
          controller: 'ShopCtrl'
        }
      },
      resolve: {
        getStores: function(storeService){
          return storeService.index();
        },
        getCategories: function(categoryService){
          return categoryService.index();
        }
      }
    })

    .state('app.products', {
      url: '/shop/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'ProductsCtrl'
        }
      },
      resolve: {
        getProducts: function(categoryService,$stateParams){
          var storeId = localStorage.getItem('storeId');
          return categoryService.getProductsByStore($stateParams.id,storeId);
        }
      }
    })

    .state('app.cart', {
      url: '/cart',
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.html',
          controller: 'CartCtrl'
        }
      },
      resolve: {
        getCards: function(cardService){
          return cardService.index();
        }
      }
    })
    .state('app.cards', {
      url: '/cards',
      views: {
        'menuContent': {
          templateUrl: 'templates/cards.html',
          controller: 'CardsCtrl'
        }
      },
      resolve: {
        getCards: function(cardService){
          return cardService.index();
        }
      }
    })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      },
      resolve: {
        getOffers: function(offerService){
          return offerService.index();
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
