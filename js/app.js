
/* Timed animation helpers / scene wrapper */
var Scene = {
	timerProgress: 0,
	repeatable_actions_timers: {},

	

	loop: function(callback) {
		var start = null;

		function step(timestamp) {
			if (!start) start = timestamp;
		 	Scene.timerProgress = timestamp - start;
		 	
		 	callback();
			
			window.requestAnimationFrame(step);
		}

		window.requestAnimationFrame(step);
	},

	repeatable_action: function(slug, milliseconds, callback) {
		if( Scene.repeatable_actions_timers[slug] === undefined ) {
			Scene.repeatable_actions_timers[slug] = Scene.timerProgress;
		}

		if( Scene.timerProgress - Scene.repeatable_actions_timers[slug] > milliseconds ) {
			Scene.repeatable_actions_timers[slug] = Scene.timerProgress;
			callback();
		}
	}
}



/* MAIN / Entry point */

jQuery( function($) {

	/* Caching common selectors */
	var $landscape_wrapper = $('.wagon-container .landscape-wrapper');
	var $trees_wrapper = $('.wagon-container .trees-wrapper');
	var $interior_shake_helper = $('.interior-shake-helper');
	var $interior = $('.interior');


	/* Load sounds & init Sound engine  */
	var Sound = {
		assets: [
			{ id: "train_amb", src: "train_amb.mp3" },
		],

		init: function() {
			createjs.Sound.addEventListener("fileload", Sound.onAssetsLoaded);
    		createjs.Sound.registerSounds(Sound.assets, "snd/");
		},

		onAssetsLoaded: function(e) {
			var amb = createjs.Sound.play("train_amb");
			amb.volume = 0.5;
		},
	}

	Sound.init();


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

	

	/* Register animationend events for repeatable actions in the main loop */
	$interior_shake_helper.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) {
		if( e.originalEvent.animationName == "wagonShake" ) {
			$interior_shake_helper.removeClass('shake');
		}
	});



	/* Main animation loop / Handling special events */
	Scene.loop(function() {
		

		/* Shake vigorously the wagon once in a while */
		Scene.repeatable_action('shake_wagon', 3000, function() {
			if( (! $interior_shake_helper.hasClass('shake')) && Math.random() < 0.3 ) {
				$interior_shake_helper.addClass('shake');
			}
		});
		
	});
	
});