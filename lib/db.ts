import mysql from 'mysql2/promise';

const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nutriteg_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Tambahkan opsi SSL jika menggunakan database cloud seperti TiDB/Aiven
  ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true' 
    ? { rejectUnauthorized: true } 
    : undefined
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
