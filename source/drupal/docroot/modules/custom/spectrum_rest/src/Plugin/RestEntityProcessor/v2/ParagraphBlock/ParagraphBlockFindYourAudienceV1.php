<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\GenreInterface;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_find_your_audience_v1",
 *   label = @Translation("Paragraph: Block Find Your Audience"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_find_your_audience",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockFindYourAudienceV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'FindYourAudience',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
      ],
    ];

    // Get top picks.
    $data['data']['topPicks'] = $this->fieldProcessor->getFieldData($entity->get('field_top_picks'));

    // Get networks.
    $data['data']['networks'] = $this->fieldProcessor->getFieldData($entity->get('field_networks'));

    // Get genres.
    $data['data']['genres'] = $this->fieldProcessor->getFieldData($entity->get('field_genres'));

    return $data;
  }

}
