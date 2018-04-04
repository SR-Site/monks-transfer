<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_network_v1",
 *   label = @Translation("Node: Network"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "network",
 *   view_mode = "default"
 * )
 */
class NodeNetworkV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $blocks = [];

    // Get network blocks.
    if ($entity->get('field_network')->entity instanceof Network) {
      /** @var \Drupal\spectrum_shows\Entity\Network $network */
      $network = $entity->get('field_network')->entity;

      // Hero quaternary.
      if ($this->fieldProcessor->getFieldData($entity->get('field_hero_quaternary'))) {
        $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_hero_quaternary'));
      }

      // Network description.
      if ($this->fieldProcessor->getFieldData($network->get('description'))) {
        $blocks[] = $this->displayFreeText($this->fieldProcessor->getFieldData($network->get('description')));
      }

      // Audience statistics.
      if ($this->fieldProcessor->getFieldData($entity->get('field_audience_statistics'))) {
        $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_audience_statistics'));
      }

      // Shows.
      if (!empty($this->getShowsByNetwork($network->id()))) {
        $blocks[] = [
          'id' => 'ProgramModule',
          'data' => [
            "overlap" => FALSE,
            "windowed" => FALSE,
            "marginTop" => 2,
            'heading' => t('Featured On :title', [':title' => $entity->label()]),
            'items' => $this->getShowsByNetwork($network->id()),
          ],
        ];
      }

      // Similar networks.
      if ($entity->get('field_network_similar_networks')->count() > 0) {
        $blocks[] = $this->getSimilarNetworks($entity);
      }
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
   * Display free text with description.
   *
   * @param string $description
   *   Description.
   *
   * @return array
   *   Free text response json.
   */
  protected function displayFreeText($description) {
    if ($description) {
      $heading = [
        '#type' => 'html_tag',
        '#tag' => 'h2',
        '#value' => t('Network description'),
      ];
      $paragraph = [
        '#type' => 'html_tag',
        '#tag' => 'p',
        '#value' => $description,
      ];

      return [
        "id" => "freeText",
        "data" => [
          "overlap" => FALSE,
          "windowed" => FALSE,
          "marginTop" => 2,
          "alignment" => 0,
          "small" => FALSE,
          "html" => render($heading) . render($paragraph),
        ],
      ];
    }

    return [];
  }

  /**
   * Get shows by network.
   *
   * @param int $network
   *   Network ID.
   * @param int $range
   *   Range.
   *
   * @return array|mixed
   *   Array of shows.
   *
   * @throws \Exception
   */
  protected function getShowsByNetwork($network, $range = 8) {
    $shows = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'show')
      ->condition('status', 1)
      ->condition('field_show_network.entity.id', $network)
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

  /**
   * Get other networks.
   *
   * @param ContentEntityBase $entity
   *   Network node.
   *
   * @return array
   *   Array of networks.
   *
   * @throws \Exception
   */
  protected function getSimilarNetworks(ContentEntityBase $entity) {
    return [
      "id" => "networkOverview",
      "data" => [
        "overlap" => FALSE,
        "windowed" => FALSE,
        "marginTop" => 2,
        "alignment" => 0,
        "heading" => t('Networks with similar content to :title', [':title' => $entity->label()]),
        "items" => $this->getItems($entity->get('field_network_similar_networks'), ['view_mode' => 'network_overview']),
      ],
    ];
  }

}
