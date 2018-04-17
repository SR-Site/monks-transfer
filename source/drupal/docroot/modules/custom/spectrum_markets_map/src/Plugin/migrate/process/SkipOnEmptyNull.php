<?php

namespace Drupal\spectrum_markets_map\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\migrate\process\SkipOnEmpty;
use Drupal\migrate\Row;

/**
 * Class SkipOnEmptyNull
 *
 * @MigrateProcessPlugin(
 *   id = "skip_on_empty_null"
 * )
 */
class SkipOnEmptyNull extends SkipOnEmpty {

  /**
   * {@inheritdoc}
   */
  public function row($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!$value || $value == 'NULL') {
      $message = !empty($this->configuration['message']) ? $this->configuration['message'] : '';
      throw new MigrateSkipRowException($message);
    }
    return $value;
  }

  public function process($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!$value || $value == 'NULL') {
      throw new MigrateSkipProcessException();
    }
    return $value;
  }

}