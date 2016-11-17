function glass(element, amount){

  var regEx = /(rgb)\(([0-9]+),\s+([0-9]+),\s+([0-9]+)/;
  var currentColor = $(element).css('background-color');
  var str = 'rgba($2,$3,$4,' + (amount / 100).toString();
  var newColor = currentColor.replace(regEx, str);
  return newColor;
}

(function( $ ) {

  // Turn RGB to Hex
  	function rgb2hex(rgb) {
  	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  	    function hex(x) {
  	        return ("0" + parseInt(x).toString(16)).slice(-2);
  	    }
  	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  	}
  // Form Check
  	var colorType = 'HEX';
  	$('#colorType input').on('change', function() {

  		var temp = $('input[name="colorCodeType"]:checked', '#colorType').val();
  		if (temp == 1) {
  			colorType = 'HEX'
  		} else if (temp == 2) {
  			colorType = 'CSS'
  		} else {
  			colorType = 'RGB'
  		}

  	});

  // Creat Color Block
  	function colorBlock(colorClass, colorCode){

  		if (colorType == 'HEX') {
  			colorCode = rgb2hex(colorCode);
  		} else if (colorType == 'CSS'){
  			colorCode = '.rb .' + colorClass
  		} else {
  			colorCode = colorCode;
  		};

  		return '<div class="joqd soft-corner colorWrapper open">\
  					<div class="joqd soft-corner color align-center rb '+ colorClass +'" lang="en">\
  						<span class="joqd white-text">'+ colorCode +'</span>\
  					</div>\
  				</div>';
  	}

  // Mouse In and Out effects
	$('.color').on('mouseenter' ,function(){

		var colorCode = $(this).css('background-color');
		var colorClass = String($(this).attr("class").match(/rb-[a-z0-9\-]*/));

		$(this).closest('.colors').append(colorBlock(colorClass, colorCode));

	});
	$(document).on('mouseleave', '.open .color', function(){

		$(this).closest('.colorWrapper').remove();

	});

	$(document).on('mouseleave', '.panel-body .row', function(){

		$(this).find('.colorWrapper.open').remove();

	});

  // Doing the Search
  	function search(){
  		var input = $('#search input[type="text"]').val();
  		var regex = new RegExp(input.replace(/[ ‌]/g, '').replace(/[آإأ]/g, 'ا').replace(/[يئ]/g, 'ی'), 'i');

  		$('#brands .brand').each(function(){

  	    	var tags = $(this).attr('data-tags').replace(/[ ‌]/g, '').replace(/[آإأ]/g, 'ا').replace(/[يئ]/g, 'ی');

  		    if (!regex.test(tags)){
  		      $(this).hide();
  		    } else{
  		    	$(this).show();
  		    }

  		});
  	}

  	$('#search input[type="text"]').keyup(function(){

  		search();

  	});

  	$('#search input[type="submit"]').on('click', function(){

  		search();

  	});
  // Clear Form
  	$('#search a').on('click', function(){

  		$(this).parent('#search').find('input[type="text"]').val('');
  		search();

  	});



  $('.donate').on('click', function(event) {

    $('body').toast({
      content: 'اووه! <br> متاسفانه الان نمیشه حمایت کرد :(',
      backgroundColor: 'red-darken-1'
    })

    event.preventDefault();
  })

}( jQuery ));
