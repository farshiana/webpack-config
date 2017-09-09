const del      = require('del');

module.exports = {
	// Clean dist
	clean: function(){
		return del(
			[
				'dist/*',
				'!dist/.htaccess', //don't clean htaccess
			]
		, {force: true});
	}
};

// Make runnable with npm
require('make-runnable');
