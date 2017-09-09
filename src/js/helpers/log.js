/*eslint no-console: 0*/

export default {
	environment: function() {
		console.log("Testing helper in environment " + ENV);
		return ENV;
	}
};
