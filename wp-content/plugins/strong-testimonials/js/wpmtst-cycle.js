/**
 * Strong Testimonials slideshow
 */

// Function to get the max value in array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

/**
 * Set height of slideshow container and initialize Cycle after all images
 * have loaded for accurate height and width of elements.
 *
 * Using Actual plugin to get width of hidden slides. Excellent!
 * http://stackoverflow.com/a/5555792/51600
 * http://dreamerslab.com/blog/en/get-hidden-elements-width-and-height-with-jquery/
 */
jQuery(window).load(function() {

    // Shortcode and Views
    jQuery(".strong-container, .strong-view").each(function (index, elem) {

        var $el = jQuery(elem).find(".strong_cycle");
        if (!$el.length) return;

        // Set container height to match tallest element.
        var heights = $el.find("div.t-slide").map(function () {
            return jQuery(this).actual( 'outerHeight' );
        }).get();

        var maxHeight = Array.max(heights);
        $el.height(maxHeight);

        // Thanks http://stackoverflow.com/a/15505986/51600
        var cycleVar = jQuery.grep($el.prop("class").split(/\s+/), function (v, i) {
            return v.indexOf('strong_cycle_') === 0;
        }).join();

        if (typeof( window[cycleVar] ) !== 'undefined') {
            var parms = window[cycleVar];
            $el.cycle({
                slides: "> div.t-slide",
                fx: parms.effect,
                speed: parseInt(parms.speed),
                timeout: parseInt(parms.timeout),
                pause: "1" == parms.pause ? true : false,  // Cycle
                pauseOnHover: "1" == parms.pause ? true : false   // Cycle2
            });
        }

    });

    // Original Shortcode & Widgets
    jQuery("#wpmtst-container.tcycle").add(".wpmtst-widget-container.tcycle").each( function(index, elem) {

        var $elem = jQuery(elem);

        // Set container height to match tallest element.
        var heights = $elem.find("div.t-slide").map(function() {
            return jQuery(this).outerHeight(true);
        }).get();

        var maxHeight = Array.max( heights );
        $elem.height( maxHeight );

        var cycleVar = jQuery.grep(elem.className.split(/\s+/), function(v, i){
            return v.indexOf('tcycle_') === 0;
        }).join();

        if( typeof( window[cycleVar] ) !== 'undefined' ) {
            var parms = window[cycleVar];
            $elem.cycle({
                slides       : "> div.t-slide",
                fx           : parms.effect,
                speed        : parseInt( parms.speed ),
                timeout      : parseInt( parms.timeout ),
                pause        : "1" == parms.pause ? true : false,  // Cycle
                pauseOnHover : "1" == parms.pause ? true : false   // Cycle2
            });
        }

    });

});
