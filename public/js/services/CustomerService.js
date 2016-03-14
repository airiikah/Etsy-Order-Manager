angular.module('CustomerService', ['ListingService']).factory('Customer', ['$http', '$filter', 'Listing', function($http, $filter, Listing) {

    var o = {
        customers: []
    }

    function getAllCustomers(){
    	return o.customers;
    }

    function getCustomer(id){
         return $filter('filter')(o.customers, {id: id})[0];
    }

    function getListing(customer_id, id){
        var customer = getCustomer(customer_id);
        if (customer){
            return $filter('filter')(customer.listings, {listing_id: id})[0];
        }
        return false;
        
    }

    function markCustomerAsDone(customer){
        for (var i=0; i < o.customers.length; i++) {
          if (o.customers[i].id == customer.id) {
            o.customers[i].done = true;
            break;
          }
        }
    }

    function markCustomerAsNotDone(customer){
        for (var i=0; i < o.customers.length; i++) {
          if (o.customers[i].id == customer.id) {
            o.customers[i].done = false;
            break;
          }
        }
    }

    function checkOffCustomer(customer){

        // check off all their listings
        unCheckCustomer(customer);

         customer.listings.forEach(function(listing){
            if (!listing.done){

                var amount = listing.quantity;

                for(var i = 0; i < amount; i++){

                    Listing.incrementListing(listing);
                    checkOffListing(customer, listing);

                }
            }
        })

        for (var i=0; i < o.customers.length; i++) {
          if (o.customers[i].id == customer.id) {
            o.customers[i].done = true;
            break;
          }
        }
    }

    function unCheckCustomer(customer){

        // uncheck all their listings
        //customer.listings.forEach(function(listing){
        for(var j = 0; j < customer.listings.length; j++){

            var curr = customer.listings[j];
            var amount = customer.listings[j].checked;

            console.log('doing', curr.nickname)

            for(var i = 0; i < amount; i++){
                console.log('loop', curr);
                console.log('i', i)
                unCheckListing(customer, curr);
                Listing.decrementListing(curr)
            }

        }

        for (var i=0; i < o.customers.length; i++) {
          if (o.customers[i].id == customer.id) {
            o.customers[i].done = false;
            break;
          }
        }
    }

    function checkOffListing(customer, listing){
        console.log('checkOffListing: customer=', customer)
        for (var i=0; i < o.customers.length; i++) {

          if (o.customers[i].id == customer.id) {

            for (var j=0; j < o.customers[i].listings.length; j++) {

                if (o.customers[i].listings[j].listing_id == listing.listing_id) {

                    o.customers[i].listings[j].checked++;

                    if (listing.quantity - listing.checked == 0){
                        o.customers[i].listings[j].done = true;
                        break;
                    }
                    
                }
            }
            break;
          }
        }
    }

    function unCheckListing(customer, listing){
        for (var i=0; i < o.customers.length; i++) {
          if (o.customers[i].id == customer.id) {
            for (var j=0; j < o.customers[i].listings.length; j++) {
                if (o.customers[i].listings[j].listing_id == listing.listing_id) {

                    o.customers[i].listings[j].checked--;
                    o.customers[i].listings[j].done = false;
                    break;
                }
            }
            break;
          }
        }
    }

    function allListingsChecked(customer){
        for (var i=0; i < customer.listings.length; i++) {
            if (!customer.listings[i].done) return false;
        }
        return true;
    }

    function addCustomer(customer){
        o.customers.push(customer);
    }


   o.getAllCustomers = getAllCustomers;
   o.checkOffCustomer = checkOffCustomer;
   o.unCheckCustomer = unCheckCustomer;
   o.checkOffListing = checkOffListing;
   o.unCheckListing = unCheckListing;
   o.allListingsChecked = allListingsChecked;
   o.markCustomerAsDone = markCustomerAsDone;
   o.markCustomerAsNotDone = markCustomerAsNotDone;
   o.addCustomer = addCustomer;
   o.getListing = getListing;
   o.getCustomer = getCustomer;

    return o;

}]);