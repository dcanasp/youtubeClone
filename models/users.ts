import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { likesdislikes, likesdislikesId } from './likesdislikes';
import type { subscriptions, subscriptionsId } from './subscriptions';
import type { videos, videosId } from './videos';

export interface usersAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  bio?: string;
  profile_picture_url?: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "bio" | "profile_picture_url";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  bio?: string;
  profile_picture_url?: string;

  // users hasMany comments via user_id
  comments!: comments[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comments, commentsId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany likesdislikes via user_id
  likesdislikes!: likesdislikes[];
  getLikesdislikes!: Sequelize.HasManyGetAssociationsMixin<likesdislikes>;
  setLikesdislikes!: Sequelize.HasManySetAssociationsMixin<likesdislikes, likesdislikesId>;
  addLikesdislike!: Sequelize.HasManyAddAssociationMixin<likesdislikes, likesdislikesId>;
  addLikesdislikes!: Sequelize.HasManyAddAssociationsMixin<likesdislikes, likesdislikesId>;
  createLikesdislike!: Sequelize.HasManyCreateAssociationMixin<likesdislikes>;
  removeLikesdislike!: Sequelize.HasManyRemoveAssociationMixin<likesdislikes, likesdislikesId>;
  removeLikesdislikes!: Sequelize.HasManyRemoveAssociationsMixin<likesdislikes, likesdislikesId>;
  hasLikesdislike!: Sequelize.HasManyHasAssociationMixin<likesdislikes, likesdislikesId>;
  hasLikesdislikes!: Sequelize.HasManyHasAssociationsMixin<likesdislikes, likesdislikesId>;
  countLikesdislikes!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany subscriptions via channel_id
  subscriptions!: subscriptions[];
  getSubscriptions!: Sequelize.HasManyGetAssociationsMixin<subscriptions>;
  setSubscriptions!: Sequelize.HasManySetAssociationsMixin<subscriptions, subscriptionsId>;
  addSubscription!: Sequelize.HasManyAddAssociationMixin<subscriptions, subscriptionsId>;
  addSubscriptions!: Sequelize.HasManyAddAssociationsMixin<subscriptions, subscriptionsId>;
  createSubscription!: Sequelize.HasManyCreateAssociationMixin<subscriptions>;
  removeSubscription!: Sequelize.HasManyRemoveAssociationMixin<subscriptions, subscriptionsId>;
  removeSubscriptions!: Sequelize.HasManyRemoveAssociationsMixin<subscriptions, subscriptionsId>;
  hasSubscription!: Sequelize.HasManyHasAssociationMixin<subscriptions, subscriptionsId>;
  hasSubscriptions!: Sequelize.HasManyHasAssociationsMixin<subscriptions, subscriptionsId>;
  countSubscriptions!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany subscriptions via subscriber_id
  subscriber_subscriptions!: subscriptions[];
  getSubscriber_subscriptions!: Sequelize.HasManyGetAssociationsMixin<subscriptions>;
  setSubscriber_subscriptions!: Sequelize.HasManySetAssociationsMixin<subscriptions, subscriptionsId>;
  addSubscriber_subscription!: Sequelize.HasManyAddAssociationMixin<subscriptions, subscriptionsId>;
  addSubscriber_subscriptions!: Sequelize.HasManyAddAssociationsMixin<subscriptions, subscriptionsId>;
  createSubscriber_subscription!: Sequelize.HasManyCreateAssociationMixin<subscriptions>;
  removeSubscriber_subscription!: Sequelize.HasManyRemoveAssociationMixin<subscriptions, subscriptionsId>;
  removeSubscriber_subscriptions!: Sequelize.HasManyRemoveAssociationsMixin<subscriptions, subscriptionsId>;
  hasSubscriber_subscription!: Sequelize.HasManyHasAssociationMixin<subscriptions, subscriptionsId>;
  hasSubscriber_subscriptions!: Sequelize.HasManyHasAssociationsMixin<subscriptions, subscriptionsId>;
  countSubscriber_subscriptions!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany videos via user_id
  videos!: videos[];
  getVideos!: Sequelize.HasManyGetAssociationsMixin<videos>;
  setVideos!: Sequelize.HasManySetAssociationsMixin<videos, videosId>;
  addVideo!: Sequelize.HasManyAddAssociationMixin<videos, videosId>;
  addVideos!: Sequelize.HasManyAddAssociationsMixin<videos, videosId>;
  createVideo!: Sequelize.HasManyCreateAssociationMixin<videos>;
  removeVideo!: Sequelize.HasManyRemoveAssociationMixin<videos, videosId>;
  removeVideos!: Sequelize.HasManyRemoveAssociationsMixin<videos, videosId>;
  hasVideo!: Sequelize.HasManyHasAssociationMixin<videos, videosId>;
  hasVideos!: Sequelize.HasManyHasAssociationsMixin<videos, videosId>;
  countVideos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_username_key"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
