<?php
/**
 * Created by PhpStorm.
 * User: rcatalano, damian.iglesias, mdiaz, juan-pablo.martina
 * Date: 11/05/2016
 * Time: 10:52 AM
 */

namespace App\CoreBundle\Helper;

use Aws\Common\Credentials\Credentials;
use Aws\S3\S3Client;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Security\Core\Util\SecureRandom;


class S3Helper{

    protected $_s3Key = null;
    protected $_s3Secret = null;
    protected $_s3Bucket = null;
    protected $_s3Region = null;
    protected $_s3Client = null;

    public function __construct()
    {
        global $kernel;

        $this->setS3Key( $kernel->getContainer()->getParameter('aws_s3_key') );
        $this->setS3Secret( $kernel->getContainer()->getParameter('aws_s3_secret') );
        $this->setS3Bucket( $kernel->getContainer()->getParameter('aws_s3_bucket') );
        $this->setS3Region( $kernel->getContainer()->getParameter('aws_s3_region') );

        $credentials = new Credentials($this->getS3Key(), $this->getS3Secret());

        $client = S3Client::factory(
            array
            (
                'credentials' => $credentials,
                'region'      => $this->getS3Region(),
                'version'     => 'latest'
            )
        );

        $this->setS3Client($client);

    }


    /**
     * @return null
     */
    public function getS3Key()
    {
        return $this->_s3Key;
    }

    /**
     * @param null $s3Key
     * @return $this
     */
    public function setS3Key($s3Key)
    {
        $this->_s3Key = $s3Key;
        return $this;
    }

    /**
     * @return null
     */
    public function getS3Secret()
    {
        return $this->_s3Secret;
    }

    /**
     * @param null $s3Secret
     * @return $this
     */
    public function setS3Secret($s3Secret)
    {
        $this->_s3Secret = $s3Secret;
        return $this;
    }

    /**
     * @return null
     */
    public function getS3Bucket()
    {
        return $this->_s3Bucket;
    }

    /**
     * @param null $s3Bucket
     * @return $this
     */
    public function setS3Bucket($s3Bucket)
    {
        $this->_s3Bucket = $s3Bucket;
        return $this;
    }

    /**
     * @return null
     */
    public function getS3Region()
    {
        return $this->_s3Region;
    }

    /**
     * @param null $s3Region
     */
    public function setS3Region($s3Region)
    {
        $this->_s3Region = $s3Region;
    }

    /**
     * @return null
     */
    public function getS3Client()
    {
        return $this->_s3Client;
    }

    /**
     * @param null $s3Client
     */
    public function setS3Client($s3Client)
    {
        $this->_s3Client = $s3Client;
    }

    public function setUrlToS3($url, $s3_folder) {

        $file       = file_get_contents($url);
        $mimeType   = getimagesize($url);
        $mimeType   = $mimeType['mime'];
        $extension  = pathinfo($url, PATHINFO_EXTENSION);
        $newName    = md5(time().rand(100,999)) . '.'. $extension;

        $s3 = $this->getS3Client();

        // upload file
        try
        {
            // Upload data.
            $result = $s3->putObject(array(
                'Bucket'     	=> $this->getS3Bucket(),
                'Key'        	=> $s3_folder . '/' . $newName,
                'ACL'        	=> 'public-read',
                'Body' 			=> $file,
                'ContentType' 	=> $mimeType
            ));

            return $result['ObjectURL'];

        } catch (S3Exception $e) {
            return json_encode($e->getMessage());
        }

    }

    public function setFileToS3($file, $s3_folder) {

        $mimeType   = $file->getMimeType();
        $extension  = $file->getClientOriginalExtension();
        $newName    = md5(time().rand(100,999)) . '.'. $extension;

            $s3         = $this->getS3Client();

            // upload file
            try
            {
                // Upload data.
                $result = $s3->putObject(array(
                    'Bucket'     	=> $this->getS3Bucket(),
                    'Key'        	=> $s3_folder . '/' . $newName,
                    'ACL'        	=> 'public-read',
                    'SourceFile' 	=> $file->getRealPath(),
                    'ContentType' 	=> $mimeType
                ));

                return $result['ObjectURL'];

            } catch (S3Exception $e) {
                return json_encode($e->getMessage());
            }
    }

}