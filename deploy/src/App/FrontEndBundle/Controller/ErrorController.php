<?php

namespace App\FrontEndBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as Sensio;
use Symfony\Component\HttpFoundation\Response;

/**
 * @author Robert Slootjes <robert@mediamonks.com>
 */
class ErrorController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @Sensio\Cache(smaxage=43200, maxage=43200)
     */
    public function notFoundAction()
    {
        return new Response($this->renderView('AppFrontEndBundle:Home:index.html.twig'), Response::HTTP_OK);
    }
}