module.exports = function( grunt )
{
	const fs = require( 'fs' );
	const path = require( 'path' );
	const upperCamelCase = require( 'uppercamelcase' );
	const typhen = require( 'typhen' );
	const inspect = require( 'object-inspect' );
	const jsonfile = require( 'jsonfile' );

	var blockDir = grunt.config( 'generate-block-documentation.options.input' );
	var output = {blocks: [], references: []};

	grunt.registerMultiTask(
		'generate-block-documentation',
		'Generate documentation for the blocks in the Blocks.ts file',
		function()
		{
			const done = this.async();
			const blocks = getDirectories( blockDir );

			// Loop through all the blocks
			blocks.forEach( function( block, index )
			{
				console.log( 'Parse block data for:', block );

				output.blocks.push( {
					blockId: upperCamelCase( block ),
					properties: parseBlock( block )
				} );
			} );


			console.log( 'Writing data.json file' );

			// All done, write the json file
			jsonfile.writeFileSync( grunt.config( 'generate-block-documentation.options.output' ) + 'data.json', output, {spaces: 4} );

			done();
		}
	);

	/**
	 * @method parseBlock
	 * @param block
	 * @returns parsedBlock
	 */
	function parseBlock( block )
	{
		// parse the folder name to pascal case
		const blockId = upperCamelCase( block );

		// Build the path to the options
		const blockOptionsPath = blockDir + '/' + block + '/I' + blockId + 'Options.ts';

		// Parse the options file with typhen to get all the properties
		const typhenResult = typhen.parse( blockOptionsPath ).types[0];
		const properties = typhenResult.properties || typhenResult.type.properties;

		// Keep track of the parsed properties
		var parsedProperties = [];

		// Parse all the properties
		properties.forEach( function( property )
		{
			parsedProperties.push( parseProperties( property ) );
		} );

		// Return the parsed properties
		return parsedProperties;
	}

	/**
	 * @property
	 * @description Parse the properties and return the new parsed object
	 */
	function parseProperties( property )
	{
		return {
			name: property.rawName,
			type: getType( property.type ),
			required: !property.isOptional,
			description: getDocComment( property.docComment, '@description' )
		}
	}


	/**
	 * @method getDocComment
	 * @description Fetch a desired doc comment based on the @property
	 * @param docComment
	 * @param property
	 */
	function getDocComment( docComment, property )
	{
		if( Array.isArray( docComment ) )
		{
			for( var i = 0; i < docComment.length; i++ )
			{
				if( docComment[i].indexOf( property ) > -1 )
				{
					return docComment[i].replace( property + ' ', '' );
				}

			}
		}

		// No match was found
		return '';
	}

	/**
	 * @method getType
	 * @param PrimitiveType
	 * @description Get type from the type object
	 */
	function getType( PrimitiveType )
	{
		if( PrimitiveType.properties && PrimitiveType.rawName.indexOf( 'I' ) === 0 )
		{
			parseReference( PrimitiveType.rawName, PrimitiveType.properties );
		}

		return PrimitiveType.rawName;
	}

	/**
	 * @method hasReference
	 * @param name
	 * @returns {boolean}
	 */
	function hasReference( name )
	{
		for( var i = 0; i < output.references.length; i++ )
		{
			if( output.references[i].name === name )
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @method parseReference
	 * @param properties
	 */
	function parseReference( name, properties )
	{
		if( !hasReference( name ) && Array.isArray( properties ) )
		{
			// Keep track of the parsed properties
			var parsedProperties = [];

			// Parse all the properties
			properties.forEach( function( property )
			{
				parsedProperties.push( parseProperties( property ) );
			} );

			output.references.push( {
				name: name,
				properties: parsedProperties.reverse()
			} );
		}
	}

	/**
	 * @method getDirectories
	 * @description Get all the folders within a desired folder
	 * @param srcpath
	 */
	function getDirectories( srcpath )
	{
		return fs.readdirSync( srcpath ).filter( function( file )
		{
			return fs.statSync( path.join( srcpath, file ) ).isDirectory();
		} );
	}
};