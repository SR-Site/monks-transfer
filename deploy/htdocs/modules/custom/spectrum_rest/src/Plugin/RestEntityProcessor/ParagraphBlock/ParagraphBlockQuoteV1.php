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
        "description" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "name" => $this->fieldProcessor->getFieldData($entity->get('field_title')),
        "quote" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
        "image" => $this->image($entity->get('field_image')),
      ],
    ];

    return $data;
  }

}
