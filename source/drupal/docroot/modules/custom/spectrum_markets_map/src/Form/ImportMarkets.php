<?php
/**
 * Created by PhpStorm.
 * User: mladen
 * Date: 4/16/18
 * Time: 4:14 PM
 */

namespace Drupal\spectrum_markets_map\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\migrate\MigrateException;
use Drupal\migrate_tools\MigrateExecutable;
use Drupal\migrate\MigrateMessage;
use Drupal\migrate\Plugin\Migration;
use Drupal\Core\File\FileSystem;
use Drupal\migrate\Plugin\MigrationPluginManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ImportMarkets extends ConfigFormBase {

  /**
   * @var FileSystem
   */
  protected $fileSystem;

  /**
   * @var MigrationPluginManager
   */
  protected $migrationPluginManager;

  /**
   * ImportMarkets constructor.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   * @param \Drupal\Core\File\FileSystem $fileSystem
   * @param \Drupal\migrate\Plugin\MigrationPluginManager $migrationPluginManager
   */
  public function __construct(ConfigFactoryInterface $config_factory, FileSystem $fileSystem, MigrationPluginManager $migrationPluginManager) {
    parent::__construct($config_factory);

    $this->fileSystem = $fileSystem;
    $this->migrationPluginManager = $migrationPluginManager;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('file_system'),
      $container->get('plugin.manager.migration')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'import_markets';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $newForm = parent::buildForm($form, $form_state);

    // CSV upload field.
    $validators = [
      'file_validate_extensions' => ['csv'],
    ];
    $newForm['markets_csv'] = [
      '#type' => 'managed_file',
      '#name' => 'markets_csv',
      '#title' => t('Markets CSV File'),
      '#required' => TRUE,
      '#size' => 20,
      '#description' => t('CSV format only'),
      '#upload_validators' => $validators,
      '#upload_location' => 'public://csv-markets/',
    ];

    $newForm['actions']['submit']['#value'] = $this->t('Import markets');
    return $newForm;

  }

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \Drupal\migrate\MigrateException
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $fid = $form_state->getValue(['markets_csv', 0]);
    if (!empty($fid)) {
      $file = File::load($fid);
      $file->setPermanent();
      $file->save();

      if ($file instanceof File) {
        $realPath = $this->fileSystem->realpath($file->getFileUri());
        try {
          /** @var Migration $migration */
          $migration = $this->migrationPluginManager->createInstance('markets', [
            'source' => [
              'path' => $realPath,
            ],
          ]);
          $migration->getIdMap()->prepareUpdate();
          $executable = new MigrateExecutable($migration, new MigrateMessage());
          $executable->import();

          drupal_set_message($this->t('@markets processed successfully.', [
            '@markets' => $this->formatPlural($executable->getProcessedCount(), '1 Market is', '@count Markets are')
          ]));
          if ($executable->getCreatedCount() > 0) {
            drupal_set_message($this->t('@markets created.', [
              '@markets' => $this->formatPlural($executable->getCreatedCount(), '1 Market is', '@count Markets are')
            ]));
          }
          if ($executable->getUpdatedCount() > 0) {
            drupal_set_message($this->t('@markets updated.', [
              '@markets' => $this->formatPlural($executable->getUpdatedCount(), '1 Market is', '@count Markets are')
            ]));
          }
          if ($executable->getFailedCount() > 0) {
            drupal_set_message($this->t('@markets failed.', [
              '@markets' => $this->formatPlural($executable->getFailedCount(), '1 Market is', '@count Markets are')
            ]), 'error');
          }
          if ($executable->getIgnoredCount() > 0) {
            drupal_set_message($this->t('@markets ignored.', [
              '@markets' => $this->formatPlural($executable->getIgnoredCount(), '1 Market is', '@count Markets are')
            ]), 'warning');
          }

        }
        catch (MigrateException $exception) {
          throw new MigrateException('Something\'s wrong! Markets are not imprted properly.');
        }
      }
    }
  }

}