var myApp = angular.module('App', []);

myApp.controller('AppController', ['$scope', '$http',function ($scope, $http) {
    
    $scope.customer = {};
    $scope.customers = []
    $scope.editing = false;
    
    var id = 0;
    
    $http.get('/all').
        success(function(data, status, headers, config) {
            data.forEach(function(v,i,a){a[i] = JSON.parse(v);})
            data.forEach(function(v,i,a){
                if(v.id > id) id = v.id;
                ;})
            $scope.customers = data;
    });
    
    $scope.add = function () {
        if(!$scope.editing) {
            id++;
            $scope.customer.id = id;
        }
        $scope.editing = false;
        
        $http.post('/data', JSON.stringify($scope.customer)).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.customers.push($scope.customer);
                $scope.customer = {};
          }).
            error(function(data, status, headers, config) {
                console.log("not add");
          });
    };
    
    $scope.delete = function(one) {
        
        var index = $scope.customers.indexOf(one);
        $scope.customers.splice(index, 1);
        console.log(one.id);
        $http.post('/rm', JSON.stringify(one)).
            success(function(data, status, headers, config) {
                console.log(data);
          }).
            error(function(data, status, headers, config) {
                console.log(data);
                console.log("not delete");
          });
    }
    
    $scope.edit = function(one) {
        $scope.customer = one;
        $scope.editing = true;
        var index = $scope.customers.indexOf(one);
        $scope.customers.splice(index, 1);
    }
    
    $scope.cancel = function() {
        $scope.customers.push($scope.customer);
        $scope.customer = {};
        $scope.editing = false;
    }
        

}]);
