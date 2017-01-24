module.exports = function( grunt )
{
	const fs = require( 'fs' );
	const path = require( 'path' );
	const upperCamelCase = require( 'uppercamelcase' );
	const typhen = require( 'typhen' );
	const inspect = require( 'object-inspect' );
	const jsonfile = require( 'jsonfile' );

	var blockDir = grunt.config( 'generate-block-documentation.options.input' );
	var output = {blocks: [], references: [], enums: []};

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
					properties: parseBlock( block ).reverse()
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
			parseObjectReference( PrimitiveType.rawName, PrimitiveType.properties );
		}
		else if( PrimitiveType.members )
		{
			parseEnumReference( PrimitiveType.rawName, PrimitiveType.members );
		}

		return PrimitiveType.rawName;
	}

	/**
	 * @method hasReference
	 * @param name
	 * @returns {boolean}
	 */
	function hasReference( name, array )
	{
		return array.find( function( item )
		{
			return item.name === name
		} );
	}

	/**
	 * @method parseReference
	 * @param properties
	 */
	function parseObjectReference( name, properties )
	{
		if( !hasReference( name, output.references ) && Array.isArray( properties ) )
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
				properties: parsedProperties
			} );
		}
	}

	/**
	 * @method parseEnum
	 * @description Parse an enum reference
	 */
	function parseEnumReference( name, members )
	{
		if( !hasReference( name, output.enums ) && Array.isArray( members ) )
		{
			// Keep track of the parsed properties
			var parsedProperties = [];

			// Parse all the properties
			members.forEach( function( member )
			{
				parsedProperties.push( {
					name: member.rawName,
					value: member.value
				} );
			} );

			output.enums.push( {
				name: name,
				properties: parsedProperties
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