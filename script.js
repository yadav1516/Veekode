$(function() {
    "use strict";

    // Navbar sticky
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
            $('.nav-menu-container').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
            $('.nav-menu-container').removeClass('scrolled');
        }
    });

    // Smooth scroll for navigation links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 // Adjust offset for fixed navbar
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Clients Slider
    var clientsSlider = new Swiper(".clients-slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 50,
            },
        },
    });

    // Work Slider
    var workSlider = new Swiper(".work-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Mobile Work Slider
    var mobileWorkSlider = new Swiper(".mobile-work-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Tilt.js for content blocks
    $('.js-tilt').tilt({
        glare: true,
        maxGlare: .5
    });
    $('.js-tilt1').tilt({
        glare: true,
        maxGlare: .5
    });

    // Parallax effect for hero section
    var b = document.getElementsByTagName("section")[0];
    if (b) {
        b.addEventListener("mousemove", function(event) {
            parallaxed(event);
        });
    }

    function parallaxed(e) {
        var amountMovedX = (e.clientX * -0.3 / 8);
        var amountMovedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName("parallaxed");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.transform = 'translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
        }
    }

    // Fixed button visibility on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#fixButton').removeClass('hide').addClass('show');
        } else {
            $('#fixButton').removeClass('show').addClass('hide');
        }
    });

    // Modal close button icon fix (using FontAwesome)
    $('.exampleModal .btn-close').html('<i class="fa-solid fa-xmark"></i>');
});
