<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_v1",
 *   label = @Translation("Node: Show"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "default"
 * )
 */
class NodeShowV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $blocks = [];
    // Get show detail.
    $showDetail = $this->entityProcessor->getEntityData($entity, 'v1', ['view_mode' => 'detail']);
    $showDetailBlock = [
      'id' => 'ShowDetail',
      'data' => $showDetail,
    ];

    if ($this->fieldProcessor->getFieldData($entity->get('field_hero_quaternary'))) {
      $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_hero_quaternary'));
    }
    else {
      $blocks[] = [
        'id' => 'heroTertiary',
        'data' => [
          "background" => $this->image($entity->get('field_image')),
        ],
      ];
    }
    $blocks[] = $showDetailBlock;

    if ($this->fieldProcessor->getFieldData($entity->get('field_audience_statistics'))) {
      $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_audience_statistics'));
    }

    if ($this->fieldProcessor->getFieldData($entity->get('field_success_stories_a'))) {
      $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_success_stories_a'));
    }

    // Create Program module, similar shows by genres.
    $genresValues = $entity->get('field_show_genres');
    $genres = [];
    foreach ($genresValues as $genresValue) {
      $genres[] = $genresValue->entity->id();
    }
    if (!empty($genres)) {
      $similarShows = $this->getShowsByGenres($genres, 8, $entity->id());
      $blocks[] = [
        'id' => 'ProgramModule',
        'data' => [
          "overlap" => FALSE,
          "windowed" => FALSE,
          "marginTop" => 2,
          'heading' => t('Find shows similar to :title', [':title' => $entity->label()]),
          'items' => $similarShows,
        ],
      ];
    }

    $data = [
      'title' => $entity->label(),
      'data' => [
        'breadcrumbs' => $this->displayBreadcrumbs($entity),
      ],
      'blocks' => $blocks,
    ];

    return $data;
  }

  /**
   * Get shows by genre.
   *
   * @param array $genres
   *   Genre IDs array.
   * @param int $sid
   *   Show ID.
   * @param int $range
   *   Range.
   *
   * @return array|mixed
   *   Array of shows.
   *
   * @throws \Exception
   */
  protected function getShowsByGenres(array $genres, $sid, $range = 8) {
    $shows = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'show')
      ->condition('status', 1)
      ->condition('nid', $sid, '!=')
      ->condition('field_show_genres.entity.id', $genres, 'IN')
      ->range(0, $range);
    $results = $query->execute();
    if (!empty($results)) {
      $showEntities = Node::loadMultiple($results);
      foreach ($showEntities as $showEntity) {
        $shows[] = $this->entityProcessor->getEntityData($showEntity, 'v1', ['view_mode' => 'program_module']);
      }
    }

    return $shows;
  }

}
