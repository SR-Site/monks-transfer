<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Media;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\spectrum_rest\MediaType;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_media_video_url_v1",
 *   label = @Translation("Media: video URL"),
 *   version = "v1",
 *   entity_type = "media",
 *   bundle = "video_url",
 *   view_mode = "default"
 * )
 */
class MediaVideoURLV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $video = $this->fieldProcessor->getFieldData($entity->field_video_url);

    $data = [
      'url' => $video['target'],
      'type' => MediaType::VIDEO_INTERNAL,
    ];

    return $data;
  }

}
