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
    foreach ($entity->get('field_genres') as $genre) {
      /** @var \Drupal\spectrum_shows\Entity\Genre $genreEntity */
      $genreEntity = $genre->entity;
      if (!empty($this->getShowsByGenre($genreEntity))) {
        $data['data']['genres'][] = [
          'heading' => $genreEntity->label(),
          'items' => $this->getShowsByGenre($genreEntity)
        ];
      }
    }

    return $data;
  }

  /**
   * Get shows by genre.
   *
   * @param \Drupal\spectrum_shows\GenreInterface $genre
   *   Genre entity.
   * @param int $range
   *   Range.
   *
   * @return array|mixed
   *   Array of shows.
   *
   * @throws \Exception
   */
  protected function getShowsByGenre(GenreInterface $genre, $range = 4) {
    $shows = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'show')
      ->condition('status', 1)
      ->condition('field_show_genres.entity.id', $genre->id())
      ->range(0, $range);
    $results = $query->execute();
    if (!empty($results)) {
      $showEntities = Node::loadMultiple($results);
      foreach ($showEntities as $showEntity) {
        $shows[] = $this->entityProcessor->getEntityData($showEntity, 'v1', ['view_mode' => 'teaser_mode']);
      }
    }

    return $shows;
  }

}
