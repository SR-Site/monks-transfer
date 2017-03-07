<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Media;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\spectrum_rest\MediaType;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_media_video_external_v1",
 *   label = @Translation("Media: video external"),
 *   version = "v1",
 *   entity_type = "media",
 *   bundle = "video_external",
 *   view_mode = "default"
 * )
 */
class MediaVideoExternalV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $video = $this->fieldProcessor->getFieldData($entity->field_media_video_embed_field);

    $data = [
      'url' => $video['url'],
      'id' => $video['id'],
      'type' => MediaType::VIDEO_VIMEO,
    ];

    return $data;
  }

}
