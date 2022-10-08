<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views\boiler
 */

$boilers_help_content = [
	sprintf(
		/* translators: %1$s / %2$s: links to an article about duplicate content on yoast.com */
		esc_html__( 'If you\'re running a one author blog, the author boiler will be exactly the same as your homepage. This is what\'s called a %1$sduplicate content problem%2$s.', 'wordpress-seo' ),
		'<a target="_blank" href="' . esc_url( WPSEO_Shortlinker::get( 'https://yoa.st/duplicate-content' ) ) . '">',
		'</a>'
	),
	sprintf(
		/* translators: %s expands to <code>noindex, follow</code> */
		esc_html__( 'If this is the case on your site, you can choose to either disable it (which makes it redirect to the homepage), or to add %s to it so it doesn\'t show up in the search results.', 'wordpress-seo' ),
		'<code>noindex,follow</code>'
	),
	esc_html__( 'Note that links to boilers might be still output by your theme and you would need to remove them separately.', 'wordpress-seo' ),
	esc_html__( 'Date-based boilers could in some cases also be seen as duplicate content.', 'wordpress-seo' ),
];

$boilers_help = new WPSEO_Admin_Help_Panel(
	'search-appearance-boilers',
	__( 'Learn more about the boilers setting', 'wordpress-seo' ),
	implode( ' ', $boilers_help_content ),
	'has-wrapper'
);

// phpcs:ignore WordPress.Security.EscapeOutput -- get_button_html() output is properly escaped.
echo '<p class="help-button-inline"><strong>' . esc_html__( 'boilers settings help', 'wordpress-seo' ) . $boilers_help->get_button_html() . '</strong><p>';

// phpcs:ignore WordPress.Security.EscapeOutput -- get_panel_html() output is properly escaped.
echo $boilers_help->get_panel_html();
