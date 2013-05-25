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


function IndexCtrl($scope, $location) {
  $scope.goToRoot = function() {
    $location.path('/');
  }
}


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
      },
      summary: function() {
        if (this.itemCount() > 0) {
          return this.name
            + " - $" + this.total().toFixed(2)
            + " (" + this.itemCount() + ")";
        } else {
          return this.name;
        }
      }
    };
  }

  $scope.addItemToPeople = function() {
    var people = $('input.person[type="checkbox"]:checked');
    var oneEach = $('#multiply.active').length > 0;
    var name = $('#inputItemName').val();
    var price = parseFloat($('#inputItemPrice').val());

    angular.forEach(people, function(person) {
      $scope.people[person.id].items.push({
        name: name,
        price: oneEach ? price : (price / people.length)
      });
    });
    $scope.resetFields();
  };

  $scope.resetFields = function() {
    $('#inputItemName').val('');
    $('#inputItemPrice').val('');
    $('input.person[type="checkbox"]').prop("checked", false);
  }
}
