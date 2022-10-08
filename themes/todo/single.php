<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package todo
 */

get_header();
?>

	<section class="alt-logo">
		<div class="container-lg">
			<div class="row d-none d-md-block">
				<div class="col-12 col-md-3">
					<a aria-label="Go to homepage" href="/todo/126"><img src="<?php echo get_stylesheet_directory_uri() . '/dist/images/logo.svg'; ?>" class="d-none d-md-block img-fluid" alt="todo Investment Partners Logo"></a>
				</div>
			</div>
		</div>
	</section>
	
	<section class="blog__content" id="main"> 
        <div class="container-lg">
            <h1><?php echo get_the_title() ?> </h1>
			<?php the_content() ?>
		</div>
	</section>

<?php
get_footer();
