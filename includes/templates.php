<?php

namespace Papo;

function redirect_to_login() {
    if ( !is_user_logged_in() && $GLOBALS['pagenow'] !== 'wp-login.php' ) {
        wp_redirect( admin_url() );
        exit;
    }
}

add_action( 'template_redirect', 'Papo\\redirect_to_login' );

function login_redirect( $redirect_to, $request, $user ) {
    if ( isset( $user->roles ) && is_array( $user->roles ) && in_array( 'administrator', $user->roles ) ) {
        return admin_url();
    } else {
        return home_url();
    }
}

add_filter( 'login_redirect', 'Papo\\login_redirect', 10, 3 );


function load_template( $template ) {
    $new_template = PAPO_PATH . 'templates/index.php';

    if ( file_exists( $new_template ) ) {
        return $new_template;
    }

    return $template;
}

add_filter( 'template_include', 'Papo\\load_template' );
