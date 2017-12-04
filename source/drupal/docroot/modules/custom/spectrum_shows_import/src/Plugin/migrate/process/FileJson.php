<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\process;

use Drupal\file\Entity\File;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use GuzzleHttp\Exception\RequestException;

/**
 * Process plugin for migrating files.
 *
 * @MigrateProcessPlugin(
 *   id = "file_json"
 * )
 */
class FileJson extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (empty($value)) {
      // Skip this item if there's no URL.
      throw new MigrateSkipProcessException();
    }

    // Save the file, return its ID.
    $file = $this->downloadFile($value, 'public://', TRUE, FILE_EXISTS_REPLACE);
    if ($file instanceof File) {
      $file->save();
      return $file->id();
    }

    return NULL;
  }

  /**
   * Download file by avoid ssl certificate.
   *
   * @param string $url
   *   Url.
   * @param string $destination
   *   Destination.
   * @param bool $managed
   *   Managed, TRUE or FALSE.
   * @param int $replace
   *   Replace or not.
   *
   * @return bool|\Drupal\file\FileInterface|false|null
   *   File object..
   */
  public function downloadFile($url, $destination = NULL, $managed = FALSE, $replace = FILE_EXISTS_RENAME) {
    $parsed_url = parse_url($url);
    if (!isset($destination)) {
      $path = file_build_uri(drupal_basename($parsed_url['path']));
    }
    else {
      if (is_dir(drupal_realpath($destination))) {
        // Prevent URIs with triple slashes when glueing parts together.
        $path = str_replace('///', '//', "$destination/") . drupal_basename($parsed_url['path']);
      }
      else {
        $path = $destination;
      }
    }
    try {
      $data = (string) \Drupal::httpClient()
        ->get($url, ['verify' => FALSE])
        ->getBody();
      $local = $managed ? file_save_data($data, $path, $replace) : file_unmanaged_save_data($data, $path, $replace);
    }
    catch (RequestException $exception) {
      drupal_set_message(t('Failed to fetch file due to error "%error"', ['%error' => $exception->getMessage()]), 'error');
      return FALSE;
    }
    if (!$local) {
      drupal_set_message(t('@remote could not be saved to @path.', ['@remote' => $url, '@path' => $path]), 'error');
    }

    return $local;
  }

}
