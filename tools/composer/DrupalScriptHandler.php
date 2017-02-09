<?php

namespace MediaMonksDrupalProject\composer;

use Composer\Script\Event;
use Composer\Semver\Comparator;
use Symfony\Component\Filesystem\Filesystem;

class DrupalScriptHandler {

  protected static function getDrupalRoot($project_root) {
    return $project_root .  '/deploy/htdocs';
  }

  public static function copySqlSrvDrivers(Event $event) {
    $fs = new Filesystem();
    $root = static::getDrupalRoot(getcwd());

    if ($fs->exists($root . '/modules/contrib/sqlsrv/drivers')) {
      $fs->mirror("$root/modules/contrib/sqlsrv/drivers", "$root/drivers", NULL, ['delete' => TRUE, 'override' => TRUE]);
      $event->getIO()->write("SQLSRV drivers copied into Drupal root.");
    }
  }

  public static function createRequiredFiles(Event $event) {
    $fs = new Filesystem();
    $root = static::getDrupalRoot(getcwd());

    $dirs = [
      'modules',
      'profiles',
      'themes',
    ];

    // Required for unit testing
    foreach ($dirs as $dir) {
      if (!$fs->exists($root . '/'. $dir)) {
        $fs->mkdir($root . '/'. $dir);
        $fs->touch($root . '/'. $dir . '/.gitkeep');
      }
    }

    // Prepare the environment file for installation
    if (!$fs->exists($root . '/../var/drupal-settings/environment.local.php') && $fs->exists($root . '/../var/drupal-settings/example.environment.local.php')) {
      $fs->copy($root . '/../var/drupal-settings/example.environment.local.php', $root . '/../var/drupal-settings/environment.local.php');
      $fs->chmod($root . '/../var/drupal-settings/environment.local.php', 0666);
      $event->getIO()->write("Created a drupal-settings/environment.local.php file with chmod 0666");
    }

    // Prepare the settings file for installation
    if (!$fs->exists($root . '/../var/drupal-settings/settings.local.php') && $fs->exists($root . '/../var/drupal-settings/example.settings.local.php')) {
      $fs->copy($root . '/../var/drupal-settings/example.settings.local.php', $root . '/../var/drupal-settings/settings.local.php');
      $fs->chmod($root . '/../var/drupal-settings/settings.local.php', 0666);
      $event->getIO()->write("Created a drupal-settings/settings.local.php file with chmod 0666");
    }

    // Create the files directory with chmod 0777
    if (!$fs->exists($root . '/assets')) {
      $oldmask = umask(0);
      $fs->mkdir($root . '/assets', 0777);
      umask($oldmask);
      $event->getIO()->write("Created an assets directory with chmod 0777");
    }

    //Remove the install.php from the core project
    $fs->remove($root . '/core/install.php');

    //Remove the rebuild.php from the core project
    $fs->remove($root . '/core/rebuild.php');

    //Remove all .txt files from the core project
    $fs->remove(glob($root . '/core/*.txt'));

    // Move MediaMonks Drupal projects to the right directory.
    // @todo Write an installer for this. See: https://getcomposer.org/doc/faqs/how-do-i-install-a-package-to-a-custom-path-for-my-framework.md
    $vendor_mediamonks = "$root/../vendor/mediamonks";
    if ($fs->exists($vendor_mediamonks)) {

      // Move MediaMonks modules.
      $directories = [
        'mm_decoupled',
        'mm_prerender',
        'mm_release_tracker',
        'mm_rest',
        'mm_slug',
        'mm_domainmenu',
      ];
      foreach ($directories as $dir) {
        if ($fs->exists("$vendor_mediamonks/$dir")) {
          $fs->remove("$root/modules/mediamonks/$dir");
          $fs->rename("$vendor_mediamonks/$dir", "$root/modules/mediamonks/$dir", true);
        }
      }

      // Move MediaMonks themes.
      $directories = ['mm_gaia'];
      foreach ($directories as $dir) {
        if ($fs->exists("$vendor_mediamonks/$dir")) {
          $fs->remove("$root/themes/mediamonks/$dir");
          $fs->rename("$vendor_mediamonks/$dir", "$root/themes/mediamonks/$dir", true);
        }
      }
    }
  }

  /**
   * Checks if the installed version of Composer is compatible.
   *
   * Composer 1.0.0 and higher consider a `composer install` without having a
   * lock file present as equal to `composer update`. We do not ship with a lock
   * file to avoid merge conflicts downstream, meaning that if a project is
   * installed with an older version of Composer the scaffolding of Drupal will
   * not be triggered. We check this here instead of in drupal-scaffold to be
   * able to give immediate feedback to the end user, rather than failing the
   * installation after going through the lengthy process of compiling and
   * downloading the Composer dependencies.
   *
   * @see https://github.com/composer/composer/pull/5035
   */
  public static function checkComposerVersion(Event $event) {
    $composer = $event->getComposer();
    $io = $event->getIO();

    $version = $composer::VERSION;

    // If Composer is installed through git we have no easy way to determine if
    // it is new enough, just display a warning.
    if ($version === '@package_version@') {
      $io->writeError('<warning>You are running a development version of Composer. If you experience problems, please update Composer to the latest stable version.</warning>');
    }
    elseif (Comparator::lessThan($version, '1.0.0')) {
      $io->writeError('<error>Drupal-project requires Composer version 1.0.0 or higher. Please update your Composer before continuing</error>.');
      exit(1);
    }
  }

}
