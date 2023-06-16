import { BelongsToGetAssociationMixin, DataTypes, Model, Sequelize } from "sequelize";
import { PatientAttributes } from "../attributes/patient.attributes";
import Appointment from "./appointment.model";
import Person from "./person.model";
import { PersonAttributes } from "../attributes/person.attributes";

export default class Patient extends Model implements PatientAttributes {
  public id!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getPerson!: BelongsToGetAssociationMixin<PersonAttributes>
  public readonly person!: PersonAttributes

  static initModel(sequelize: Sequelize): void {
    Patient.init({
      id: { 
        type: DataTypes.UUID,
        primaryKey: true
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'patient'
    })
  }

  public static associateModel(): void {
    Patient.hasMany(Appointment, {
      sourceKey: 'id',
      foreignKey: 'patientId',
      as: 'appointment'
    })

    Patient.belongsTo(Person, {
      targetKey: 'id',
      as: 'person'
    })
  }
}