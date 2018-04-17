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

class ImportMarkets extends ConfigFormBase {

  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
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
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $fid = $form_state->getValue(['markets_csv', 0]);
    if (!empty($fid)) {
      $file = File::load($fid);
      $file->setPermanent();
      $file->save();
    }

    if ($file instanceof File) {
      $realPath = \Drupal::service('file_system')->realpath($file->getFileUri());

      try {
        /** @var Migration $migration */
        $migration = \Drupal::service('plugin.manager.migration')
          ->createInstance('markets', [
            'source' => [
              'path' => $realPath,
            ],
          ]);
        $migration->getIdMap()->prepareUpdate();
        $executable = new MigrateExecutable($migration, new MigrateMessage());
        $executable->import();
        drupal_set_message($this->t('Markets are imported successfully.'));
      }
      catch (MigrateException $exception) {
        throw new MigrateException('Something\'s wrong! Markets are not imprted properly.');
      }
    }
  }

}
