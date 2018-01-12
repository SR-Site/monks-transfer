<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_success_story_default_v1",
 *   label = @Translation("Node: Success Story"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "success_story",
 *   view_mode = "default"
 * )
 */
class NodeSuccessStoryPageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $blocks = [];

    // Get product page blocks.
    $blocks[] = $this->entityProcessor->getEntityData($entity, 'v1', ['view_mode' => 'background_image']);
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

}