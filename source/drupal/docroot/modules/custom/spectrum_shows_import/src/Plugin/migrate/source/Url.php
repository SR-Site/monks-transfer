<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\source;

use Drupal\file\Entity\File;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate_plus\Plugin\migrate\source\Url as MigrateUrl;

/**
 * Source plugin for retrieving data via URLs.
 *
 * @MigrateSource(
 *   id = "spectrum_url"
 * )
 */
class Url extends MigrateUrl {

  /**
   * The source URLs to retrieve.
   *
   * @var array
   */
  protected $sourceUrls = [];

  /**
   * The data parser plugin.
   *
   * @var \Drupal\migrate_plus\DataParserPluginInterface
   */
  protected $dataParserPlugin;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration) {
    // @TODO DI of services.
    /** @var \Drupal\file\FileStorageInterface $fileStorage */
    $fileStorage = \Drupal::entityTypeManager()
      ->getStorage('file');
    $files = $fileStorage->loadByProperties(['filename' => 'shows.json']);
    $configuration['urls'] = [];
    foreach ($files as $file) {
      /** @var \Drupal\file\Entity\File $file */
      if ($file instanceof File) {
        $fileUrl = file_url_transform_relative(file_create_url($file->getFileUri()));
        $fileUrl = \Drupal::request()->getSchemeAndHttpHost() . $fileUrl;
        if ($fileUrl && file_exists($file->getFileUri())) {
          $configuration['urls'][] = $fileUrl;
        }
      }

      parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);
    }

    if (empty($configuration['urls'])) {
      throw new MigrateException(sprintf('The urls array is empty.'));
    }

  }

}
