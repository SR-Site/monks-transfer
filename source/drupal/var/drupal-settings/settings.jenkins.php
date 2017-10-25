<?php

/**
 * @file
 * Contains secret and strictly local Drupal settings, and config overrides.
 *
 * @see README.md
 */

// The salt.
//   Always override this value and use the same value for all environments. 
$settings['hash_salt'] = 'SALT-SALT-SALT';

// Drupal database credentials.
$databases['default']['default'] = array (
  'database' => 'speactrumreach',
  'username' => 'speactrumreach',
  'password' => 'speactrumreach',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

// File system.
$settings['file_public_path'] = 'assets';
$settings['file_private_path'] = '';
$config['system.file']['path']['temporary'] = '/tmp';

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