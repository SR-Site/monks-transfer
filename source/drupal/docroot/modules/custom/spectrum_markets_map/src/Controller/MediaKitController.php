<?php

namespace Drupal\spectrum_markets_map\Controller;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\State\StateInterface;
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
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('serializer'),
      $container->get('state')
    );
  }

  /**
   * Contact constructor.
   * @param \Symfony\Component\Serializer\SerializerInterface $serializer
   * @param \Drupal\Core\State\StateInterface $state
   */
  public function __construct(SerializerInterface $serializer, StateInterface $state) {
    $this->serializer = $serializer;
    $this->state = $state;
  }

//  /**
//   * @param \Symfony\Component\HttpFoundation\Request $request
//   *
//   * @return \Drupal\mm_rest\Response\JsonResponse
//   *
//   * @throws \Drupal\Core\Entity\EntityStorageException
//   */
//  public function createRequest(Request $request) {
//    $data = $request->getContent();
//    $dataMediaKit = Json::decode($data);
//    if (isset($dataMediaKit['marketId'])) {
//      $query = \Drupal::entityQuery('node')
//        ->condition('type', 'market')
//        ->condition('field_market_dma_code', $dataMediaKit['marketId']);
//      $results = $query->execute();
//      if (!empty($results)) {
//        $dataMediaKit['market'] = reset($results);
//        $mediaKitEntity = MediaKitRequest::create($dataMediaKit);
//        $mediaKitEntity->save();
//        return new JsonResponse([
//          'response' => 200,
//          'success' => TRUE
//        ]);
//      }
//    }
//    return new JsonResponse(['response' => 500]);
//  }

  /**
   * Resend parameters to Paradat as a www-form-urlencoded and process the
   * response.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   * @return array
   * @throws \Exception
   */
  public function createRequest( Request $request ) {
    $content = $request->getContent();

    /** @var \Drupal\spectrum_markets_map\SpectrumMediaKitPardotInterface $contact */
    $contact = $this->serializer->deserialize($content, 'Drupal\spectrum_markets_map\SpectrumMediaKitPardotInterface', 'json');

    /** @var \GuzzleHttp\Client $client */
    $client = \Drupal::httpClient();

    $destination = $this->state->get('pardot_mediakit_action');
    $referer = $this->state->get('pardot_referer');

    if (empty($referer) || empty($destination)) {
      throw new \Exception("You must configure the referer and the destination URL.");
    }

    /** @var \GuzzleHttp\Psr7\Response $request */
    $request = $client->post($destination, [
      'allow_redirects' => [
        'referer' => true,
      ],
      'headers' => [
        'Referer' => $referer,
      ],
      'form_params' => $contact->getProperties(),
      'verify' => FALSE,
    ]);

    $content = $request->getBody()->getContents();
    $response = json_decode($content, TRUE);

    if(isset($response['data']['errors'])){
      header("Content-Type: application/json");
      print '{error:{"code": "send.failed", "message": "send failed."}}';
      die();
    }

    return ['status' => !isset($response['data']['errors'])];
  }

  /**
   * Pardot referer. It returns all variables sent by Pardot.
   * This respond will by wrapped into a "data" property, because of the MM
   * specs, keep that in mind when retrieving the content.
   *
   * @return mixed
   */
  public function processRequest() {
    return $_REQUEST;
  }

}
