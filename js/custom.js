(function( $ ) {

  $('.donate').on('click', function(event) {

    $('body').toast({
      content: 'اووه! <br> متاسفانه الان نمیشه حمایت کرد :(',
      backgroundColor: 'red-darken-1'
    })

    event.preventDefault();
  })

}( jQuery ));
