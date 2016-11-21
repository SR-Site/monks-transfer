<?php

namespace App\CoreBundle\Elastica;

use FOS\ElasticaBundle\Transformer\AbstractElasticaToModelTransformer;
use MediaMonks\CoreBundle\Util\StringUtil;

class ElasticaToModelTransformer extends AbstractElasticaToModelTransformer
{

    /**
     * Class of the model to map to the elastica documents.
     *
     * @var string
     */
    protected $objectClass = null;

    /**
     * @param array $elasticaObjects
     * @return array
     */
    public function transform(array $elasticaObjects)
    {
        $documents = [];

        /**
         * @var $object \Elastica\Result
         */
        foreach($elasticaObjects as $object) {
            $resultName = '\MediaMonks\CoreBundle\Elastica\Result\\' . StringUtil::snakeCaseToCamelCase($object->getType());
            $documents[] = new $resultName($object->getHit());
        }

        return $documents;
    }

    /**
     * @param array $elasticaObjects
     * @return array
     */
    public function hybridTransform(array $elasticaObjects)
    {
        $indexedElasticaResults = array();
        foreach ($elasticaObjects as $elasticaObject) {
            $indexedElasticaResults[$elasticaObject->getId()] = $elasticaObject;
        }

        $objects = $this->transform($elasticaObjects);

        $result = array();
        foreach ($objects as $object) {
            $id = $this->propertyAccessor->getValue($object, $this->options['identifier']);
            $result[] = new HybridResult($indexedElasticaResults[$id], $object);
        }

        return $result;
    }

    /**
     * @return string
     */
    public function getObjectClass()
    {
        return $this->objectClass;
    }

    /**
     * @return mixed
     */
    public function getIdentifierField()
    {
        return $this->options['identifier'];
    }

}