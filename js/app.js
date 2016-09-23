
/* Timed animation loop maker */
function loop(callback, max_progress) {
	var start = null;

	function step(timestamp) {
		if (!start) start = timestamp;
	 	var progress = timestamp - start;
	 	
	 	callback(progress);
		
		if( max_progress && progress >= max_progress ) {
			return;
		}
		
		window.requestAnimationFrame(step);
	}

	window.requestAnimationFrame(step);
}

jQuery( function($) {
	
	/* Caching common selectors */
	var $landscape_wrapper = $('.wagon-container .landscape-wrapper');

	/* Main animation loop */
	/*loop(function(progress) {
		$landscape_wrapper.css('transform', 'translateX(-'+(progress * 0.1)+'px)');
	}, 2000);*/
	
});