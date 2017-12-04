<?php

/**
 * @file
 * Contains secret and strictly local Drupal settings, and config overrides.
 *
 * @see README.md
 */

$settings['hash_salt'] = 'SALT-SALT-SALT';

// Drupal database credentials.

$databases['default']['default'] = array (
  'database' => '[DATABASE_SCHEMA]',
  'username' => '[DATABASE_USERNAME]',
  'password' => '[DATABASE_PASSWORD]',
  'host' => '[DATABASE_HOSTNAME]',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);
$settings['mm_deployment_version'] = '[FRONTEND_VERSION]';

$settings['trusted_host_patterns'] = [
  '^spectrumreach\.com$',
  '^.+\.spectrumreach\.com$',
  '^neverstopreaching\.com$',
  '^.+\.neverstopreaching\.com$',
  '107.189.68.170',
  '23.92.229.18'
];