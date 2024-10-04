module.exports = function readGrunt(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webdriver: {
      'test-sauce-parallel':

    { configFile: './src/config/wdio.parallel.sauce.conf.ts' },

      'test-browserstack':

    { configFile: './src/config/wdio.browserstack.conf.ts' },
      'test-local':

    { configFile: './src/config/wdio.shared.conf.ts' }
      ,
    },
  });

  grunt.loadNpmTasks('grunt-cucumberjs');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.registerTask('default', ['webdriver:test-sauce-parallel']);
};
