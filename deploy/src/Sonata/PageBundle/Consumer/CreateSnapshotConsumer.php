<?php

namespace Application\Sonata\PageBundle\Consumer;

use Sonata\NotificationBundle\Consumer\ConsumerEvent;
use Sonata\PageBundle\Consumer\CreateSnapshotConsumer as BaseCreateSnapshotConsumer;

class CreateSnapshotConsumer extends BaseCreateSnapshotConsumer
{
    /**
     * {@inheritdoc}
     */
    public function process(ConsumerEvent $event)
    {
        $pageId = $event->getMessage()->getValue('pageId');

        $page = $this->pageManager->findOneBy(array('id' => $pageId));

        if (!$page) {
            return;
        }

        // start a transaction
        $this->snapshotManager->getConnection()->beginTransaction();

        $newSnapshot = $this->transformer->create($page);

        $snapshot = $this->snapshotManager->findOneBy(array('page' => $page));
        if(empty($snapshot)) {
            // creating snapshot
            $snapshot = $newSnapshot;
        }
        else {
            // updating snapshot
            $snapshot->setContent($newSnapshot->getContent());
        }

        // update the page status
        $page->setEdited(false);
        $this->pageManager->save($page);

        // save the snapshot
        $this->snapshotManager->save($snapshot);
        $this->snapshotManager->enableSnapshots(array($snapshot));

        // commit the changes
        $this->snapshotManager->getConnection()->commit();
    }
}
