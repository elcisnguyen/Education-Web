const db = require('../utils/db')


module.exports = {
	async verify(username) {
		await db.query(`
			update general_credential set secret_key = 'OK' where username = '${username}'
		`)
	},

	async singleByUsername(username) {
		const [rows] = await db.query(`
			select * 
			from general_credential
			where username = '${username}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async singleByEmail(email) {
		const [rows] = await db.query(`
			select * 
			from general_credential
			where email = '${email}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async add(user) {
		const [rows] = await db.query(`
			insert into general_credential(username, permission, password_hash, fullname, email, secret_key)
			values ('${user.username}', 'STUDENT', '${user.password_hash}', '${user.fullname}', '${user.email}', '${user.secret_key}')
		`)
		return rows
	},

	async update(username, newUser) {
		if (newUser.password) await db.query(`
			update general_credential set fullname='${newUser.fullname}', email='${newUser.email}', password_hash='${newUser.password}' where username='${username}'
		`)
		else await db.query(`
			update general_credential set fullname='${newUser.fullname}', email='${newUser.email}' where username='${username}'
		`)
	},

	async wishlist(username) {
		const [rows] = await db.query(`
			select *
			from student_wishlist
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return rows
	},

	async purchaseList(username) {
		const [rows] = await db.query(`
			select *
			from student_course
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return rows
	},

	async rateList(username) {
		const [rows] = await db.query(`
			select *
			from student_feedback
			where student_id = '${username}'
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageWishlist(username, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub
					from student_wishlist w, course c, category cat, general_credential g
					where w.student = '${username}' and w.course_id = c.id and c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageWishlist(username) {
		const [rows] = await db.query(`
			select count(*) as length
			from student_wishlist
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async numPageCourseStudent(username) {
		const [rows] = await db.query(`
			select count(*) as length
			from student_course
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async numPageCourseTeacher(username) {
		const [rows] = await db.query(`
			select count(*) as length
			from course
			where teacher_id = '${username}'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async pageCoursesStudent(username, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.status, c.ava_link, c.small_description, c.total_sub
					from student_course sc, course c, category cat, general_credential g
					where sc.student = '${username}' and sc.course_id = c.id and c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageCoursesTeacher(username, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub
					from course c, category cat, general_credential g
					where c.teacher_id = '${username}' and c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit 2${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageStudent() {
		const [rows] = await db.query(`
			select count(*) as length
			from general_credential
			where permission = 'STUDENT'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async pageStudent(pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from general_credential g
			where g.permission = 'STUDENT'
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageTeacher() {
		const [rows] = await db.query(`
			select count(*) as length
			from general_credential
			where permission = 'TEACHER'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async pageTeacher(pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from general_credential g
			where g.permission = 'TEACHER'
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async block(username) {
		await db.query(`update general_credential set disabled = 1 where username = '${username}'`)
	},

	async unblock(username) {
		await db.query(`update general_credential set disabled = 0 where username = '${username}'`)
	}
}