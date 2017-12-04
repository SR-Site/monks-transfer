.PHONY: all documentation build

all: clean install build documentation

clean:
	-rm -rf node_modules
	-rm -rf dist/version/*

install:
	yarn

build:
	yarn build

documentation:
	cd src; generate-block-documentation
