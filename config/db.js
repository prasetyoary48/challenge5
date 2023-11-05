const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'blog',
    user: 'postgres',
    password: 'postgrepassword',
    max: 20,
    idleTimeoutMillis:30000,
    connectionTimeoutMillis:2000,
})

module.exports = pool;