import express from 'express'
import SequelizeConnection from './database/connection'
import db from './database/init'
import appointmentRouter from './routes/appointment.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/appointment', appointmentRouter)

app.listen(3333, async () => {
  await SequelizeConnection.connect()

  db.sequelize.sync({
    force: true
  })

  console.log("Server running at 3333")
})

process.on('SIGINT', () => {
  SequelizeConnection.close()
  process.exit()
})