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

/*

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
    
type: 'mongodb',
    conn: {
      str: 'mongodb://127.0.0.1:27017/test'
    }

 */