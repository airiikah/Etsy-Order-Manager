angular.module('ListingService', []).factory('Listing', ['$http', '$filter', function($http, $filter) {

var o = {
  listings : []
}

function getAllListings(){
 return o.listings;
}

function getNickname(ppc){
  return o.nicknameMap[ppc-1];
}

function getListing(id){
 return $filter('filter')(o.listings, {listing_id: id})[0];
}

function incrementListing(listing){
  for (var i=0; i < o.listings.length; i++) {
    if (o.listings[i].listing_id == listing.listing_id) {
      o.listings[i].completed++;
      break;
    }
  }
}

function decrementListing(listing){
      //if (amount == undefined) amount = 1;
      for (var i=0; i < o.listings.length; i++) {
        if (o.listings[i].listing_id == listing.listing_id) {
          o.listings[i].completed--;
          break;
        }
      }
    }

    o.getAllListings = getAllListings;
    o.incrementListing = incrementListing;
    o.decrementListing = decrementListing;
    o.getListing = getListing;
    o.getNickname = getNickname;

    o.nicknameMap = ['Terras', 'Payday', 'Cleaning', 'Shoes & Weights', 'Hard Days', 'Movie Night', 'Lazy Day', 'Pay Bills', 'No Spend', 'Dogs Assorted', 'Baking', 'Terra Coffee', 'Grocery Shopping', 'Laundry Baskets', 'Vintage Beauty', 'Hair Salon', 'Laundry', 'Hydrate 1', 'Books & Coffee', 'Terra Cleaning', 'Terra Lazy', 'Gym', 'Mail & Packages', 'Doctor Appt.', 'Study', 'Typewriter Boxes', 'Terra Morning', 'Sewing', 'Typewriters & Phones', 'Nightmare 1', 'Bathtubs', 'Shopping', 'Garbage', 'Mail', 'Morning', 'Eyemasks & Alarms', 'Grocery Bags', 'Mermaid', 'Hump Day', 'Scissors & Dryers', 'Balloons', 'Terra with Cat', 'Pizza', 'Birthday', 'Teapots', 'Coffee', 'Sticky "Don\'t Forget"', 'TV boxes', 'Terra Vintage', 'Diamond Boxes', 'Credit Cards', 'Donut Boxes', 'Happy Mail', 'Mailboxes', 'Yoga', 'Cat', 'School', 'Pin Cushions', 'Sewing Machines', 'Breakfast', 'Piggy Banks', 'Weight Scales', 'Nail Polish', 'Period Tracker', 'Syringes', 'Tickets & 3D Glasses', 'Televisions', 'Coke & Pepsi', 'Stethoscopes', 'Cats Assorted', 'Pinatas', 'Graduation', 'Terra Mail', 'Terra Mirror', 'Dogs', 'Friends & Facemasks', 'Laptops', 'Magazines', 'Cat food', 'Terra Sewing', 'Mermaid Boxes', 'Lipstick & Kisses', 'Sloth Slow Day', 'Lashes & Blush', 'Pizza Slices', 'Pill Bottles', 'Yoga Mats', 'Feed Dog', 'Hydrate 2', 'Gold Balloon Letters', 'Toothpaste & Brushes', 'Lemon Slice Boxes', 'Milk & Cereal', 'Month Pregnancy Tracker', 'Week Pregnancy Tracker', 'Terra Mermaid', 'Spa Day', 'Terra Baking', 'Mini Terras', 'St. Patrick\'s Day', 'Easter Kit'];


    return o;

  }]);