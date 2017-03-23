<?php

/**
 * @file
 * Contains Drupal settings and configuration override for staging.
 */
 // Drupal database credentials.
 $databases['default']['default'] = array (
   'database' => 'spectrumusuat',
   'username' => 'spectrumusuat',
   'password' => 'hzPIhMD2w2wwEhwSSDhULugW4zRfF624',
   'host' => 'mysql',
   'port' => '3306',
   'driver' => 'mysql',
   'prefix' => '',
   'collation' => 'utf8mb4_general_ci',
 );

// Performance and logging.
$config['system.logging']['error_level'] = 'hide';                // hide|some|all|verbose
$config['system.performance']['cache']['page']['max_age'] = 3600; // Time in seconds, 0 = no caching
$config['dblog.settings']['row_limit'] = 1000;                    // Max. entries in log, 0 = all entries
$config['system.performance']['css']['preprocess'] = false;        // true|false
$config['system.performance']['js']['preprocess'] = false;         // true|false
$config['system.performance']['css']['gzip'] = true;              // true|false
$config['system.performance']['js']['gzip'] = true;               // true|false
$config['system.performance']['response']['gzip'] = true;         // true|false

// File system.
$settings['file_public_path'] = 'assets';
$settings['file_private_path'] = '';
$config['system.file']['path']['temporary'] = '/tmp';

// Additional services.
// $settings['container_yamls'][] = DRUPAL_ROOT . '/../var/drupal-settings/services.stage.yml';

// Trusted host configuration.
$settings['trusted_host_patterns'] = array(
  '^stage\.example\.com$',
);

// Configuration directories.
$config_directories[CONFIG_SYNC_DIRECTORY] = DRUPAL_ROOT . '/../var/drupal-config/sync';
