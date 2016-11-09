<?php

namespace App\CoreBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class FormDataAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('fullName')
            ->add('email')
            ->add('company')
            ->add('phone')
            ->add('city')
            ->add('state')
            ->add('zip')
            ->add('zip_advertising')
            ->add('comments')
            ->add('created_at')
            ->add('updated_at');
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('fullName')
            ->add('email')
            ->add('company')
            ->add('phone')
            ->add('city')
            ->add('state')
            ->add('zip')
            ->add('zip_advertising')
            ->add('comments')
            ->add('created_at')
            ->add('updated_at')
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ));
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('fullName')
            ->add('email')
            ->add('company')
            ->add('phone')
            ->add('city')
            ->add('state')
            ->add('zip')
            ->add('zip_advertising')
            ->add('comments');
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('fullName')
            ->add('email')
            ->add('company')
            ->add('phone')
            ->add('city')
            ->add('state')
            ->add('zip')
            ->add('zip_advertising')
            ->add('comments')
            ->add('created_at')
            ->add('updated_at');
    }


    public function prePersist($object)
    {

        $object->setFullNameCanonical($object->getFullName());
        $object->setEmailCanonical($object->getEmail());
        $object->setCompanyCanonical($object->getCompany());
        $object->setPhoneCanonical($object->getPhone());
        $object->setCreatedAt(new \DateTime("now"));
        $object->setUpdatedAt(new \DateTime("now"));
    }


    public function preUpdate($object)
    {
        $object->setFullNameCanonical($object->getFullName());
        $object->setEmailCanonical($object->getEmail());
        $object->setCompanyCanonical($object->getCompany());
        $object->setPhoneCanonical($object->getPhone());
        $object->setUpdatedAt(new \DateTime("now"));
    }
}
