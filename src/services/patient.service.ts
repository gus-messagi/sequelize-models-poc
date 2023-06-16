import Patient from "../database/models/patient.model"
import PersonService from "./person.service"
import crypto from 'crypto'

export interface IPatient {
  name: string
  email: string
  birthDate: Date
}

export default class PatientService {
  private static instance: PatientService

  constructor(
    private personService: PersonService
  ) {}

  static getInstance() {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService(PersonService.getInstance())
    }

    return PatientService.instance
  }

  findOrCreate = async (patientRequest: IPatient) => {
    const person = await this.personService.find(patientRequest)
    const [patient] = await Patient.findOrCreate({ 
      where: {
        personId: person.id
      }, 
      defaults: { 
        id: crypto.randomUUID(), 
        personId: person.id 
      }
    })

    return patient
  }
}