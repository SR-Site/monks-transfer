<?php

namespace Drupal\spectrum_rest\EventSubscriber;

use Drupal\dynamic_page_cache\EventSubscriber\DynamicPageCacheSubscriber;
use Drupal\mm_rest\Model\ResponseModelFactory;
use Drupal\mm_rest\Request\RequestMatcherInterface;
use Drupal\mm_rest\Request\RequestTransformerInterface;
use Drupal\mm_rest\Response\Response as RestApiResponse;
use Drupal\mm_rest\Response\ResponseTransformerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class IOEventSubscriber implements EventSubscriberInterface {

  /**
   * @var RequestMatcherInterface
   */
  protected $requestMatcher;

  /**
   * IOEventSubscriber constructor.
   *
   * @param RequestMatcherInterface $requestMatcher
   */
  public function __construct(RequestMatcherInterface $requestMatcher) {
    $this->requestMatcher = $requestMatcher;
  }

  /**
   * @return array
   */
  public static function getSubscribedEvents() {
    return [
      KernelEvents::VIEW => [
        ['onView', 1],
      ],
    ];
  }

  /**
   * convert response to rest api response
   *
   * @param GetResponseForControllerResultEvent $event
   */
  public function onView(GetResponseForControllerResultEvent $event) {
    if (!$this->eventRequestMatches($event)) {
      return;
    }
    $event->setResponse($this->createRestApiResponse($event->getControllerResult()));
  }

  /**
   * @param KernelEvent $event
   *
   * @return bool
   */
  protected function eventRequestMatches(KernelEvent $event) {

    return $this->requestMatcher->matches($event->getRequest(), $event->getRequestType());
  }

  /**
   * @param $data
   *
   * @return RestApiResponse
   */
  protected function createRestApiResponse($data) {
    $data = $this->cleanArray($data);
    return new RestApiResponse(ResponseModelFactory::createFactory()
      ->createFromContent($data));
  }

  /**
   * Clean all empty values from array
   * @param $array
   *
   * @return array
   */
  protected function cleanArray($array) {
    if (is_array($array)) {
      foreach ($array as $key => $sub_array) {
        $result = $this->cleanArray($sub_array);
        if ($result === '' || (is_array($result) && empty($result))) {
          unset($array[$key]);
        }
        else {
          $array[$key] = $result;
        }
      }
    }

    return $array;
  }

}
