<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\User;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class UserV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'name' => $this->fieldProcessor->getFieldData($entity->get('field_name')),
      'role' => $this->fieldProcessor->getFieldData($entity->get('field_role')),
      'image' => $this->image($entity->get('user_picture')),
    ];

    return $data;
  }

}
