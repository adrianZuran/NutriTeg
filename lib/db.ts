import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nutriteg_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool instead of a single connection
// This is much better for a web server
const pool = mysql.createPool(dbConfig);

// Keep the connection pool in a global variable across hot-reloads in development
let globalPool: mysql.Pool | undefined;

if (process.env.NODE_ENV !== 'production') {
  if (!global.mysqlPool) {
    global.mysqlPool = pool;
  }
  globalPool = global.mysqlPool;
} else {
  globalPool = pool;
}

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

export default globalPool as mysql.Pool;
