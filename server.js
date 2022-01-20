require('express-async-errors')
const express = require('express')
const sequelize = require('./config/db')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//Import route files
const test = require('./routes/test')

// MIDDLEWARES
//Not found middlevare
const notFound = require('./middlewares/not-found-route')

// Database errors middlevare
const errorDbHandler = require('./middlewares/error-db-handler')

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Enable CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// import routes
app.use('/api/v1/test', test)

// Not found route
app.use(notFound)

// Custom database errors
app.use(errorDbHandler)

const server = async () => {
  try {
    await sequelize.sync({ force: false })
    const port = process.env.PORT || 8000
    app.listen(port, () =>
      console.log(
        `Server runing on ${process.env.NODE_ENV} mode on port ${port}`
      )
    )
  } catch (error) {
    console.error(error)
  }
}

server()
