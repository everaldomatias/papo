<?php

namespace Papo;

add_action( 'wp_enqueue_scripts', 'Papo\\frontend_enqueue_scripts' );

function frontend_enqueue_scripts() {

    if ( is_user_logged_in() ) {
        $user = wp_get_current_user();

        do_action( 'qm/debug', $user );

        wp_enqueue_script( 'papo-bundle', plugins_url( 'papo/dist/papo-bundle.js' ), [], PAPO_VERSION, true );
        wp_localize_script( 'papo-bundle', 'wpApiSettings',
        [
            'root'        => esc_url_raw( rest_url() ),
            'nonce'       => wp_create_nonce( 'wp_rest' ),
            'currentUser' => $user->data->ID
        ] );
    }
}
