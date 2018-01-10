<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_success_story_a_v1",
 *   label = @Translation("Node: Success Story A"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "success_story",
 *   view_mode = "success_story_a"
 * )
 */
class NodeSuccessStoryAV1 extends NodeArticleTeaserV1 {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->t('Success story'),
      "subHeading" => $entity->label(),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      'link' => [
        'label' => $entity->label(),
        'title' => $entity->label(),
        "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
        'type' => 0,
      ],
    ];

    return $data;
  }

}
