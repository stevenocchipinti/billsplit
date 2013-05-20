angular.module('billSplit', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {
        controller:EntryCtrl,
        templateUrl:'entry.html'
      }).
      when('/calculator/:people', {
        controller:CalculatorCtrl,
        templateUrl:'calculator.html'
      }).
      otherwise({redirectTo:'/'});
  });


function EntryCtrl($scope, $location) {
  $scope.numberOfPeople = 4;
  $scope.goToCalculator = function() {
    $location.path('/calculator/' + $scope.numberOfPeople);
  }
}


function CalculatorCtrl($scope, $location, $routeParams) {
  console.log("Need to make " + $routeParams.people + " people");
}
