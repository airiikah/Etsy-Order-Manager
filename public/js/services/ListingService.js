angular.module('ListingService', []).factory('Listing', ['$http', '$filter', function($http, $filter) {

	var o = {

		listings : [

			{
				id: 1, nickname: 'Movie Night', completed: 0, total: 3
			},
			{
				id: 2, nickname: 'Terra Coffee', completed: 0, total: 3
			},
      {
        id: 3, nickname: 'Rainy Day', completed: 0, total: 3
      }

		] 
  };

    function getAllListings(){
    	return o.listings;
    }

    function getListing(id){
    	return $filter('filter')(o.listings, {id: id})[0];
    }

    function incrementListing(listing){
        for (var i=0; i < o.listings.length; i++) {
          if (o.listings[i].id == listing.id) {
            o.listings[i].completed++;
            break;
          }
        }
    }

    function decrementListing(listing){
      //if (amount == undefined) amount = 1;
        for (var i=0; i < o.listings.length; i++) {
          if (o.listings[i].id == listing.id) {
              o.listings[i].completed--;
              break;
          }
        }
    }

   o.getAllListings = getAllListings;
   o.incrementListing = incrementListing;
   o.decrementListing = decrementListing;
   o.getListing = getListing;

    return o;

}]);