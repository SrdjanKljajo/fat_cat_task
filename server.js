require('express-async-errors')
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const sequelize = require('./config/db')

const app = express()

// Import route files
const building = require('./routes/farmBuilding')
const unit = require('./routes/unit')

// MIDDLEWARES
// Not found middlevare
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
app.use('/api/v1/building', building)
app.use('/api/v1/unit', unit)

// Not found route
app.use(notFound)

// Custom database errors
app.use(errorDbHandler)

const server = async () => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
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
