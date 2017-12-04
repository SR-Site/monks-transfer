<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_download_file_b_v1",
 *   label = @Translation("Paragraph: Block DownloadFileB"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_download_file_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockDownloadFileBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'DownloadFileB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'fileDescription' => $this->fieldProcessor->getFieldData($entity->get('field_file_description')),
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      ],
    ];

    return $data;
  }

}
