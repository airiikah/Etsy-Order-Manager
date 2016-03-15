// $(document).on("click", "#clear_completed", function() {
// 	//alert('hey')
// 	$('.fa-check-square-o').hide();
// });

$(document).on("click", "i", function() {
  console.log($(this));

  /// ============================== CUSTOMER CHECKBOX ========================================
  if ($(this).hasClass('customer_checkbox')){
	var parent = $(this).parent(); // surrounding div


  	// ============ If it IS CHECKED =================
  	if ($(this).hasClass('fa-check-square-o')){ 

  		parent.children().find('i').each(function(i){ // iterate through the icons
	  		$(this).removeClass('fa-check-square-o');
	  		$(this).addClass('fa-square-o');
	  		console.log($(this))
	  	});
  	}


  	// ============ If it's NOT CHECKED =================
  	else { 

	  	parent.children().find('i').each(function(i){ // iterate through the icons
	  		$(this).addClass('fa-check-square-o');
	  		$(this).removeClass('fa-square-o');
	  		console.log($(this))
	  	});
	}


	// toggle no matter what becuase it was clicked
	$(this).toggleClass('fa-check-square-o');
  	$(this).toggleClass('fa-square-o');

  }


 /// ============================== LISTING CHECKBOX ========================================
  else if ( $(this).hasClass('listing_checkbox')){

  	// toggle no matter what because it was clicked
  	$(this).toggleClass('fa-check-square-o');
  	$(this).toggleClass('fa-square-o');


  	// Are all listing boxes checked?
  	var parent = $(this).parent().parent().parent(); // surrounding div
  	var allAreChecked = true;
  	console.log('parentttt', parent);
  	parent.find('.listing_checkbox').each(function(i){ // iterate through the icons

  		if (! $(this).hasClass('fa-check-square-o')){
  			allAreChecked = false;
  		}
	});
	console.log('all are checked?', allAreChecked)


	// if they are, then check the customer box
	if (allAreChecked){
		// parent = parent.parent().parent();
		var checkbox = parent.find('.customer_checkbox').addClass('fa-check-square-o');
		parent.find('.customer_checkbox').removeClass('fa-square-o');
	}


	// if they are not, then uncheck the customer box
	else {
		//parent = parent.parent().parent();
		var checkbox = parent.find('.customer_checkbox').removeClass('fa-check-square-o');
		parent.find('.customer_checkbox').addClass('fa-square-o');
	}


  }

});




