<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_spacer_v1",
 *   label = @Translation("Paragraph: Spacer"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "spacer",
 *   view_mode = "default"
 * )
 */
class ParagraphSpacerV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
      "id" => "spacer",
      "data" => [
        "overlap" => FALSE,
        "windowed" => FALSE,
        "marginTop" => 4,
      ],
    ];

    return $data;
  }

}
