import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//routes
import { auth } from './routes/index.js'
// import auth from './routes/auth.js'
import user from './routes/user.js'
import hospital from './routes/hospital.js'
import bloodBank from './routes/bloodBank.js'
import blood from './routes/blood.js'
import doner from './routes/doner.js'
import recipient from './routes/recipient.js'
import appointment from './routes/appointment.js'
import test from './routes/test.js'
import bloodStock from './routes/bloodStock.js'
import organization from './routes/organization.js'
import transfusion from './routes/transfusion.js'
import reaction from './routes/reaction.js'

// middlewares
import { AdminsOnly, AUTH, logger, notFound, errorHandler } from './middlewares/index.js'

const app = express()
const PORT = process.env.PORT || 5000
const api = process.env.API_URI // api/v1

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)

// routes 
app.use(`${api}/auth`, auth)
app.use(`${api}/users`, AUTH, AdminsOnly, user)
app.use(`${api}/hospitals`, AUTH, AdminsOnly, hospital)
app.use(`${api}/blood-banks`, AUTH, bloodBank)
app.use(`${api}/bloods`, AUTH, blood)
app.use(`${api}/doners`, AUTH, doner)
app.use(`${api}/recipients`, AUTH, recipient)
app.use(`${api}/appointments`, AUTH, appointment)
app.use(`${api}/tests`, AUTH, test)
app.use(`${api}/blood-stocks`, AUTH, bloodStock)
app.use(`${api}/organizations`, AUTH, organization)
app.use(`${api}/transfusions`, AUTH, transfusion)
app.use(`${api}/reactions`, AUTH, reaction)


// middilewares
app.use(notFound)
app.use(errorHandler)

//run server
const main = async () => {
   const connectionEstablished = await mongoose.connect(process.env.MONGO_URI)

   if (!connectionEstablished) {
      return console.log("Couldn't connected to db ..")
   }

   console.log('connected to database ...')
   app.listen(PORT, async () => {
      console.log(`server is listening at http://localhost:${PORT}`)
   })
}


main()