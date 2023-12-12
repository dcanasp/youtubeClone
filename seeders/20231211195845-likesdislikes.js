'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('likesdislikes', [
      {
        user_id: 1, // Assuming this user ID exists in your 'users' table
        video_id: 1, // Assuming this video ID exists in your 'videos' table
        type: 'like'
      },
      {
        user_id: 2, // Assuming this user ID exists in your 'users' table
        video_id: 1, // Assuming this video ID exists in your 'videos' table
        type: 'dislike'
      },
      // Add more like/dislike records as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likesdislikes', null, {});
  }
};
