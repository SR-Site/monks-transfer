<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocksmallinfo_v1",
 *   label = @Translation("Paragraph: blocksmallinfo"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocksmallinfo",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSmallInfoV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);
    $link = $this->fieldProcessor->getFieldData($entity->get('field_link'));

    $heading = $this->fieldProcessor->getFieldData($entity->get('field_heading'));
    $heading = preg_replace('/\*\*(.*)\*\*/', '<span class="highlight">$1</span>', $heading);

    $data = [
      "id" => 'smallInfo',
      "data" => $data + [
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "heading" => $heading,
      ],
    ];

    if (!empty($link)) {
      $data['data']['link'] = $link;
    }

    return $data;
  }

}
