<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockquotesecondary_v1",
 *   label = @Translation("Paragraph: blockquotesecondary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockquotesecondary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockQuoteSecondaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockQuoteSecondary',
      "data" => $data + [
        "author" => $this->fieldProcessor->getFieldData($entity->get('field_title')),
        "quote" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      ],
    ];

    return $data;
  }

}
