const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
require('express-async-errors')


// App instance
const app = express()

// Print debug message to the console (only in development)
if (process.env.NODE_ENV !== 'production') {
	const morgan = require('morgan')
	app.use(morgan('dev'))
}

app.use(express.urlencoded({
	extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'default'
}))
app.set('view engine', 'hbs')

// require('./middlewares/session.mdw')(app)
// require('./middlewares/view.mdw')(app)
// require('./middlewares/locals.mdw')(app)
require('./middlewares/routes.mdw')(app)
require('./middlewares/error_handler.mdw')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))