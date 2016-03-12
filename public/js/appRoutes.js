angular.module('appRoutes', ['CustomerService', 'ListingService']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, Customer, Listing) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})


	$locationProvider.html5Mode(true);

}]);