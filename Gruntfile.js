module.exports = function(grunt) {

	//Load Tasks
	require('load-grunt-tasks')(grunt);
	require('load-grunt-config')(grunt, {
		data: {
			pkg: grunt.file.readJSON('package.json')
		}
	});

	//Default task
	grunt.registerTask('default', []);


	// Build and watch
	grunt.registerTask('bw', ['default', 'watch']);

	// Deployment
	grunt.registerTask('deploy', ['shell:deploy']);

};