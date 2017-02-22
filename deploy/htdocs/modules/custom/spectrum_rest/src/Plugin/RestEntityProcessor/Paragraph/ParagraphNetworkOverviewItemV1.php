<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_networkoverviewitem_v1",
 *   label = @Translation("Paragraph: networkoverviewitem"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "networkoverviewitem",
 *   view_mode = "default"
 * )
 */
class ParagraphNetworkOverviewItemV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $link = $this->fieldProcessor->getFieldData($entity->get('field_link'));

    $data = [
      "image" => $this->image($entity->get('field_image')),
    ];

    if (!empty($link)) {
      $data["link"] = $link;
    }

    return $data;
  }

}
