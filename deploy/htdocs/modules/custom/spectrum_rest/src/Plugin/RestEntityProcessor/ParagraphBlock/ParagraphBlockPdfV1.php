<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_pdf_v1",
 *   label = @Translation("Paragraph: ParagraphBlockPdf"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_pdf",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPdfV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
      $a = '';
    $data = [
        "id" => 'pdf',
        "data" => [
            "link" => $this->fieldProcessor->getFieldData($entity->field_pdf)
        ]
    ];

    return $data;
  }

}
