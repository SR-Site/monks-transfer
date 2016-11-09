module.exports = function(grunt, options)
{
	return {
		default: {
			destination: '<%=sourceDir%>inc/svg/icons.svg.css',
			options: {
				prefix: '.icon-', // used to prefix the name of the file for the CSS classname, .icon- is the default
				noencodepng: true // turn this to true if you want no datauris for pngs, just links out to png files
			},
			files: [{
				expand: true,
				cwd: '<%= base %>asset/svg/svgmin',
				src: ['*.svg']
			}]
		}
	};
};