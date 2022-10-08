<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package todo
 */

if ( ! function_exists( 'todo_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function todo_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf(
			/* translators: %s: post date. */
			esc_html_x( 'Posted on %s', 'post date', 'todo' ),
			'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'todo_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function todo_posted_by() {
		$byline = sprintf(
			/* translators: %s: post author. */
			esc_html_x( 'by %s', 'post author', 'todo' ),
			'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
		);

		echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'todo_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function todo_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'todo' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'todo' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'todo' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'todo' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'todo' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				)
			);
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'todo' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'todo_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function todo_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

			<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php
					the_post_thumbnail(
						'post-thumbnail',
						array(
							'alt' => the_title_attribute(
								array(
									'echo' => false,
								)
							),
						)
					);
				?>
			</a>

			<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'wp_body_open' ) ) :
	/**
	 * Shim for sites older than 5.2.
	 *
	 * @link https://core.trac.wordpress.org/ticket/12563
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
endif;

/* Limit Excerpt Words
-------------------------------------*/
function excerpt($limit) {
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt)>=$limit) {
	  array_pop($excerpt);
	  $excerpt = implode(" ",$excerpt).'...';
	} else {
	  $excerpt = implode(" ",$excerpt);
	}	
	$excerpt = preg_replace('`[[^]]*]`','',$excerpt);
	return $excerpt;
  }
   
  function content($limit) {
	$content = explode(' ', get_the_content(), $limit);
	if (count($content)>=$limit) {
	  array_pop($content);
	  $content = implode(" ",$content).'...';
	} else {
	  $content = implode(" ",$content);
	}	
	$content = preg_replace('/[.+]/','', $content);
	$content = apply_filters('the_content', $content); 
	$content = str_replace(']]>', ']]>', $content);
	return $content;
}

/* Popup Form Modal
-------------------------------------*/
function todo_modal() { ?>
	<div class="modal fade" id="popupModal" tabindex="-1" aria-labelledby="popupModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title" id="popupModalLabel">Schedule an Appointment</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<?php echo do_shortcode('[gravityform id="2" title="false" ajax="true"] ')?>
				</div>
			</div>
		</div>
	</div>
<?php }

/* Hero
-------------------------------------*/
function todo_hero() { ?>
	<div class="row top d-none d-md-block">
		<div class="col-7 col-md-3 logo--align">
			<a aria-label="Go to homepage" href="/todo/126"><img src="<?php echo get_stylesheet_directory_uri() . '/dist/images/logo.svg'; ?>" class="d-none d-md-block img-fluid" alt="todo Investment Partners Logo"></a>
		</div>
		<div class="col-5 col-md-9">
			&nbsp;
		</div>
	</div>
	<div class="row">
		<div class="col-8">
			<?php if( get_field('headline') ) { ?>
				<h1 class="js hero__text animate"><?php echo get_field('headline')?></h1>
			<?php } ?>
			<?php if( get_field('sub_headline') ) { ?>
				<p class="hero__subtext"><?php echo get_field('sub_headline')?></p>
			<?php } ?>
		</div>
		<div class="col-4">
		</div>
	</div>
<?php }

/* Secondary Intro Block
-------------------------------------*/
function todo_secondary_intro() { ?>
	<?php if( have_rows('secondary_banner') ):
		while ( have_rows('secondary_banner') ) : the_row(); ?>
			<div class="row">
			<?php if( get_sub_field('headline') ) { ?>
				<h2><?php echo get_sub_field('headline'); ?></h2>
			<?php } ?>
			<?php if( get_sub_field('text') ) { ?>
				<p><?php echo get_sub_field('text'); ?></p>
			<?php } ?>
				<div class="arrow-wrapper bounce">
					<p class="arrow--down arrow--down--yellow"></p>
				</div>
			</div>
		<?php endwhile;
	endif; 
}

/* Secondary Banner & Events Repeater
-------------------------------------*/
function todo_secondary_banner_events_repeater() { 
	if( have_rows('secondary_banner_repeater') ):
		while ( have_rows('secondary_banner_repeater') ) : the_row(); ?>
			<section class="secondary__intro" id="<?php echo get_sub_field('section_id'); ?>"> 
				<div class="container-lg">
					<?php if( have_rows('secondary_banner') ):
						while ( have_rows('secondary_banner') ) : the_row(); ?>
							<div class="row">
							<?php if( get_sub_field('headline') ) { ?>
								<h2><?php echo get_sub_field('headline'); ?></h2>
							<?php } ?>
							<?php if( get_sub_field('text') ) { ?>
								<p><?php echo get_sub_field('text'); ?></p>
							<?php } ?>
								<div class="arrow-wrapper bounce">
									<p class="arrow--down arrow--down--yellow"></p>
								</div>
							</div>
						<?php endwhile;
					endif; ?>
				</div>
			</section>

			<section class="secondary__life-event white"> 
				<div class="container-lg">
					<div class="event">
					<?php if( have_rows('events_repeater') ):
						while ( have_rows('events_repeater') ) : the_row(); ?>
							<div class="event__item">
								<img class="img-fluid" src="<?php echo get_sub_field('image'); ?>" alt="">
								<?php if( get_sub_field('offsite') ) { ?>
									<a aria-label="View the <?php echo get_sub_field('event_name'); ?> article" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><p class="speedbump arrow--down arrow--down--life-events"><?php echo get_sub_field('event_name'); ?></p></a>
								<?php } else { ?>
									<a aria-label="View the <?php echo get_sub_field('event_name'); ?> article" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><p class="arrow--down arrow--down--life-events"><?php echo get_sub_field('event_name'); ?></p></a>
								<?php } ?>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
					</div>
				</div>
			</section>
		<?php endwhile;
	endif; 
} 
 
/* Secondary List Repeater Block
-------------------------------------*/
function todo_secondary_list_repeater() { ?>
	<?php if( have_rows('secondary_list_repeater') ):
		while ( have_rows('secondary_list_repeater') ) : the_row(); ?>
			<?php if( have_rows('secondary_list') ):
			while ( have_rows('secondary_list') ) : the_row(); ?>
			<div class="row">
				<?php if( get_sub_field('headline') ) { ?>
					<h2><?php the_sub_field('headline'); ?></h2>
				<?php } ?>
				<?php if( get_sub_field('text') ) { ?>
					<?php echo get_sub_field('text'); ?>
				<?php } ?>
			</div>
			<div class="row row__list">
			<?php if( have_rows('list_repeater') ):
					while ( have_rows('list_repeater') ) : the_row(); ?>
                <div class="secondary__list__wrapper collapse-main">
                    <div class="flex">
                        <a class="secondary__list__title arrow--down prevent__arrow" role="button" data-toggle="collapse" href="#collapse<?php echo get_sub_field('id_number')?>" aria-expanded="false" aria-controls="collapse<?php echo get_sub_field('id_number')?>">
							<?php if( get_sub_field('list_icon') ) { ?>
								<div><img src="<?php echo get_sub_field('list_icon'); ?>" alt=""></div>
							<?php } ?>
							<?php if( get_sub_field('list_headline') ) { ?>
								<div class="text"><?php echo get_sub_field('list_headline'); ?></div>
							<?php } ?>
                        </a>
                    </div>
                    <div class="collapse" id="collapse<?php echo get_sub_field('id_number')?>">
                        <?php the_sub_field('list_text'); ?>
                        <a href="<?php the_sub_field('list_cta_link'); ?>" class="link"><?php the_sub_field('list_cta'); ?></a>
                    </div>
                </div>
				<?php endwhile;
				endif; ?>
			</div>
			<div class="row postText">
				<?php if( get_sub_field('description') ) { ?>
					<p><?php echo get_sub_field('description'); ?></p>
				<?php } ?>
			</div>
			<?php endwhile;
			endif;
		endwhile;
	endif; 
}

/* Secondary Events Block
-------------------------------------*/
function todo_secondary_events() { ?>
	<?php if( have_rows('event') ):
		while ( have_rows('event') ) : the_row(); ?>
		<h2><?php echo get_sub_field('headline'); ?></h2>
			<div style="justify-content: center" class="event">
			<h3>Information will be added as it’s available, check back soon!</h3>
		<?php if( have_rows('evenx_repeater') ):
			while ( have_rows('event_repeater') ) : the_row(); ?>
				<!-- <div class="event__item">
					<img class="img-fluid" src="<?php echo get_sub_field('image'); ?>" alt="">
					<h3><?php echo get_sub_field('event_name'); ?></h3>
					<?php if( get_sub_field('details') ) { ?>
						<p><?php echo get_sub_field('details'); ?></p>
					<?php } ?>
					<div class="cta_group">
						<?php if( get_sub_field('offsite') ) { ?>
							<a aria-label="Register for <?php echo get_sub_field('event_name'); ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
						<?php } else { ?>
						<a aria-label="Register for <?php echo get_sub_field('event_name'); ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
					<?php } ?>
					</div>
				</div> -->
		<?php endwhile; ?>
			</div>
		<?php endif; 
	endwhile;
	endif; 
}

/* Secondary Upcoming Financial Webinars Block
-------------------------------------*/
function todo_secondary_upcoming_financial() { ?>
	<?php if( have_rows('event_2') ):
		while ( have_rows('event_2') ) : the_row(); ?>
		<h2><?php echo get_sub_field('headline'); ?></h2>
			<div class="event">
		<?php if( have_rows('event_repeater') ):
			while ( have_rows('event_repeater') ) : the_row(); ?>
				<div class="event__item">
					<img class="img-fluid" src="<?php echo get_sub_field('image'); ?>" alt="">
					<h3><?php echo get_sub_field('event_name'); ?></h3>
					<?php if( get_sub_field('details') ) { ?>
						<p><?php echo get_sub_field('details'); ?></p>
					<?php } ?>
					<div class="cta_group">
						<?php if( get_sub_field('offsite_2') ) { ?>
							<a aria-label="Register for <?php echo get_sub_field('event_name'); ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
						<?php } else { ?>
							<a aria-label="Register for <?php echo get_sub_field('event_name'); ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
						<?php } ?>
					</div>
				</div>
		<?php endwhile; ?>
			</div>
		<?php endif; 
	endwhile;
endif; 
}

/* Secondary On-Demand Content Block
-------------------------------------*/
function todo_secondary_on_demand_content() { ?>
	<?php if( have_rows('event_3') ):
		while ( have_rows('event_3') ) : the_row(); ?>
		<h2><?php echo get_sub_field('headline'); ?></h2>
			<div class="event">
		<?php if( have_rows('event_repeater') ):
			while ( have_rows('event_repeater') ) : the_row(); ?>
				<div class="event__item">
					<img class="img-fluid" src="<?php echo get_sub_field('image'); ?>" alt="">
					<h3><?php echo get_sub_field('event_name'); ?></h3>
					<?php if( get_sub_field('details') ) { ?>
						<p><?php echo get_sub_field('details'); ?></p>
					<?php } ?>
					<div class="cta_group">
						<?php if( get_sub_field('offsite_3') ) { ?>
							<a aria-label="Watch <?php echo get_sub_field('event_name'); ?>" class="speedbump btn btn--yellow" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
						<?php } else { ?>
						<a aria-label="Watch <?php echo get_sub_field('event_name'); ?>" class="btn btn--yellow" href="<?php echo get_sub_field('button_link'); ?>" target="_blank"><?php echo get_sub_field('button'); ?></a>
						<?php } ?>
					</div>
				</div>
		<?php endwhile; ?>
			</div>
		<?php endif; 
	endwhile;
endif; 
}

/* Icon Block
-------------------------------------*/
function todo_icons() { ?>
	<div class="row">
		<?php if( have_rows('content') ): 
			while( have_rows('content') ) : the_row();?>
				<div tabindex="0" class="col flex dropdown">
					<div class="img-wrapper">
						<img alt="" src="<?php echo get_sub_field('icon'); ?>">
					</div>
					<p><?php the_sub_field('icon_text'); ?></p>
					<a tabindex="-1" href="#dropdown" class="arrow--down"><span class="sr-only">Click or press enter to open dropdown menu</span></a>

					<ul class="dropdown-content">
						<?php if( have_rows('dropdown') ): ?>
							<?php while( have_rows('dropdown') ) : the_row(); ?>
							<?php if( get_sub_field('offsite') ) { ?>
								<li><a class="speedbump" target="_blank" href="<?php the_sub_field('dropdown_link'); ?>"><?php the_sub_field('dropdown_text'); ?><span class="arrow">&rsaquo;</span></a></li>
							<?php } else { ?>
								<li><a target="_blank" href="<?php the_sub_field('dropdown_link'); ?>"><?php the_sub_field('dropdown_text'); ?><span class="arrow">&rsaquo;</span></a></li>
							<?php } ?>
							<?php endwhile; 
						endif; ?>
					</ul>
				</div>
			<?php endwhile; 
		endif;?> 
	</div>
<?php }

/* Blue Menu Block
-------------------------------------*/
function todo_blue_menu() { ?>
	<div class="row">
		<?php if( have_rows('blue_menu') ): 
			while( have_rows('blue_menu') ) : the_row();?>
				<div tabindex="0" class="pre-menu-dropdown">
					<h2 aria-expanded="false" aria-controls="pre-menu-dropdown-content" class="arrow--down arrow--down--yellow"><span><?php the_field('menu_headline')?><span class="sr-only">Click or press enter to open dropdown menu</span></h2>
					<div class="pre-menu-dropdown-content" id="pre-menu-dropdown-content">
						<div class="screen">
							<?php if( get_sub_field('item_1') ) { ?>
								<p><a href="#team"><?php echo get_sub_field('item_1') ?></a></p>
							<?php } ?>
							<?php if( get_sub_field('item_2') ) { ?>
								<p><a href="<?php echo get_sub_field('link_2') ?>"><?php echo get_sub_field('item_2') ?></a></p>
							<?php } ?>
							<?php if( get_sub_field('item_3') ) { ?>
								<p><a href="<?php echo get_sub_field('link_3') ?>"><?php echo get_sub_field('item_3') ?></a></p>
							<?php } ?>
							<?php if( get_sub_field('item_4') ) { ?>
								<p><a href="<?php echo get_sub_field('link_4') ?>"><?php echo get_sub_field('item_4') ?></a></p>
							<?php } ?>
						</div>
					</div>
				</div>
			<?php endwhile; 
		endif;?> 
	</div>
<?php }

/* Full Width Image Text Block 1
-------------------------------------*/
function todo_image_text_block() { ?>
	<div class="row full-width">
		<?php if( have_rows('block_1') ): 
			while( have_rows('block_1') ) : the_row();?>
				<?php if( get_sub_field('image') ) { ?>
				<div class="col-12 col-md-6 padding padding-right--none">
					<img class="img-fluid" src="<?php echo get_sub_field('image') ?>" alt="">
				</div>
				<?php } ?>
				<?php if( get_sub_field('headline') ) { ?>
				<div class="col-12 col-md-6 text-wrapper text-wrapper-1">
					<h2><?php echo get_sub_field('headline') ?></h2>
					<p><?php echo get_sub_field('text') ?></p>
					<div class="cta_group">
					<?php if( get_sub_field('button') ) { ?>
						<?php if( get_sub_field('offsite') ) { ?>
							<a aria-label="<?php echo get_sub_field('aria') ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
						<?php } else { ?>
						<a aria-label="<?php echo get_sub_field('aria') ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
					<?php } } ?>
					<?php if( get_sub_field('button_2') ) { ?>
						<?php if( get_sub_field('offsite_2') ) { ?>
							<a aria-label="<?php echo get_sub_field('aria_2') ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link_2') ?>" target="_blank"><?php echo get_sub_field('button_2') ?></a>
						<?php } else { ?>
						<a aria-label="<?php echo get_sub_field('aria_2') ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link_2') ?>" target="_blank"><?php echo get_sub_field('button_2') ?></a>
					<?php } } ?>
					<?php if( get_sub_field('button_3') ) { ?>
						<?php if( get_sub_field('offsite_3') ) { ?>
							<a aria-label="<?php echo get_sub_field('aria_3') ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link_3') ?>" target="_blank"><?php echo get_sub_field('button_3') ?></a>
						<?php } else { ?>
						<a aria-label="<?php echo get_sub_field('aria_3') ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link_3') ?>" target="_blank"><?php echo get_sub_field('button_3') ?></a>
					<?php } } ?>
					</div>
				</div>
					<?php } ?>
			<?php endwhile; 
		endif;?> 
	</div>
<?php }

/* Full Width Image Text Block 2
-------------------------------------*/
function todo_image_text_block_2() { ?>
	<div class="row reverse full-width">
		<?php if( have_rows('block_2') ): 
			while( have_rows('block_2') ) : the_row();?>
				<div class="col-12 col-md-6 padding padding-right--none">
					<img class="img-fluid" src="<?php echo get_sub_field('image') ?>" alt="">
				</div>
				<div class="col-12 col-md-6 text-wrapper text-wrapper-1">
					<h2><?php echo get_sub_field('headline') ?></h2>
					<p><?php echo get_sub_field('text') ?></p>
					<?php if( get_sub_field('button') ) { ?>
						<div class="cta_group">
							<?php if( get_sub_field('offsite') ) { ?>
								<a aria-label="<?php echo get_sub_field('aria') ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
							<?php } else { ?>
							<a aria-label="<?php echo get_sub_field('aria') ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
						</div>
					<?php } } ?>
				</div>
			<?php endwhile; 
		endif;?> 
	</div>
<?php }

/* Full Width Image Text Block 3
-------------------------------------*/
function todo_image_text_block_3() { ?>
	<div class="row full-width">
		<?php if( have_rows('block_3') ): 
			while( have_rows('block_3') ) : the_row();?>
				<div class="col-12 col-md-6 padding padding-right--none">
					<img class="img-fluid" src="<?php echo get_sub_field('image') ?>" alt="">
				</div>
				<div class="col-12 col-md-6 text-wrapper text-wrapper-1">
					<h2><?php echo get_sub_field('headline') ?></h2>
					<p><?php echo get_sub_field('text') ?></p>
					<div class="cta_group">
					<?php if( get_sub_field('button') ) { ?>
						<?php if( get_sub_field('offsite') ) { ?>
							<a aria-label="<?php echo get_sub_field('aria') ?>" class="speedbump btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
						<?php } else { ?>
						<a aria-label="<?php echo get_sub_field('aria') ?>" class="btn btn--dblue" href="<?php echo get_sub_field('button_link') ?>" target="_blank"><?php echo get_sub_field('button') ?></a>
						<?php } } ?>
					</div>
				</div>
			<?php endwhile; 
		endif;?> 
	</div>
<?php }

/*  Image Text Block 
-------------------------------------*/
function todo_mid_image_text_block() { ?>
	<?php if( have_rows('block') ): 
		while( have_rows('block') ) : the_row();?>
		<div class="row">
			<div class="col-12 col-md-6 financial-planning__content__intro">
				<h2><?php echo get_sub_field('headline')?></h2>
				<?php if( get_sub_field('text') ) { ?>
					<p><?php echo get_sub_field('text')?></p>
				<?php } ?>
			</div>
			<div class="d-none d-md-block col-6"></div>
			</div>
			<div class="row">
				<div class="col-12 col-md-6" style="padding: 0">
					<img class="img-fluid" src="<?php echo get_sub_field('image_1')?>" alt="">
				</div>
				<div class="col-12 col-md-6 wrapper wrapper-1">
					<h2><?php echo get_sub_field('headline_1')?></h2>
					<?php if( get_sub_field('text_1') ) { ?>
						<p><?php echo get_sub_field('text_1')?></p>
					<?php } ?>
				</div>
			</div>
			<div class="row reverse full-width">
				<div class="col-12 col-md-6" style="padding: 0">
					<img class="img-fluid" src="<?php echo get_sub_field('image_2')?>" alt="">
				</div>
				<div class="col-12 col-md-6 wrapper wrapper-2">
					<h2><?php echo get_sub_field('headline_2')?></h2>
					<?php if( get_sub_field('text_2') ) { ?>
						<p><?php echo get_sub_field('text_2')?></p>
					<?php } ?>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-md-6" style="padding: 0">
					<img class="img-fluid" src="<?php echo get_sub_field('image_3')?>" alt="">
				</div>
				<div class="col-12 col-md-6 wrapper wrapper-3">
					<h2><?php echo get_sub_field('headline_3')?></h2>
					<?php if( get_sub_field('text_3') ) { ?>
						<p><?php echo get_sub_field('text_3')?></p>
					<?php } ?>
				</div>
			</div>
		</div>
		<?php if( get_sub_field('description') ) { ?>
		<div class="row">
			<div class="col-12 financial-planning__content__description">
				<p><?php echo get_sub_field('description')?></p>
			</div>
		</div>
		<?php } ?>
		<?php endwhile; 
	endif;?> 
<?php }

/* Calculator Block
-------------------------------------*/
function todo_calculator() { ?>
	<div class="row wrapper">
		<div class="col-12 col-md-5 icon-wrapper">
			<?php if( get_field('calc_image') ) { ?>
				<img class="icon img-fluid" src="<?php echo get_field('calc_image')?>" alt="">
			<?php } ?>
		</div>
		<div class="col-12 col-md-7 text-wrapper">
			<?php if( get_field('calc_headline') ) { ?>
				<h2><?php echo get_field('calc_headline')?></h2>
			<?php } ?>
			<?php if( get_field('calc_text') ) { ?>
				<p><?php echo get_field('calc_text')?></p>
			<?php } ?>
			<a href="<?php echo get_field('calc_button_link')?>" target="_blank" class="btn btn--dblue margin-top"><?php echo get_field('calc_button')?></a>
		</div>
	</div>
<?php 	
}

/* Full Width Calculator Block
-------------------------------------*/
function todo_full_width_calculator() { ?>
	<div class="row full-width">
		<div class="col-12 col-md-6" style="padding: 0">
			<?php if( get_field('full_calc_image') ) { ?>
				<img class="img-fluid" src="<?php echo get_field('image')?>" alt="">
			<?php } ?>   
		</div>
		<div class="col-12 col-md-6 text-wrapper text-wrapper-1">
			<?php if( get_field('full_calc_headline') ) { ?>
				<h2><?php echo get_field('full_calc_headline')?></h2>
			<?php } ?>
			<?php if( get_field('full_calc_text') ) { ?>
				<p><?php echo get_field('full_calc_text')?></p>
			<?php } ?>
			<a href="<?php echo get_field('full_calc_button_link')?>" target="_blank" class="btn btn--dblue margin-top"><?php echo get_field('full_calc_button')?></a>
		</div>
	</div>
<?php 
}

/* Meet the Team Block 
-------------------------------------*/
function todo_meet_the_team() { ?>
	<?php if( have_rows('team') ):
		while ( have_rows('team') ) : the_row(); ?>
			<h2 id="team"><?php the_sub_field('team_headline')?></h2>
			<hr>
			<div class="row flex">
				<?php if( have_rows('team_content') ):
					while ( have_rows('team_content') ) : the_row(); ?>
					<div class="col bg-g" style="padding: 0">
						<h3><?php the_sub_field('name'); ?></h3>
						<p class="subtext"><?php the_sub_field('title'); ?></p>
						<!-- <p><a class="btn btn--dblue" href="mailto:<?php the_sub_field('email'); ?>?subject=Inquiry%20from%20the%20todo%20Investment%20Partners." target="_blank"><?php the_sub_field('button_text'); ?></a></p> -->
						<div class="text-wrapper">
							<p><strong>Phone:</strong> <a style="color: #003C71" href="tel:<?php the_sub_field('phone'); ?>"><?php the_sub_field('phone'); ?></a></p>
							<p><strong>Fax:</strong> <?php the_sub_field('fax'); ?></p>
							<p><strong>Email:<br class="d-md-block d-lg-none"></strong> <a style="color: #003C71" href="mailto:<?php the_sub_field('email'); ?>?subject=Inquiry%20from%20the%20todo%20Investment%20Partners."><?php the_sub_field('email'); ?></a></p>
						</div>
						<div class="img-wrapper">
							<img class="img-fluid team__img" alt="" src="<?php the_sub_field('member_image'); ?>">
						</div>
					</div>
					<?php endwhile;
				endif; ?>
			</div>
		<?php endwhile;
	endif;
}

function todo_team_banner() { ?>
   <?php if( have_rows('banner') ):
		while ( have_rows('banner') ) : the_row(); ?>
			<div class="row flex">
				<div class="col cursor accordion-1">
					<p tabindex="0" class="description__title arrow--rotate arrow--rotate__1">About<br class="hide-s-mobile"> Ellen <span class="sr-only">Open team member description</span></p>
				</div>
				<div class="col cursor accordion-3">
					<p tabindex="0" class="description__title arrow--rotate arrow--rotate__3">About<br class="hide-s-mobile"> Mitzi <span class="sr-only">Open team member description</span></p>
				</div>
				<!--Description Content 1-->
				<div class="row flex description__content description__content__1">
					<div class="col-sm-12 col-md-8 col-lg-7 divider">
						<p class="team__title"><strong><?php the_sub_field('member_1')?></strong> <span>|</span> <?php the_sub_field('title_1')?></p>
						<?php the_sub_field('member_content_1')?>
					</div>

					<div class="col-sm-12 d-block d-md-none">
						<hr class="divider">
					</div>

					<div class="col-sm-12 col-md-4 col-lg-5 padding--left">
						<p class="quote">&ldquo;<?php the_sub_field('banner_quote_1')?>&rdquo;</p>
						<p class="attributation"><?php the_sub_field('banner_quote_attributation_1')?></p>
					</div>
				</div>
				<!--Description Content 2-->
				<div class="row flex description__content description__content__2">
					<div class="col-sm-12 col-md-8 col-lg-7">
						<p class="team__title"><strong><?php the_sub_field('member_2')?></strong> <span>|</span> <?php the_sub_field('title_2')?></p>
						<?php the_sub_field('member_content_2')?>
					</div>

					
				</div>
				<!--Description Content 3-->
				<div class="row flex description__content description__content__3">
					<div class="col-sm-12 col-md-8 col-lg-7">
						<p class="team__title"><strong><?php the_sub_field('member_3')?></strong> <span>|</span> <?php the_sub_field('title_3')?></p>
						<?php the_sub_field('member_content_3')?>
					</div>

					
				</div>
			</div>
		<?php endwhile;
	endif;
}

/* Banner Block
-------------------------------------*/
function todo_banner() { ?>
	<?php if( have_rows('banner') ):
		while ( have_rows('banner') ) : the_row(); ?>
			<div class="row">
				<div class="col">
					<h2><?php the_sub_field('banner_headline')?></h2>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 col-md-8 col-lg-7 divider">
					<p class="margin-top"><?php the_sub_field('banner_text')?></p>
				</div>
		
				<div class="col-sm-12 d-block d-md-none">
					<hr class="divider">
				</div>
				
				<div class="col-sm-12 col-md-4 col-lg-5 padding--left">
					<p class="quote"><?php the_sub_field('banner_quote_1')?></p>
				</div>
			</div>
		<?php endwhile;
	endif; 
}

/* Financial Planning Banner Block
-------------------------------------*/
function todo_banner_2() { ?>
	<?php if( have_rows('banner_2') ):
		while ( have_rows('banner_2') ) : the_row(); ?>
			<div class="row full-width">
				<div class="col-sm-12 col-md-5 col-lg-5 text-wrapper">
					<h2><?php the_sub_field('banner_headline')?></h2>
					<p class="margin-top"><?php the_sub_field('banner_text')?></p>
					<a href="<?php the_sub_field('button_link')?>" class="btn btn--yellow margin-top"><?php the_sub_field('button')?></a>
				</div>
				<div class="col-sm-12 col-md-7 col-lg-7 margin--top padding--left">
					<img src="<?php the_sub_field('banner_image')?>" alt="">
				</div>
			</div>
		<?php endwhile;
	endif; 
}

/* SS Products Banner Block
-------------------------------------*/
function todo_banner_3() { ?>
	<?php if( have_rows('banner_3') ):
		while ( have_rows('banner_3') ) : the_row(); ?>
			<div class="row">
				<div class="col-12">
					<h2><?php the_sub_field('banner_headline')?></h2>
					<p class="margin-top"><?php the_sub_field('banner_text')?></p>
					<a href="<?php the_sub_field('button_link')?>" class="btn btn--yellow margin-top"><?php the_sub_field('button')?></a>
				</div>
			</div>
		<?php endwhile;
	endif; 
}

/* Financial Services 
-------------------------------------*/

function todo_financial_services() { ?>
	<div class="row border--bottom">
		<?php if( have_rows('services') ): 
			while( have_rows('services') ) : the_row();?>
				<div class="col">
					<h2><?php the_sub_field('headline'); ?></h2>
					<p><?php the_sub_field('text'); ?></p>
				</div>
			<?php endwhile; 
		endif;?> 
	</div>
	<div class="row">
		<div class="col">
			<p class="subhead"><?php the_sub_field('prefooter_text'); ?></p>
		</div>
	</div>
	<div class="row flex">
		<div class="col-sm-12 flex">
		<?php if( have_rows('services') ): 
			while( have_rows('services') ) : the_row();
				if( have_rows('icons') ): 
					while( have_rows('icons') ) : the_row();?>
							<div class="item-wrapper">
								<a href="<?php the_sub_field('icon_link'); ?>">
								<div class="img-wrapper">
									<img src="<?php the_sub_field('icon'); ?>" alt="">
								</div>
								<p class="icon-text"><?php the_sub_field('icon_text'); ?></p>
								</a>
							</div>
					<?php endwhile; 
				endif;
			endwhile; 
		endif;?> 
		</div>
	</div>
<?php }

/* Pre-Footer Block 
-------------------------------------*/
function todo_pre_footer() { ?> 
	<?php if( have_rows('pre_footer') ):
		while ( have_rows('pre_footer') ) : the_row(); ?>
			<div class="row border--bottom">
				<div class="col">
					<h2><?php the_sub_field('prefooter_headline'); ?></h2>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p class="subhead"><?php the_sub_field('prefooter_text'); ?></p>
				</div>
			</div>
			<div class="row flex">
				<div class="col-sm-12 flex">
					<p><a class="popupForm btn btn--dblue" href="javascript:void(0);"><?php the_sub_field('prefooter_button_1'); ?></a></p>
					<p><a class="btn btn--dblue" href="<?php the_sub_field('prefooter_link_2'); ?>"><?php the_sub_field('prefooter_button_2'); ?></a></p>
				</div>
			</div>
		<?php endwhile;
	endif;
}

/* Flexible Content 
-------------------------------------*/
function todo_flexible_content() { 
	if( have_rows('module') ):
		while ( have_rows('module') ) : the_row(); ?>
			<?php if( get_row_layout() == 'map' ): ?>
				<!--Map Layout -->
				<?php if( get_sub_field('map_headline') ): ?>
				
				<div class="col-12 col-sm-6 visit-wrapper">
					<h2><?php the_sub_field('map_headline')?></h2>
					<p class="description"><?php the_sub_field('map_text')?></p>
					<div class="text-wrapper">
						<h3>Address</h3>
						<div class="flex">
							<div class="address">
								<p><?php the_sub_field('map_address')?></p>
							</div>
							<div>
								<p><strong>Phone:</strong> <?php the_sub_field('map_phone')?></p>
								<p><strong>Fax:</strong> <?php the_sub_field('map_fax')?></p>
							</div>
						</div>                     
					</div>
					<div class="text-wrapper">
						<h3>HOURS</h3>
						<p><strong>Monday &ndash; Friday:</strong> <?php the_sub_field('week_hours')?></p>
						<p><strong>Saturday:</strong> <?php the_sub_field('weekend_hours')?></p>
					</div>
					<div class="flex">
						<p><a class="btn btn--dblue" href="<?php the_sub_field('map_link_1'); ?>" target="_blank"><?php the_sub_field('map_button_1'); ?></a></p>
						<p><a class="btn btn--dblue" href="<?php the_sub_field('map_link_2'); ?>" target="_blank"><?php the_sub_field('map_button_2'); ?></a></p>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					&nbsp;
				</div>
				<?php endif;?>
			<?php elseif( get_row_layout() == 'team' ): ?> 
				<!--Team Layout -->
				<?php if( get_sub_field('team_headline') ): ?>
					<h2><?php the_sub_field('team_headline'); ?></h2>
					<?php if( have_rows('team_content') ):
						while ( have_rows('team_content') ) : the_row(); ?>
						<div class="col-sm-12">
							<h3><?php the_sub_field('name'); ?></h3>
							<p class="subtext"><?php the_sub_field('title'); ?></p>
							<p><a class="btn btn--dblue" href="<?php the_sub_field('button_link'); ?>" target="_blank"><?php the_sub_field('button_text'); ?></a></p>
							<div class="text-wrapper">
								<p><strong>Phone:</strong> <?php the_sub_field('phone'); ?></p>
								<p><strong>Fax:</strong> <?php the_sub_field('fax'); ?></p>
								<p><strong>Email:<br class="d-md-block d-lg-none"></strong> <?php the_sub_field('email'); ?></p>
							</div>
							<div class="img-wrapper">
								<img class="img-fluid" src="<?php the_sub_field('member_image'); ?>">
							</div>
						</div>
						<?php endwhile; 
					endif; 
				endif;?>
			<?php elseif( get_row_layout() == 'pre_footer' ): ?>
				<!--Prefooter Layout -->
				<?php if( get_sub_field('prefooter_headline') ): ?>
				<div class="row border--bottom">
					<div class="col">
						<h2><?php the_sub_field('prefooter_headline'); ?></h2>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<p class="subhead"><?php the_sub_field('prefooter_text'); ?></p>
					</div>
				</div>
				<div class="row flex">
					<div class="col-sm-12 flex">
						<p><a class="btn btn--dblue" href="<?php the_sub_field('prefooter_link_1'); ?>" target="_blank"><?php the_sub_field('prefooter_button_1'); ?></a></p>
						<p><a class="btn btn--dblue" href="prefooter_link_2" target="_blank"><?php the_sub_field('prefooter_button_2'); ?></a></p>
						<p class="margin-bottom--none"><a class="btn btn--dblue" href="prefooter_link_3" target="_blank"><?php the_sub_field('prefooter_button_3'); ?></a></p>
					</div>
				</div>
				<?php endif;
			endif;
		endwhile;
	endif; 
}
