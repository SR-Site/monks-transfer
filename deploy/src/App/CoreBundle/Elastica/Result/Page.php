<?php

namespace App\CoreBundle\Elastica\Result;

use Symfony\Component\DependencyInjection\ContainerInterface;

class Page extends AbstractResult implements ResultInterface
{
    /**
     * @var array
     */
    protected $content = null;

    /**
     * @var ContainerInterface
     */
    protected $container;

    public function toArray()
    {
        return [
            'id' => $this->getContent()['id'],
            'path' => $this->getUrl(),
            'name' => $this->getContent()['name'],
            'slug' => $this->getContent()['slug'],
        ];
    }

    /**
     * @param ContainerInterface $container
     * @return array
     */
    public function toArrayWithBlocks(ContainerInterface $container)
    {
        $this->container = $container;

        $data = [
            'id' => $this->getContent()['id'],
            'name' => $this->getContent()['name'],
            'template' => $this->getContent()['template_code'],
            'slug' => $this->getContent()['slug'],
            'blocks' => []
        ];
        foreach($this->getContent()['blocks'] as $block) {
            if(!$this->isBlockEnabled($block)) {
                continue;
            }
            $data['blocks'][] = $this->renderBlock($block);
        }
        return $data;
    }

    /**
     * @param array $block
     * @return boolean
     */
    protected function isBlockEnabled(array $block)
    {
        if(empty($block['enabled'])) {
            //return false;
        }
        // @todo time based checking
        return true;
    }

    /**
     * @param array $block
     * @return array
     */
    protected function renderBlock(array $block)
    {
        $blockService = $this->container->get($block['type']);
        $blockRenderer = $this->container->get($blockService->getRendererServiceId());
        $blockRenderer->setData($block);

        $blockData = [
            'name' => $blockRenderer->getName(),
            'type' => $blockRenderer->getType(),
            'position' => $block['position']
        ];

        $content = $blockRenderer->render();
        if(!empty($content)) {
            $blockData['content'] = $content;
        }

        if(!empty($block['blocks'])) {
            $blockData['blocks'] = [];
            foreach($block['blocks'] as $childBlock) {
                if(!$this->isBlockEnabled($childBlock)) {
                    continue;
                }
                $blockData['blocks'][] = $this->renderBlock($childBlock);
            }
        }

        return $blockData;
    }

    public function getContent()
    {
        if(is_null($this->content)) {
            $this->content = json_decode($this->getDataByKey('content'), true);
        }
        return $this->content;
    }

    public function getPageTitle()
    {
        return $this->getContent()['name'];
    }

    public function getMetaKeywords()
    {
        return $this->getContent()['meta_keyword'];
    }

    public function getMetaDescription()
    {
        return $this->getContent()['meta_description'];
    }

    public function getRawHeaders()
    {
        $headers = $this->getContent()['raw_headers'];
        if(empty($headers)) {
            return [];
        }
        return $headers;
    }
}