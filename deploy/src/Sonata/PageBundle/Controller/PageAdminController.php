<?php

namespace Application\Sonata\PageBundle\Controller;

use Application\Sonata\PageBundle\Entity\Page;
use MediaMonks\AdminBundle\Controller\CRUDControllerTrait;
use Sonata\PageBundle\Controller\PageAdminController as Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Page Admin Controller.
 *
 * @author Thomas Rabaix <thomas.rabaix@sonata-project.org>
 */
class PageAdminController extends Controller
{
    use CRUDControllerTrait;

    /**
     * @param Request|null $request
     *
     * @return Response
     */
    public function treeAction(Request $request = null)
    {
        $this->admin->checkAccess('tree');

        $sites = $this->get('sonata.page.manager.site')->findBy(array());
        $pageManager = $this->get('sonata.page.manager.page');

        $currentSite = null;
        $siteId = $request->get('site');
        foreach ($sites as $site) {
            if ($siteId && $site->getId() == $siteId) {
                $currentSite = $site;
            } elseif (!$siteId && $site->getIsDefault()) {
                $currentSite = $site;
            }
        }
        if (!$currentSite && count($sites) == 1) {
            $currentSite = $sites[0];
        }

        if ($currentSite) {
            $pages = $pageManager->loadPages($currentSite);
        } else {
            $pages = array();
        }

        $datagrid = $this->admin->getDatagrid();
        $formView = $datagrid->getForm()->createView();

        $this->get('twig')->getExtension('form')->renderer->setTheme($formView, $this->admin->getFilterTheme());

        return $this->render($this->admin->getTemplate('list'), array(
            'action'      => 'tree',
            'sites'       => $sites,
            'currentSite' => $currentSite,
            'pages'       => $pages,
            'form'        => $formView,
            'csrf_token'  => $this->getCsrfToken('sonata.batch'),
        ));
    }
}
