<?php

namespace App\FrontEndBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as Sensio;

/**
 * @author Robert Slootjes <robert@mediamonks.com>
 */
class HomeController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @Sensio\Cache(smaxage=3600, maxage=3600)
     */
    public function indexAction()
    {
        return $this->render('AppFrontEndBundle:Home:index.html.twig');
    }
}