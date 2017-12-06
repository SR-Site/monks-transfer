<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_twitter_api\TwitterAPIExchange;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_twitter_feed_v1",
 *   label = @Translation("Paragraph: Block Twitter Feed"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_twitter_feed",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockTwitterFeedV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'TwitterFeed',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'items' => $this->getTweets(),
      ],
    ];

    return $data;
  }

  /**
   * Get twitter feeds.
   *
   * @return array
   *   Array of tweets.
   *
   * @throws \Exception
   */
  protected function getTweets() {
    $tweets = [];
    $config = \Drupal::config('spectrum_twitter_api.settings');

    // Get configurations.
    $tweets_username = $config->get('tweets_username');
    $accessToken = $config->get('access_token');
    $tokenSecret = $config->get('token_secret');
    $consumerKey = $config->get('consumer_key');
    $consumerSecret = $config->get('consumer_secret');

    if ($tweets_username && $accessToken && $tokenSecret && $consumerKey && $consumerSecret) {
      $settings = [
        'oauth_access_token' => $accessToken,
        'oauth_access_token_secret' => $tokenSecret,
        'consumer_key' => $consumerKey,
        'consumer_secret' => $consumerSecret,
      ];
      $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
      $getfield = '?screen_name=' . $tweets_username . '&count=3';
      $requestMethod = 'GET';

      $twitter = new TwitterAPIExchange($settings);
      $response = $twitter->setGetfield($getfield)
        ->buildOauth($url, $requestMethod)
        ->performRequest();

      if ($response) {
        $tweetsObjects = json_decode($response);
        foreach ($tweetsObjects as $tweetsObject) {
          $date = new \DateTime($tweetsObject->created_at);
          $createdAt = $date->format('d/m/Y');
          $tweets[] = [
            'name' => $tweetsObject->user->name,
            'handle' => $tweetsObject->user->screen_name,
            'text' => $tweetsObject->text,
            'date' => $createdAt,
            'target' => 'http://www.twitter.com',
          ];
        }
      }
    }

    return $tweets;
  }

}
