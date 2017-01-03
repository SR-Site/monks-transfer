npm install -g http-server
IF NOT EXIST swagger-editor.zip (
	Invoke-WebRequest https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip -OutFile swagger-editor.zip
)
IF NOT EXIST swagger-editor (
	unzip -source swagger-editor.zip -destination swagger-editor
fi
http-server swagger-editor &

