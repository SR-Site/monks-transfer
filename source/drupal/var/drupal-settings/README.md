# Drupal settings

Drupal settings are loaded from the active sites/.../settings.php. Depending
on the current DTAP environment different environment specific settings will
be loaded.

## Usage
0. Place this drupal-settings directory in your project two levels higher that the drupal root. E.g. [drupal root]/../var/drupal-settings.
1. Append example.settings.php to the active sites/*/settings.php file.
2. Copy example.environment.local.php to environment.local.php and set the environment variable.
3. Adjust the settings in each settings.[environment].php to match the project needs.
4. Copy example.settings.local.php to settings.local.php. Set salt and database credentials.

## Git
All files in this directory are under revision control except
settings.local.php and environment.local.php

## Services
example.services.develop.php contains local Drupal services and service 
overrides. Copy this file to a services.[environment].yml and load it using the 
'container_yamls' setting in settings.[environment].php.
