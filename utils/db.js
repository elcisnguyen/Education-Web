const mysql = require('mysql2/promise')


const mysqlOpts = {
	host: process.env.DB_HOST_DEV,
	user: process.env.DB_USER_DEV,
	password: process.env.DB_PASSWORD_DEV,
	database: process.env.DB_SCHEMA_DEV,
	connectionLimit: process.env.DB_CONNECTION_LIMIT
}
const pool = mysql.createPool(mysqlOpts)

function query(sql, opts) { return pool.query(sql, opts) }


module.exports = { query }