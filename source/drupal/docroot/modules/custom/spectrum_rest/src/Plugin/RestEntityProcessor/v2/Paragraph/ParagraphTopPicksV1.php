<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_top_picks_v1",
 *   label = @Translation("Paragraph: Top picks"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "top_picks",
 *   view_mode = "default"
 * )
 */
class ParagraphTopPicksV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get image and video.
    $data = $data + [
      'items' => $this->fieldProcessor->getFieldData($entity->get('field_top_picks_shows'), ['view_mode' => 'teaser_mode']),
    ];
    $data['link'] = [
      "label" => "All Networks",
      "title" => "All Networks",
      "target" => "featured-programs/networks",
      "type" => 0,
    ];

    return $data;
  }

}
