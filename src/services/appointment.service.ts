import Appointment from "../database/models/appointment.model";
import Patient from "../database/models/patient.model";
import Person from "../database/models/person.model";
import PatientService, { IPatient } from "./patient.service";
import crypto from 'crypto'

interface IAppointment {
  date: Date,
  patient: IPatient
}

export default class AppointmentService {
  private static instance: AppointmentService

  constructor(
    private patientService: PatientService
  ) {}

  static getInstance() {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService(PatientService.getInstance())
    }

    return AppointmentService.instance
  }

  create = async (appointmentRequest: IAppointment): Promise<Appointment> => {
    const patient = await this.patientService.findOrCreate(appointmentRequest.patient)
    const appointment = await Appointment.create({ 
      id: crypto.randomUUID(),
      date: appointmentRequest.date, 
      patientId: patient.id,
      status: 'Agendado'
    })

    return appointment
  }

  findAll = async (): Promise<Array<Appointment>> => {
    const appointments = await Appointment.findAll({ 
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [
            {
              model: Person,
              as: 'person'
            }
          ]
        }
      ]
    })

    return appointments
  }
}