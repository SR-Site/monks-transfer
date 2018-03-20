<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate_plus\data_fetcher;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate_plus\DataFetcherPluginBase;
use GuzzleHttp\Exception\RequestException;
use Drupal\migrate_plus\Plugin\migrate_plus\data_fetcher\Http as MigrateHttp;

/**
 * Retrieve data over an HTTP connection for migration.
 *
 * @DataFetcher(
 *   id = "spectrum_http",
 *   title = @Translation("Spectrum HTTP")
 * )
 */
class Http extends MigrateHttp {

  /**
   * {@inheritdoc}
   */
  public function getResponse($url) {
    try {
      $options = [
        'headers' => $this->getRequestHeaders(),
        'verify' => FALSE,
      ];
      if (!empty($this->configuration['authentication'])) {
        $options = array_merge($options, $this->getAuthenticationPlugin()->getAuthenticationOptions());
      }
      $response = $this->httpClient->get($url, $options);
      if (empty($response)) {
        throw new MigrateException('No response at ' . $url . '.');
      }
    } catch (RequestException $e) {
      throw new MigrateException('Error message: ' . $e->getMessage() . ' at ' . $url . '.');
    }
    return $response;
  }

}
