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

    $('.big-popup__close').click(function (e) {
        $(this).closest('.big-popup').toggleClass('open');
    });

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
        var num2 = $('#phone').attr('placeholder').replace(/[0-9]/g, '_');
        $('#phone').attr('placeholder', num2);
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
            console.log($('.contact-top__input').val());
            if ($(e.target).closest('.iti').length == 0 && $('#phone').val().length == 0) {
                $('.contact-top__input--first').removeClass('hide-input');
            }
        });



        // console.log(intlTelInput)

    }

    var flagAnimate = true;

    // $('.faq-block__inner-wrap').css('margin-top', (-$('.faq-block__inner-wrap').height()-200));
    // if($(window).width() < 550 ){
    //     $('.faq-block__inner-wrap').css('margin-top', (-$('.faq-block__inner-wrap').height()-200));
    // }


    $(document).scroll(function () {

        if($(window).scrollTop() > 10){
            // console.log($(window).scrollTop());
            $('.header').addClass('header--scrolled');
        } else {
            $('.header').removeClass('header--scrolled');
        }

        if($(window).scrollTop() < 0){
            $('.header').removeClass('header--scrolled');
        }

        // if($('.faq-block').length > 0){
        //     var fAQ = $('.faq-block').offset().top;
        //
        //
        //
        //     if( ($(window).scrollTop() + $(window).height() - 300 > fAQ) && flagAnimate ) {
        //
        //
        //
        //         setTimeout(function () {
        //             FAQAnimation();
        //         }, 100);
        //         flagAnimate = false;
        //     }
        // }

    });


    function FAQAnimation() {
        var i = 2;
        var animateBlock = $('.faq-block--animate').length;
        var mTop = parseInt($('.faq-block__inner-wrap').css('margin-top'));

        var mBottom = parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom')) + 100;

        $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
        $('.faq-block--animate').last().addClass('animated');
        $('.faq-block--animate').last().find('.loaders').addClass('loader2');


        var faqInterval = setInterval(function () {
            var mTop = parseInt($('.faq-block__inner-wrap').css('margin-top'));

            if(i === animateBlock){
                $('.faq-block__inner-wrap').css('margin-top', 0);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader');
                clearInterval(faqInterval);
                return;
            }

            if(i%2 === 0){
                var mBottom = parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom'));

                // $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height());
                $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader');
            } else {
                var mBottom = i === 1 ?
                    parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom')) + 100 :
                    parseInt($('.faq-block--animate').eq(animateBlock - i).css('margin-bottom'));

                $('.faq-block__inner-wrap').css('margin-top', mTop + $('.faq-block--animate').eq(i).height() + mBottom);
                $('.faq-block--animate').eq(animateBlock - i).addClass('animated');
                $('.faq-block--animate').eq(animateBlock - i).find('.loaders').addClass('loader2');
            }

            i = i+1;
        }, 3000);
    }

    if($(window).width() < 550){
        $('.how-it-work__top-item').click(function () {
            $('.how-it-work__top-img').css('opacity', '0');
            $('.how-it-work__top-step').css('opacity', '0.5');
            $(this).find('.how-it-work__top-img').css('opacity', '1');
            $(this).find('.how-it-work__top-step').css('opacity', '1');

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






    var bLazy = new Blazy();





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
        if($(this).prev().hasClass('email-field')){
            var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

            if(reg.test(that.find('input').val()) == false) {
                $(that).addClass('error');
            } else {
                $(that).removeClass('error');
                $('.subscribe-success').addClass('open');
                $('.subscribe-block').hide();
            }
        } else {
            if(that.find('input').val() == '') {
                $(that).addClass('error');
            } else {
                $(that).removeClass('error');
                $('.subscribe-success').addClass('open');
                $('.subscribe-block').hide();
            }
        }

    });

    $('.email-field').keyup(function (e) {
        e.preventDefault();
        var that = $(this).closest('.subscribe-block__form');
        if(that.hasClass('error')) {
            var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

            if (reg.test(that.find('input').val()) == false) {
                $(that).addClass('error');
            } else {
                $(that).removeClass('error');
            }
        }
    });

    $('.email-field').click(function () {
        $(this).closest('.subscribe-block__form').removeClass('error');
    });

    $(document).on('click', '.contact-form__btn', function(e){
        e.preventDefault();
        var that = $(this).closest('.contact-form');
        that.find('input').each(function () {
            if($(this).hasClass('email-field')){
                var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

                if(reg.test($(this).val()) == false) {
                    $(this).closest('.contact-form__row').addClass('error');
                    $(this).closest('.contact-form__row').addClass('error');
                } else {
                    $(this).closest('.contact-form__row').removeClass('error');
                }
            } else if($(this).val() == '') {
                $(this).closest('.contact-form__row').addClass('error');
            } else {
                $(this).closest('.contact-form__row').removeClass('error');
            }

            var noi = /[а-я]/i;

            if(noi.test($(this).val()) !== false && $(this).val() !== '') {
                $(this).closest('.contact-form__row').addClass('error');
            }
        });
        that.find('textarea').each(function () {
            if($(this).val() == '') {
                $(this).closest('.contact-form__row').addClass('error');
            } else {
                $(this).closest('.contact-form__row').removeClass('error');
            }
            var noi = /[а-я]/i;
            if(noi.test($(this).val()) !== false && $(this).val() !== '') {
                $(this).closest('.contact-form__row').addClass('error');
            }
        });


        if($('.contact-form__row.error').length === 0){
            $('.contact-form').height($('.contact-form').height());
            $('.contact-form').addClass('open');
            $('.contact-form > div').hide();
            $('.form-block__success').show();
        }

    });


    $('.contact-form input, .contact-form textarea').keyup(function (e) {
        e.preventDefault();
        var that = $(this).closest('.contact-form');

            if($(this).hasClass('email-field')){
                var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

                if(reg.test($(this).val()) == false) {
                    $(this).closest('.contact-form__row').addClass('error');
                    $(this).closest('.contact-form__row').removeClass('good');
                } else {
                    $(this).closest('.contact-form__row').removeClass('error');
                    $(this).closest('.contact-form__row').addClass('good');
                }
            } else if($(this).val() == '') {
                $(this).closest('.contact-form__row').addClass('error');
                $(this).closest('.contact-form__row').removeClass('good');
            } else {
                $(this).closest('.contact-form__row').removeClass('error');
                $(this).closest('.contact-form__row').addClass('good');
            }

            var noi = /[а-я]/i;

            if(noi.test($(this).val()) !== false && $(this).val() !== '') {
                $(this).closest('.contact-form__row').addClass('error');
                $(this).closest('.contact-form__row').removeClass('good');
            }



        // that.find('textarea').each(function () {
        //     if($(this).val() == '') {
        //         $(this).closest('.contact-form__row').addClass('error');
        //     } else {
        //         $(this).closest('.contact-form__row').removeClass('error');
        //     }
        //     var noi = /[а-я]/i;
        //     if(noi.test($(this).val()) !== false && $(this).val() !== '') {
        //         $(this).closest('.contact-form__row').addClass('error');
        //     }
        // });
    });

    $('.contact-form input, .contact-form textarea').click(function (e) {
        $(this).closest('.contact-form__row').removeClass('error');
    });

    $('.contact-top__btn').click(function (e) {
        e.preventDefault();
        if($('#phone').val().length === $('#phone').attr('placeholder').length){
            $('.contact-top__form').hide();
            $('.contact-top__form-success').show();
        }
    });



    var hasWebP = (function () {
        // some small (2x1 px) test images for each feature
        var images = {
            basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
            lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
        };

        return function (feature) {
            var deferred = $.Deferred();

            $("<img>").on("load", function () {
                // the images should have these dimensions
                if (this.width === 2 && this.height === 1) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }).on("error", function () {
                deferred.reject();
            }).attr("src", images[feature || "basic"]);

            return deferred.promise();
        }
    })();

    hasWebP().then(function () {
        $('.webp-img').each(function () {
            var webp = $(this).data('webp');
            $(this).css('background-image', 'url(' + webp + ')')
        });
    }, function () {
        $('.webp-img').each(function () {
            var img = $(this).data('img');
            $(this).css('background-image', 'url(' + img + ')')
        });
    });

});

