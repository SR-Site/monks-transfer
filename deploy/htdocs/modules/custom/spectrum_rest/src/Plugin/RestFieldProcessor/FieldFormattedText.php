<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_formatted_text",
 *   label = @Translation("Formatted text"),
 *   field_types = {
 *     "text",
 *     "text_long",
 *     "text_with_summary"
 *   }
 * )
 */
class FieldFormattedText extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    $html = $field->format == 'bold_html' ? strip_tags($field->value, '<strong><br /><br>') : $field->value;

    return check_markup($html, $field->format);
  }

}
