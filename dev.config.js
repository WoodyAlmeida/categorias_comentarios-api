module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    {
      name: 'API',
      script: 'dist/index.js',
      watch: true,
      ignore_watch: ["*.log", "node_modules", ".git/*", "src", "src/*", "uploads", "uploads/*"],
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'API PREPROCESSOR',
      script: '/usr/local/bin/gulp',
      watch: 'gulpfile.js',
      ignore_watch: ["dist/*"],
      env: {

      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ],
}


