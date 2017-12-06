.PHONY: all backend frontend
PROJECT?=no_projectname_set
BUILDNUMBER?=0
TMPDIR="/tmp/${PROJECT}-${BUILDNUMBER}"
TARGETBRANCH?=develop
TARGETTAG?=test
FTPUSERNAME?=username
FTPPASSWORD?=password
FTPHOSTNAME?=hostname


all: clean install-frontend install-backend sync

clean:
	docker-compose rm -f

backend: backend-container backend-clean backend-composer backend-teardown

backend-container:
	docker-compose up -d backend

backend-clean:
	-docker-compose exec backend "rm" "-rf" "/app/vendor"
	-docker-compose exec backend "rm" "-rf" "/app/docroot/core"

backend-composer:
	docker-compose exec backend /bin/sh -c 'cd /app && /usr/local/bin/composer install'

backend-set-config:
	-rm ../../source/drupal/var/settings.local.php
	cp ../../source/drupal/var/drupal-settings/settings.jenkins.php ../../source/drupal/var/drupal-settings/settings.local.php
	$(eval frontendversion :=$(find /app/docroot/version/* -maxdepth 0 -type d | sort -r | head -n 1 | cut -d "/" -f5))
	@echo ${frontendversion} 123
	#sed -i "s/\[DATABASE_SCHEMA\]/schema/g" ../../source/drupal/var/drupal-settings/settings.local.php
	#sed -i "s/\[DATABASE_USERNAME\]/username/g" ../../source/drupal/var/drupal-settings/settings.local.php
	#sed -i "s/\[DATABASE_PASSWORD\]/lastname/g" ../../source/drupal/var/drupal-settings/settings.local.php
	#sed -i "s/\[DATABASE_HOSTNAME\]/hostname/g" ../../source/drupal/var/drupal-settings/settings.local.php
	#sed -i "s/\[FRONTEND_VERSION\]/${frontendversion}/g" ../../source/drupal/var/drupal-settings/settings.local.php

backend-teardown:
	docker-compose stop backend

sync-pre:
	echo "not needed";

sync-action:
	lftp

sync-commit:
	echo "not needed";

sync-post:
	rm -rf ${TMPDIR}

sync: sync-pre sync-action sync-commit


install-backend: composer-clean composer

frontend: frontend-container frontend-yarn frontend-placement

frontend-container:
	docker-compose build frontend

frontend-yarn:
	docker-compose run --rm -w /app/source/frontend frontend make all

frontend-placement:
	docker-compose run --rm frontend "mkdir" "-p" "/app/source/drupal/docroot/version"
	docker-compose run --rm frontend "mv" "/app/source/frontend/dist/version/*" "/app/source/drupal/docroot/version/"
