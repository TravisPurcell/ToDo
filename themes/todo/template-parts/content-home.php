<?php
/**
 * Template part for displaying page content in front-page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package todo
 */

?>

	<section class="background">
		<div class="container-lg">
			<div class="row">
				<div class="col">
					<div class="frame">
					<?php
/**
 * Template part for displaying page content in template-about.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package blog
 */

?>

	<section class="outer__wrapper">
		<div class="container-lg">
			<div class="row">
				<div class="col">
					<div class="form__wrapper">
						<h2>What are you interested in?</h2>
						<form id="form" action="/" method="get">
							<?php if (isset($_GET['error'])) : ?> <p class="error"><?php echo $_GET['error']; ?></p> <?php endif; ?>
							<input type="checkbox" id="general" name="general" value="General">
							<label for="general">General</label><br>

			
							<button type="submit">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>