<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\AdvertisingItem;
use Drupal\taxonomy\Entity\Term;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_glossary_b_v1",
 *   label = @Translation("Paragraph: Block Glossary B"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_glossary_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockGlossaryBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get landing category.
    $landingCategoryName = $this->getRawEntityReferenceLabel($entity, 'field_landing_category', 'television');

    // Get all advertising items.
    $advertisingItems = $this->getAdvertisingItems();
    $items = $this->getAdvertisingItemsData($advertisingItems);

    // Get rest of the data.
    $data = [
      'id' => 'GlossaryB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'showMoreLabel' => $this->fieldProcessor->getFieldData($entity->get('field_show_more_label')),
        'searchPlaceholder' => $this->fieldProcessor->getFieldData($entity->get('field_search_placeholder')),
        'landingCategory' => $landingCategoryName,
        'noResult' => [
          'heading' => $this->fieldProcessor->getFieldData($entity->get('field_main_heading')),
          'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        ],
        'items' => $items,
      ],
    ];

    return $data;
  }

  /**
   * Get all advertising items.
   *
   * @return array
   *   Array of advertising items.
   */
  protected function getAdvertisingItems() {
    $advertisingItemIds = \Drupal::entityQuery('advertising_item')->execute();
    if (!empty($advertisingItemIds)) {
      $advertisingItems = AdvertisingItem::loadMultiple($advertisingItemIds);
      return $advertisingItems;
    }

    return [];
  }

  /**
   * Get data from advertising items.
   *
   * @param array $advertisingItems
   *   Array of Advertising Items.
   *
   * @return array|mixed
   *   Array of items data.
   *
   * @throws \Exception
   */
  protected function getAdvertisingItemsData(array $advertisingItems) {
    $data = [];
    foreach ($advertisingItems as $advertisingItem) {
      /** @var \Drupal\spectrum_shows\AdvertisingItemInterface $advertisingItem */
      $data[] = $this->entityProcessor->getEntityData($advertisingItem, 'v1', ['view_mode' => 'default']);

    }

    return $data;
  }

}
