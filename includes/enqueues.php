<?php

namespace Papo;

add_action( 'wp_enqueue_scripts', 'Papo\\frontend_enqueue_scripts' );

function frontend_enqueue_scripts() {
    // wp_enqueue_style( 'papo', PAPO_PATH . 'assets/css/papo.css', [], PAPO_VERSION, 'all' );
    wp_enqueue_script( 'papo-bundle', plugins_url( 'papo/dist/papo-bundle.js' ), [], PAPO_VERSION, true );
    // wp_enqueue_script( 'papo', PAPO_PATH . 'assets/js/papo.js', [], PAPO_VERSION, true );
}
