<?php
/**
 * Plugin Name: Company Content Structure
 * Description: Registers Custom Post Types and Taxonomies for the company marketing site.
 * Version: 1.0
 * Author: Erika Aquino
 * Author URI: https://erideveloper.netlify.app/
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Helper: Base args
 */
function company_base_cpt_args($singular, $plural, $slug, $icon) {
    return array(
        'label' => $plural,
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => $slug),
        'menu_icon' => $icon,
        'supports' => array('title', 'thumbnail'),
        'show_in_rest' => true,

        // GraphQL
        'show_in_graphql' => true,
        'graphql_single_name' => $singular,
        'graphql_plural_name' => $plural,
    );
}

/**
 * Register Custom Post Types
 */
function company_register_cpts() {

    // Services
    register_post_type(
        'service',
        array_merge(
            company_base_cpt_args('Service', 'Services', 'services', 'dashicons-hammer'),
            [
                'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions')
            ]
        )
    );

    // Service Areas
    register_post_type(
        'service_area',
        array_merge(
            company_base_cpt_args('ServiceArea', 'ServiceAreas', 'service-areas', 'dashicons-location'),
            [
                'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions')
            ]
        )
    );

    // Projects
    register_post_type(
    'project',
    array_merge(
        company_base_cpt_args('Project', 'Projects', 'projects', 'dashicons-portfolio'),
        [
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions')
        ]
    )
);

    // Electrical Services
    register_post_type(
        'electrical_service',
        company_base_cpt_args('ElectricalService', 'ElectricalServices', 'electrical-services', 'dashicons-lightbulb')
    );

    // Owners
    register_post_type(
        'owner',
        array_merge(
            company_base_cpt_args('Owner', 'Owners', 'owners', 'dashicons-businessman'),
            [
                'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions')
            ]
        )
    );

    // Clients
    register_post_type(
        'client',
        company_base_cpt_args('Client', 'Clients', 'clients', 'dashicons-groups')
    );

    // Testimonials
    register_post_type(
        'testimonial',
        array_merge(
            company_base_cpt_args('Testimonial', 'Testimonials', 'testimonials', 'dashicons-format-quote'),
            [
                'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions')
            ]
        )
    );

    // Blog
    register_post_type(
    'blog',
        array_merge(
        company_base_cpt_args('Blog', 'Blogs', 'blog', 'dashicons-admin-post'),
        [
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'author'),
            'has_archive' => true,
        ]
    )
);
}

add_action('init', 'company_register_cpts');


/**
 * Featured Taxonomy (Reusable)
 */
function company_register_featured_taxonomies() {

    $args = array(
        'label' => 'Visibility',
        'public' => true,
        'hierarchical' => false,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'Visibility',
        'graphql_plural_name' => 'Visibilities',
    );

    // Attach to Projects
    register_taxonomy(
        'project_visibility',
        array('project'),
        $args
    );

    // Attach to Electrical Services
    register_taxonomy(
        'service_visibility',
        array('electrical_service'),
        $args
    );
}

add_action('init', 'company_register_featured_taxonomies');

function company_register_blog_taxonomies() {

    // Blog Categories
    register_taxonomy(
        'blog_category',
        array('blog'),
        array(
            'label' => 'Blog Categories',
            'hierarchical' => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'BlogCategory',
            'graphql_plural_name' => 'BlogCategories',
        )
    );

    // Blog Tags
    register_taxonomy(
        'blog_tag',
        array('blog'),
        array(
            'label' => 'Blog Tags',
            'hierarchical' => false,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'BlogTag',
            'graphql_plural_name' => 'BlogTags',
        )
    );
}

add_action('init', 'company_register_blog_taxonomies');


/**
 * Flush rewrite rules on activation
 */
function company_activate_plugin() {
    company_register_cpts();
    company_register_featured_taxonomies();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'company_activate_plugin');


/**
 * Flush on deactivation
 */
function company_deactivate_plugin() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'company_deactivate_plugin');

function company_register_project_tags() {

    register_taxonomy(
        'project_tag',
        array('project'),
        array(
            'label' => 'Project Tags',
            'hierarchical' => false, // false = tags, true = categories
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'ProjectTag',
            'graphql_plural_name' => 'ProjectTags',
        )
    );
}

add_action('init', 'company_register_project_tags');

function company_register_service_tags() {

    register_taxonomy(
        'service_tag',
        array('service'),
        array(
            'label' => 'Service Tags',
            'hierarchical' => false,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'ServiceTag',
            'graphql_plural_name' => 'ServiceTags',
        )
    );
}

add_action('init', 'company_register_service_tags');