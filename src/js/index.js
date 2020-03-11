import 'owl.carousel';

import Blazy from 'blazy';

// import '@fancyapps/fancybox';

import Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";

import intlTelInput from 'intl-tel-input'

import untils from 'intl-tel-input/build/js/utils'

// import "jquery-ui/ui/widgets/slider";

// import "@fancyapps/fancybox/dist/jquery.fancybox.min";

// import "slick-slider/slick/slick.min";

// import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'

// Inputmask({"mask": "+7 (999) 999 - 99 - 99"}).mask('.phone');

import AOS from "aos"




$(document).ready(function () {

    $('.mini-popup__close').click(function () {
        $(this).closest('.mini-popup').toggleClass('open');
    });

    if($('#phone').length > 0) {

        var input = document.querySelector("#phone");
        intlTelInput(input, {
            separateDialCode: true,
            // utilsScript: "/js/utils.js?18",
            utilsScript: untils,
        });
        var num = $('#phone').attr('placeholder').replace(/[0-9]/g, '9');
        Inputmask({"mask": num}).mask('#phone');
        $('#phone').attr('placeholder', 'Phone number');

        input.addEventListener("countrychange", function () {
            var num = $('#phone').attr('placeholder').replace(/[0-9]/g, '9');
            $('#phone').attr('placeholder', 'Phone number');
            Inputmask({"mask": num}).mask('#phone');
        });

        $('.contact-top__input--first').click(function () {
            var that = $(this);
            setTimeout(function () {
                that.addClass('hide-input');
            }, 50);
            $(this).next().find('.contact-top__input').focus();
        });

        $(document).on('click', function (e) {
            if ($(e.target).closest('.iti').length == 0) {
                $('.contact-top__input--first').removeClass('hide-input');
            }
        });


        // console.log(intlTelInput)

    }

    var flagAnimate = true;

    $(document).scroll(function () {

        if($(window).scrollTop() > 0){
            // console.log($(window).scrollTop());
            $('.header').addClass('header--scrolled');
        } else {
            $('.header').removeClass('header--scrolled');
        }


        if($('.faq-block').length > 0){
            var fAQ = $('.faq-block').offset().top;



            if( ($(window).scrollTop() + $(window).height() - 300 > fAQ) && flagAnimate && $(window).width() > 550 ) {


                FAQAnimation();
                flagAnimate = false;
            }
        }

    });


    function FAQAnimation() {
        var i = 2;
        var animateBlock = $('.faq-block--animate').length;
        var mTop = parseInt($('.faq-block__inner-wrap').css('margin-top'));

        var mBottom = parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom')) + 100;

        $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
        $('.faq-block--animate').last().addClass('animated');
        $('.faq-block--animate').last().find('.loaders').addClass('loader');


        var faqInterval = setInterval(function () {
            var mTop = parseInt($('.faq-block__inner-wrap').css('margin-top'));

            if(i === animateBlock){
                $('.faq-block__inner-wrap').css('margin-top', 0);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader2');
                clearInterval(faqInterval);
                return;
            }

            if(i%2 === 0){
                var mBottom = parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom'));

                // $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height());
                $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader2');
            } else {
                var mBottom = i === 1 ?
                    parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom')) + 100 :
                    parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom'));

                $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader');
            }

            i = i+1;
        }, 3000);
    }

    if($(window).width() < 550){
        $('.how-it-work__top-item').click(function () {
            $('.how-it-work__top-img').css('opacity', '0');
            $(this).find('.how-it-work__top-img').css('opacity', '1');

            $('.how-it-work__item').css('display', 'none');
            $('.how-it-work__item').eq($(this).index()).css('display', 'block');
        });
    }


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

        if($(this).closest('.what-we-do__mobile-2-wrap').length > 0 && !$(this).closest('.what-we-do__mobile-2-wrap').hasClass('active')){
            $('.what-we-do__mobile-2-wrap').removeClass('active');
            $(this).closest('.what-we-do__mobile-2-wrap').addClass('active');
            $('.what-we-do__mobile-2-wrap').find('.what-we-do__mobile-items').slideUp();
            $(this).closest('.what-we-do__mobile-2-wrap').find('.what-we-do__mobile-items').slideDown();
        }
    });












    // contact
    $(document).on('click', '.contact-form__checked-link', function (e){
        $('.contact-form__checked-link').removeClass('active');
        $(this).addClass('active');
    });


    // contact end


    AOS.init({
        duration: 800,
        offset: 200,
        once: true
    });


    $(document).on('click', '.subscribe-block__form .site-btn', function(e){
        e.preventDefault();
        var that = $(this).closest('.subscribe-block__form');
        if(that.find('input').val() == '') {
            $(that).addClass('error');
        } else {
            $(that).removeClass('error');
        }
    });

    $(document).on('click', '.contact-form__btn', function(e){
        e.preventDefault();
        var that = $(this).closest('.contact-form');
        that.find('input').each(function () {
            if($(this).val() == '') {
                $(this).closest('.contact-form__row').addClass('error');
            } else {
                $(this).closest('.contact-form__row').removeClass('error');
            }
        });
        that.find('textarea').each(function () {
            if($(this).val() == '') {
                $(this).closest('.contact-form__row').addClass('error');
            } else {
                $(this).closest('.contact-form__row').removeClass('error');
            }
        });

    });

});

