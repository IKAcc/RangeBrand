function glass(element, amount){

  var regEx = /(rgb)\(([0-9]+),\s+([0-9]+),\s+([0-9]+)/;
  var currentColor = $(element).css('background-color');
  var str = 'rgba($2,$3,$4,' + (amount / 100).toString();
  var newColor = currentColor.replace(regEx, str);
  return newColor;
}

// Doing the Search
$('#search input[type="text"]').val('');
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

   if ( $('#brands').find('.brand').not('.hidden').length == 0) { // Show/Hide no match alert
      if (!$('#brands #failed').length) {
         $('#brands > .joqd').append(
            '<div id="failed" class="joqd align-center">' +
               '<i class="gb gb_warning gb_s48 joqd grey-lighten-1-text"></i>' +
               '<p class="joqd grey-lighten-1-text no-margin">متاسفانه نتیجه‌ای یافت نشد</p>' +
               '<a href="https://github.com/IKAcc/RangeBrand/issues" title="ایشوهای رنگـ‌برند در گیتهاب" class="joqd link small purple-text purple-darken-2-text-hover" target="_blank">درخواست اضافه شدن این برند را دهید!</a>' +
            '</div>'
         )
      }
   } else {
      $('#failed').remove();
   }
}

(function( $ ) {

  $('.donate').on('click', function(event) {

    $('body').toast({
      content: 'اووه! <br> متاسفانه الان نمیشه حمایت کرد :(',
      backgroundColor: 'red-darken-1'
    })

    event.preventDefault();
  })

}( jQuery ));
