.PHONY: all backend frontend
PROJECT?=no_projectname_set
BUILDNUMBER?=0
TMPDIR="/tmp/${PROJECT}-${BUILDNUMBER}"
TARGETBRANCH?=develop
TARGETTAG?=test
FTPUSERNAME?=username
FTPPASSWORD?=password
FTPHOSTNAME?=hostname


all: clean create-container install-frontend install-backend sync

clean:
	docker-compose rm -f

backend: composer-clean composer

create-container:
	docker-compose up

composer:
	docker-compose run --rm -w /app --entrypoint composer backend "-n" install

composer-clean:
	-docker-compose run --rm --entrypoint rm backend "-rf" "/app/vendor"
	-docker-compose run --rm --entrypoint rm backend "-rf" "/app/docroot/core"

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
