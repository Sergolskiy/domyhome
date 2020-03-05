import 'owl.carousel';

import Blazy from 'blazy';

// import '@fancyapps/fancybox';

import Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";

// import "jquery-ui/ui/widgets/slider";

// import "@fancyapps/fancybox/dist/jquery.fancybox.min";

// import "slick-slider/slick/slick.min";

// import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'

// Inputmask({"mask": "+7 (999) 999 - 99 - 99"}).mask('.phone');




$(document).ready(function () {


    $(document).scroll(function () {
        if($(window).scrollTop() > 0){
            console.log($(window).scrollTop());
            $('.header').addClass('header--scrolled');
        } else {
            $('.header').removeClass('header--scrolled');
        }
    });

    $('.mobile-menu-btn__link').click(function () {
        $('.header__menu').toggleClass('header__menu--open');
        $('.mobile-menu-btn__link').toggleClass('mobile-menu-btn__link--open');
        $('.header').toggleClass('open-menu');
    });

    $('.home-slider__items').owlCarousel({
        items: 1,
        nav: true,
        dots: true
    });

    $('.what-we-do__mobile-tab').click(function () {

        $('.what-we-do__mobile-tab').removeClass('active');
        $(this).addClass('active');

        $('.what-we-do__mobile-item').removeClass('active');
        $('.what-we-do__mobile-item').eq($(this).index()).addClass('active');
    });


});

