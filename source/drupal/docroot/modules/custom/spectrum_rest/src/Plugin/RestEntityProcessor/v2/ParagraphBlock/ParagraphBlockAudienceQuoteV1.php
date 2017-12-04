<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_quote_v1",
 *   label = @Translation("Paragraph: Block Audience Quote"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_quote",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceQuoteV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'AudienceQuote',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'subHeading' => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      ],
    ];

    return $data;
  }

}
