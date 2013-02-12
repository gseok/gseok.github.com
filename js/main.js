$(document).ready(function() {
	// accessible tabs control
	$('.jquery_tabs').accessibleTabs();

	// timeline control
	createStoryJS({
		type:		'timeline',
		height:		'600',
		source:		'json/example_json.json',
		embed_id:	'my-timeline',
        start_at_end: true,
        start_zoom_adjust: '3'
		// debug:		true
	});

	timelineControl();
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