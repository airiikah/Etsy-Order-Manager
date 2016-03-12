angular.module('MainCtrl', ['CustomerService', 'ListingService']).controller('MainController', function($scope, Customer, Listing) {

	$scope.date = 'Date';
	$scope.customers = Customer.customers;
	$scope.listings = Listing.listings;
	$scope.message = 'Messages here';
	$scope.checkedinfo = Customer.customers[0].listings[1];


	// CUSTOMER =========================================

    $scope.toggleCheckCustomer = function(customer){

    	if (customer.done == true) {
    		Customer.unCheckCustomer(customer);
    		$scope.message = customer.name+' - '+'done? '+customer.done;
    	}

    	else {
    		Customer.checkOffCustomer(customer);
    		$scope.message = customer.name+' - '+'done? '+customer.done;
    	}
    }

    // LISTINGS =========================================

    $scope.toggleCheckListing = function(customer, listing, checkbox){

    	console.log('this', $(checkbox.currentTarget).hasClass('fa-square-o') )

    	if (!$(checkbox.currentTarget).hasClass('fa-square-o')) {

    		Listing.decrementListing(listing);
    		Customer.unCheckListing(customer, listing);
    		Customer.markCustomerAsNotDone(customer);

    		// if all of the customers listings have been checked, then check off the customer
    		if (Customer.allListingsChecked(customer)){
    			Customer.markCustomerAsDone(customer);
    		}
    		else Customer.markCustomerAsNotDone(customer);

    		$scope.message = customer.name+' - '+'done? '+customer.done;
    		$scope.message2 = listing.nickname+' - '+'done? '+listing.done;
    	}

    	else {
    		Listing.incrementListing(listing);
    		Customer.checkOffListing(customer, listing);

    		// if all of the customers listings have been checked, then check off the customer
    		if (Customer.allListingsChecked(customer)){
    			Customer.markCustomerAsDone(customer);
    		}
    		else Customer.markCustomerAsNotDone(customer);


    		$scope.message = customer.name+' - '+'done? '+customer.done;
    		$scope.message2 = listing.nickname+' - '+'done? '+listing.done;
    	}
    }

    	// helpers
	$scope.range = function(n) {
        return new Array(n);
    };

});