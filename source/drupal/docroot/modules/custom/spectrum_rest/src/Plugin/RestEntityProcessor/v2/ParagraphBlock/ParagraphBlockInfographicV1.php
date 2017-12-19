<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_infographic_v1",
 *   label = @Translation("Paragraph: Block Infographic"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_infographic",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockInfographicV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'Infographic',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'alignment' => (int) $entity->get('field_alignment')->value,
        'backgroundImage' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
        'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      ],
    ];

    // Add primary and secondary link.
    if ($primaryLink = $this->fieldProcessor->getFieldData($entity->get('field_primary_link'))) {
      $data['data']['primaryLink'] = $primaryLink;
    }
    if ($secondaryLink = $this->fieldProcessor->getFieldData($entity->get('field_secondary_link'))) {
      $data['data']['secondaryLink'] = $secondaryLink;
    }

    return $data;
  }

}
