app.controller('NarrowItDownController', ['$scope','$http', 'MenuSearchService', function($scope, $http, MenuSearchService){

	$scope.test = MenuSearchService.server;
	console.log($scope.test);
	$http({
		method : "Get",
		url: "https://davids-restaurant.herokuapp.com/menu_items.json"
	}).then(function success(responce){
		$scope.categories = responce.data;
		$scope.length = responce.data;
		console.log($scope.length);
	}, function error(){
		console.log("shit!!!");
	}
	)
	
}])