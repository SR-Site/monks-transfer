<?php

namespace Drupal\spectrum_markets_map\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_markets_map\Plugin\SpectrumMarketRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_markets_map_node_market_teaser_v1",
 *   label = @Translation("Node: Market Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "market",
 *   view_mode = "teaser"
 * )
 */
class NodeMarketTeaserV1 extends SpectrumMarketRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   * @throws \Exception
   */
  protected function getItemData($entity) {
    $data = [
      'marketId' => (string) $this->fieldProcessor->getFieldData($entity->get('field_market_dma_code')),
      'categories' => [
        [
          'label' => $this->t('Market'),
          'blocks' => [
            $this->getMarketVideo($entity),
            $this->getMarketNumbers($entity),
            $this->getMarketImagesInformative($entity),
            $this->getMarketMediaKit($entity)
          ],
        ],
        [
          'label' => $this->t('Audience Profile'),
          'blocks' => [
            $this->getMarketImage($entity),
            $this->getMarketPercentages($entity),
            $this->getMarketComparePercentages($entity),
            $this->getMarketBlockPercentages($entity),
          ],
        ],
        [
          'label' => $this->t('Top Networks'),
          'blocks' => [
            $this->getMarketTopNetworksInformative($entity),
            $this->getMarketTopPerformingNetworks($entity),
          ],
        ],
      ],
    ];

    return $data;
  }

}
