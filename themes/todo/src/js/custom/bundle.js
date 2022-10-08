
jQuery(document).ready(function ($) {


    /* JQuery
    ------------------------------------- */

    jQuery('.item').on('click', function () {
        jQuery(this).find('.rl-gallery-caption').toggleClass('active');
    });	
});