<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\User;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_user_v1",
 *   label = @Translation("User"),
 *   version = "v1",
 *   entity_type = "user",
 *   bundle = "user",
 *   view_mode = "default"
 * )
 */
class UserV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'name' => 'name',
      'role' => 'role',
      'image' => 'image',
    ];

    return $data;
  }

}
