<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockstoryinfoimages_v1",
 *   label = @Translation("Paragraph: blockstoryinfoimages"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockstoryinfoimages",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockStoryInfoImagesV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'storyInfoImages',
      "data" => $data + [
        "stories" => $this->getItems($entity->get('field_stories')),
      ],
    ];

    return $data;
  }

}
