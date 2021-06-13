module.exports = {
  elasticsearch: {
    config: { node: 'http://127.0.0.1:9200' },
    indexPrefix: 'dat_app_'
  },
  database: {
    name: 'cimple-app',
    username: 'root',
    password: 'root',

    config: {
      dialect: 'mysql',
      logging: true
    }
  }
}