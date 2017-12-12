<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_product_page_default_v1",
 *   label = @Translation("Node: Product Page"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "product_page",
 *   view_mode = "default"
 * )
 */
class NodeProductPageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $blocks = [];

    // Get product page blocks.
    $blocks[] = $this->entityProcessor->getEntityData($entity, 'v1', ['view_mode' => 'detail']);

    // Get the blocks by getting paragraphs.
    /** @var \Drupal\Core\TypedData\ListInterface $paragraph_references */
    $paragraph_references = $entity->get('field_blocks');

    foreach ($paragraph_references as $reference) {
      // Use the rather ugly magic getter to get the entity.
      /** @var \Drupal\paragraphs\ParagraphInterface $paragraph */
      $paragraph = $reference->entity;

      /** @var \Drupal\paragraphs\ParagraphInterface $paragraph_translated */
      $paragraph_translated = $this->entityRepository->getTranslationFromContext($paragraph);

      $blocks[] = $this->entityProcessor->getEntityData($paragraph_translated, 'v1');
    }

    $data = [
      'title' => $entity->label(),
      'data' => [
        'headerTheme' => (int) $entity->get('field_header_theme')->value,
        'hideContactButton' => (int) $entity->get('field_hide_contact_button')->value,
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
   * @param int $nid
   *   Current network ID.
   *
   * @return array
   *   Array of networks.
   *
   * @throws \Exception
   */
  protected function getOtherNetworks($nid) {
    $networks = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'network')
      ->condition('nid', $nid, '!=');
    $results = $query->execute();
    if (!empty($results)) {
      $networkEntities = Node::loadMultiple($results);
      foreach ($networkEntities as $networkEntity) {
        $networks[] = $this->entityProcessor->getEntityData($networkEntity, 'v1', ['view_mode' => 'network_overview']);
      }
    }

    return $networks;
  }

}