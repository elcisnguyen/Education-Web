const session = require('express-session')
const mySQLStore = require('express-mysql-session')(session)


const mysqlOpts = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_SCHEMA,
	connectionLimit: process.env.DB_CONNECTION_LIMIT
}


module.exports = (app) => {
	const sessionStore = new mySQLStore(mysqlOpts)
	app.set('trust proxy', 1)
	app.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: +process.env.COOKIE_MAX_AGE,
			secure: false
		}
	}))
}