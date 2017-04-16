angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $location) {
  $scope.goShoppingCart = function(){
    $location.url('/app/cart');
  }
})


.controller('HomeCtrl', function($scope, $stateParams) {
})

  .controller('HistoryCtrl', function($scope, $stateParams) {
  })

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

  .controller('CartCtrl', function($scope, $stateParams) {
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
