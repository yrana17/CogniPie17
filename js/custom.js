(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.menu-burger').on('click', function() {
      $('.menu-bg, .menu-items, .menu-burger').toggleClass('fs');
      $('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
    });

    // Close menu when a nav link is clicked (e.g. Home, About Us)
    $('.menu-items a[href^="#"]').on('click', function() {
      $('.menu-bg, .menu-items, .menu-burger').removeClass('fs');
      $('.menu-burger').text('☰');
    });


    // Hero background: using overlay gradient only (no slide images)
    // Add your own images later via Vegas if needed:
    // $('body').vegas({ slides: [{ src: 'images/slide1.jpg' }, { src: 'images/slide2.jpg' }], timer: false });

})(jQuery);
