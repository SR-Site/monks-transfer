<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockarticleteaser_v1",
 *   label = @Translation("Paragraph: blockarticleteaser"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockarticleteaser",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockArticleTeaserV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $styles = $this->fieldProcessor->getFieldData($entity->get('field_styles'));
    $article = $this->fieldProcessor->getFieldData($entity->get('field_article'), ['view_mode' => 'teaser']);

    $data = [
      "id" => 'blockArticleTeaser',
      "data" => $styles + $article,
    ];

    return $data;
  }

}
