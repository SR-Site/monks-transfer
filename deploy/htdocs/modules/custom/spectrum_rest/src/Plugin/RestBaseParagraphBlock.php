<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Common class for Paragraph blocks.
 *
 * @package Drupal\spectrum_rest\Plugin
 */
abstract class RestBaseParagraphBlock extends RestEntityProcessorBase {

  /**
   * Common properties for all Paragraph blocks.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   * @return array|string
   */
  public function getCommonData(ContentEntityInterface $entity) {
    return $this->fieldProcessor->getFieldData($entity->get('field_styles'));
  }

  /**
   * Make sure that it is always an array.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   * @return array|string
   */
  public function getItems(FieldItemListInterface $field) {
    // It have to be always an array.
    $items = $this->fieldProcessor->getFieldData($field);

    if (count($field) == 1) {
      $items = [$items];
    }

    return $items;
  }

  /**
   * Returns an image formatted.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   * @param array $options
   * @return array
   */
  public function image(FieldItemListInterface $field, array $options = []) {
    $image = $field->getValue();

    if (empty($image)) {
      return NULL;
    }

    $data =  [
      'normal' => $this->fieldProcessor->getFieldData($field, $options),
      'small' => $this->fieldProcessor->getFieldData($field, $options),
      'alt' => isset($image[0]['alt']) ? $image[0]['alt'] : "",
    ];

    return $data;
  }

}
