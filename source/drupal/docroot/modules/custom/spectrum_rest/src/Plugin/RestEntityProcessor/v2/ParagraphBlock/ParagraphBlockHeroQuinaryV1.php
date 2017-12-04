<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_hero_quinary_v1",
 *   label = @Translation("Paragraph: Block Hero Quinary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_hero_quinary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroQuinaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'HeroQuinary',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'backgroundVideo' => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      ],
    ];

    return $data;
  }

}
