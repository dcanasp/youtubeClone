'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscriptions', [
      {
        subscriber_id: 1, // Assuming this user ID exists in your 'users' table
        channel_id: 2, // Assuming this channel ID (also a user ID) exists
        subscribed_at: new Date()
      },
      {
        subscriber_id: 3, // Assuming this user ID exists in your 'users' table
        channel_id: 2, // Assuming this channel ID (also a user ID) exists
        subscribed_at: new Date()
      },
      // Add more subscription records as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscriptions', null, {});
  }
};
