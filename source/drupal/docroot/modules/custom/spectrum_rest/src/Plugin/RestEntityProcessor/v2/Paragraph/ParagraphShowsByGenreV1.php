<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_shows_by_genre_v1",
 *   label = @Translation("Paragraph: Shows By Genre"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "shows_by_genre",
 *   view_mode = "default"
 * )
 */
class ParagraphShowsByGenreV1 extends SpectrumRestEntityProcessorBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get networks.
    $data['items'] = $this->fieldProcessor->getFieldData($entity->get('field_genre_shows'), ['view_mode' => 'teaser_mode']);
    $data['link'] = [
      "label" => $this->t('See all shows'),
      "title" => $this->t('See all shows'),
      "target" => "/shows",
      "type" => 0,
    ];

    return $data;
  }

}
