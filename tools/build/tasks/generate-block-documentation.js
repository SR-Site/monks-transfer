module.exports = function( grunt )
{
	const fs = require( 'fs' );
	const path = require( 'path' );
	const upperCamelCase = require( 'uppercamelcase' );
	const camelCase = require( 'camelcase' );
	const snakeCase = require( 'snake-case' );
	const typhen = require( 'typhen' );
	const jsonfile = require( 'jsonfile' );
	const schemaParser = require( 'json-schema-ref-parser' );

	// Get the root of the block dir from the config file
	const blockDir = grunt.config( 'generate-block-documentation.options.input' );
	const tmpDir = grunt.config( 'generate-block-documentation.options.tmpFolder' );

	// Load the Typhen json schema plugin
	const jsonPlugin = typhen.loadPlugin( 'typhen-json-schema', {
		'baseUri': tmpDir,
		'enumType': 'string'
	} );

	// Setup the output object that will be written into the json file
	var output = {blocks: [], references: [], enums: []};
	var done;

	grunt.registerMultiTask(
		'generate-block-documentation',
		'Generate documentation for the blocks in the Blocks.ts file',
		function()
		{
			done = this.async();

			const blockDirectories = getDirectories( blockDir );

			var promises = [];

			// Loop through all the blocks directories
			blockDirectories.forEach( function( blockDirectory, index )
			{
				const blockId = directoryNameToBlockId( blockDirectory );

				if( blockId == 'personaSelector' )
				{
					promises.push(
						getSchema( blockDirectory )
					);

					console.log( blockId );
				}

			} );

			Promise.all( promises )
				.then( writeFile )
				.catch( function( error )
				{
					console.log( error );
				} )
		}
	);

	/**
	 * @method writeFile
	 * @description Write the result into a json file so we can render out the options
	 */
	function writeFile()
	{
		console.log( 'Writing data.json file' );

		// All done, write the json file
		jsonfile.writeFileSync( grunt.config( 'generate-block-documentation.options.output' ) + 'data.json', output, {spaces: 4} );

		console.log( output );

		done();
	}

	/**
	 * @method getSchema
	 * @description Read the file and parse the interfaces with the json plugin
	 * @param {string} directoryName
	 * @returns {PromiseBluebird<U>|Thenable<U>}
	 */
	function getSchema( directoryName )
	{
		return typhen.run( {
			plugin: jsonPlugin,
			src: directoryNameToOptionsPath( directoryName ),
			dest: tmpDir
		} ).then( function()
		{
			parseSchema( directoryName )
		} )
	}

	/**
	 * @method parseSchema
	 * @description After the schema was fetched we want to parse parse all the references in the same file
	 */
	function parseSchema( directoryName )
	{
		var schema = getJsonFile( directoryNameToSchemaPath( directoryName ) );

		output.blocks.push( {
			blockId: directoryNameToBlockId( directoryName ),
			properties: parseProperties( schema.title, schema, [] )
		} );

		// console.log( jsonFile );
	}

	function getPropertyObject( name, data )
	{
		return {
			name: name,
			type: data.enum ? name : data.type,
			required: data.isRequired,
			defaultValue: '-',
			description: data.description,
			placeholder: '-',
			properties: []
		}
	}

	function parseProperties( name, data, base )
	{
		var properties = [];

		if( data.type === 'object' )
		{
			properties = Object.keys( data.properties ).map( function( key, index )
			{
				return {
					name: key,
					data: data.properties[key]
				}
			} );
		}
		else if( data.type === 'array' )
		{
			properties = [{
				name: name,
				data: data.items
			}];
		}

		// Parse the data for each property
		properties.forEach( function( property )
		{
			var propertyObject = getPropertyObject(
				property.name,
				Object.assign(
					property.data,
					{
						isRequired: data.required && data.required.indexOf( property.name ) > -1
					}
				) );

			// Store the enum reference
			if(data.enum) parseEnum(property.name, property.data.enum);

			base.push( propertyObject );

			// Check if the propertyData has more properties and restart the loop
			if( property.data.type == 'object' )
			{
				parseProperties( property.name, property.data, propertyObject.properties );
			}
			else if( property.data.type == 'array' )
			{
				parseProperties( property.name, property.data.items, propertyObject.properties );
			}
		} );

		return base;
	}

	function parseEnum(enumData)
	{
		const enumObject = {}
		output.enums.find()
	}

	/**
	 * @method directoryNameToOptionsPath
	 * @param directoryName
	 * @returns {string}
	 */

	function directoryNameToOptionsPath( directoryName )
	{
		return blockDir + '/' + directoryName + '/I' + upperCamelCase( directoryName ) + 'Options.ts';
	}

	/**
	 * @method directoryNameToSchemaPath
	 * @description parses the directoryName to the schama path
	 * @param directoryName
	 * @returns {string}
	 */
	function directoryNameToSchemaPath( directoryName )
	{
		const tmpFolderName = 'i_' + snakeCase( directoryName + 'Options' );

		return tmpDir + '/' + tmpFolderName + '/' + tmpFolderName + '.json';
	}

	/**
	 * @method directoryNameToBlockId
	 * @description It parses the name of the directory to the desired id of the block
	 * @param directoryName
	 * @returns {string}
	 */
	function directoryNameToBlockId( directoryName )
	{
		return camelCase( directoryName.split( '-' ).slice( 1 ).join( '-' ) );
	}

	/**
	 * @method getJsonFile
	 * @description reads a json file and returns the contents
	 * @param {string} path
	 * @returns any
	 */
	function getJsonFile( path )
	{
		return JSON.parse( fs.readFileSync( path, 'utf8' ) );
	}

	/**
	 * @method getDirectories
	 * @description Get all the folders within a desired folder
	 * @param {string} src
	 */
	function getDirectories( src )
	{
		return fs.readdirSync( src ).filter( function( file )
		{
			return fs.statSync( path.join( src, file ) ).isDirectory();
		} );
	}
};