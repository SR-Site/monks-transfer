<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_device_v1",
 *   label = @Translation("Paragraph: Device"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "device",
 *   view_mode = "default"
 * )
 */
class ParagraphDeviceV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get Core product message item.
    $data = $data + [
      'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
    ];

    return $data;
  }

}
