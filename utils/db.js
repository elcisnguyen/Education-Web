const mysql = require('mysql2/promise')


const mysqlOpts = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_SCHEMA,
	connectionLimit: process.env.DB_CONNECTION_LIMIT
}
const pool = mysql.createPool(mysqlOpts)


module.exports = {
	load(columns, schema, condition) {
		let sql

		if (condition) sql = `select ${columns} from ${schema} where ?`
		else sql = `select ${columns} from ${schema}`

		return pool.query(sql, condition)
	},

	loadLimit(columns, schema, condition, limit, offset) {
		let sql

		if (condition) sql = `select ${columns} from ${schema} where ? limit ${limit} offset ${offset}`
		else sql = `select ${columns} from ${schema} limit ${limit} offset ${offset}`

		return pool.query(sql, condition)
	},

	insert(schema, entity) {
		const sql = `insert into ${schema} set ?`
		return pool.query(sql, entity)
	},

	delete(schema, condition) {
		const sql = `delete from ${schema} where ?`
		return pool.query(sql, condition)
	},

	update(schema, new_data, condition) {
		const sql = `update ${schema} set ? where ?`
		return pool.query(sql, [new_data, condition])
	}
}