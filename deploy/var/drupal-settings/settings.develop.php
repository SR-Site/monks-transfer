<?php

/**
 * @file
 * Contains Drupal settings and configuration override for development.
 */

// Performance and logging.
$config['system.logging']['error_level'] = 'all';               // hide|some|all|verbose
$config['system.performance']['cache']['page']['max_age'] = 0;  // Time in seconds, 0 = no caching
$config['dblog.settings']['row_limit'] = 1000;                  // Max. entries in log, 0 = all entries
$config['system.performance']['css']['preprocess'] = false;     // true|false
$config['system.performance']['js']['preprocess'] = false;      // true|false
$config['system.performance']['css']['gzip'] = true;            // true|false
$config['system.performance']['js']['gzip'] = true;             // true|false
$config['system.performance']['response']['gzip'] = true;       // true|false
$config['system.cron']['threshold.autorun'] = 0;                // Time in seconds, 0 = never run

// File system.
$settings['file_public_path'] = 'assets';
$settings['file_private_path'] = '';
$config['system.file']['path']['temporary'] = '/tmp';

// Override the Drupal cache.
// $settings['cache']['bins']['render'] = 'cache.backend.null';
// $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Additional services.
// $settings['container_yamls'][] = DRUPAL_ROOT . "/../var/drupal-settings/services.develop.yml";

// Trusted host configuration.
unset($settings['trusted_host_patterns']);

// Configuration directories.
$config_directories[CONFIG_SYNC_DIRECTORY] = DRUPAL_ROOT . '/../var/drupal-config/sync';
