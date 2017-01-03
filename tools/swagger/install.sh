#!/bin/bash

npm install -g http-server
if [ ! -e swagger-editor.zip]; then
	wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
fi
if [ ! -e swagger-editor ]; then
	unzip swagger-editor.zip
fi
http-server swagger-editor &
open http://127.0.0.1:8080/
