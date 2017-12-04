<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_default_image_v1",
 *   label = @Translation("Paragraph: Image"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "image",
 *   view_mode = "default"
 * )
 */
class ParagraphImageDefaultV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get normal image.
    $normal = $this->fieldProcessor->getFieldData($entity->get('field_normal'));
    // Get small image.
    $small = $this->fieldProcessor->getFieldData($entity->get('field_small'));
    // Get alt.
    $normalImageValue = $entity->get('field_normal')->getValue();
    $alt = isset($normalImageValue[0]['alt']) && $normalImageValue[0]['alt'] != NULL ? $normalImageValue[0]['alt'] : $entity->get('field_normal')->getEntity()->label();

    $data = [
      'normal' => $normal,
      'small' => $small ? $small : $normal,
      'alt' => $alt,
    ];

    return $data;
  }

}
