<?php

namespace App\FrontEndBundle\Controller;

use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Sensio;
use Symfony\Component\HttpFoundation\Request;

/**
 * @author Robert Slootjes <robert@mediamonks.com>
 */
class IndexController extends Controller
{
    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws Exception
     * @Sensio\Route(path="/", name="front_end_index")
     * @Sensio\Cache(smaxage=300, maxage=300)
     */
    public function indexAction()
    {
        return $this->render('AppFrontEndBundle:Home:index.html.twig');
    }
}
