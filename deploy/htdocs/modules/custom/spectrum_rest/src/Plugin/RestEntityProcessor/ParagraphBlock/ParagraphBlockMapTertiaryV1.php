<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_map_tertiary_v1",
 *   label = @Translation("Paragraph: BlockArticleTeaser"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_map_tertiary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMapTertiaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
        "id" => 'mapTertiary',
        "data" => [
            "overlap" => $this->fieldProcessor->getFieldData($entity->get('field_overlap')),
            "windowed" => $this->fieldProcessor->getFieldData($entity->get('field_windowed')),
            "marginTop" => (int) $entity->get('field_margin_top')->value,
            "tertiaryMapData" => (int) $entity->field_tertiary_data->value
        ]
    ];

    return $data;
  }

}
