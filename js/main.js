$(document).ready(function() {
	// accessible tabs control
	$('.jquery_tabs').accessibleTabs( { syncheight: true } );

	// timeline control
	var zoom = timelineStartZoomLevel();
	console.log( 'Start zoom : ' + zoom );
	createStoryJS({
		type:		'timeline',
		height:		'600',
		source:		'json/example_json.json',
		embed_id:	'my-timeline',
        start_at_end: true,
        start_zoom_adjust: zoom
		// debug:		true
	});

	timelineControl();
	dynamicThumbnail();
	resizeContactPopup();
	// visitHitControl(); - not use, not pretty
	eventBind();
});

function eventBind() {
	$(window).resize(function() {
		timelineControl();
		resizeContactPopup();
	});

	// bind mouse double click event - goto on the top
	$('#main').dblclick(function() {
		$(location).attr('href','#nav');
	});

	// popup
	$('#contactlink').click(function() {
		Lightview.show({
			url: 'contact',
			type: 'inline',
			options: { skin: 'light' }
		});
	});
}

function timelineStartZoomLevel() {
	var level = 0;
	var window_width = $(window).width();
	if ( window_width > 1024 ) {
		level = 3;
	} else if ( window_width > 700 ) {
		level = 2;
	} else if ( window_width > 500 ) {
		level = 1;
	}
	return level;
}

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

function resizeContactPopup() {
		if ( $(window).width() > 760 ) {
			$('#contact').width(440);
		} else if ( $(window).width() > 370 && $(window).width() <= 760) {
			$('#contact').width(220);
		} else if ( $(window).width() > 230 && $(window).width() <= 370 ) {
			$('#contact').width( $(window).width() - 150 );
		} else if ( $(window).width() <= 230 ) {
			$('#contact').width( 80 );
		}
		Lightview.refresh();
}

function visitHitControl() {
	var totalhit = $( '#totalhit' ).text().split(":")[1].trim();
	$( '#totalhit' ).flipCounter( {
		number: Number(totalhit)
	});
}