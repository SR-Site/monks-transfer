<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_link_v1",
 *   label = @Translation("Paragraph: link"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "link",
 *   view_mode = "default"
 * )
 */
class ParagraphLinkV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $link = $this->fieldProcessor->getFieldData($entity->get('field_target'));

    $data = [
      "label" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      "title" => $this->fieldProcessor->getFieldData($entity->get('field_title')),
      "target" => isset($link['target']) ? $link['target'] : NULL,
      "type" => isset($entity->get('field_type')->value) ? (int)$entity->get('field_type')->value : NULL,
    ];

    return $data;
  }

}
