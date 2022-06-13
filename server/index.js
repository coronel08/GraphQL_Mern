const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const schema = require('./schema/schema')
const connectDB = require('./config/db')
require('dotenv').config()


const app = express()
connectDB() // connects to dockerized DB, gets URL from procces.env
const port = process.env.PORT || 5000

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'dev'
}))


app.listen(port, console.log(`Server running on port ${port}`))

