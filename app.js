const express = require('express')
const exphbs = require('express-handlebars')
const exphbsSection = require('express-handlebars-sections')
const path = require('path')
require('express-async-errors')


// App instance
const app = express()

if (process.env.NODE_ENV !== 'production') {
	const morgan = require('morgan')
	app.use(morgan('dev'))

	require('dotenv').config()
}

app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'default',
	helpers: { section: exphbsSection() }
}))
app.set('view engine', 'hbs')

require('./middlewares/session.mdw')(app)
// require('./middlewares/locals.mdw')(app)
require('./middlewares/routes.mdw')(app)
require('./middlewares/error_handler.mdw')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))