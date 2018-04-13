<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_decimal",
 *   label = @Translation("Decimal"),
 *   field_types = {
 *     "decimal"
 *   }
 * )
 */
class FieldDecimal extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = []) {
    return $field->value;
  }

}
