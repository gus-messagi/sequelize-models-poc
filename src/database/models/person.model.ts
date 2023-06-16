import { DataTypes, Model, Sequelize } from "sequelize";
import { PersonAttributes } from "../attributes/person.attributes";
import Patient from "./patient.model";
import Address from "./address.model";

export default class Person extends Model implements PersonAttributes {
  public id!: string;

  public name!: string;
  public email!: string;
  public birthDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    Person.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
    }, {
      sequelize,
      underscored: true,
      tableName: 'person'
    })
  }

  public static associateModel(): void {
    Person.hasOne(Patient, {
      sourceKey: 'id',
      foreignKey: 'personId',
      as: 'patient'
    })

    Person.hasOne(Address, {
      sourceKey: 'id',
      foreignKey: 'personId',
      as: 'address'
    })
  }
}