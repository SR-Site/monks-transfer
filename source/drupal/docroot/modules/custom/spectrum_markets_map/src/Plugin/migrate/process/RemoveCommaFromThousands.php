<?php

namespace Drupal\spectrum_markets_map\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Process plugin for migrating created field.
 *
 * @MigrateProcessPlugin(
 *   id = "remove_comma_from_thousands"
 * )
 */
class RemoveCommaFromThousands extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    return str_replace(',', '', $value);
  }

}
