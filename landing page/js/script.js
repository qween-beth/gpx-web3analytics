
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow'); 
		}); 
		/*END PRELOADER JS*/		
			 	
		function windowScroll() {
			const navbar = document.getElementById("navbar");
			if (
				document.body.scrollTop >= 50 ||
				document.documentElement.scrollTop >= 50
			) {
				navbar.classList.add("nav-sticky");
			} else {
				navbar.classList.remove("nav-sticky");
			}
		}

		window.addEventListener('scroll', (ev) => {
			ev.preventDefault();
			windowScroll();
		})	  	 
		
	}); 	 
    
})(jQuery);
 

$('.owl-two').owlCarousel({
    loop:true,
    margin:0,
    responsiveClass:true,
    dots: false,
    responsive:{
        0:{
            items:1,
            nav:true,
            loop:true,
            autoplay:true,
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:true,
            autoplay:true, 
            nav: false,
            dots: true,
            autoplayTimeout: 2200,
        }
    }
});


// bottom to up
$(window).on('scroll', function () { 
    var scrolled = $(window).scrollTop();
    if (scrolled > 400) $('.go-top').addClass('active');
    if (scrolled < 400) $('.go-top').removeClass('active');
});


$('.go-top').on('click', function () {
    $("html, body").animate({
        scrollTop: "0"
    }, 50);
});


$('#navbarSupportedContent .nav-item .nav-link').on('click', function(){
    $('.navbar-collapse').collapse('hide');
})
