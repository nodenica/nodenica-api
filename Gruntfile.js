module.exports = function(grunt) {
  grunt.initConfig({
    'loopback_auto': {
      'db': {
        options: {
          dataSource: 'db',
          app: './server/server',
          config: './server/model-config',
          method: 'autoupdate'
        }
      }
    }
  });
  // Load the plugin
  grunt.loadNpmTasks('grunt-loopback-auto');
  // register tasks
  grunt.registerTask('autoupdate', ['loopback_auto:db']);
  grunt.registerTask('default', ['autoupdate']);
};
