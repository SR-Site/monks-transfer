<?php
namespace App\ApiBundle\Controller;

use App\CoreBundle\Entity\Data;



use Doctrine\ORM\EntityManager;
use Exception;
use MediaMonks\RestApiBundle\Response\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Sensio;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller as BaseController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;


/**
 * @author Rodrigo Catalano <rodrigo.catalano@mediamonks.com>
 * @Sensio\Route("/data")
 */
class DataController extends BaseController
{

    /**
     * @return array
     * @throws Exception
     * @Sensio\Route("/testUnit", name="api_data_test")
     * @Sensio\Method({"GET"})
     * @Sensio\Cache(smaxage=1)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="test data",
     *  resource=true,
     * )
     */
    public function testUnitAction()
    {

        $amount = 10000;
        $em = $this->getDoctrine()->getManager();

        $counter = 0;


        for ($i = 0; $i < $amount; $i++) {
            $data = new Data();
            $data->setPhone(uniqid());
            $data->setPhoneCanonical(uniqid());
            if ($i < 5000) {
                $data->setCreatedAt(new \DateTime('now'));
            } else {
                $data->setCreatedAt(new \DateTime('tomorrow'));
            }
            $em->persist($data);
            $em->flush();

            $counter++;
        }

        return $this->response('Test Passed, ' . $counter . ' entries has been created');
    }


    /**
     * @param request $request
     * @return array
     * @throws Exception
     * @Sensio\Route("/create", name="api_data_create")
     * @Sensio\Method({"POST"})
     * @Sensio\Cache(smaxage=1)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Create data",
     *  resource=true,
     *  requirements={
     *    {"name"="data", "requirement"="true", "dataType"="string", "description"="User phone / data"},
     *  }
     * )
     */
    public function createAction(Request $request)
    {

        $phone = $request->get('data');

        if ($phone == null && empty($phone)) {
            return $this->response([
                "error" => [
                    "code" => "error.missing.parameters",
                    "message" => "Missing Parameters"
                ]
            ]);
        }


        $dataEncrypted = $this->get('mediamonks.doctrine.transformable.transformer.zend_crypt_hash')->transform($phone);


        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();
        $entities = $em
            ->getRepository($entityName)
            ->findBy(
                array('phoneCanonical' => $dataEncrypted)
            );

        if ($entities) {
            return $this->response([
                "error" => [
                    "code" => "error.duplicated",
                    "message" => "Duplicated Entry"
                ]
            ]);
        }

        $date = new \DateTime("now");

        $data = new Data();
        $data->setPhone($phone);
        $data->setPhoneCanonical($phone);
        $data->setCreatedAt($date);
        $em->persist($data);
        $em->flush();


        return $this->response('Data Created');
    }


    /**
     * @Sensio\Route("/export", name="api_data_view")
     * @Sensio\Method({"GET"})
     * @Sensio\Cache(smaxage=900)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Export data by date (service)",
     *  resource=true,
     * )
     */
    public function exportAction()
    {

        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();

        $qb = $em->createQueryBuilder();

        $qb->select('data.created_at, COUNT(data.id)');
        $qb->groupBy('data.created_at');
        $qb->from($entityName, 'data');

        $rowAmount = $qb->getQuery()->getScalarResult();



         $formRows = $this->createFormBuilder()
             ->add('row_start', NumberType::class, array(
                 'attr' => array(
                     'min' => 0
                 )
             ))
             ->add('row_end', NumberType::class, array(
                 'attr' => array(
                     'min' => 0
                 )
             ))
             ->add('submit', SubmitType::class, array(
                 'label' => 'Export',
                     'attr' => array(
                         'class' => 'btn-primary'
                     )
                 )
             )
             ->getForm();

        $form = $this->createFormBuilder()
            ->add('date', DateType::class)
            ->add('submit', SubmitType::class, array(
                    'label' => 'Export',
                    'attr' => array(
                        'class' => 'btn-primary'
                    )
                )
            )
            ->getForm();

        return $this->render('@ApiBundleTemplate/data.html.twig', array(
            'form' => $form->createView(),
            'formRows' => $formRows->createView(),
            'rowAmount' => $rowAmount,
        ));
    }

    /**
     * @return $response
     * @Sensio\Route("/exportByDate/{date}", name="api_data_exportbydatespecific")
     * @Sensio\Method({"GET"})
     * @Sensio\Cache(smaxage=1)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Export data by date (service)",
     *  resource=true,
     * )
     */
    public function exportByDateSpecificAction(Request $request)
    {

        $date = $request->get('date');


        if ($date == '' && $date == null) {
            return $this->response([
                "error" => [
                    "code" => "error.missing.parameters",
                    "message" => "Missing Parameters"
                ]
            ]);
        }

        $searchDate = new \DateTime($date);

        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();
        $entities = $em
            ->getRepository($entityName)
            ->findBy(
                array('created_at' => $searchDate)
            );

        $em->flush();


        return $this->exportXLS($entities);

    }

    /**
     * @return $response
     * @Sensio\Route("/exportByRows", name="api_data_exportbyrows")
     * @Sensio\Method({"POST"})
     * @Sensio\Cache(smaxage=1)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Export data by date (service)",
     *  resource=true,
     * )
     */
    public function exportByRowsAction(Request $request)
    {

        $form = $request->get('form');

        $row_start = $form['row_start'];
        $row_end = $form['row_end'];


        if ($row_start == '' && $row_start == null) {
            return $this->response([
                "error" => [
                    "code" => "error.missing.parameters",
                    "message" => "Missing Parameters"
                ]
            ]);
        }

        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();
        $entities = $em
            ->getRepository($entityName)
            ->findBy(
                array(),
                array('id' => 'DESC'),
                $row_end,
                $row_start
            );


        $em->flush();


        return $this->exportXLS($entities);

    }


    /**
     * @return $response
     * @Sensio\Route("/exportByDate", name="api_data_exportbydate")
     * @Sensio\Method({"POST"})
     * @Sensio\Cache(smaxage=1)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Export data by date (service)",
     *  resource=true,
     * )
     */
    public function exportByDateAction(Request $request)
    {

        $form = $request->get('form');
        $date = $form['date'];


        if ($date == '' && $date == null) {
            return $this->response([
                "error" => [
                    "code" => "error.missing.parameters",
                    "message" => "Missing Parameters"
                ]
            ]);
        }


        $searchDate = new \DateTime($date["year"] . '-' . $date["month"] . '-' . $date["day"]);

        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();
        $entities = $em
            ->getRepository($entityName)
            ->findBy(
                array('created_at' => $searchDate)
            );

        $em->flush();


        return $this->exportXLS($entities);

    }


    /**
     * @return $response
     * @Sensio\Route("/exportAll", name="api_data_export")
     * @Sensio\Method({"GET"})
     * @Sensio\Cache(smaxage=900)
     *
     * @ApiDoc(
     *  section="Data",
     *  description="Export all data",
     *  resource=true,
     * )
     */
    public function exportAllAction()
    {
        $entityName = "AppCoreBundle:Data";
        $em = $this->getDoctrine()->getManager();
        $entities = $em
            ->getRepository($entityName)
            ->findAll();


        return $this->exportXLS($entities);

    }

    public function exportXLS($entities)
    {

        $counter = 2;
        $phpExcelObject = $this->get('phpexcel')->createPHPExcelObject();

        $phpExcelObject->getProperties()->setCreator("MediaMonks")
            ->setTitle("Uber Data");
        $phpExcelObject->setActiveSheetIndex(0)
            ->setCellValue('A1', 'Phone Number')
            ->setCellValue('B1', 'Created At');



        foreach ($entities as $entity) {
            $phpExcelObject->setActiveSheetIndex(0)
                ->setCellValue('A' . $counter, $entity->getPhone())
                ->setCellValue('B' . $counter, $entity->getCreatedAt());
            $counter++;
        }

        $writer = $this->get('phpexcel')->createWriter($phpExcelObject, 'Excel5');

        $response = $this->get('phpexcel')->createStreamedResponse($writer);

        $dispositionHeader = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            'data.xls'
        );

        $response->headers->set('Content-Type', 'text/vnd.ms-excel; charset=utf-8');
        $response->headers->set('Pragma', 'public');
        $response->headers->set('Cache-Control', 'maxage=1');
        $response->headers->set('Content-Disposition', $dispositionHeader);

        return $response;
    }


    public function response($data)
    {
        return $response = new JsonResponse(json_encode([
            'data' => [
                $data
            ]
        ]));
    }
}