<?php
/*
   Plugin Name: Advance DatePicker
   Plugin URI: https://github.com/vksingh5995
   Description: Advance DatePicker is a booking calendar plugin which based on JavaScript and uses momentJs liberary. 
   Version: 1.1.0
   Author: Vivek Singh
   Author URI: https://vivek.webtouchsolution.com/
*/
define( 'PLUGIN_URL', plugin_dir_url( __FILE__) );
define( 'PLUGIN_PATH',  __DIR__ );
define( 'ADVANCEPLUGIN_VERSION', '1.1.0' );


function utm_user_scripts() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_style( 'style',  $plugin_url . "/includes/css/hotel-datepicker.css");
}
add_action( 'wp_enqueue_scripts', 'utm_user_scripts' );

function plugin_min_script() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_script('advancePluginscriptfecha' , $plugin_url ."/includes/js/fecha.min.js" ,array(), 1.1 ,true);
}
add_action( 'wp_enqueue_scripts', 'plugin_min_script' );

function plugin_scripts(){
    $plugin_url = plugin_dir_url(__FILE__);
    wp_enqueue_script('advancePluginscript' , $plugin_url ."/includes/js/hotel-datepicker.min.js" ,array(), 1.1, true);
    wp_register_script('moment' ,'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js' ,null, null ,true);
    wp_enqueue_script('moment');
}
add_action("wp_enqueue_scripts", "plugin_scripts");

function register() {
    $plugin_url = plugin_dir_url(__FILE__);
    wp_enqueue_script('holiday', $plugin_url ."/includes/js/holiday.js", array(),  1.1, true );
    wp_enqueue_script('advancePluginscripts', $plugin_url ."/includes/js/script.js", array('holiday'),1.1, true );
}
add_action( "wp_enqueue_scripts", "register" );

function advanceplugin_menu()
{
add_menu_page("Advance DatePicker", "Advance DatePicker", "manage_options", "advancedatepicker", "datepickerui", PLUGIN_URL . 'includes/img/icon3.svg');
}
add_action("admin_menu", "advanceplugin_menu");

function datepickerui()
{
    include "datepickerui.php";
}

// Creating shortcode for displaying all entries.
add_shortcode( 'advanceplugin_entries', 'shortcode_display_entries' );
function shortcode_display_entries() {
    ob_start();
    include( PLUGIN_PATH . '/includes/js/shortcode_display_entries.php' );
    $html = ob_get_clean();
    return $html;
}
