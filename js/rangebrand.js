var jqxhr = $.getJSON( "https://raw.githubusercontent.com/IKAcc/RangeBrand/master/json/rangebrand.json", function(rangebrand) {
   console.log( "Done" );

   var data = "";

   for ( brands of Object.keys(rangebrand) ) {

     var brand = rangebrand[brands];
     var colors = '';

     for (var i = 0; i < brand.colors.length; i++) {

       if ( brand.colors.length > 1) {
         var color = brands + '-' + ( i + 1);
       } else {
         var color = brands;
       }

       colors +=
         '<div class="joqd soft-corner colorWrapper" style="width: ' + (100 / brand.colors.length) + '%">' +
           '<div class="joqd soft-corner align-center rb rb-' + color + ' color"></div>' +
         '</div>'
     }

     var tags = brand.name_fa + ',' + brand.name_en;

     data +=
       '<div class="joqd brand row thin-bottom-border grey-lighten-3-border" data-tags="' + tags + '">' +

         '<div class="joqd names desktop-3 laptop-3 tablet-12 mobile-12">' +
           '<div class="joqd nameWrapper">' +
             '<p class="joqd h4">' + brand.name_fa + '</p>' +
             '<p class="joqd h4 align-right" lang="en">' + brand.name_en + '</p>' +
           '</div>' +
         '</div>' +

         '<div class="joqd colors desktop-9 laptop-9 tablet-12 mobile-12">' +
           colors +
         '</div>' +

       '</div>'

   };

   $('#loading').remove();
   $('#brands .joqd').html(data);
})
  .done(function() {

   console.log( "complete" );

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
               $(this).addClass('hidden');
            } else{
            	$(this).removeClass('hidden');
            }

   		});

         if ( $('#brands').find('.brand').not('.hidden').length == 0 ) { // Show/Hide no match alert
            $('#brands > .joqd').append(
               '<div id="failed" class="joqd align-center">' +
                  '<i class="gb gb_warning gb_s48 joqd grey-lighten-1-text"></i>' +
                  '<p class="joqd grey-lighten-1-text no-margin">متاسفانه نتیجه‌ای یافت نشد</p>' +
               '</div>'
            )
         } else {
            $('#failed').remove();
         }
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

  })
  .fail(function() {
    console.log( "error" );

    var failed =
       '<div id="failed" class="joqd align-center">' +
         '<i class="gb gb_github gb_s48 joqd grey-lighten-1-text"></i>' +
         '<p class="joqd grey-lighten-1-text no-margin">ارتباط با گیتهاب برقرار نشد.<br><a href="javascript:location.reload()" class="joqd link purple-text purple-darken-2-text-hover small" title="بارگزاری مجدد صفحه">دوباره سعی کنید</a></p>' +
       '</div>';

    $('body').toast({
      content: '<strong class="joqd white-text">خطا!</strong></br>ارتباط با گیتهاب برقرار نشد.',
      backgroundColor: 'red-darken-1'
    })

    $('#loading').remove();
    $('#brands .joqd').html(failed);

});
