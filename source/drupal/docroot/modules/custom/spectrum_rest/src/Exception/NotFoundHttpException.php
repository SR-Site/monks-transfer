<?php

namespace Drupal\spectrum_rest\Exception;

use Drupal\mm_rest\Exception\ExceptionInterface;
use Drupal\mm_rest\Util\StringUtil;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException as SymfonyNotFoundHttpException;

/**
 * NotFoundHttpException.
 * Implement ExceptionInterface to avoid cache.
 */
class NotFoundHttpException extends SymfonyNotFoundHttpException implements ExceptionInterface {

  /**
   * @inheritdoc
   */
  public function toArray() {
    return [
      'code' => StringUtil::classToSnakeCase($this),
      'message' => $this->getMessage()
    ];
  }

}
