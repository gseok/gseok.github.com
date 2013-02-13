$(document).ready(function() {
	// accessible tabs control
	$('.jquery_tabs').accessibleTabs( { syncheight: true } );

	// timeline control
	createStoryJS({
		type:		'timeline',
		height:		'600',
		source:		'json/example_json.json',
		embed_id:	'my-timeline',
        start_at_end: true,
        start_zoom_adjust: '2'
		// debug:		true
	});

	timelineControl();
	dynamicThumbnail();
});

$(window).resize(function() {
	timelineControl();
});

function timelineControl() {
	if ( $(window).width() < 740 ) {
		console.log( 'window width : ' + $(window).width() );
		//$('#my-timeline').hide();
	} else {
		//$('#my-timeline').show();
	}
}

function dynamicThumbnail() {
	 /*
     * You'll need your own API key, don't abuse mine please!
     * Get yours here: http://www.websnapr.com/free_services/
     */
    var apiKey = 'DX49GqwGtIvn';
	$('.mythumb').each( function() {
    	var url = encodeURIComponent( $(this).attr('href') );
    	console.log( url );
    	var thumbnail = $(this).find( 'img' ).attr({
        	    src: 'http://images.websnapr.com/?url=' + url + '&key=' + apiKey + '&hash=' + encodeURIComponent(websnapr_hash),
            	alt: 'Loading thumbnail...',
            	width: 202,
            	height: 152
		});
	});	
}