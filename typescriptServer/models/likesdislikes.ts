import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';
import type { videos, videosId } from './videos';

export interface likesdislikesAttributes {
  id: number;
  user_id: number;
  video_id: number;
  type: "like" | "dislike";
}

export type likesdislikesPk = "id";
export type likesdislikesId = likesdislikes[likesdislikesPk];
export type likesdislikesOptionalAttributes = "id";
export type likesdislikesCreationAttributes = Optional<likesdislikesAttributes, likesdislikesOptionalAttributes>;

export class likesdislikes extends Model<likesdislikesAttributes, likesdislikesCreationAttributes> implements likesdislikesAttributes {
  id!: number;
  user_id!: number;
  video_id!: number;
  type!: "like" | "dislike";

  // likesdislikes belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // likesdislikes belongsTo videos via video_id
  video!: videos;
  getVideo!: Sequelize.BelongsToGetAssociationMixin<videos>;
  setVideo!: Sequelize.BelongsToSetAssociationMixin<videos, videosId>;
  createVideo!: Sequelize.BelongsToCreateAssociationMixin<videos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof likesdislikes {
    return likesdislikes.init({
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
    type: {
      type: DataTypes.ENUM("like","dislike"),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'likesdislikes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "likesdislikes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
