<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_persona_selector_banner_v1",
 *   label = @Translation("Paragraph: Block Persona Selector Banner"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_persona_selector_banner",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPersonaSelectorBannerV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'PersonaSelectorBanner',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
        'links' => $this->fieldProcessor->getFieldData($entity->get('field_multiple_links')),
      ],
    ];

    return $data;
  }

}
