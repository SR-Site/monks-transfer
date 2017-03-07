module.exports = function( grunt )
{
	const fs = require( 'fs' );
	const path = require( 'path' );
	const upperCamelCase = require( 'uppercamelcase' );
	const camelCase = require( 'camelcase' );
	const typhen = require( 'typhen' );
	const jsonfile = require( 'jsonfile' );

	var blockDir = getConfig( 'input' );
	var output = {blocks: [], references: [], enums: []};

	// All supported primary types
	const type = {
		'ARRAY': 'Array',
		'OBJECT': 'Object',
		'STRING': 'string',
		'NUMBER': 'number',
		'BOOLEAN': 'boolean'
	};

	grunt.registerMultiTask(
		'generate-block-documentation',
		'Generate documentation for the blocks in the Blocks.ts file',
		function()
		{
			const done = this.async();
			const blockDiretories = getDirectories( blockDir );

			// Loop through all the blocks
			blockDiretories.forEach( function( blockDirectory, index )
			{
				const blockId = blockDirectoryToBlockId( blockDirectory );
				const properties = parseBlock( blockDirectory ).reverse();

				console.log( '[' + Math.round( index / (blockDiretories.length - 1) * 100 ) + '%] Parsing block with id: ' + blockId );

				output.blocks.push( {
					blockId: blockId,
					properties: properties,
					example: JSON.stringify( {
						id: blockId,
						data: generateExampleJSON( properties, {} )
					}, null, 4 )
				} );
			} );

			console.log( '[Info] All blocks have been parsed, writing to file..' );

			// All done, write the json file
			jsonfile.writeFile(
				getConfig( 'output' ) + 'data.json',
				output,
				{
					spaces: 4
				},
				function()
				{
					console.log( '[Success] Writing to file is done!' );

					done();
				} );

		}
	);

	/**
	 * @method generateExampleJSON
	 * @description This method recursively generated mock data for the types
	 */
	function generateExampleJSON( properties, base )
	{
		properties.forEach( function( property )
		{
			var reference;

			if( hasReference( property.type, output.references ) )
			{
				reference = hasReference( property.type, output.references );

				// If we found a reference object, start generating the example JSON
				base[property.name] = generateExampleJSON( reference.properties, {} );
			}
			else if( hasReference( property.type, output.enums ) )
			{
				reference = hasReference( property.type, output.enums );

				// If we found a reference Enum, we always choose the first option as default
				base[property.name] = reference.properties[0].value;
			}
			else
			{
				switch( property.type )
				{
					case type.STRING:
					{
						base[property.name] = property.placeholder || getConfig( 'placeholderValues.string' );

						break;
					}
					case type.BOOLEAN:
					{
						base[property.name] = getConfig( 'placeholderValues.boolean' );

						break;
					}
					case type.NUMBER:
					{
						base[property.name] = getConfig( 'placeholderValues.number' );

						break;
					}
					case type.OBJECT:
					{
						base[property.name] = generateExampleJSON( property.properties, {} );

						break;
					}
					case type.ARRAY:
					{
						base[property.name] = [];
						base[property.name].push( generateExampleJSON( property.properties, {} ) );

						break;
					}
					default:
					{
						base[property.name] = 'TODO: ' + property.type;
					}
				}
			}
		} );


		return base;
	}

	/**
	 * @method parseBlock
	 * @param block
	 * @returns Array
	 */
	function parseBlock( blockDirectory )
	{
		// Get the file path
		const path = blockDirectoryToOptionsPath( blockDirectory );

		// Parse the options file with typhen to get all the properties
		const typhenResult = typhen.parse( path );

		// TODO: It kinda messes up when you reference to a interface in an array!
		const typenTypes = typhenResult.types[0];
		const properties = typenTypes.properties || typenTypes.type.properties;

		return parseProperties( properties );
	}

	/**
	 * @METHOD parseProperties
	 * @param properties
	 * @returns {Array}
	 */
	function parseProperties( properties )
	{
		if( !properties )
		{
			properties = []
		}

		// Keep track of the parsed properties
		var parsedProperties = [];

		// Parse all the properties
		properties.forEach( function( property, index )
		{
			// If the @ignore comment was added we will skip the property
			if( !getDocComment( property.docComment || [], '@ignore' ) )
			{
				parsedProperties.push( parseProperty( property ) );
			}
		} );

		// Return the parsed properties
		return parsedProperties;
	}

	/**
	 * @property
	 * @description Parse the properties and return the new parsed object
	 */
	function parseProperty( property )
	{
		var childProperties = null;

		if( property.type.rawName === 'Array' )
		{
			childProperties = property.type.type.properties;
		}
		else if( property.type.rawName === '' ) // If the rawName == '' the interface was an object, it's super werid!
		{
			childProperties = property.type.properties;
		}

		return {
			name: property.rawName,
			type: getType( property.type ),
			required: !property.isOptional,
			defaultValue: getDocComment( property.docComment, '@defaultValue' ) || 'null',
			description: getDocComment( property.docComment, '@description' ),
			placeholder: getDocComment( property.docComment, '@placeholder' ),
			properties: parseProperties( childProperties )
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
					return docComment[i].replace( property + ' ', '' ).toString();
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

		// No name means it's a custom Object
		if( PrimitiveType.rawName === '' )
		{
			return 'Object';
		}
		else
		{
			return PrimitiveType.rawName;
		}
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
				// If the @ignore comment was added we will skip the property
				if( !getDocComment( property.docComment || [], '@ignore' ) )
				{
					parsedProperties.push( parseProperty( property ) );
				}
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
	 * @param {string} name
	 * @param {Array} members
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
				// If the @ignore comment was added we will skip the property
				if( !getDocComment( member.docComment || [], '@ignore' ) )
				{
					parsedProperties.push( {
						name: member.rawName,
						value: member.value
					} );
				}
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
	 * @param {string} src
	 */
	function getDirectories( src )
	{
		return fs.readdirSync( src ).filter( function( file )
		{
			return fs.statSync( path.join( src, file ) ).isDirectory();
		} );
	}

	/**
	 * @method blockDirectoryToBlockId
	 * @param blockDirectory
	 * @description Parse the block directory name to the internally used block id's
	 * @returns {string}
	 */
	function blockDirectoryToBlockId( blockDirectory )
	{
		return camelCase( blockDirectory.split( '-' ).slice( 1 ).join( '-' ) );
	}

	/**
	 * @method blockDirectoryToOptionsPath
	 * @param blockDirectory
	 * @returns {string}
	 */
	function blockDirectoryToOptionsPath( blockDirectory )
	{
		return blockDir + '/' + blockDirectory + '/I' + upperCamelCase( blockDirectory ) + 'Options.ts';
	}

	/**
	 * @method getConfig
	 * @description Small wrapper around the config getter
	 * @param key
	 */
	function getConfig( key )
	{
		return grunt.config( 'generate-block-documentation.options.' + key )
	}
};