import { Request, Response } from "express"
import AppointmentService from "../services/appointment.service"

export default class AppointmentController {
  constructor(private service: AppointmentService) {}

  create = async (req: Request, res: Response) => {
    const appointment = await this.service.create(req.body)

    return res.status(201).send(appointment)
  }

  index = async (_: Request, res: Response) => {
    const appointments = await this.service.findAll()

    return res.status(200).send(appointments)
  }
}