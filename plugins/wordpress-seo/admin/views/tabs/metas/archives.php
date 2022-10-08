<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views
 */

if ( ! defined( 'WPSEO_VERSION' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

// To improve readability, this tab has been divided into separate blocks, included below.
require __DIR__ . '/boilers/help.php';

$wpseo_boilers = [
	[
		'title'     => esc_html__( 'Author boilers', 'wordpress-seo' ),
		'view_file' => 'paper-content/author-boiler-settings.php',
		'paper_id'  => 'settings-author-boilers',
	],
	[
		'title'     => esc_html__( 'Date boilers', 'wordpress-seo' ),
		'view_file' => 'paper-content/date-boilers-settings.php',
		'paper_id'  => 'settings-date-boilers',
	],
	[
		'title'     => esc_html__( 'Special pages', 'wordpress-seo' ),
		'view_file' => 'paper-content/special-pages.php',
		'paper_id'  => 'settings-special-pages',
	],
];

$view_utils                   = new Yoast_View_Utils();
$recommended_replace_vars     = new WPSEO_Admin_Recommended_Replace_Vars();
$editor_specific_replace_vars = new WPSEO_Admin_Editor_Specific_Replace_Vars();
$opengraph_disabled_alert     = $view_utils->generate_opengraph_disabled_alert( 'boilers' );

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Is correctly escaped in the generate_opengraph_disabled_alert() method.
echo $opengraph_disabled_alert;

foreach ( $wpseo_boilers as $wpseo_boiler_index => $wpseo_boiler ) {
	$wpseo_boiler_presenter = new WPSEO_Paper_Presenter(
		$wpseo_boiler['title'],
		__DIR__ . '/' . $wpseo_boiler['view_file'],
		[
			'collapsible'                  => true,
			'expanded'                     => ( $wpseo_boiler_index === 0 ),
			'paper_id'                     => $wpseo_boiler['paper_id'],
			'recommended_replace_vars'     => $recommended_replace_vars,
			'editor_specific_replace_vars' => $editor_specific_replace_vars,
			'class'                        => 'search-appearance',
		]
	);

	// phpcs:ignore WordPress.Security.EscapeOutput -- get_output() output is properly escaped.
	echo $wpseo_boiler_presenter->get_output();
}

unset( $wpseo_boilers, $wpseo_boiler_presenter, $wpseo_boiler_index );
