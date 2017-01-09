<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocklatestnews_v1",
 *   label = @Translation("Paragraph: blocklatestnews"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocklatestnews",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLatestNewsV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $news = [];

    foreach ($entity->field_news_items as $new) {
      $news[] = $this->entityProcessor->getEntityData($new->get('entity')->getValue(), $this->getVersion(), ['view_mode' => 'teaser']);
    }

    $data = [
      'id' => 'BlockLatestNews',
      'data' => [
        "news" => $news,
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
