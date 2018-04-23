<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Media;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\spectrum_rest\MediaType;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_media_video_images_v1",
 *   label = @Translation("Media: Images"),
 *   version = "v1",
 *   entity_type = "media",
 *   bundle = "images",
 *   view_mode = "default"
 * )
 */
class MediaImages extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = $this->images($entity->get('field_images'), ['style' => 'network__markets_map__canvas']);

    return $data;
  }

}
