import { DataTypes, Model, Sequelize } from "sequelize";
import { AddressAttributes } from "../attributes/address.attributes";
import Person from "./person.model";

export default class Address extends Model implements AddressAttributes {
  public id!: string;

  public street!: string;
  public number!: number;
  public neighbourhood!: string;
  public zipCode!: string;
  public city!: string;
  public state!: string;
  public active!: boolean;

  static initModel(sequelize: Sequelize): void {
    Address.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      neighbourhood: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'address'
    })
  }

  public static associateModel(): void {
    Address.belongsTo(Person, {
      targetKey: 'id',
      as: 'person'
    })
  }
}