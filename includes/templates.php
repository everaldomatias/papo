<?php

namespace Papo;

function load_template( $template ) {
    $new_template = PAPO_PATH . 'templates/index.php';

    if ( file_exists( $new_template ) ) {
        return $new_template;
    }

    return $template;
}

add_filter( 'template_include', 'Papo\\load_template' );
