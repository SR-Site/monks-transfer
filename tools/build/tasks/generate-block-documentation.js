module.exports = function( grunt )
{
	const fs = require( 'fs' );
	const path = require( 'path' );
	const upperCamelCase = require( 'uppercamelcase' );
	const typhen = require( 'typhen' );
	const inspect = require( 'object-inspect' );
	const jsonfile = require( 'jsonfile' );

	grunt.registerMultiTask(
		'generate-block-documentation',
		'Generate documentation for the blocks in the Blocks.ts file',
		function()
		{
			const done = this.async();
			const blockDir = grunt.config( 'generate-block-documentation.options.input' );
			const blocks = getDirectories( blockDir );

			var output = {blocks: []};

			blocks.forEach( function( block, index )
			{
				var blockId = upperCamelCase( block );
				var blockOptionsPath = blockDir + '/' + block + '/I' + blockId + 'Options.ts';
				var parsedResult = typhen.parse( blockOptionsPath );
				var properties = parsedResult.types[0].properties;
				var propertyResult = [];

				if( !Array.isArray( properties ) )
				{
					return;
				}

				console.log( 'Parse block data for:', blockId );

				properties.forEach( function( property )
				{

					propertyResult.push( {
						name: property.rawName,
						type: getType( property.type ),
						required: property.isOptional,
						description: getDescription( property.docComment )
					} );
				} );

				output.blocks.push( {
					blockId: blockId,
					properties: propertyResult
				} );
			} );


			console.log( 'Writing data.json file' );

			jsonfile.writeFileSync( grunt.config( 'generate-block-documentation.options.output' ) + 'data.json', output, {spaces: 4} )

			done();


			// // Loop through files
			// this.files.forEach( function( f )
			// {
			// 	var filePath = f.src[0];
			// 	var fileName = getFileName( filePath );
			//
			// 	// Read original data
			// 	var fileContent = grunt.file.read( filePath );
			//
			// 	// Create new file content
			// 	fileContent = fileName + '("' + encodeURIComponent( fileContent ) + '");';
			//
			// 	// Log progress
			// 	grunt.log.writeln( 'Generating "' + f.dest + '"' );
			//
			// 	// Create new *.XMLP file
			// 	grunt.file.write( f.dest, fileContent );
			// } );
		}
	);

	/**
	 * @method getDescription
	 * @description Fetch the description from the docCommeent array
	 * @param docComment
	 */
	function getDescription( docComment )
	{
		const descriptionPrefix = '@description ';
		var description = '';

		if( Array.isArray( docComment ) )
		{
			docComment.forEach( function( comment )
			{
				if( comment.indexOf( descriptionPrefix ) > -1 )
				{

					description = comment.replace( descriptionPrefix, '' );
				}
			} )
		}

		return description;
	}

	/**
	 * @method getType
	 * @param type
	 * @description Get type from the type object
	 */
	function getType( PrimitiveType )
	{
		return PrimitiveType.rawName;
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

	// function getFileName( path )
	// {
	// 	return path.split( '/' ).pop().split( '.' )[0];
	// }
};