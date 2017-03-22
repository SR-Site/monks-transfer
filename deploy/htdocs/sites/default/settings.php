<?php


$databases = array();

$config_directories = array();

$settings['hash_salt'] = '';

$settings['update_free_access'] = FALSE;

# $config['system.performance']['fast_404']['exclude_paths'] = '/\/(?:styles)|(?:system\/files)\//';
# $config['system.performance']['fast_404']['paths'] = '/\.(?:txt|png|gif|jpe?g|css|js|ico|swf|flv|cgi|bat|pl|dll|exe|asp)$/i';
# $config['system.performance']['fast_404']['html'] = '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL "@path" was not found on this server.</p></body></html>';

$settings['container_yamls'][] = __DIR__ . '/services.yml';

$settings['install_profile'] = 'standard';

// The path at which the front-end files can be found.
//   This will be used in base path. Example:
//   <base href="https://staging.example.com/version/0123456789/" />
$settings['mm_deployment_version'] = 'src'; // [deploytool]

/**
 * Load local settings and configuration override.
 *
 * environment.local.php contains the environment setting. Depending on its
 * value the settings.[environment].php is loaded that contains DTAP specific
 * settings.
 * settings.local.php contains local overrides and secrets such as database
 * credentials.
 *
 */
require DRUPAL_ROOT . '/../var/drupal-settings/environment.local.php';
require DRUPAL_ROOT . '/../var/drupal-settings/settings.' . $settings['mm_dtap_environment'] . '.php';

// https://wiki.mediamonks.net/Hosting_Environment_Naming_Convention
if(getenv('ENVIRONMENT')) {
	require DRUPAL_ROOT . '/../var/drupal-settings/settings.' . getenv('ENVIRONMENT') . '.php';
}
require DRUPAL_ROOT . '/../var/drupal-settings/settings.local.php';
