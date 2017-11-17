<?php

namespace Drupal\spectrum_rest\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\file\FileInterface;
use Drupal\mm_rest\Response\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Serialization\Json;

/**
 * Controller routines for Shows controller.
 */
class ShowsController extends ControllerBase {

  /**
   * Save JSON file from URL.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   Request object.
   *
   * @return \Drupal\mm_rest\Response\JsonResponse|\Exception
   *   JSON Response object.
   */
  public function import(Request $request) {
    // Get file from url and check if is it valid JSON file.
    $url = $request->getSchemeAndHttpHost() . '/resulta.json';
    try {
      $showsFile = file_get_contents($url);
      if ($showsFile && $this->isValidJson($showsFile)) {
        $filename = 'public://shows.json';
        $file = system_retrieve_file($url, $filename, TRUE, FILE_EXISTS_REPLACE);
        if ($file instanceof FileInterface) {
          $file->save();
          return new JsonResponse(['response' => 200]);
        }
      }

      return new JsonResponse(['response' => 500]);
    }
    catch (\Exception $e) {
      return $e;
    }
  }

  /**
   * Check if JASON is valid.
   *
   * @param string $str
   *   JSON string.
   *
   * @return bool
   *   TRUE or FALSE.
   */
  protected function isValidJson($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
  }

}
