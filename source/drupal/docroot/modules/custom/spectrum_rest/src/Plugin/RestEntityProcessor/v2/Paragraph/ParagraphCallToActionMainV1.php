<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph\ParagraphCallToActionV1;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_calltoaction_main_v1",
 *   label = @Translation("Paragraph: calltoaction main"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "calltoaction",
 *   view_mode = "main"
 * )
 */
class ParagraphCallToActionMainV1 extends ParagraphCallToActionV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = parent::getItemData($entity);
    $data['heading'] = strip_tags($data['heading']);
    $data['paragraph'] = strip_tags($data['paragraph']);
    unset($data['backgroundBlurred']);

    return $data;
  }

}
