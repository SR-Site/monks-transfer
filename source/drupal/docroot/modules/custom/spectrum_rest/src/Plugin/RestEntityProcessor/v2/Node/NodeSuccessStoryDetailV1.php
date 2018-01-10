<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\taxonomy\Entity\Term;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_success_story_detail_v1",
 *   label = @Translation("Node: Success Story - Detail"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "success_story",
 *   view_mode = "detail"
 * )
 */
class NodeSuccessStoryDetailV1 extends SpectrumRestEntityProcessorBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'SuccessStoryPost',
      'data' => [
        'marginTop' => 1,
        'heading' => $entity->label(),
        'subHeading' => $this->t('Success Story'),
        'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_content')),
        'company' => [
          'label' => 'Company',
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_success_story_company')),
        ],
        'industry' => [
          'label' => 'Industry',
          'value' => ($entity->get('field_industry')->entity instanceof Term) ? $entity->get('field_industry')->entity->label() : NULL,
        ],
        'market' => [
          'label' => 'Market',
          'value' => ($entity->get('field_market')->entity instanceof Term) ? $entity->get('field_market')->entity->label() : NULL,
        ],
      ],
    ];

    return $data;
  }

}
