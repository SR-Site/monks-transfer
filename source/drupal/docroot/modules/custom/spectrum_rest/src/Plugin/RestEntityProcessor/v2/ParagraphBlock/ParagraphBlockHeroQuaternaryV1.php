<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_hero_quaternary_v1",
 *   label = @Translation("Paragraph: Block Hero Quaternary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_hero_quaternary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroQuaternaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'HeroQuaternary',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'backgroundVideo' => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
        'subHeading' => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        'overlay' => $this->fieldProcessor->getFieldData($entity->get('field_overlay')) ? $this->fieldProcessor->getFieldData($entity->get('field_overlay')) : FALSE,
        'triangle' => $this->fieldProcessor->getFieldData($entity->get('field_triangle')) ? $this->fieldProcessor->getFieldData($entity->get('field_triangle')) : FALSE,
      ],
    ];

    foreach ($data['data'] as $key => $item) {
      if ($item === '' || $item === NULL) {
        unset($data['data'][$key]);
      }
    }

    return $data;
  }

}
