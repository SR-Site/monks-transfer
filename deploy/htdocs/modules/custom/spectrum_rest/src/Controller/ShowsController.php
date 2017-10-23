<?php

namespace Drupal\spectrum_rest\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\mm_rest\Response\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Serialization\Json;

/**
 * Controller routines for Shows controller.
 */
class ShowsController extends ControllerBase {

  public function import(Request $request) {
    // Get file from url and check if is it valid JSON file.
    $url = $request->getSchemeAndHttpHost() . '/resulta.json';
    try {
      $showsFile = file_get_contents($url);
      if ($showsFile && $this->isValidJSON($showsFile)) {
        $filename = 'temporary://shows';
        system_retrieve_file($url, $filename, FALSE, FILE_EXISTS_REPLACE);
        return new JsonResponse(['response' => 200]);
      }

      return new JsonResponse(['response' => 500]);

    } catch (\Exception $e) {
      return $e;
    }
  }

  /**
   * Check if JASON is valid.
   * @param string $str
   *
   * @return bool
   */
  protected function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
  }

}