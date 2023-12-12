import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';
import type { videos, videosId } from './videos';

export interface commentsAttributes {
  id: number;
  user_id: number;
  video_id: number;
  content: string;
  created_at: Date;
}

export type commentsPk = "id";
export type commentsId = comments[commentsPk];
export type commentsOptionalAttributes = "id" | "created_at";
export type commentsCreationAttributes = Optional<commentsAttributes, commentsOptionalAttributes>;

export class comments extends Model<commentsAttributes, commentsCreationAttributes> implements commentsAttributes {
  id!: number;
  user_id!: number;
  video_id!: number;
  content!: string;
  created_at!: Date;

  // comments belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // comments belongsTo videos via video_id
  video!: videos;
  getVideo!: Sequelize.BelongsToGetAssociationMixin<videos>;
  setVideo!: Sequelize.BelongsToSetAssociationMixin<videos, videosId>;
  createVideo!: Sequelize.BelongsToCreateAssociationMixin<videos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comments {
    return comments.init({
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
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'videos',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }    
  }, 
  {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "comments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
