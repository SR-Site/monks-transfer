<?php

/**
 * @file
 * Contains Drupal settings and configuration override for production.
 */

// The salt.
//   Always override this value and use the same value for all environments.
$settings['hash_salt'] = 'SALT-SALT-SALT';


 // Drupal database credentials.
 $databases['default']['default'] = array (
   'database' => 'spectrum-reach-corporate-website-prod',
   'username' => 'spectrumreacprod',
   'password' => '0f87H9PuLlNVGrcHtGStXRLF03hJf5eX',
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


$settings['file_public_path'] = 'data';

// File system.
$settings['file_public_path'] = 'assets';
$settings['file_private_path'] = '';
$config['system.file']['path']['temporary'] = '/tmp';

// Additional services.
// $settings['container_yamls'][] = DRUPAL_ROOT . '/../var/drupal-settings/services.prod.yml';

// Trusted host configuration.
#$settings['trusted_host_patterns'] = array(
#  '^example\.com$',
#);
unset($settings['trusted_host_patterns']);

// Configuration directories.
$config_directories[CONFIG_SYNC_DIRECTORY] = DRUPAL_ROOT . '/../var/drupal-config/sync';



$settings['flysystem'] = [
    's3' => [
        'driver' => 's3',
        'config' => [
            'key'    => 'AKIAJT7JCXZCJPQVNC2Q',      // 'key' and 'secret' do not need to be
            'secret' => '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',   // provided if using IAM roles.
            'region' => 'us-east-1',
            'bucket' => 'spectrum-reach-uat-s3bucket-1xj81upt79499',
            'cname' => 'spectrum-reach-uat-s3bucket-1xj81upt79499.s3.amazonaws.com',         // A CNAME that resolves to your bucket. Used for URL generation.
        ],

        'cache' => FALSE, // Creates a metadata cache to speed up lookups.
    ],
    'local' => [           				// The name of the stream wrapper.
        'driver' => 'local',         	// The plugin key.
        'config' => [
            'root' => './assets',
            'public' => TRUE,		// In order for the public setting to work, the path must be relative to the root of the Drupal install.
        ]
    ]
];