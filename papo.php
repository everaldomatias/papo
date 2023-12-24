<?php
/**
 * Plugin Name:       Papo
 * Plugin URI:        https://everaldo.dev/plugins/
 * Description:       Plugin to make a chat using WP.
 * Version:           0.0.1
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Everaldo Matias
 * Author URI:        https://everaldo.dev/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://everaldo.dev/plugins/papo
 * Text Domain:       papo
 * Domain Path:       /languages
 */

function papo_plugin_activate() {
    flush_rewrite_rules();
}

register_activation_hook( __FILE__, 'papo_plugin_activate' );

define( 'PAPO_VERSION', '0.0.1' );
define( 'PAPO_URL', plugins_url( '/', __FILE__ ) );
define( 'PAPO_PATH', plugin_dir_path(__FILE__ ) );

require_once( 'includes/templates.php' );
require_once( 'includes/enqueues.php' );
require_once( 'includes/functions.php' );
