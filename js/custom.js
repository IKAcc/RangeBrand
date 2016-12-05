function glass(element, amount){

  var regEx = /(rgb)\(([0-9]+),\s+([0-9]+),\s+([0-9]+)/;
  var currentColor = $(element).css('background-color');
  var str = 'rgba($2,$3,$4,' + (amount / 100).toString();
  var newColor = currentColor.replace(regEx, str);
  return newColor;
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
