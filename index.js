import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
// const port = process.env.PORT || 4000;

import defaultroutes from './routes/default_route.js'
import pages from './routes/pages.js'
import api from './routes/api.js'
import auth from './routes/authrequired.js'

import { logreq } from "./middlewares/log.js";

const app = express()
const port = 3000

//middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({extended:false}))
app.use(cookieParser());
app.use(logreq)



//routes
app.use('/', defaultroutes)
app.use('/pages',pages)
app.use('/api',api)
app.use('/auth',auth)

app.listen(port, () =>
  console.log(`Example app listening on port ${port}`)
)