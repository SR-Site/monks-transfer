<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_success_story_highlight_v1",
 *   label = @Translation("Node: Success Story Highlight"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "success_story",
 *   view_mode = "success_story_highlight"
 * )
 */
class NodeSuccessStoryHighlightV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $entity->label(),
      "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "image" => $this->image($entity->get('field_image')),
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
