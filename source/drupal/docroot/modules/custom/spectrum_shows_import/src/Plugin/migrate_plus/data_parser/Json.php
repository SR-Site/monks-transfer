<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate_plus\data_parser;

use Drupal\Core\Language\LanguageInterface;
use Drupal\migrate_plus\Plugin\migrate_plus\data_parser\Json as MigrateJson;
use Drupal\Component\Utility\Unicode;
use Drupal\Core\Transliteration\PhpTransliteration;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Obtain JSON data for migration.
 *
 * @DataParser(
 *   id = "json_nested",
 *   title = @Translation("JSON Nested")
 * )
 */
class Json extends MigrateJson {

  /**
   * PHP Transliteration.
   *
   * @var \Drupal\Core\Transliteration\PhpTransliteration
   */
  protected $transliteration;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, PhpTransliteration $transliteration) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->transliteration = $transliteration;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('transliteration')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getSourceData($url) {
    // Get nested values of JSON array.
    $source_data = parent::getSourceData($url);
    // Add uniqueId and merge genres in Schedule array.
    $this->modifySchedules($source_data);
    // Modify source data. Add Stationnum in Similar array.
//    $this->modifySimilar($source_data);

    if (isset($this->configuration['sub_selector']) && !empty($this->configuration['sub_selector'])) {
      $selector = trim($this->configuration['sub_selector']);
      $newSourceData = [];
      foreach ($source_data as $data) {
        if ((count($data[$selector]) == count($data[$selector], COUNT_RECURSIVE)) && !empty($data[$selector])) {
          $newSourceData[] = $data[$selector];
        }
        else {
          $newSourceData = array_merge($newSourceData, $data[$selector]);
        }
      }

      return $newSourceData;
    }

    return $source_data;
  }

  /**
   * Transform the string to friendly url.
   *
   * @param string $value
   *   String.
   *
   * @return string
   *   New string.
   */
  protected function transform($value) {
    $new_value = $this->transliteration->transliterate($value, LanguageInterface::LANGCODE_DEFAULT);
    $new_value = strtolower($new_value);
    $new_value = preg_replace('/[^a-z0-9_]+/', '-', $new_value);
    return preg_replace('/_+/', '-', $new_value);
  }

  /**
   * Modify source data. Add uniqueId and merge genres in Schedule array.
   *
   * @param array $sourceData
   *   Source JSON data.
   *
   * @return array|mixed
   *   Modified source JSON data.
   */
  protected function modifySchedules(array &$sourceData) {
    foreach ($sourceData as $key => &$item) {
      foreach ($item['Schedule'] as $newKey => &$scheduleItem) {
        $scheduleItem['uniqueId'] = $this->transform($scheduleItem['Title']) . '-' . strtotime($scheduleItem['Starttime']);
        foreach (['Genre1', 'Genre2'] as $genre) {
          if (isset($scheduleItem[$genre])) {
            $scheduleItem['Genres'][]['Genre'] = Unicode::ucfirst($scheduleItem[$genre]);
          }
        }
      }
    }

    return $sourceData;
  }

  /**
   * Modify source data. Add Stationnum in Similar array.
   *
   * @param array $sourceData
   *   Source JSON data.
   *
   * @return array|mixed
   *   Modified source JSON data.
   */
  protected function modifySimilar(array &$sourceData) {
    foreach ($sourceData as $key => &$item) {
      foreach ($item['Similar'] as $newKey => &$similarItem) {
        $similarItem['Stationnum'] = $similarItem['Id'];
      }
    }

    return $sourceData;
  }

}
