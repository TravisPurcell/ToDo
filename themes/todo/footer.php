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
	});

	jQuery('#form').on('submit',function(e){
		e.preventDefault();
		var formData = new FormData(this);
		jQuery.ajax({
			type:'POST',
			url: jQuery('#form').attr('action'),
			data:formData,
			cache:false,
			contentType: false,
			processData: false,
		}).done(function() {
			location.reload(true);
		})
	});


	jQuery('#add').on('click', function() {
		var formData = new FormData(document.getElementById('form'));
		jQuery.ajax({
			type:'POST',
			url: jQuery('#form').attr('action'),
			data:formData,
			cache:false,
			contentType: false,
			processData: false,
			}).done(function() {
				location.reload(true);
		});
	});

	jQuery('#delete').on('click', function() {
		if(confirm("Are you sure want to delete your tasks?")) {
			jQuery.ajax({
				method: "POST",
				url: "deletion.php",
				}).done(function() {
					location.reload(true);
			});
		}
	});
</script>

