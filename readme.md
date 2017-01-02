# Drupal Skeleton

Skeleton for MediaMonks Drupal websites.

## Usage
To start a project using the skeleton simply run:
````
composer install
````

To add a drupal contrib modules run:
```
composer require drupal/my_module
```

- The Drupal installation directory is located at deploy/htdocs
- Copy the files of the Drupal Skelton, but do not re-use the Git repository in your project. Simply remove the Skeleton .git directory before starting your project.
- The composer.lock file is committed into the project git repository.

## Drupal settings
- Use deploy/var/drupal-settings for drupal settings. Both local and DTAP environment specific settings.
- Set the environment name in settings.[environment].php
- All \*.local.\* files will be excluded from Git.
- See deploy/var/drupal-settings/readme.md for more details.

## Drupal file system
- Use [drupal root]/assets for public files
- Include "assets/*" in [drupal root]/.gitignore

## Drupal configuration
- Use deploy/var/drupal-config to store exported Drupal configuration.

## Composer
- Commit the composer.lock file to the project repository.
- Use a Composer driven workflow for external libraries. If a custom module requires libraries, add a composer.json file to the module.

## Patches
- Use composer.json to apply patches to Drupal contrib modules or core.
