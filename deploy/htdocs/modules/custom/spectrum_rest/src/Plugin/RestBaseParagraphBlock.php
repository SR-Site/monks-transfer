<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\Core\Entity\ContentEntityInterface;

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

}
