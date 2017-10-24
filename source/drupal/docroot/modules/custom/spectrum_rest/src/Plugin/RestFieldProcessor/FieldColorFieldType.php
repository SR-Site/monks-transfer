<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "jquery_colorpicker",
 *   label = @Translation("Color field type"),
 *   field_types = {
 *     "color_field_type"
 *   }
 * )
 */
class FieldColorFieldType extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    $values = $field->getValue();

    list($r,$g,$b) = sscanf($values['color'], "#%02x%02x%02x");
    $a = $values['opacity'];

    return "rgba($r, $g, $b, $a)";
  }
}
