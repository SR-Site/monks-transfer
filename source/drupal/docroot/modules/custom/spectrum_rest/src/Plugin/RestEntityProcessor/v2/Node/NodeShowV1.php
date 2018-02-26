<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\ShowsRestEntityProcessorBase;

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
class NodeShowV1 extends ShowsRestEntityProcessorBase {

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
      $similarShows = $this->showsUtility->getShowsByGenres($genres, 8, $entity->id());
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

}
