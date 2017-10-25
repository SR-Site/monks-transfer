<?php

/**
 * @file
 * Contains script to load local and environment specific Drupal settings.
 *
 * @see README.md
 */

// Set the install profile.
$settings['install_profile'] = 'standard';

/**
 * Load local settings and configuration override.
 *
 * environment.local.php contains the environment setting. Depending on its
 * value the settings.[environment].php is loaded that contains DTAP specific
 * settings.
 * settings.local.php contains local overrides and secrets such as database
 * credentials.
 *
 * Place this code block at the end of the settings.php to take full effect.
 */
require DRUPAL_ROOT . '/../var/drupal-settings/environment.local.php';
require DRUPAL_ROOT . '/../var/drupal-settings/settings.' . $settings['mm_dtap_environment'] . '.php';
require DRUPAL_ROOT . '/../var/drupal-settings/settings.local.php';
