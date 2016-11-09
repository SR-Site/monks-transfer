<?php

namespace App\CoreBundle\Entity;

use App\CoreBundle\Entity\Traits\PublishableEntity;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use MediaMonks\Doctrine\Mapping\Annotation as MediaMonks;

/**
 * @ORM\Entity
 * @ORM\Table(name="form_data")
 */
class FormData
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;


    /**
     * @ORM\Column(type="string", nullable=false)
     * @MediaMonks\Transformable(name="encrypt")
     */
    protected $fullName;

    /**
     * @ORM\Column(type="string", nullable=false)
     * @MediaMonks\Transformable(name="hash")
     */
    protected $fullNameCanonical;

    /**
     * @ORM\Column(type="string", nullable=false)
     * @MediaMonks\Transformable(name="encrypt")
     */
    protected $email;

    /**
     * @ORM\Column(type="string", nullable=false, unique=true)
     * @MediaMonks\Transformable(name="hash")
     */
    protected $emailCanonical;

    /**
     * @ORM\Column(type="string", nullable=false)
     * @MediaMonks\Transformable(name="encrypt")
     */
    protected $company;

    /**
     * @ORM\Column(type="string", nullable=false)
     * @MediaMonks\Transformable(name="hash")
     */
    protected $companyCanonical;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @MediaMonks\Transformable(name="encrypt")
     */
    protected $phone;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @MediaMonks\Transformable(name="hash")
     */
    protected $phoneCanonical;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    protected $city;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    protected $state;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $zip;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    protected $zip_advertising;

    /**
     * @ORM\Column(type="text", nullable=false)
     */
    protected $comments;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    protected $created_at;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    protected $updated_at;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Data
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param mixed $phone
     * @return Data
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPhoneCanonical()
    {
        return $this->phoneCanonical;
    }

    /**
     * @param mixed $phoneCanonical
     * @return Data
     */
    public function setPhoneCanonical($phoneCanonical)
    {
        $this->phoneCanonical = $phoneCanonical;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param mixed $created_at
     * @return $this
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param mixed $updated_at
     * @return $this
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFullName()
    {
        return $this->fullName;
    }

    /**
     * @param mixed $fullName
     * @return FormData
     */
    public function setFullName($fullName)
    {
        $this->fullName = $fullName;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFullNameCanonical()
    {
        return $this->fullNameCanonical;
    }

    /**
     * @param mixed $fullNameCanonical
     * @return FormData
     */
    public function setFullNameCanonical($fullNameCanonical)
    {
        $this->fullNameCanonical = $fullNameCanonical;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     * @return FormData
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmailCanonical()
    {
        return $this->emailCanonical;
    }

    /**
     * @param mixed $emailCanonical
     * @return FormData
     */
    public function setEmailCanonical($emailCanonical)
    {
        $this->emailCanonical = $emailCanonical;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     * @return FormData
     */
    public function setCompany($company)
    {
        $this->company = $company;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCompanyCanonical()
    {
        return $this->companyCanonical;
    }

    /**
     * @param mixed $companyCanonical
     * @return FormData
     */
    public function setCompanyCanonical($companyCanonical)
    {
        $this->companyCanonical = $companyCanonical;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     * @return FormData
     */
    public function setCity($city)
    {
        $this->city = $city;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param mixed $state
     * @return FormData
     */
    public function setState($state)
    {
        $this->state = $state;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @param mixed $zip
     * @return FormData
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getZipAdvertising()
    {
        return $this->zip_advertising;
    }

    /**
     * @param mixed $zip_advertising
     * @return FormData
     */
    public function setZipAdvertising($zip_advertising)
    {
        $this->zip_advertising = $zip_advertising;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * @param mixed $comments
     * @return FormData
     */
    public function setComments($comments)
    {
        $this->comments = $comments;
        return $this;
    }

    public function __toString()
    {
        return $this->getFullName();
    }


}
