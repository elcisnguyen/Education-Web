const mysql = require('mysql2/promise')


const mysqlOpts = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_SCHEMA,
	connectionLimit: process.env.DB_CONNECTION_LIMIT,
}
const pool = mysql.createPool(mysqlOpts)

function query(sql, opts) { return pool.query(sql, opts) }


module.exports = { query }