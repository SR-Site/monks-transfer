<?php

namespace Drupal\mm_rest_search\Plugin\search_api\processor;

use Drupal\search_api\Item\Field;
use Drupal\search_api\Processor\ProcessorPluginBase;

/**
 * Adds the item's URL to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "order_position",
 *   label = @Translation("Order Position processor"),
 *   description = @Translation("Adds value 100 to the Order Position field if is empty."),
 *   stages = {
 *     "alter_items" = 0,
 *   },
 * )
 */
class OrderPosition extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function alterIndexedItems(array &$items) {
    /** @var \Drupal\search_api\Item\ItemInterface $item */
    foreach ($items as $item_id => $item) {
      $orderPosition = $item->getField('field_order_position');
      if ($orderPosition instanceof Field && empty($orderPosition->getValues())) {
        $orderPosition->setValues([100]);
        $item->setField('field_order_position', $orderPosition);
      }
    }
  }
}