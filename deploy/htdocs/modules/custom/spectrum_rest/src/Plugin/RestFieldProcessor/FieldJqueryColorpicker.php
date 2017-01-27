<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "jquery_colorpicker",
 *   label = @Translation("jquery colorpicker"),
 *   field_types = {
 *     "jquery_colorpicker"
 *   }
 * )
 */
class FieldJqueryColorpicker extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    return $field->value;
  }
}
