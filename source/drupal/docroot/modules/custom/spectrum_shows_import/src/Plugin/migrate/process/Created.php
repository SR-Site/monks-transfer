<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Process plugin for migrating created field.
 *
 * @MigrateProcessPlugin(
 *   id = "created"
 * )
 */
class Created extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    // Get timestamp from created date.
    if ($value) {
      return strtotime($value);
    }

    return time();
  }

}
