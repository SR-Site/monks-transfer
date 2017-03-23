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

$settings['flysystem'] = [
  's3' => [
    'driver' => 's3',
    'config' => [
		'key'    => 'AKIAJT7JCXZCJPQVNC2Q',      // 'key' and 'secret' do not need to be
		'secret' => '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',   // provided if using IAM roles.
		'region' => 'us-east-1',
		'bucket' => 'spectrum-reach-uat-s3bucket-1xj81upt79499',
		'cname' => 'spectrum-reach-uat-s3bucket-1xj81upt79499.s3.amazonaws.com',         // A CNAME that resolves to your bucket. Used for URL generation.
		//'options' => [
		   //'ACL' => 'public-read',
		   //'StorageClass' => 'REDUCED_REDUNDANCY',
		//],
		// Optional configuration settings.
		// 'protocol' => 'https',                   // Autodetected based on the current request if not provided.
		// 'prefix' => 'an/optional/prefix',        // Directory prefix for all uploaded/viewed files.
		// 'endpoint' => 'https://api.example.com', // An alternative API endpoint for 3rd party S3 providers.
    ],

    'cache' => FALSE, // Creates a metadata cache to speed up lookups.
  ],
  'local' => [           				// The name of the stream wrapper.
		'driver' => 'local',         	// The plugin key.
		'config' => [
			'root' => './assets',
			'public' => TRUE,		// In order for the public setting to work, the path must be relative to the root of the Drupal install.
			// Optional settings that apply to all adapters.
			//'name' => 'Custom stream wrapper name', // Defaults to Flysystem: scheme.
			//'description' => 'Custom description',  // Defaults to Flysystem: scheme.

			//'cache' => TRUE,             // Cache filesystem metadata. Not necessary for
										 // the local driver.

			//'replicate' => 'ftpexample', // 'replicate' writes to both filesystems, but
										 // reads from this one. Functions as a backup.

			//'serve_js' => TRUE,          // Serve Javascript or CSS via this stream wrapper.
			//'serve_css' => TRUE,         // This is useful for adapters that function as CDNs like the S3 adapter.
		]
	]
];