<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\Core\Url;
use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

abstract class TagsRestEntityProcessorBase extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "label" => $entity->label(),
      "title" => $entity->label(),
      "target" => Url::fromUri("base:knowledge-center", ["fragment" => $entity->label(), "absolute" => TRUE])->toString(),
      "type" => 0,
    ];

    return $data;
  }

}
