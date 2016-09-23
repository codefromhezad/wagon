
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
	var $trees_wrapper = $('.wagon-container .trees-wrapper');


	/* Placing trees procedurally */
	var num_trees = 25;
	var trees_added_space_width = 1000;

	var trees_wrapper_width = $trees_wrapper.width();
	var trees_wrapper_to_generate_width = trees_wrapper_width - trees_added_space_width;
	var tree_unit_space = Math.floor(trees_wrapper_to_generate_width / num_trees);
	var num_added_trees = Math.floor(trees_added_space_width / tree_unit_space) + 1;
	var saved_trees = [];

	for(var i = 0; i < num_trees; i++) {
		var left = Math.floor(tree_unit_space * (i + Math.random()));
		var tree_index = 1 + Math.floor(Math.random() * 4);

		if( i == num_trees - 1 && left > trees_wrapper_to_generate_width - 389) {
			left = trees_wrapper_to_generate_width - 389;
		}

		if( saved_trees.length < num_added_trees ) {
			saved_trees.push( [left, tree_index] );
		}

		$trees_wrapper.append('<div class="tree-'+tree_index+'" style="left: '+left+'px;"></div>');
	}

	for(var i = 0; i < saved_trees.length; i++) {
		var tree_data = saved_trees[i];
		var left = tree_data[0] + trees_wrapper_to_generate_width;
		var tree_index = tree_data[1];

		$trees_wrapper.append('<div class="tree-'+tree_index+'" style="left: '+left+'px;"></div>');
	}

	/* Main animation loop */
	/*loop(function(progress) {
		$landscape_wrapper.css('transform', 'translateX(-'+(progress * 0.1)+'px)');
	}, 2000);*/
	
});