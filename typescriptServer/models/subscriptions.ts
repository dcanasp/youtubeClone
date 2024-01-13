import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface subscriptionsAttributes {
  id: number;
  subscriber_id: number;
  channel_id: number;
  subscribed_at: Date;
}

export type subscriptionsPk = "id";
export type subscriptionsId = subscriptions[subscriptionsPk];
export type subscriptionsOptionalAttributes = "id" | "subscribed_at";
export type subscriptionsCreationAttributes = Optional<subscriptionsAttributes, subscriptionsOptionalAttributes>;

export class subscriptions extends Model<subscriptionsAttributes, subscriptionsCreationAttributes> implements subscriptionsAttributes {
  id!: number;
  subscriber_id!: number;
  channel_id!: number;
  subscribed_at!: Date;

  // subscriptions belongsTo users via channel_id
  channel!: users;
  getChannel!: Sequelize.BelongsToGetAssociationMixin<users>;
  setChannel!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createChannel!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // subscriptions belongsTo users via subscriber_id
  subscriber!: users;
  getSubscriber!: Sequelize.BelongsToGetAssociationMixin<users>;
  setSubscriber!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createSubscriber!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof subscriptions {
    return subscriptions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subscriber_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    subscribed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'subscriptions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subscriptions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
