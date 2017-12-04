<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;
use Drupal\taxonomy\Entity\Term;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_success_story_post_v1",
 *   label = @Translation("Node: Article - Success Story Post"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "success_story_post"
 * )
 */
class NodeArticleSuccessStoryPostV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'heading' => $entity->label(),
      'subHeading' => 'Success Story',
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_excerpt')),
      'company' => [
        'label' => 'Company',
        'value' => $this->fieldProcessor->getFieldData($entity->get('field_company')),
      ],
      'industry' => [
        'label' => 'Industry',
        'value' => ($entity->get('field_industry')->entity instanceof Term) ? $entity->get('field_industry')->entity->label() : NULL,
      ],
      'market' => [
        'label' => 'Market',
        'value' => ($entity->get('field_market')->entity instanceof Term) ? $entity->get('field_market')->entity->label() : NULL,
      ],
    ];

    return $data;
  }

}
