import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { likesdislikes, likesdislikesId } from './likesdislikes';
import type { users, usersId } from './users';

export interface videosAttributes {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  uuid: string;
  tags?: string;
  views?: number;
  upload_date: Date;
  processing_status: "pending" | "processing" | "completed";
  file_url?: string;
  thumbnail_url?: string;
}

export type videosPk = "id";
export type videosId = videos[videosPk];
export type videosOptionalAttributes = "id" | "description" | "tags" | "views" | "upload_date" | "processing_status" | "file_url" | "thumbnail_url";
export type videosCreationAttributes = Optional<videosAttributes, videosOptionalAttributes>;

export class videos extends Model<videosAttributes, videosCreationAttributes> implements videosAttributes {
  id!: number;
  user_id!: number;
  title!: string;
  description?: string;
  uuid!: string; 
  tags?: string;
  views?: number;
  upload_date!: Date;
  processing_status!: "pending" | "processing" | "completed";
  file_url?: string;
  thumbnail_url?: string;

  // videos belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // videos hasMany comments via video_id
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
  // videos hasMany likesdislikes via video_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof videos {
    return videos.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uuid: {
      type: DataTypes.UUID,  
      allowNull: false,
      unique: true
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    processing_status: {
      type: DataTypes.ENUM("pending","processing","completed"),
      allowNull: false,
      defaultValue: "pending"
    },
    file_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thumbnail_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'videos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "videos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
