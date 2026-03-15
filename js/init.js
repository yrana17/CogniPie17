//Hook up the tweet display

$(document).ready(function() {
						   
	$(".countdown").countdown({
				date: "1 April 2026 00:00:00",
				format: "on"
			},
			
			function() {
				// callback function
			});

});	