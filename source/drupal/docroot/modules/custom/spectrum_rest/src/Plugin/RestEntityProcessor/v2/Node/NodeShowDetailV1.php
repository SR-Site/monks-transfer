<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\ShowsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_detail_v1",
 *   label = @Translation("Node: Show - Detail"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "detail"
 * )
 */
class NodeShowDetailV1 extends ShowsRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
      'heading' => $entity->label(),
      'marginTop' => 2,
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_show_description')),
    ];

    // @TODO: Add age restrictions in backend..
    $data['ageRestriction'] = [
      // 'label' => 'Age Restriction',
      // 'image' => [
      //   'small' => 'https://via.placeholder.com/240x240',
      //   'normal' => 'https://via.placeholder.com/240x240',
      //   'alt' => 'Background image alt text',
      // ],
    ];

    // Get next episode..
    $airTime = $this->showsUtility->getNextEpisodeTime($entity->get('field_show_schedules'), 'week');
    $data['airTime'] = [];
    if (!empty($airTime)) {
      $data['airTime'] = [
        'label' => t('Air time'),
        'value' => t('New Episode :week at :time ET/PT', [
          ':week' => $airTime['week'],
          ':time' => $airTime['time'],
        ]),
      ];
    }

    // Get networks logos.
    $data['network'] = [];
    foreach ($entity->get('field_show_network') as $item) {
      $data['network']['logo'][] = $this->image($item->entity->get('image'));
    }

    return $data;
  }

}
