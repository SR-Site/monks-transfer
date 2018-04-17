<?php

namespace Drupal\spectrum_markets_map\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Process plugin for migrating created field.
 *
 * @MigrateProcessPlugin(
 *   id = "add_key_to_indexed_array"
 * )
 */
class AddKeyToIndexedArray extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!is_array($value)) {
      foreach ($value as $key => $item) {
        unset($value[$key]);
        $value[$key]['Stationnum'] = $item;
      }
    }
    return $value;
  }

}
