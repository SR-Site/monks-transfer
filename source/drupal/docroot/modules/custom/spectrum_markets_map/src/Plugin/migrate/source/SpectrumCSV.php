<?php

namespace Drupal\spectrum_markets_map\Plugin\migrate\source;

use Drupal\Component\Plugin\ConfigurablePluginInterface;
use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate_source_csv\Plugin\migrate\source\CSV as MigrateCSV;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Source for CSV.
 *
 * @MigrateSource(
 *   id = "spectrum_csv"
 * )
 */
class SpectrumCSV extends MigrateCSV implements ConfigurablePluginInterface, ContainerFactoryPluginInterface {

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);

    $this->entityTypeManager = $entityTypeManager;
  }


  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function initializeIterator() {
    /** @var \Drupal\file\FileStorageInterface $fileStorage */
//    $fileStorage = $this->entityTypeManager->getStorage('file');
//    $files = $fileStorage->loadByProperties(['filename' => $this->getConfiguration()['path']]);

    $filePath = \Drupal::service('file_system')->realpath(file_default_scheme() . "://csv-markets/");


    $path = $this->getConfiguration()['path'];
    $fullPath = realpath($filePath . '/' . $path);

    if (!file_exists($fullPath)) {
      throw new InvalidPluginDefinitionException($this->getPluginId(), sprintf('File path (%s) does not exist.', $this->getConfiguration()['path']));
    }
    // File handler using header-rows-respecting extension of SPLFileObject.
    $this->file = new $this->fileClass($fullPath);
    return $this->setupFile();
  }

}
