<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_product_top_v1",
 *   label = @Translation("Paragraph: Block Audience Product Top"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_product_top",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceProductTopV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and add success story.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'AudienceProductTop',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
        'card' => $this->fieldProcessor->getFieldData($entity->get('field_product'), ['view_mode' => 'audience_product_top']),
      ],
    ];

    return $data;
  }

}
