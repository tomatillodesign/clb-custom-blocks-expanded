<?php
/**
 * Plugin Name: Custom Editor Blocks - Habitat Alamance Version
 * Plugin URI: https://www.tomatillodesign.com/
 * Description: Adds 9 new editor blocks: Callouts, Icon Cards, Button Grids, Interactive Cardsets, People, People Flip, Bootstrap Modal Buttons, Bootstrap Modal Cards, and Bootstrap Collapse
 * Author: Chris Liu-Beers, Tomatillo Design
 * Author URI: https://www.tomatillodesign.com/
 * Version: 1.4
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';



/* Enqueue Bootstrap Modal JS and CSS */
add_action( 'wp_enqueue_scripts', 'clb_enqueue_custom_scripts' );
function clb_enqueue_custom_scripts() {

          wp_enqueue_script( 'clb-modal-js', plugin_dir_url( __FILE__ ) . '/js/clb-bootstrap-modal-only.js', array('jquery'), '1.0.0', true );
		wp_enqueue_script( 'clb-move-modals-js', plugin_dir_url( __FILE__ ) . '/js/clb-move-modals.js', array('jquery'), '1.0.0', true );
		wp_enqueue_script( 'clb-handle-reveal-cards', plugin_dir_url( __FILE__ ) . '/js/clb-handle-reveal-cards.js', array('jquery'), '1.0.0', true );
		
		wp_enqueue_style( 'clb-modal-css', plugin_dir_url( __FILE__ ) . '/css/clb-bootstrap-modal-only.css' );


}
