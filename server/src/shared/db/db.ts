import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'indracit',
  password: 'indracit',
  database: 'exam_portal',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');
    connection.release();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }}


export async function query(sql: string, params : any[] = []) {
    try {
          const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        throw error;
    }

}

