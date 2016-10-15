module.exports = {
  queue: {
    type: 'mysql',
    conn: {
      connectionLimit: 100,
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'tracking',
      dateStrings: false,
      multipleStatements: true
    }
  },
  port: 80



};