import { DataTypes, Model, Sequelize } from "sequelize";
import { AppointmentAttributes } from "../attributes/appointment.attributes";
import Patient from "./patient.model";

export default class Appointment extends Model implements AppointmentAttributes {
  public id!: string;

  public date!: Date;
  public status!: 'Agendado' | 'Cancelado';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    Appointment.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(...['Agendado', 'Cancelado']),
        allowNull: false
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'appointment'
    })
  }

  public static associateModel(): void {
    Appointment.belongsTo(Patient, {
      targetKey: 'id',
      as: 'patient'
    })
  }
}