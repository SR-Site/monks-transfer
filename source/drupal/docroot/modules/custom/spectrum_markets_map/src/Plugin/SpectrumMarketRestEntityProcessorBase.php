<?php
/**
 * Created by PhpStorm.
 * User: mladen
 * Date: 4/12/18
 * Time: 4:30 PM
 */

namespace Drupal\spectrum_markets_map\Plugin;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\file\FileInterface;
use Drupal\image\Entity\ImageStyle;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Common class for Market map.
 *
 * @package Drupal\spectrum_markets_map\Plugin
 */
abstract class SpectrumMarketRestEntityProcessorBase extends SpectrumRestEntityProcessorBase {

  use StringTranslationTrait;

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   * @param string $fieldName
   *
   * @return array
   * @throws \Exception
   */
  protected function getVideo(ContentEntityInterface $entity, $fieldName) {
    $data = [];
    $video = $this->fieldProcessor->getFieldData($entity->get($fieldName));
    if (isset($video['id'])) {
      $data = [
        'url' => $video['id'],
        'type' => 1,
      ];
    }
    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketVideo(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketVideo',
      'data' => [
        'video' => $this->getVideo($entity, 'field_market_dma_video'),
      ],
    ];
    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketNumbers(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketNumbers',
      'data' => [
        'statistics' => [
          [
            'label' => $this->t('DMA Rank'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_households')),
          ],
          [
            'label' => $this->t('Advertising Zones'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_markets')),
          ],
          [
            'label' => $this->t('Insertable networks'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_states')),
          ],
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketText(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketText',
      'data' => [
        'text' => $this->fieldProcessor->getFieldData($entity->get('field_market_free_text')),
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketImagesInformative(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketImages',
      'data' => [
        'heading' => $this->t('Advertising Partners'),
        'subHeading' => $this->fieldProcessor->getFieldData($entity->get('field_market_ap_text')),
      ],
    ];
    // Get networks logos.
    $images = $this->fieldProcessor->getFieldData($entity->get('field_market_partners_logos'), ['style' => 'network__markets_map__canvas']);
    if (empty($images)) {
      return [];
    }

    $partnersLogos = [];
    if (count($images) > 1) {
      foreach ($images as $image) {
        $partnersLogos[] = array_shift($image);
      }
    }
    else {
      $partnersLogos = $images;
    }

    $data['data']['images'] = $partnersLogos;

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketMediaKit(ContentEntityInterface $entity) {
    $data = [];
    if ($pdf = $entity->get('field_market_mediakit_pdf')->value) {
      $data = [
        'name' => 'MarketMediaKit',
        'data' => [
          'heading' => $this->t('Media Kit'),
          'label' => $this->t('Get Market Media kit'),
        ],
      ];
    }

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketSources(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketSources',
    ];
    if ($credits = $this->state->get('credits')) {
      foreach ($credits as $credit) {
        $data['data']['credits'][] = [
          'source' => $credit,
        ];
      }
    }

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketImage(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketImage',
      'data' =>
        [
          'heading' => $this->t('Demographic Composition'),
          'image' => $this->image($entity->get('field_market_demog_composition')),
        ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketPercentages(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketPercentages',
      'data' => [
        'heading' => $this->t('Devices owned'),
        'statistics' =>
          [
            [
              'label' => $this->t('Desktop'),
              'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_devices_desktop')),
            ],
            [
              'label' => $this->t('Smartphone'),
              'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_devices_smartphone')),
            ],
            [
              'label' => $this->t('Tablet'),
              'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_devices_tablet')),
            ],
          ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketGender(ContentEntityInterface $entity) {
    $data = [
      'label' => $this->t('Gender'),
      'values' => [
        [
          'label' => $this->t('Male'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_gender_male')),
        ],
        [
          'label' => $this->t('Female'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_gender_female')),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketEducation(ContentEntityInterface $entity) {
    $data = [
      'label' => $this->t('Education'),
      'values' => [
        [
          'label' => $this->t('No college'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_edu_no_college')),
        ],
        [
          'label' => $this->t('Undergrad'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_edu_undergrad')),
        ],
        [
          'label' => $this->t('Grad+'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_edu_grad_plus')),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketIncome(ContentEntityInterface $entity) {
    $data = [
      'label' => $this->t('Income'),
      'values' => [
        [
          'label' => $this->t('0-50k'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_income_0_50k')),
        ],
        [
          'label' => $this->t('50-100k'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_income_50_100k')),
        ],
        [
          'label' => $this->t('100-150k'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_income_100_150k')),
        ],
        [
          'label' => $this->t('+150k'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_income_plus_150k')),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketHome(ContentEntityInterface $entity) {
    $data = [
      'label' => $this->t('Home Ownership'),
      'values' => [
        [
          'label' => $this->t('Own'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_home_own')),
        ],
        [
          'label' => $this->t('Rent'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_home_rent')),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketParenting(ContentEntityInterface $entity) {
    $data = [
      'label' => $this->t('HH with Children'),
      'values' => [
        [
          'label' => $this->t('Have kids'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_parent_have_kids')),
        ],
        [
          'label' => $this->t('Don\'t have kids'),
          'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_parent_no_kids')),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketComparePercentages(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketComparePercentages',
      'data' => [
        'percentages' => [
          $this->getMarketGender($entity),
          $this->getMarketEducation($entity),
          $this->getMarketIncome($entity),
          $this->getMarketHome($entity),
          $this->getMarketParenting($entity),
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketBlockPercentages(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketBlockPercentages',
      'data' => [
        'heading' => $this->t('Age'),
        'percentages' => [
          [
            'label' => $this->t('<18'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_lower_18')),
          ],
          [
            'label' => $this->t('18-24'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_18_24')),
          ],
          [
            'label' => $this->t('25-34'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_25_34')),
          ],
          [
            'label' => $this->t('35-44'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_35_44')),
          ],
          [
            'label' => $this->t('45-54'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_45_54')),
          ],
          [
            'label' => $this->t('55-64'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_55_64')),
          ],
          [
            'label' => $this->t('65+'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_ages_65_plus')),
          ],
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketBlockRace(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketBlockPercentages',
      'data' => [
        'heading' => $this->t('Race'),
        'percentages' => [
          [
            'label' => $this->t('White'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_race_white')),
          ],
          [
            'label' => $this->t('Asian'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_race_asian')),
          ],
          [
            'label' => $this->t('African-American'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_race_african_am')),
          ],
          [
            'label' => $this->t('Hispanic origin'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_race_hispanic_orig')),
          ],
          [
            'label' => $this->t('Other'),
            'value' => $this->fieldProcessor->getFieldData($entity->get('field_market_race_other')),
          ],
        ],
      ],
    ];

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketTopNetworksInformative(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketImages',
      'data' => [
        'heading' => $this->t('Top Networks'),
      ],
    ];
    // Get networks logos.
    $data['data']['images'] = $this->getNetworksImages($entity, 'field_market_network_logos');;
    if (empty($data['data']['images'])) {
      return [];
    }

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *
   * @return array
   * @throws \Exception
   */
  protected function getMarketTopPerformingNetworks(ContentEntityInterface $entity) {
    $data = [
      'name' => 'MarketImages',
      'data' => [
        'heading' => $this->t('Top performing cable networks in the market'),
      ],
    ];
    // Get networks logos.
    $data['data']['images'] = $this->getNetworksImages($entity, 'field_market_top_networks');
    if (empty($data['data']['images'])) {
      return [];
    }

    return $data;
  }

  /**
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   * @param string $fieldName
   *
   * @return array
   */
  private function getNetworksImages(ContentEntityInterface $entity, $fieldName) {
    $data = [];
    foreach ($entity->get($fieldName) as $item) {
      if ($item->entity instanceof ContentEntityInterface && $item->entity->hasField('image')) {
        $data[] = $this->image($item->entity->get('image'), ['style' => 'network__markets_map__canvas']);
      }
    }

    return $data;
  }

}
