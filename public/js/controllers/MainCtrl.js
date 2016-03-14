angular.module('MainCtrl', ['CustomerService', 'ListingService']).controller('MainController', function($scope, $http, Customer, Listing) {

	$scope.customers = Customer.customers;
    $scope.listings = Listing.listings;
    $scope.chosen_date = '';
    $scope.ship_date = '';
    $scope.loading = false;
    $scope.error = '';


    // DATE PICKER LISTENER 

    $('#datetimepicker1').on('dp.change', function(e){

        $('#ship_date').text(e.date.format('dddd, MMMM Do'));
        $('#chosen_date').text(e.date);
        $scope.loading = true;

        angular.element('#MainController').scope().getReceipts(e.date.toDate(), true )
            .success(function(){
                $scope.loading = false;
            })
            .error(function(e){
                $scope.error = e;
            });
    })

    Date.prototype.addDays = function(days)
    {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    function clear(){
        Customer.customers.length = 0;
        Listing.listings.length = 0;
    }

    function getShipByDate(timestamp){
        var offset = 2;
        var date = new Date( new Date(timestamp*1000).getTime() + offset * 3600 * 1000);

        switch(date.getDay()) {
            case 3:
                return date.addDays(5).getDate();
            case 4:
                return date.addDays(5).getDate();
            case 5:
                return date.addDays(5).getDate();
            case 6:
                return date.addDays(4).getDate();
            default:
                return date.addDays(3).getDate();
        }
    }

    $scope.getReceipts = function(chosen_date, toFormat){

        clear();

        return $http.get('/getReceipts')
            .success(function(data) {

                if (toFormat)
                    storeData(data, formatDate(chosen_date));
                else 
                    storeData(data, chosen_date);

                $scope.loading = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    }

    function findTotal(receipts, listingId, shipByDate){


        var numOfListing = 0;
        receipts.forEach( function(receipt) {

            receipt.Transactions.forEach( function(transaction) {

                    if(transaction.listing_id == listingId && (getShipByDate(transaction.creation_tsz) == shipByDate) ){
                        numOfListing += transaction.quantity;
                    }
            })

        }) 
        return numOfListing;

    }

    function createProgressListings(receipts, shipByDate){

        receipts.forEach( function(receipt) {

            receipt.Transactions.forEach( function(transaction) {

                var ppc = getPPC(transaction.title);

                var theTotal = findTotal(receipts, transaction.listing_id, shipByDate);

                if (! Listing.getListing(transaction.listing_id) && (getShipByDate(transaction.creation_tsz) == shipByDate) ){

                    var nickname = Listing.getNickname(Number(ppc));
                    Listing.listings.push({ppc: ppc, nickname: nickname, listing_id: transaction.listing_id, completed: 0, total: theTotal, variation: transaction.variations, allvariations: []});

                }
                if ( getShipByDate(transaction.creation_tsz) == shipByDate )
                    Listing.addVariations(transaction.listing_id, transaction.variations, transaction.quantity);

            })
        })
    }



    function storeData(receipts, shipByDate){
        createProgressListings(receipts, shipByDate);

        var customer_id = 1;
        receipts.forEach( function(receipt){
            var id = customer_id;
            var name = receipt.name;
            var note = receipt.message_from_buyer;
            var done = false;

            var listings = [];
            receipt.Transactions.forEach( function(transaction){
                var listing_id = transaction.listing_id;
                var ppc = getPPC(transaction.title);

                if (!Customer.getListing(customer_id, listing_id) && (getShipByDate(transaction.creation_tsz) == shipByDate) ){
                    var theTotal = findTotal(receipts, transaction.listing_id);
                    var nickname = Listing.getNickname(Number(ppc));

                    listings.push( {listing_id: listing_id, ppc: ppc, nickname: nickname, done: false, checked: 0, quantity: transaction.quantity, total: theTotal, variations: transaction.variations} );
                }

            });
            if (listings.length != 0){
                Customer.addCustomer({id: id, name: name, note: note, listings: listings, done, done});
                customer_id++;
            }
        });

    }

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

    	if (!$(checkbox.currentTarget).hasClass('fa-square-o')) {

    		Listing.decrementListing(listing);
    		Customer.unCheckListing(customer, listing);
    		Customer.markCustomerAsNotDone(customer);

    		// if all of the customers listings have been checked, then check off the customer
    		if (Customer.allListingsChecked(customer)){
    			Customer.markCustomerAsDone(customer);
    		}
    		else Customer.markCustomerAsNotDone(customer);
    	}

    	else {
    		Listing.incrementListing(listing);
    		Customer.checkOffListing(customer, listing);

    		// if all of the customers listings have been checked, then check off the customer
    		if (Customer.allListingsChecked(customer)){
    			Customer.markCustomerAsDone(customer);
    		}
    		else Customer.markCustomerAsNotDone(customer);
    	}
    }

    // helpers ================================

	$scope.range = function(n) {
        return new Array(n);
    };

    function formatDate(date){
        return date.getUTCDate();
    }

    function getPPC(str){
        var re = /PPC[0-9]+/g; 
        var m;
        var ppc = 0;
        while ((m = re.exec(str)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            ppc = m[0];
            ppc = ppc.replace('PPC', '');
        }
        return ppc;
    }

    // fill view with tomorrow's data

    function init(){
        $scope.loading = true;
        var tomorrow = new Date().addDays(1).getDate();
        $scope.ship_date = 'Tomorrow';
        $scope.getReceipts(tomorrow, false )
        .success(function(){
            $scope.loading = false;
        });
    }

    init();

});