import { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller'
import AppointmentService from '../services/appointment.service'

const appointmentRouter = Router()
const controller = new AppointmentController(AppointmentService.getInstance())

appointmentRouter.post('/', controller.create)
appointmentRouter.get('/', controller.index)

export default appointmentRouter