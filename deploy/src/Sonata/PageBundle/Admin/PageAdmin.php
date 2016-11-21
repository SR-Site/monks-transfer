<?php

namespace Application\Sonata\PageBundle\Admin;

use Application\Sonata\PageBundle\Entity\Page;
use MediaMonks\AdminBundle\Admin\AdminTrait;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\PageBundle\Admin\PageAdmin as BasePageAdmin;
use Sonata\AdminBundle\Route\RouteCollection;

/**
 * Admin definition for the Page class.
 *
 * @author Thomas Rabaix <thomas.rabaix@sonata-project.org>
 */
class PageAdmin extends BasePageAdmin
{
    use AdminTrait;

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        // define group zoning
        $formMapper
            ->with('form_page.group_main_label', array('class' => 'col-md-6'))->end()
            ->with('form_page.group_seo_label', array('class' => 'col-md-6'))->end()
            //->with('form_page.group_advanced_label', array('class' => 'col-md-6'))->end()
        ;

        /*if (!$this->getSubject() || (!$this->getSubject()->isInternal() && !$this->getSubject()->isError())) {
            $formMapper
                ->with('form_page.group_main_label')
                ->add('url', 'text', array('attr' => array('readonly' => 'readonly')))
                ->end()
            ;
        }*/

        if ($this->hasSubject() && !$this->getSubject()->getId()) {
            $formMapper
                ->with('form_page.group_main_label')
                ->add('site', null, array('required' => true, 'read_only' => true))
                ->end()
            ;
        }

        $formMapper
            ->with('form_page.group_main_label')
            ->add('name')
            ->add('enabled', 'hidden', array('required' => false, 'data' => 1))
            //->add('position')
            ->end()
        ;

        if ($this->hasSubject() && !$this->getSubject()->isInternal()) {
            $formMapper
                ->with('form_page.group_main_label')
                ->add('type', 'hidden', array('required' => false, 'data' => 'sonata.page.service.default'))
                ->end()
            ;
        }

        $formMapper
            ->with('form_page.group_main_label')
            ->add('templateCode', 'sonata_page_template', array('required' => true))
            ->end()
        ;

        if (!$this->getSubject() || ($this->getSubject() && $this->getSubject()->getParent()) || ($this->getSubject() && !$this->getSubject()->getId())) {
            $formMapper
                ->with('form_page.group_main_label')
                ->add('parent', 'sonata_page_selector', array(
                    'page'          => $this->getSubject() ?: null,
                    'site'          => $this->getSubject() ? $this->getSubject()->getSite() : null,
                    'model_manager' => $this->getModelManager(),
                    'class'         => $this->getClass(),
                    'required'      => false,
                    'filter_choice' => array('hierarchy' => 'root'),
                    'label'         => 'Parent',
                    'btn_add'       => false
                ), array(
                    'admin_code'      => $this->getCode(),
                    'link_parameters' => array(
                        'siteId' => $this->getSubject() ? $this->getSubject()->getSite()->getId() : null,
                    ),
                ))
                ->end()
            ;
        }

        /*if (!$this->getSubject() || !$this->getSubject()->isDynamic()) {
            $formMapper
                ->with('form_page.group_main_label')
                //->add('pageAlias', null, array('required' => false))
                ->add('target', 'sonata_page_selector', array(
                    'page'          => $this->getSubject() ?: null,
                    'site'          => $this->getSubject() ? $this->getSubject()->getSite() : null,
                    'model_manager' => $this->getModelManager(),
                    'class'         => $this->getClass(),
                    'filter_choice' => array('request_method' => 'all'),
                    'required'      => false,
                    'btn_add'       => false
                ), array(
                    'admin_code'      => $this->getCode(),
                    'link_parameters' => array(
                        'siteId' => $this->getSubject() ? $this->getSubject()->getSite()->getId() : null,
                    )
                ))
                ->end()
            ;
        }*/

        /*
        if (!$this->getSubject() || !$this->getSubject()->isHybrid()) {
            $formMapper
                ->with('form_page.group_seo_label')
                ->add('slug', 'text',  array('required' => false))
                ->add('customUrl', 'text', array('required' => false))
                ->end()
            ;
        }
        */

        $formMapper
            ->with('form_page.group_seo_label', array('collapsed' => true))
            ->add('title', null, array('required' => false))
            ->add('metaKeyword', 'textarea', array('required' => false))
            ->add('metaDescription', 'textarea', array('required' => false))
            ->end()
        ;

        /*
        if ($this->hasSubject() && !$this->getSubject()->isCms()) {
            $formMapper
                ->with('form_page.group_advanced_label', array('collapsed' => true))
                ->add('decorate', null,  array('required' => false))
                ->end()
            ;
        }

        $formMapper
            ->with('form_page.group_advanced_label', array('collapsed' => true))
            ->add('javascript', null,  array('required' => false))
            ->add('stylesheet', null, array('required' => false))
            ->add('rawHeaders', null, array('required' => false))
            ->end()
        ;

        $formMapper->setHelps(array(
            'name' => $this->trans('help_page_name'),
        ));
        */
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('url')
            ->addIdentifier('name')
            ->add(
                '_action',
                'actions',
                [
                    'actions'  => [
                        'publish' => ['template' => 'MediaMonksAdminBundle:CRUD:list__action_publish.html.twig'],
                        'compose' => ['template' => 'ApplicationSonataPageBundle:CRUD:list__action_compose.html.twig'],
                        'edit'    => ['template' => 'MediaMonksAdminBundle:CRUD:list__action_edit.html.twig'],
                        'delete'  => ['template' => 'MediaMonksAdminBundle:CRUD:list__action_delete.html.twig'],
                    ],
                    'template' => 'MediaMonksAdminBundle:CRUD:list__action.html.twig',
                    'header_style' => 'width: 300px;'
                ]
            );
    }

    /**
     * {@inheritdoc}
     */
    public function configureRoutes(RouteCollection $collection)
    {
        parent::configureRoutes($collection);

        $collection->add('publish', $this->getRouterIdParameter().'/publish');
        //$collection->add('history', $this->getRouterIdParameter().'/history/');
        //$collection->add('history_view_revision', $this->getRouterIdParameter().'/history/{revision}/view');
        //$collection->add('history_compare_revisions', $this->getRouterIdParameter().'/history/{base_revision}/{compare_revision}/compare');
        //$collection->add('rollback', $this->getRouterIdParameter().'/{revision}/rollback');
        $collection->remove('batch');
    }

    public function toString($object)
    {
        return $object instanceof Page
            ? $object->getName()
            : 'Page';
    }
}
