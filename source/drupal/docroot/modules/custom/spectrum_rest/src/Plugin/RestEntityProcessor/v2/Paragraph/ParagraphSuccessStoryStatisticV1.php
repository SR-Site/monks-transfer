<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_success_story_statistic_v1",
 *   label = @Translation("Paragraph: Success Story Statistic"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "success_story_statistic",
 *   view_mode = "default"
 * )
 */
class ParagraphSuccessStoryStatisticV1 extends ParagraphGlossaryAItemV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get Success Story Statistic.
    $data = parent::getItemData($entity);

    return $data;
  }

}
