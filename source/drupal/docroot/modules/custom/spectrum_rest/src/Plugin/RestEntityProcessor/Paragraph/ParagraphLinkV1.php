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
    $file = $this->fieldProcessor->getFieldData($entity->field_file);
    $target = !empty($file) ? $file['url'] : NULL;

    if(!$target && isset($link['target']))
        $target = $link['target'];

    $data = [
      "label" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      "title" => $this->fieldProcessor->getFieldData($entity->get('field_title')),
      "target" => $target,
      "type" => isset($entity->get('field_type')->value) ? (int)$entity->get('field_type')->value : NULL
    ];

    return $data;
  }

}
