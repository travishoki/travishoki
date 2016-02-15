/*
1) Install all dependant libraries:
npm install grunt;
npm install load-grunt-tasks --save-dev;
npm install grunt-contrib-sass --save-dev;
npm install grunt-contrib-watch --save-dev;
npm install grunt-contrib-connect --save-dev;

2) Run the compiler:
grunt watch

*/
module.exports = function(grunt) {

	//Load Tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Compile SASS to CSS
		sass: {
			dist: {
				files: {                         
					'../css/main.css': ['scss/main.scss']
				}
			}
		},

		//Live Reload
		watch: {
			src: {
		        files: [
		        	'../views/*.html',
		        	'../../index.html',
		        	'scss/*.scss'
		        ],
		        tasks: ['sass'],
		        options: {
		          livereload: true
				}
			}
		},

		//Create a dev server
	    connect: {
			server: {
				options: {
					port: 8000,
					base: '../../',
					livereload: true,
					open: true
				}
			}
	    }
	});

	//Default task
	grunt.registerTask('default', ['sass']);
	grunt.registerTask('server', ['connect', 'watch']);

};