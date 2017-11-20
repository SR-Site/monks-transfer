.PHONY: all
PROJECT?=no_projectname_set

all: clean generate-block-documentation

clean:
	-rm -rf ../../source/frontend/documentation/*

build-containers:
	docker-compose build

generate-block-documentation:
	docker-compose run --rm  -w /app/source/frontend/src frontend generate-block-documentation

frontend-install:
	docker-compose run --rm  -w /app/source/frontend frontend yarn

frontend-build:
	docker-compose run --rm  -w /app/source/frontend frontend yarn build
