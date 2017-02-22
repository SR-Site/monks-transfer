<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\ResourceBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_slug\PathProcessorSlug;
use Drupal\mm_slug\SlugResolverInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a resource to get Page node data.
 *
 * @RestResource(
 *   id = "spectrum_rest_article_v1",
 *   version = "v1",
 *   entity_type = "node",
 *   entity_bundle = "article",
 *   label = @Translation("Spectrum rest Article resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/article/{slug}"
 *   }
 * )
 */
class ArticleResource extends ResourceBase {

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
   * Entity manager which performs the upcasting in the end.
   *
   * @var \Drupal\Core\Entity\EntityRepositoryInterface
   */
  protected $entityRepository;

  /**
   * Responds to entity GET requests with parameter.
   *
   * @param string $slug
   * @return array
   */
  public function get($slug) {
    return $this->responseData();
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {
    return [
        'pageTitle' => 'Dummy article',
        'headerTheme' => 0,
        'blocks' =>  [
              [
                'id' => 'heroTertiary',
                'data' =>
                  [
                    'background' =>
                      [
                        'normal' => 'data/image/hero-tertiary/background.jpg',
                        'small' => 'data/image/hero-tertiary/background.jpg',
                        'alt' => 'Background image alt text',
                      ],
                  ],
              ],
              [
                'id' => 'audioFragment',
                'data' =>
                  [
                    'windowed' => true,
                    'marginTop' => 2,
                    'heading' => 'Best way to Advertise on TV',
                    'name' => 'John Doe',
                    'description' => 'Foo bar',
                    'image' =>
                      [
                        'normal' => 'data/image/quote/person.jpg',
                        'small' => 'data/image/quote/person.jpg',
                        'alt' => 'Background image alt text',
                      ],
                    'file' => 'data/audio/audio.mp3',
                  ],
              ],
              [
                'id' => 'blogPost',
                'data' =>
                  [
                    'windowed' => true,
                    'marginTop' => 2,
                    'date' => 'January 23, 2017',
                    'time' => '0:08',
                    'views' => '302',
                    'heading' => 'Go Beyond High Profile
Sports Events to Reach
Sports Fans',
                    'subHeading' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                    'paragraph' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesctiunt Ende omnis iste natus error sit voluptatem accusantium doloremque laudantium.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
                    'tags' =>
                      [
                        0 =>
                          [
                            'label' => 'Sport',
                            'title' => 'Sport',
                            'target' => 'knowledge-center#sport',
                            'type' => 0,
                          ],
                        1 =>
                          [
                            'label' => 'PDF',
                            'title' => 'PDF',
                            'target' => 'knowledge-center#pdf',
                            'type' => 0,
                          ],
                      ],
                    'author' =>
                      [
                        'name' => 'Peter Johnson',
                        'role' => 'Sales Manager',
                        'image' =>
                          [
                            'normal' => 'data/image/blog-post/blog-post-profile-image.jpg',
                            'small' => 'data/image/blog-post/blog-post-profile-image.jpg',
                            'alt' => 'Peter Johnson',
                          ],
                      ],
                    'social' =>
                      [
                        [
                          'label' => 'Twitter',
                          'title' => 'Twitter',
                          'target' => 'http://www.twitter.com',
                          'type' => 1,
                        ],
                        [
                          'label' => 'Linked in',
                          'title' => 'Linked in',
                          'target' => 'http://www.linkedin.com',
                          'type' => 1,
                        ],
                      ],
                  ],
              ],
              [
                'id' => 'smallImage',
                'data' =>
                  [
                    'marginTop' => 2,
                    'alignment' => 0,
                    'image' =>
                      [
                        'small' => 'data/image/small-image-left/image.jpg',
                        'normal' => 'data/image/small-image-left/image.jpg',
                        'alt' => 'Image',
                      ],
                  ],
              ],
              [
                'id' => 'smallInfo',
                'data' =>
                  [
                    'windowed' => true,
                    'heading' => 'When it Comes to Entertainment',
                  ],
              ],
              [
                'id' => 'imageCarousel',
                'data' =>
                  [
                    'windowed' => false,
                    'slides' =>
                      [
                        [
                          'heading' => 'Farmer boys - \'Fresh Fish\'',
                          'image' =>
                            [
                              'normal' => 'data/image/image-carousel/image-1.jpg',
                              'small' => 'data/image/image-carousel/image-1.jpg',
                              'alt' => 'Background image alt text',
                            ],
                        ],
                        [
                          'heading' => 'Farmer boys - \'Fresh Fish\'',
                          'image' =>
                            [
                              'normal' => 'data/image/image-carousel/image-2.jpg',
                              'small' => 'data/image/image-carousel/image-2.jpg',
                              'alt' => 'Background image alt text',
                            ],
                        ],
                        [
                          'heading' => 'Farmer boys - \'Fresh Fish\'',
                          'image' =>
                            [
                              'normal' => 'data/image/image-carousel/image-1.jpg',
                              'small' => 'data/image/image-carousel/image-1.jpg',
                              'alt' => 'Background image alt text',
                            ],
                        ],
                      ],
                  ],
              ],
              [
                'id' => 'more',
                'data' =>
                  [
                    'windowed' => false,
                    'marginTop' => 2,
                    'heading' => 'Read more about:',
                    'tags' =>
                      [
                        [
                          'label' => 'Sport',
                          'title' => 'Sport',
                          'target' => 'home',
                          'type' => 0,
                        ],
                        [
                          'label' => 'Resources',
                          'title' => 'Resources',
                          'target' => 'home',
                          'type' => 0,
                        ],
                      ],
                    'articles' =>
                      [
                        [
                          'heading' => 'Go Beyond High Profile Sport Events',
                          'paragraph' => 'Lorem ipsum dolor sit ametm conse ctetuer.',
                          'target' => 'knowledge-center/dummy-article',
                          'image' =>
                            [
                              'normal' => 'data/image/latest/latest-article-image-1.jpg',
                              'small' => 'data/image/latest/latest-article-image-1.jpg',
                              'alt' => 'Background image alt text',
                            ],
                          'tags' =>
                            [
                              [
                                'label' => 'Sport',
                                'title' => 'Sport',
                                'target' => 'home',
                                'type' => 0,
                              ],
                              [
                                'label' => 'PDF',
                                'title' => 'PDF',
                                'target' => 'home',
                                'type' => 0,
                              ],
                            ],
                        ],
                        [
                          'heading' => 'Go Beyond High Profile Sport Events',
                          'paragraph' => 'Lorem ipsum dolor sit ametm conse ctetuer.',
                          'target' => 'knowledge-center/dummy-article',
                          'image' =>
                            [
                              'normal' => 'data/image/latest/latest-article-image-2.jpg',
                              'small' => 'data/image/latest/latest-article-image-2.jpg',
                              'alt' => 'Background image alt text',
                            ],
                          'tags' =>
                            [
                              [
                                'label' => 'Sport',
                                'title' => 'Sport',
                                'target' => 'home',
                                'type' => 0,
                              ],
                              [
                                'label' => 'PDF',
                                'title' => 'PDF',
                                'target' => 'home',
                                'type' => 0,
                              ],
                            ],
                        ],
                        [
                          'heading' => 'Go Beyond High Profile Sport Events',
                          'paragraph' => 'Lorem ipsum dolor sit ametm conse ctetuer.',
                          'target' => 'knowledge-center/dummy-article',
                          'image' =>
                            [
                              'normal' => 'data/image/latest/latest-article-image-2.jpg',
                              'small' => 'data/image/latest/latest-article-image-2.jpg',
                              'alt' => 'Background image alt text',
                            ],
                          'tags' =>
                            [
                              [
                                'label' => 'Sport',
                                'title' => 'Sport',
                                'target' => 'home',
                                'type' => 0,
                              ],
                              [
                                'label' => 'PDF',
                                'title' => 'PDF',
                                'target' => 'home',
                                'type' => 0,
                              ],
                            ],
                        ],
                        [
                          'heading' => 'Go Beyond High Profile Sport Events',
                          'paragraph' => 'Lorem ipsum dolor sit ametm conse ctetuer.',
                          'target' => 'knowledge-center/dummy-article',
                          'image' =>
                            [
                              'normal' => 'data/image/latest/latest-article-image-1.jpg',
                              'small' => 'data/image/latest/latest-article-image-1.jpg',
                              'alt' => 'Background image alt text',
                            ],
                          'tags' =>
                            [
                              [
                                'label' => 'Sport',
                                'title' => 'Sport',
                                'target' => 'home',
                                'type' => 0,
                              ],
                              [
                                'label' => 'PDF',
                                'title' => 'PDF',
                                'target' => 'home',
                                'type' => 0,
                              ],
                            ],
                        ],
                      ],
                  ],
              ],
            ],
    ];
  }

  /**
   * @inheritDoc
   */
  protected function addCacheableDependency() {
    parent::addCacheableDependency();

    /** @var \Drupal\Core\Cache\CacheableMetadata $meta_data */
    $metadata = new CacheableMetadata();
    $metadata->setCacheContexts(['url.query_args:slugfound']);
    $metadata->setCacheMaxAge(86400);
    $this->cacheabilityCollector->addCacheableDependency($metadata);
  }

  /**
   * @inheritDoc
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, SlugResolverInterface $slug_resolver, PathProcessorSlug $slug_path_processor, EntityRepositoryInterface $entity_repository) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);
    $this->slugResolver = $slug_resolver;
    $this->slugPathProcessor = $slug_path_processor;
    $this->entityRepository = $entity_repository;
  }

  /**
   * @inheritDoc
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('mm_rest'),
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('plugin.manager.mm_rest_entity_processor'),
      $container->get('config.factory'),
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('mm_slug.slug_resolver'),
      $container->get('mm_slug.path_processor'),
      $container->get('entity.repository')
    );
  }

}
