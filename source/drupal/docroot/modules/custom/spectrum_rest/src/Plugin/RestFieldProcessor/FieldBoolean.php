<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_boolean",
 *   label = @Translation("boolean"),
 *   field_types = {
 *     "boolean"
 *   }
 * )
 */
class FieldBoolean extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    return (bool)$field->value;
  }
}
