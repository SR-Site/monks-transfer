<?php

namespace App\FrontEndBundle\Controller;

use App\CoreBundle\Entity\PageCrawled;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Sensio;

/**
 * @author Robert Slootjes <robert@mediamonks.com>
 */
class SeoPageController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     * @Sensio\Cache(smaxage=43200, maxage=43200)
     */
    public function indexAction(Request $request)
    {
        /**
         * @var Page $page
         * @var PageCrawled $pageCrawled
         */
        $page = $request->attributes->get('page');
        $pageCrawled = $request->attributes->get('pageCrawled');


        $title = '';
        $metaKeywords = [];
        $metaDescription = '';
        $content = '';
        $headers = [];

        if(!empty($page)) {



            $title = $page->getTitle();
            $metaKeywords = $page->getMetaKeywords();
            $metaDescription = $page->getMetaDescription();
            //$headers = $page->getRawHeaders();
        }

        if(!empty($pageCrawled)) {
            if(empty($title)) {
                $title = $pageCrawled->getTitle();
            }
            if(empty($metaKeywords)) {
                $metaKeywords = $pageCrawled->getMetaKeywords();
            }
            if(empty($metaDescription)) {
                $metaDescription = $pageCrawled->getMetaDescription();
            }
            $content = $pageCrawled->getContentHtml();
        }

        $response = new Response($this->renderView('AppFrontEndBundle:SeoPage:index.html.twig', [
            'title' => $title,
            'metaKeywords' => $metaKeywords,
            'metaDescription' => $metaDescription,
            'content' => $content,
        ]), Response::HTTP_OK, $headers);

        return $response;
    }
}