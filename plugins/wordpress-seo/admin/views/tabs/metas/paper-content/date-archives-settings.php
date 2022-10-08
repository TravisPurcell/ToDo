<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views\boiler
 *
 * @uses Yoast_Form $yform Form object.
 */

$yform->toggle_switch(
	'disable-date',
	[
		'off' => __( 'On', 'wordpress-seo' ),
		'on'  => __( 'Off', 'wordpress-seo' ),
	],
	__( 'Date boilers', 'wordpress-seo' )
);

?>
<div id='date-boilers-titles-metas-content' class='boilers-titles-metas-content'>
<div class="yoast-settings-section">
	<?php
	$date_boilers_help = new WPSEO_Admin_Help_Panel(
		'noindex-boiler-wpseo',
		esc_html__( 'Help on the date boilers search results setting', 'wordpress-seo' ),
		sprintf(
			/* translators: 1: expands to <code>noindex</code>; 2: link open tag; 3: link close tag. */
			esc_html__( 'Not showing the date boilers in the search results technically means those will have a %1$s robots meta. %2$sMore info on the search results settings%3$s.', 'wordpress-seo' ),
			'<code>noindex</code>',
			'<a href="' . esc_url( WPSEO_Shortlinker::get( 'https://yoa.st/show-x' ) ) . '" target="_blank" rel="noopener noreferrer">',
			'</a>'
		)
	);

	$yform->index_switch(
		'noindex-boiler-wpseo',
		__( 'date boilers', 'wordpress-seo' ),
		$date_boilers_help->get_button_html() . $date_boilers_help->get_panel_html()
	);

	echo '</div>';
	echo '<div class="yoast-settings-section">';

	$recommended_replace_vars     = new WPSEO_Admin_Recommended_Replace_Vars();
	$editor_specific_replace_vars = new WPSEO_Admin_Editor_Specific_Replace_Vars();

	$editor = new WPSEO_Replacevar_Editor(
		$yform,
		[
			'title'                 => 'title-boiler-wpseo',
			'description'           => 'metadesc-boiler-wpseo',
			'page_type_recommended' => $recommended_replace_vars->determine_for_boiler( 'date' ),
			'page_type_specific'    => $editor_specific_replace_vars->determine_for_boiler( 'date' ),
			'paper_style'           => false,
		]
	);

	$editor->render();

	echo '</div>';

	/**
	 * Allow adding custom fields to the admin meta page - Date boilers panel in the boilers tab.
	 *
	 * @param Yoast_Form $yform The Yoast_Form object.
	 */
	do_action( 'Yoast\WP\SEO\admin_date_boilers_meta', $yform );
	?>
</div>
