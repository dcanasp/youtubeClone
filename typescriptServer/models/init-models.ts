import type { Sequelize } from "sequelize";
import { comments as _comments } from "./comments";
import type { commentsAttributes, commentsCreationAttributes } from "./comments";
import { likesdislikes as _likesdislikes } from "./likesdislikes";
import type { likesdislikesAttributes, likesdislikesCreationAttributes } from "./likesdislikes";
import { subscriptions as _subscriptions } from "./subscriptions";
import type { subscriptionsAttributes, subscriptionsCreationAttributes } from "./subscriptions";
import { test as _test } from "./test";
import type { testAttributes, testCreationAttributes } from "./test";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";
import { videos as _videos } from "./videos";
import type { videosAttributes, videosCreationAttributes } from "./videos";

export {
  _comments as comments,
  _likesdislikes as likesdislikes,
  _subscriptions as subscriptions,
  _test as test,
  _users as users,
  _videos as videos,
};

export type {
  commentsAttributes,
  commentsCreationAttributes,
  likesdislikesAttributes,
  likesdislikesCreationAttributes,
  subscriptionsAttributes,
  subscriptionsCreationAttributes,
  testAttributes,
  testCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  videosAttributes,
  videosCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const comments = _comments.initModel(sequelize);
  const likesdislikes = _likesdislikes.initModel(sequelize);
  const subscriptions = _subscriptions.initModel(sequelize);
  const test = _test.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const videos = _videos.initModel(sequelize);

  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  likesdislikes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(likesdislikes, { as: "likesdislikes", foreignKey: "user_id"});
  subscriptions.belongsTo(users, { as: "channel", foreignKey: "channel_id"});
  users.hasMany(subscriptions, { as: "subscriptions", foreignKey: "channel_id"});
  subscriptions.belongsTo(users, { as: "subscriber", foreignKey: "subscriber_id"});
  users.hasMany(subscriptions, { as: "subscriber_subscriptions", foreignKey: "subscriber_id"});
  videos.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(videos, { as: "videos", foreignKey: "user_id"});
  comments.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(comments, { as: "comments", foreignKey: "video_id"});
  likesdislikes.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(likesdislikes, { as: "likesdislikes", foreignKey: "video_id"});

  return {
    comments: comments,
    likesdislikes: likesdislikes,
    subscriptions: subscriptions,
    test: test,
    users: users,
    videos: videos,
  };
}
