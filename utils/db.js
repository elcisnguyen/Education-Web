const mysql = require('mysql2')
const mysqlOpts = require('../config/default.json').mysql


const promisePool = mysql.createPool(mysqlOpts).promise()


module.exports = {
	load(columns, schema, condition) {
		let sql

		if (condition)
			sql = `select ${columns} from ${schema} where ?`
		else
			sql = `select ${columns} from ${schema}`

		return promisePool.execute(sql, condition)
	},

	insert(schema, entity) {
		const sql = `insert into ${schema} set ?`
		return promisePool.execute(sql, entity)
	},

	delete(schema, condition) {
		const sql = `delete from ${schema} where ?`
		return promisePool.execute(sql, condition)
	},

	update(schema, new_data, condition) {
		const sql = `update ${schema} set ? where ?`
		return promisePool.execute(sql, [new_data, condition])
	}
}