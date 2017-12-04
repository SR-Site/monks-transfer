<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_program_mode_v1",
 *   label = @Translation("Node: Show - Program mode"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "program_module"
 * )
 */
class NodeShowProgramModuleV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
      'heading' => $entity->label(),
      'paragraph' => text_summary($this->fieldProcessor->getFieldData($entity->get('field_show_description')), NULL, 200),
      'target' => $entity->toUrl()->toString(),
      'image' => $this->image($entity->get('field_image')),
      "stats" => [
        "percentage" => 1,
        "demographic" => "Lorem ipsum dolor sit amet",
      ],
    ];

    // Get video.
    $video = $this->fieldProcessor->getFieldData($entity->get('field_show_videos'));
    if (!empty($video)) {
      $data['video'] = $video[0];
    }

    return $data;
  }

}
