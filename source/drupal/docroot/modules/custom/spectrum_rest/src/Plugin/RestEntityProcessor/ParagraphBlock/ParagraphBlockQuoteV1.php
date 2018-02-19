<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockquote_v1",
 *   label = @Translation("Paragraph: blockquote"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockquote",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockQuoteV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'quote',
      "data" => $data + [
        "quote" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      ],
    ];

    return $data;
  }

}
