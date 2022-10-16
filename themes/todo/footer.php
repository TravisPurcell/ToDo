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

	<!-- <footer id="colophon" class="site-footer">
		<div class="site-info">
			<div class="container-lg">
				<div class="row logo">
					<div class="col col-12 col-md-6">

					</div>
				</div>
			</div>
		</div><!-- .site-info
	</footer>#colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<script>
	/* JQuery
------------------------------------- */

jQuery(document).ready(function ($) {

    jQuery('.form__wrapper').on('click', function () {
        jQuery(this).addClass('active');
    });	

	/* Form Actions
	---------------------------------------------------*/

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
	jQuery('.add').on('click', function(e) {
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

	jQuery('.addEnter').on('keypress', function (e) {
		if (e.which == 13) {
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
		}
	});

	// Update task
	jQuery('#update').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
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
	});

	jQuery('#update').on('keypress', function (e) {
		if (e.which == 13) {
			var formData = new FormData(document.getElementById('form'));
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
		}
	});

	//Complete task
	jQuery('.completeUpdate').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
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
	});

	jQuery('.completeUpdate').on('keypress', function (e) {
		if (e.which == 13) {
			var formData = new FormData(document.getElementById('form'));
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
		}
	});

	//Uncheck all tasks
	jQuery('#clear').on('click', function(e) {
		e.preventDefault();
		var formData = new FormData(document.getElementById('form'));
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
	});

	jQuery('#clear').on('keypress', function (e) {
		if (e.which == 13) {
			var formData = new FormData(document.getElementById('form'));
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
		}
	});

	//Delete selected task
	jQuery('.deleteSelect').on('click', function(e) {
		var formData = new FormData(document.getElementById('form'));
		e.preventDefault();
		if(confirm("Warning! This will delete the selected task!\nAre you sure?")) {
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/deleteSelect.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		}
	});

	jQuery('.deleteSelect').on('keypress', function (e) {
		if (e.which == 13) {
			var formData = new FormData(document.getElementById('form'));
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/deleteSelect.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		}
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

	jQuery('#delete').on('keypress', function (e) {
		if (e.which == 13) {
			var formData = new FormData(document.getElementById('form'));
			jQuery.ajax({
				method: "POST",
				url: "/wp-content/themes/todo/actions/delete.php",
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				}).done(function() {
					location.reload(true);
			});
		}
	});

	/* DOM Manipulations
	------------------------------------------------------*/

	//Toggle Theme
	jQuery('#switch').on('click', function() {
		jQuery(this).siblings('label').toggleClass('theme');
		jQuery('.btn').toggleClass('theme');
		jQuery('#download').toggleClass('theme');
		jQuery('input[type="checkbox"]').toggleClass('theme');
	});

	//Change value of checkboxes if checked or not
	jQuery('.unchecked').attr('value', '0');
	jQuery('.checked').attr('value', '1');

	//Change classes of checkboxes and task names
	jQuery('.tick').on('click', function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('checked')) {
			jQuery(this).removeClass('checked');
			jQuery(this).addClass('unchecked');
			jQuery(this).parent().siblings('.task__name').find('.update').removeClass('crossed');
		} else {
			jQuery(this).addClass('checked');
			jQuery(this).removeClass('unchecked');
			jQuery(this).parent().siblings('.task__name').find('.update').addClass('crossed');
		}
		jQuery('.unchecked').attr('value', '0');
		jQuery('.checked').attr('value', '1');
	});

	//Count Number of checked boxes & change status
	var tasksTotal = jQuery('.checkbox__wrapper').length;
	var tasksCompleted = jQuery('.tick.checked').length;
	var tasksRemaining = tasksTotal - tasksCompleted;

	//Change status message based on number of tasks remaining
	if(tasksTotal == 0) {
		jQuery('.btn').hide();
		jQuery('#add').show();
		document.getElementById('tasksRemaining').innerHTML = 'You have no tasks.';
	} else if(tasksRemaining == 0) {
		document.getElementById('tasksRemaining').innerHTML = 'Good Job...' + ' You\'re done!';
	} else if(tasksRemaining == 1) {
		jQuery('.btn').show();
		document.getElementById('tasksRemaining').innerHTML = 'Almost there... ' + tasksRemaining + ' task left!';
	} else {
		jQuery('.btn').show();
		document.getElementById('tasksRemaining').innerHTML = 'Task overload... ' + tasksRemaining + ' tasks left!';
	}
});
</script>