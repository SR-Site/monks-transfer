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
  public function fetch(Request $request) {
    $data = $request->getContent();
    try {
      if ($this->isValidJson($data)) {
        $filename = 'public://shows.json';
        $file = file_save_data($data, $filename, FILE_EXISTS_REPLACE);
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
