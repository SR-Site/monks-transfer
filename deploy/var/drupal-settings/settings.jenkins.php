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

// The path at which the front-end files can be found.
//   This will be used in base path. Example:
//   <base href="https://staging.example.com/version/0123456789/" />
$settings['mm_deployment_version'] = 'src'; // [deploytool]
