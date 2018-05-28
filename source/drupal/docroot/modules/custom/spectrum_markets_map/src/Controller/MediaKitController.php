<?php

namespace Drupal\spectrum_markets_map\Controller;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Controller\ControllerBase;
use Drupal\mm_rest\Response\JsonResponse;
use Drupal\node\Entity\Node;
use Drupal\spectrum_markets_map\Entity\MediaKitRequest;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonDecode;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class MediaKitController
 *
 * @package Drupal\spectrum_markets_map\Controller
 */
class MediaKitController extends ControllerBase {

  /**
   * The serializer service.
   *
   * @var \Symfony\Component\Serializer\SerializerInterface
   */
  protected $serializer;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('serializer')
    );
  }

  /**
   * Contact constructor.
   *
   * @param \Symfony\Component\Serializer\SerializerInterface $serializer
   */
  public function __construct(SerializerInterface $serializer) {
    $this->serializer = $serializer;
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Drupal\mm_rest\Response\JsonResponse
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function createRequest(Request $request) {
    $data = $request->getContent();
    $dataMediaKit = Json::decode($data);
    if (isset($dataMediaKit['marketId'])) {
      $query = \Drupal::entityQuery('node')
        ->condition('type', 'market')
        ->condition('field_market_dma_code', $dataMediaKit['marketId']);
      $results = $query->execute();
      if (!empty($results)) {
        $dataMediaKit['market'] = reset($results);
        $mediaKitEntity = MediaKitRequest::create($dataMediaKit);
        $mediaKitEntity->save();
        return new JsonResponse([
          'response' => 200,
          'message' => t('Request for MediaKit has been successfully created')
        ]);
      }
    }
    return new JsonResponse(['response' => 500]);
  }
}