<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\user\Entity\User;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_v1",
 *   label = @Translation("Node: Article"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "default"
 * )
 */
class NodeArticleV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $blocks = [];

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
      'headerTheme' => (int) $entity->get('field_header_theme')->value,
      'pageTitle' => $entity->label(),
      'blocks' => $blocks,
    ];

    return $data;
  }

}
