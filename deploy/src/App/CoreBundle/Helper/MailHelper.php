<?php
/**
 * Created by PhpStorm.
 * User: juan-pablo.martina
 * Date: 02/09/2016
 * Time: 09:33 AM
 */

namespace App\CoreBundle\Helper;

use Swift_Mailer;
use Swift_Message;
use Swift_SmtpTransport;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Security\Core\Util\SecureRandom;



class MailHelper{

    protected $_from    = null;
    protected $_to      = null;
    protected $_subject = null;
    protected $_view    = null;
    protected $_params  = [];

    public function __construct()
    {

    }

    /**
     * @return null
     */
    public function getFrom()
    {
        return $this->_from;
    }

    /**
     * @param null $from
     */
    public function setFrom($from)
    {
        $this->_from = $from;
    }

    /**
     * @return null
     */
    public function getTo()
    {
        return $this->_to;
    }

    /**
     * @param null $to
     */
    public function setTo($to)
    {
        $this->_to = $to;
    }

    /**
     * @return null
     */
    public function getSubject()
    {
        return $this->_subject;
    }

    /**
     * @param null $subject
     */
    public function setSubject($subject)
    {
        $this->_subject = $subject;
    }

    /**
     * @return null
     */
    public function getView()
    {
        return $this->_view;
    }

    /**
     * @param null $view
     */
    public function setView($view)
    {
        $this->_view = $view;
    }

    /**
     * @return array
     */
    public function getParams()
    {
        return $this->_params;
    }

    /**
     * @param array $params
     */
    public function setParams($params)
    {
        $this->_params = $params;
    }

    /**
     * Returns a rendered view.
     *
     * @param string $view       The view name
     * @param array  $parameters An array of parameters to pass to the view
     *
     * @return string The rendered view
     */
    public function renderView($view, array $parameters = array())
    {
        global $kernel;

        if ($kernel->getContainer()->has('templating')) {
            return $kernel->getContainer()->get('templating')->render($view, $parameters);
        }

        if (!$kernel->getContainer()->has('twig')) {
            throw new \LogicException('You can not use the "renderView" method if the Templating Component or the Twig Bundle are not available.');
        }

        return $kernel->getContainer()->get('twig')->render($view, $parameters);
    }

    public function sendEmail( ) {

        $transport = Swift_SmtpTransport::newInstance()
            ->setHost('smtp.gmail.com')
            ->setPort(465)
            ->setEncryption('ssl')
            ->setUsername('juan-pablo.martina@mediamonks.com')
            ->setPassword('Belen1985');
        $mailer = Swift_Mailer::newInstance($transport);
        $message = \Swift_Message::newInstance()
            ->setSubject($this->getSubject())
            ->setFrom($this->getFrom())
            ->setTo($this->getTo())
            ->setBody(
                $this->renderView(
                    'emails/'.$this->getView().'.html.twig',
                    $this->getParams()
                ),
                'text/html'
            )
        ;
        try {
            //$mailer = $this->get('mailer');
            $mail = $mailer->send($message);
            //$spool = $mailer->getTransport()->getSpool();
            /*$transport = $this->get('swiftmailer.transport.real');
            $spool->flushQueue($transport);
*/
            return [
                'status' => true
            ];
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }

    }

}