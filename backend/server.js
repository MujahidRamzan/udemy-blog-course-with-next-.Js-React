const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

//bring routes//

const blogRoutes = require('./routes/blog')

const authroutes =require('./routes/auth')


///app

const app = express()

/// db
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
//middlewares

app.use(morgan('dev'))

app.use(bodyParser.json())

// cors
if (process.env.NODE_ENV === 'development') {


    app.use(cors(
        {
           origin: `${process.env.CLIENT_URL}`
        }
    ));
}

// routes middleware

app.use('/api',blogRoutes);
app.use('/api', authroutes);



/// Port

const port = process.env.PORT || 8000


app.listen(port, () => {

    console.log(`Server is running on port ${port}`)
})
