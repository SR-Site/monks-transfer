<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_glossary_a_v1",
 *   label = @Translation("Paragraph: Block GlossaryA"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_glossary_a",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockGlossaryAV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'GlossaryA',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        'items' => $this->fieldProcessor->getFieldData($entity->get('field_glossary_a_items')),
      ],
    ];

    return $data;
  }

}
