<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockprogrammodule_v1",
 *   label = @Translation("Paragraph: blockprogrammodule"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockprogrammodule",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockProgramModuleV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'programModule',
      "data" => $data + [
        "items" => $this->getItems($entity->get('field_programs')),
      ],
    ];

    return $data;
  }

}
