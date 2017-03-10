<?php

namespace Drupal\spectrum_rest\Controller;

use Drupal\Core\Database\Database;
use Drupal\Core\Controller\ControllerBase;
use Drupal\mm_slug\PathProcessorSlug;
use Drupal\mm_slug\SlugResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Controller routines for entity counter.
 */
class ViewCounter extends ControllerBase {

  /**
   * Slug Resolver service
   *
   * @var \Drupal\mm_slug\SlugResolverInterface
   */
  protected $slugResolver;

  /**
   * Slug Path Processor service.
   *
   * @var \Drupal\mm_slug\PathProcessorSlug
   */
  protected $slugPathProcessor;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('mm_slug.slug_resolver'),
      $container->get('mm_slug.path_processor')
    );
  }

  /**
   * ViewCounter constructor.
   *
   * @param \Drupal\mm_slug\SlugResolverInterface $slug_resolver
   * @param \Drupal\mm_slug\PathProcessorSlug $slug_path_processor
   */
  public function __construct(SlugResolverInterface $slug_resolver, PathProcessorSlug $slug_path_processor) {
    $this->slugResolver = $slug_resolver;
    $this->slugPathProcessor = $slug_path_processor;
  }

  /**
   * Increment the node counter and return it.
   * TODO: add some kind of validation like a token.
   *
   * @param string $slug
   * @return array
   */
  public function count($slug) {
    $result = [];

    $request = \Drupal::request();
    $slug = $this->slugPathProcessor->resolveSlug($request, $slug);

    // Try to load the entity based on the slug.
    /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
    $entity = $this->slugResolver->loadEntityBySlug($slug);

    if (empty($entity)) {
      throw new NotFoundHttpException($this->t('Not found'));
    }

    $enabled = $this->config('statistics.settings')->get('count_content_views');

    if ($enabled) {
      $db = Database::getConnection();

      $db->merge('node_counter')
        ->key('nid', $entity->id())
        ->fields(array(
          'daycount' => 1,
          'totalcount' => 1,
          'timestamp' => REQUEST_TIME,
        ))
        ->expression('daycount', 'daycount + 1')
        ->expression('totalcount', 'totalcount + 1')
        ->execute();

      $query = $db->select('node_counter');
      $query->fields('node_counter', ['daycount', 'totalcount'])
        ->condition('nid', $entity->id());

      $data = $query->execute();

      $result = $data->fetchAssoc();
    }

    return $result;
  }

}
