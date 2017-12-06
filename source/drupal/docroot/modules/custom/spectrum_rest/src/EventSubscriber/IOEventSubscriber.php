<?php

namespace Drupal\spectrum_rest\EventSubscriber;

use Drupal\mm_rest\Model\ResponseModelFactory;
use Drupal\mm_rest\Request\RequestMatcherInterface;
use Drupal\mm_rest\Response\Response as RestApiResponse;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Class IOEventSubscriber.
 *
 * @package Drupal\spectrum_rest\EventSubscriber
 */
class IOEventSubscriber implements EventSubscriberInterface {

  /**
   * RequestMatcherInterface.
   *
   * @var \Drupal\mm_rest\Request\RequestMatcherInterface
   */
  protected $requestMatcher;

  /**
   * IOEventSubscriber constructor.
   *
   * @param \Drupal\mm_rest\Request\RequestMatcherInterface $requestMatcher
   *   RequestMatcherInterface.
   */
  public function __construct(RequestMatcherInterface $requestMatcher) {
    $this->requestMatcher = $requestMatcher;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    return [
      KernelEvents::VIEW => [
        ['onView', 1],
      ],
    ];
  }

  /**
   * Convert response to rest api response.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent $event
   *   GetResponseForControllerResultEvent.
   */
  public function onView(GetResponseForControllerResultEvent $event) {
    if (!$this->eventRequestMatches($event)) {
      return;
    }
    $event->setResponse($this->createRestApiResponse($event->getControllerResult()));
  }

  /**
   * Event request matcher.
   *
   * @param \Symfony\Component\HttpKernel\Event\KernelEvent $event
   *   Kernel event.
   *
   * @return bool
   *   TRUE or FALSE.
   */
  protected function eventRequestMatches(KernelEvent $event) {

    return $this->requestMatcher->matches($event->getRequest(), $event->getRequestType());
  }

  /**
   * Create Rest Api Response.
   *
   * @param array $data
   *   Array of data.
   *
   * @return \Drupal\mm_rest\Response\Response
   *   Response.
   */
  protected function createRestApiResponse(array $data) {
    $data = $this->cleanArray($data);
    return new RestApiResponse(ResponseModelFactory::createFactory()
      ->createFromContent($data));
  }

  /**
   * Clean all empty values from array.
   *
   * @param array $array
   *   Array.
   *
   * @return array
   *   Array.
   */
  protected function cleanArray(array $array) {
    if (is_array($array)) {
      foreach ($array as $key => $sub_array) {
        if ($key != 'blocks') {
          $result = $this->cleanArray($sub_array);
          if ($result === '' || (is_array($result) && empty($result))) {
            unset($array[$key]);
          }
          else {
            $array[$key] = $result;
          }
        }
      }
    }

    return $array;
  }

}
