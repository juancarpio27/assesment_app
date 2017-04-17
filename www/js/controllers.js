angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $location) {
    $scope.goShoppingCart = function(){
      $location.url('/app/cart');
    }
  })


  .controller('HomeCtrl', function($scope, $stateParams,getOffers) {
    $scope.offers = getOffers.data;

    $scope.user = JSON.parse(localStorage.getItem('user'));

  })

  .controller('HistoryInfoCtrl', function($scope, $stateParams,getOrder) {
    $scope.order = getOrder.data;
  })

  .controller('HistoryCtrl', function($scope, $stateParams,getOrders) {
    $scope.upcoming = [];
    $scope.completed = [];
    for (var i =0; i < getOrders.data.length; ++i){
      if (getOrders.data[i].order_status == "received")
        $scope.upcoming.push(getOrders.data[i])
      else if (getOrders.data[i].order_status == "delivered")
        $scope.completed.push(getOrders.data[i])
    }

    console.log($scope.upcoming);
    console.log($scope.completed);

  })


  /**************
   * CARDS
   **************/
  .controller('CardsCtrl', function($scope, $stateParams,getCards,$ionicModal,cardService) {

    $scope.cardData = {};
    $scope.cards = getCards.data;

    $scope.openModal = function(product) {
      $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('templates/addCard.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.addCard = function(){
      cardService.create($scope.cardData).then(function(data){
        $scope.cards.push(data.data);
        $scope.modal.hide();
      }, function(error){
        console.log('Upss there was an error',error);
      })
    };

    $scope.removeCard = function(card,index){
      cardService.destroy(card.id).then(function(data){
        $scope.cards.splice(index,1);
      })
    }

  })

  /**************
   * SHOP
   **************/
  .controller('ShopCtrl', function($scope, $stateParams,getStores,getCategories) {

    $scope.selectedStore = {};
    $scope.stores = getStores.data;

    $scope.changeStore = function(){
      var cart = {products: []};
      localStorage.setItem('cart',JSON.stringify(cart));
      localStorage.setItem('storeId',$scope.selectedStore.store);
    };

    $scope.categories = getCategories.data;
  })

  /**************
   * CART
   **************/
  .controller('CartCtrl', function($scope, $stateParams,storeService,$ionicModal,getCards,orderService) {
    $scope.cart = JSON.parse(localStorage.getItem('cart'));
    console.log($scope.cart);

    function getTotal() {
      var price = 0;
      for (var i =0; i < $scope.cart.products.length; ++i){
        price += $scope.cart.products[i].price * $scope.cart.products[i].quantity;
      }
      return price;
    }

    $scope.removeObject = function(index){
      $scope.cart.products.splice(index,1);
      localStorage.setItem('cart',JSON.stringify($scope.cart));
      $scope.total = getTotal();
    };

    $scope.total = getTotal();

    var storeId = localStorage.getItem('storeId');
    if (storeId)
      storeService.get(storeId).then(function(data){
        $scope.store = data.data;
      });

    $scope.confirmOrder = function(){
      if ($scope.cart.products.length > 0)
        $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('templates/cart.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.cards = getCards.data;

    $scope.orderData = {};

    $scope.confirm = function(){
      var orderData = {
        store_id: storeId,
        price: $scope.total,
        order_status: "received",
        pickup: $scope.orderData.pickup,
        card_id: $scope.orderData.card_id,
        method: $scope.orderData.method
      };
      var products = JSON.parse(localStorage.getItem('cart'));
      orderService.create(orderData,products).then(function(data){
        localStorage.setItem('user',JSON.stringify(data.data.user));
        var cart = {products: []};
        localStorage.setItem('cart',JSON.stringify(cart));
        $scope.cart = {products: []};
        $scope.modal.hide();
      }, function(error){
        console.log('errror',error);
      });

    }


  })

  .controller('ProductsCtrl', function($scope, $stateParams,getProducts,$ionicModal) {
    $scope.products = getProducts.data;

    $scope.openModal = function(product) {
      $scope.modalData = product;
      $scope.modal.show();

    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.addToCart = function(product,quantity){
      var cart = JSON.parse(localStorage.getItem('cart'));
      var products = cart.products;
      var new_product = {
        id: product.product_id,
        name: product.product.name,
        price: product.product.price,
        quantity: quantity
      };
      products.push(new_product);
      cart = {products: products};
      localStorage.setItem('cart',JSON.stringify(cart));
      $scope.modal.hide();
    }

  })


  .controller('ProfileCtrl', function($scope, $stateParams) {
    $scope.user = JSON.parse(localStorage.getItem('user'));
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
          localStorage.setItem('user',JSON.stringify(data.data.user));
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
        sex: $scope.registerData.sex
      };
      var user = {
        user: userData
      };
      registerService.register(user).then(function(data){
        console.log(data);
        $location.url('/login');
      }, function(error){
        console.log('ERROR',error);
      });
    }
  });
