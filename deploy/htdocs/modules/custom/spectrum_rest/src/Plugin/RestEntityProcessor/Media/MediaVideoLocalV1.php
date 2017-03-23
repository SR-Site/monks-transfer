<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Media;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\spectrum_rest\MediaType;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_media_video_local_v1",
 *   label = @Translation("Media: video local"),
 *   version = "v1",
 *   entity_type = "media",
 *   bundle = "video_local",
 *   view_mode = "default"
 * )
 */
class MediaVideoLocalV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $video = $this->fieldProcessor->getFieldData($entity->field_video_local);

    $data = [
      'url' => $video['url'],
      'type' => MediaType::VIDEO_INTERNAL,
    ];

    return $data;
  }

}
