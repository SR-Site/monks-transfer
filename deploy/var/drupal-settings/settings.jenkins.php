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
