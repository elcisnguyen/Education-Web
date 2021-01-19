const db = require('../utils/db')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')


module.exports = {
	async single(id) {
		const [rows] = await db.query(`
			select res2.*, count(s.student) as num_student
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.id as cat_id, cat.title as cat_title, g.fullname, g.email, c.price, c.final_price, c.discount, c.small_description, c.full_description, c.last_modified, c.ava_link
					from course c, category cat, general_credential g
					where c.id = '${id}' and c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as res2
			left join student_course s on res2.id = s.course_id
			group by id
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async singleByName(name, excludeID) {
		let rows

		if (excludeID) [rows] = await db.query(`
			select *
			from course
			where title = '${name}' and id != '${excludeID}'
		`)
		else [rows] = await db.query(`
			select *
			from course
			where title = '${name}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async editCourse(id, course) {
		await db.query(`
			update course set cat_id = '${course.cat_id}', title = '${course.title}', ava_link = '${course.ava_link}', price = ${course.price}, discount = ${course.discount}, small_description = '${course.small_description}', full_description = '${course.full_description}', status = '${course.status}' where id = '${id}'
		`)
	},

	async addCourse(course) {
		await db.query(`
			insert into course(id, cat_id, title, teacher_id, ava_link, price, discount, small_description, full_description, date_created, last_modified, status) 
			values('${uuidv4()}', '${course.cat_id}', '${course.title}', '${course.teacher_id}',  '${course.ava_link}', ${course.price}, ${course.discount}, '${course.small_description}', '${course.full_description}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${course.status}')
		`)
	},

	async addLesson(id, data) {
		await db.query(`
			insert into course_material(course_id, serial, title, vid_link) values('${id}', '${data.serial}', '${data.title}', '${data.vid_link}')
		`)
	},

	async numPageAll(opts) {
		let rows
		if (!opts) [rows] = await db.query(`
			select count(*) as length
			from course
		`)
		else [rows] = await db.query(`
			select count(*) as length
			from course
			where ?
		`, opts)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	},

	async pageAll(pageNum, opts) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		let rows

		if (opts) [rows] = await db.query(`
			 select *
			 from (
				 select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				 from (
					  select c.id, c.disabled, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub, c.date_created
					  from course c, category cat, general_credential g
					  where c.cat_id = cat.id and c.teacher_id = g.username
				 ) as res
				 left join student_feedback f on res.id = f.course_id
				 group by res.id, res.total_sub
			 ) as \`r.*rnr\`
			 where ?
			 limit ${+process.env.PAGINATE} offset ${offset}
		`, opts)
		else [rows] = await db.query(`
			 select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
			 from (
				  select c.id, c.disabled, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub, c.date_created
				  from course c, category cat, general_credential g
				  where c.cat_id = cat.id and c.teacher_id = g.username
			 ) as res
			 left join student_feedback f on res.id = f.course_id
			 group by res.id, res.total_sub
			 limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async block(id) {
		await db.query(`update course set disabled = 1 where id = '${id}'`)
	},

	async unblock(id) {
		await db.query(`update course set disabled = 0 where id = '${id}'`)
	},

	async syllabus(id) {
		const [rows] = await db.query(`
			select *
			from course_material
			where course_id = '${id}'
			order by serial
		`)
		if (rows.length === 0) return null
		return rows
	},

	async feedback(id) {
		const [rows] = await db.query(`
			select f.*, g.fullname
			from student_feedback f, general_credential g
			where f.course_id = '${id}' and f.student_id = g.username
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefHighlightsPastWeek() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				where yearweek(f.date_created) = yearweek(now())
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.BRIEF_HIGHLIGHTS_PAST_WEEK}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefHighlightsSameCat(id, cat_id) {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.id != '${id}' and c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.BRIEF_HIGHLIGHTS_SAME_CAT}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefMostViewed() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_view
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by total_view desc, rate desc
			limit ${+process.env.BRIEF_MOST_VIEWED}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefNewest() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.date_created
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by date_created desc, rate desc
			limit ${+process.env.BRIEF_NEWEST}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageByNameRateOrder(name, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.cat_id = cat.id and c.teacher_id = g.username and match(c.title) against('${name}*' in boolean mode)
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

	async pageByNamePriceOrder(name, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.cat_id = cat.id and c.teacher_id = g.username and match(c.title) against('${name}*' in boolean mode)
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by final_price asc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}	
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageByName(name) {
		const [rows] = await db.query(`
			select count(*) as length
			from course c
			where match(c.title) against('${name}*' in boolean mode)
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async pageByCatRateOrder(cat_id, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
			from(
				select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub, c.date_created
				from course c, category cat, general_credential g
				where c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
			) as res
			left join student_feedback f on res.id = f.course_id
			group by res.id, res.total_sub
			order by rate desc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageByCatPriceOrder(cat_id, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
			from(
				select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.date_created
				from course c, category cat, general_credential g
				where c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
			) as res
			left join student_feedback f on res.id = f.course_id
			group by res.id, res.final_price
			order by final_price asc, rate desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageByCat(cat_id) {
		const [rows] = await db.query(`
			select count(*) as length
			from course
			where cat_id = '${cat_id}'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	},

	async addView(id) {
		await db.query(`
			update course set total_view = total_view + 1 where id = '${id}'
		`)
	},

	async addSub(id) {
		await db.query(`
			update course set total_sub = total_sub + 1 where id = '${id}';
		`)
	},

	async removeFromWishlist(course_id, username) {
		await db.query(`
			delete from student_wishlist
			where student = '${username}' and course_id = '${course_id}'
		`)
	},

	async addToWishlist(student, course_id) {
		await db.query(`
			insert into student_wishlist(student, course_id) values('${student}', '${course_id}')
		`)
	},

	async purchase(student, course_id) {
		await db.query(`
			insert into student_course(student, course_id) values('${student}', '${course_id}');
		`)
	},

	async rate(student, course_id, data) {
		await db.query(`
			insert into student_feedback(student_id, course_id, rate, feedback, date_created) values('${student}', '${course_id}', ${data.rate}, '${data.feedback}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')
		`)
	}
}
