angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'CustomerService', 'ListingService'])
.filter('reverse', function() {
  return function(items) {
    if(!angular.isArray(items)) { return items; }
    return items.slice().reverse();
  };
});;