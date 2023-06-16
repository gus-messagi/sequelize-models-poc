import SequelizeConnection from "./connection";
import Address from "./models/address.model";
import Appointment from "./models/appointment.model";
import Patient from "./models/patient.model";
import Person from "./models/person.model";

const sequelize = SequelizeConnection.getInstance()

Patient.initModel(sequelize)
Appointment.initModel(sequelize)
Person.initModel(sequelize)
Address.initModel(sequelize)

Patient.associateModel()
Appointment.associateModel()
Person.associateModel()
Address.associateModel()

const db = {
  sequelize,
  Patient,
  Appointment
}

export default db