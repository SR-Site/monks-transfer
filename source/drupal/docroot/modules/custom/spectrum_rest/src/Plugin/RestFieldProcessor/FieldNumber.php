<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_number",
 *   label = @Translation("Number"),
 *   field_types = {
 *     "number",
 *     "float"
 *   }
 * )
 */
class FieldNumber extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = []) {
    return $field->value;
  }

}
