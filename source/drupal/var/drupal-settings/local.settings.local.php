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

$config_directories = array();
$config_directories['sync'] = DRUPAL_ROOT . '/../var/drupal-config/sync';

// Drupal database credentials.

$databases['default']['default'] = array (
  'database' => 'speactrumreach',
  'username' => 'root',
  'password' => 'root',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

$settings['file_public_path'] = 'assets';
$settings['file_private_path'] = '';
$config['system.file']['path']['temporary'] = '/tmp';

$settings['mm_deployment_version'] = '[FRONTEND_VERSION]'; // [deploytool]

unset($settings['trusted_host_patterns']);