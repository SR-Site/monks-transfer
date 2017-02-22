<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockherotertiary_v1",
 *   label = @Translation("Paragraph: blockherotertiary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockherotertiary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroTertiaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'heroTertiary',
      "data" => $data + [
        "background" => $this->image($entity->get('field_image')),
      ],
    ];

    return $data;
  }

}
