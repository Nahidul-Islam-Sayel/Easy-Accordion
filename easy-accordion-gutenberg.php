<?php
/**
 * Plugin Name:       Easy Accordion Gutenberg
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-accordion-gutenberg
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function easy_accordion_gutenberg_easy_accordion_gutenberg_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'easy_accordion_gutenberg_easy_accordion_gutenberg_block_init' );
