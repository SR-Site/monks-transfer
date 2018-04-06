<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_top_picks_v1",
 *   label = @Translation("Paragraph: Top picks"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "top_picks",
 *   view_mode = "default"
 * )
 */
class ParagraphTopPicksV1 extends SpectrumRestEntityProcessorBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get image and video.
    $data = $data + [
      'items' => $this->fieldProcessor->getFieldData($entity->get('field_top_picks_shows'), ['view_mode' => 'teaser_mode']),
    ];
    if (array_values($data['items']) !== $data['items']) {
      $data['items'] = [$data['items']];
    }

    /** @var \Drupal\paragraphs\Entity\Paragraph $entity */
    $parent = $entity->getParentEntity();

    // Get Show "See all" links.
    $seeAll = FALSE;
    if (isset($parent->get('field_show_see_all_links')->value) && $parent->get('field_show_see_all_links')->value) {
      $seeAll = TRUE;
    }
    if ($seeAll) {
      $data['link'] = [
        "label" => $this->t('See all shows'),
        "title" => $this->t('See all shows'),
        "target" => "/shows",
        "type" => 0,
      ];
    }

    return $data;
  }

}
