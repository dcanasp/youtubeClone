import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface testAttributes {
  id: number;
  value?: string;
}

export type testPk = "id";
export type testId = test[testPk];
export type testOptionalAttributes = "id" | "value";
export type testCreationAttributes = Optional<testAttributes, testOptionalAttributes>;

export class test extends Model<testAttributes, testCreationAttributes> implements testAttributes {
  id!: number;
  value?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof test {
    return test.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "test_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
