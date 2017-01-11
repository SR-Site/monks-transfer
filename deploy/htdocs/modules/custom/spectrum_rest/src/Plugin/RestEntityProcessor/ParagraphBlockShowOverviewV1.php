<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockshowoverview_v1",
 *   label = @Translation("Paragraph: blockshowoverviews"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockshowoverview",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockShowOverviewV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $shows = [];

    foreach ($entity->field_shows as $new) {
      $shows[] = $this->entityProcessor->getEntityData($new->get('entity')->getValue(), $this->getVersion(), ['view_mode' => 'teaser']);
    }

    $data = [
      'id' => 'BlockShowOverview',
      'data' => [
        "background_image" => $this->fieldProcessor->getFieldData($entity->field_image),
        "shows" => $shows,
      ],
    ];

    return $data;
  }

  /**
   * Get plugin version.
   *
   * @TODO: Remove when this MR is fixed.
   * https://app.assembla.com/spaces/mediamonks-drupal/git-3/merge_requests/4344203
   */
  public function getVersion() {
    $definition = $this->getPluginDefinition();
    return isset($definition['version']) ? $definition['version'] : '';
  }

}
