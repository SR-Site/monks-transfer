<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\source;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\file\Entity\File;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate_plus\Plugin\migrate\source\Url as MigrateUrl;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Source plugin for retrieving data via URLs.
 *
 * @MigrateSource(
 *   id = "spectrum_url"
 * )
 */
class Url extends MigrateUrl implements ContainerFactoryPluginInterface {

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
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The request stack.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, EntityTypeManagerInterface $entityTypeManager, RequestStack $requestStack) {
    // Inject entity type manager and request stack services.
    $this->entityTypeManager = $entityTypeManager;
    $this->requestStack = $requestStack;

    /** @var \Drupal\file\FileStorageInterface $fileStorage */
    $fileStorage = $this->entityTypeManager->getStorage('file');
    $files = $fileStorage->loadByProperties(['filename' => 'shows.json']);
    $configuration['urls'] = [];
    foreach ($files as $file) {
      /** @var \Drupal\file\Entity\File $file */
      if ($file instanceof File) {
        $fileUrl = file_url_transform_relative(file_create_url($file->getFileUri()));
        $fileUrl = $requestStack->getCurrentRequest()->getSchemeAndHttpHost() . $fileUrl;
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

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('entity_type.manager'),
      $container->get('request_stack')
    );
  }

}
