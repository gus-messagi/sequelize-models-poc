import Person from "../database/models/person.model"
import crypto from 'crypto'

export interface IPerson {
  name: string
  email: string
  birthDate: Date
}

export default class PersonService {
  private static instance: PersonService

  constructor() {}

  static getInstance() {
    if (!PersonService.instance) {
      PersonService.instance = new PersonService()
    }

    return PersonService.instance
  }

  find = async (personRequest: IPerson) => {
    const personFound = await Person.findOne({ where: { email: personRequest.email }})

    if (!personFound) {
      return await Person.create({ 
        id: crypto.randomUUID(),
        ...personRequest
      })
    }

    personFound.set('name', personRequest.name)
    personFound.set('birthDate', personRequest.birthDate)
    personFound.set('email', personRequest.email)

    return await personFound.save()
  }
}