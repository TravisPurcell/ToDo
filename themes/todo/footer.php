<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package todo
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<div class="container-lg">
				<div class="row logo">
					<div class="col col-12 col-md-6">

					</div>
				</div>
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>


<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<script>

/* JQuery
------------------------------------- */

jQuery(document).ready(function ($) {

	jQuery('input[type="checkbox"').on('click', function () {
		jQuery(this).parent().find('#checkLabel').toggleClass('active');
	});	

	//Ajax form submission
	jQuery('#form').on('submit',function(e){
		e.preventDefault();
		var formData = new FormData(this);
		jQuery.ajax({
			type:'POST',
			url: "/wp-content/themes/todo/actions/storage.php",
			data:formData,
			cache:false,
			contentType: false,
			processData: false,
		}).done(function() {
			location.reload(true);
		})
	});

	//Add Task
	jQuery('#add').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
		jQuery.ajax({
			type:'POST',
			url: "/wp-content/themes/todo/actions/storage.php",
			data:formData,
			cache:false,
			contentType: false,
			processData: false,
			}).done(function() {
				location.reload(true);
		});
	});

	// Update task
	jQuery('#update').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
		// if(confirm("Are you sure want to update your tasks?")) {
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/update.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		// }
	});

	//Complete task
	jQuery('.complete').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
		// if(confirm("Are you sure want to complete your tasks?")) {
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/complete.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		// }
	});

	//Uncheck all tasks
	jQuery('#clear').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
		// if(confirm("Are you sure want to update your tasks?")) {
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/clear.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		// }
	});

	//Delete all tasks
	jQuery('#delete').on('click', function(e) {
		e.preventDefault();
		if(confirm("Warning! This will delete all tasks!\nAre you sure?")) {
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/deletion.php",
				}).done(function() {
					location.reload(true);
			});
		}
	});

	//Change class of checked boxes
	jQuery('input[type="checkbox"]:checked').siblings('label').addClass('checked');

	//Cross out labels of checked boxes
	jQuery('input[type="checkbox"]:checked').removeClass('complete');
	jQuery('input[type="checkbox"]:checked').addClass('uncheck');

	//Count Number of checked boxes & change status
	var tasksTotal = jQuery('.checkbox__wrapper').length;
	var tasksCompleted = jQuery('.checked').length;
	var tasksRemaining = tasksTotal - tasksCompleted;
	if(tasksTotal == 0) {
		jQuery('.btn').hide();
		jQuery('#add').show();
		document.getElementById('tasksRemaining').innerHTML = 'You have no tasks.';
	} else if(tasksRemaining == 0) {
		document.getElementById('tasksRemaining').innerHTML = 'Good Job!' + '<br>' + 'You\'re done!';
	} else if(tasksRemaining == 1) {
		jQuery('.btn').show();
		document.getElementById('tasksRemaining').innerHTML = 'Almost there!' + '<br>' + tasksRemaining + ' task left!';
	} else {
		jQuery('.btn').show();
		document.getElementById('tasksRemaining').innerHTML = 'Task overload!' + '<br>' + tasksRemaining + ' tasks left!';
	}
});

</script>

