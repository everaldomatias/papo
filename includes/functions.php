<?php
function add_cors_http_header(){
    header( "Access-Control-Allow-Origin: *" );
    header( "Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT" );
    header( "Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding" );
}
add_action('init','add_cors_http_header');

function check_if_post_created_via_rest_api( $post_ID, $post, $update ) {
    global $wp;

    if ( strpos( $wp->query_vars['rest_route'], '/wp/v2' ) !== false ) {
        if ( $post->post_type == 'post' && ! wp_is_post_revision( $post_ID ) ) {
            remove_action( 'save_post', 'check_if_post_created_via_rest_api' );

            $timestamp = current_time( 'timestamp' );
            $user_info = get_userdata( $post->post_author );
            $username = $user_info->user_login;
            $custom_title = $timestamp . '-' . $username;

            wp_update_post( [
                'ID'         => $post_ID,
                'post_title' => $custom_title,
                'post_name'  => sanitize_title( $custom_title )
            ] );

            add_action( 'save_post', 'check_if_post_created_via_rest_api' );
        }
    }
}
add_action( 'save_post', 'check_if_post_created_via_rest_api', 10, 3 );

function hide_admin_bar() {
    if ( ! current_user_can( 'administrator' ) ) {
        add_filter( 'show_admin_bar', '__return_false' );
    }
}
add_action( 'after_setup_theme', 'hide_admin_bar' );
