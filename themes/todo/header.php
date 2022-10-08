<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package todo
 */

?>
<!doctype html>
<html lang="en" class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- <meta name="robots" content="noindex, nofollow"> -->
		<meta name="description" content="">
		
		<?php wp_head(); ?>
	</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'todo' ); ?></a>

	<header>
		<div class="container-lg">
			<div class="row logos">
				<div class="col-6 logo">
				</div>
				<div class="col-6 logo">
				</div>
			</div>
		</div>
	</header>