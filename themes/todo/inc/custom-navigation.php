<?php
/**
 * Custom Icon Menu Walker
 */
class Social_Walker_Nav_Menu extends Walker_Nav_Menu {
    
    static $count = 0;
    private $i = 1;
    
    function __construct( $exclude = null ) {
        $this->exclude = $exclude;
    }

    function skip( $item ) {
        return in_array($item->post_title, (array)$this->exclude);
    }

    public function start_lvl( &$output, $depth = 0, $args = array() ) {
		if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
			$t = '';
			$n = '';
		} else {
			$t = "\t";
			$n = "\n";
		}
		$indent = str_repeat( $t, $depth );

        if ( $depth < 2 ) :
            $classes = array( 'sub-menu', 'sub-menu--expand' );
        else : 
            $classes = array( 'sub-menu', 'sub-menu--expanded' );
        endif;

		$class_names = join( ' ', apply_filters( 'nav_menu_submenu_css_class', $classes, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
        
        $output .= "{$n}{$indent}<ul $class_names>{$n}";
    }

    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        global $wp_query;

        // Skip excluded items
        if ( $this->skip( $item ) ) return;

        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
        $class_names = '';
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
    }
}

/**
 * Add top level menu item class
 */

function add_top_level_li_class($classes, $item, $args) {
    if (0 == $item->menu_item_parent) {
        $classes[] = 'top-level-menu-item';
    } 
    return $classes;
}

add_filter('nav_menu_css_class', 'add_top_level_li_class', 1, 3);
