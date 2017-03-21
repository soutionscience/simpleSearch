NarrowItDownController.$inject= ['$scope' , 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService){

$scope.name = MenuSearchService.data;
};