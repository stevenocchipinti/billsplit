angular.module('billSplit', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {
        controller:EntryCtrl,
        templateUrl:'entry.html'
      }).
      when('/calculator/:numberOfPeople', {
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
  $scope.people = {};
  for(var i=1 ; i<=$routeParams.numberOfPeople ; i++) {
    $scope.people[i] = {
      id: i,
      name: "Person " + i,
      items: [],
      itemCount: function() {
        var count = 0;
        angular.forEach(this.items, function(item) { count++ });
        return count;
      },
      total: function() {
        var total = 0.00;
        angular.forEach(this.items, function(item) { total += item.price });
        return total;
      }
    };
  }

  $scope.addItemToPeople = function() {
    angular.forEach($('input.person[type="checkbox"]:checked'), function(person) {
      $scope.people[person.id].items.push({
        name: $('#inputItemName'),
        price: parseFloat($('#inputItemPrice').val())
      });
    });
    $scope.resetFields();
  };

  $scope.resetFields = function() {
    $('#inputItemName').val('');
    $('#inputItemPrice').val('1');
    $('input.person[type="checkbox"]').prop("checked", false);
  }
}
