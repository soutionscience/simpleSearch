(function () {
    'use strict'

    var narrowItDownAppModule = angular.module('NarrowItDownApp', []);

    narrowItDownAppModule.controller('narrowItDownController', NarrowItDownController);
    narrowItDownAppModule.service('menuSearchService', MenuSearchService);
    narrowItDownAppModule.directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
             templateUrl: 'foundItems.html',
             scope: { 
                items: '<',
                onRemove: '&'
             },
             controller: FoundItemsDirectiveController,
             controllerAs: 'found',
             bindToController: true
        };
        return ddo;
    };

    function FoundItemsDirectiveController() {
        var found = this;

        found.nothingFound = function () {
                return found.items && found.items.length === 0;
            };  
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var menuSearchService = this;

        menuSearchService.getMatchedMenuItems = function(searchTerm) {

            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
                        .then(function (result) {
                            if(!searchTerm) {
                                return [];
                            }
                            var foundItems = result.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);                           
                            return foundItems;
                    });
        }
    };

    NarrowItDownController.$inject = ['menuSearchService'];
    function NarrowItDownController(menuSearchService) {
        var narrowItDownController = this;
        //narrowItDownController.found = [];

        narrowItDownController.search = function(searchTerm) {
            menuSearchService.getMatchedMenuItems(searchTerm)
                .then(result => {
                    narrowItDownController.found = result;
                });
        };

        narrowItDownController.removeItem = function(index) {
            narrowItDownController.found.splice(index, 1);
        };
    };
   
})();