'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
      {
        user_id: 1, // Assuming this user ID exists in your 'users' table
        video_id: 1, // Assuming this video ID exists in your 'videos' table
        content: 'Great video, really enjoyed it!',
        created_at: new Date()
      },
      {
        user_id: 2, // Assuming this user ID exists in your 'users' table
        video_id: 1, // Assuming this video ID exists in your 'videos' table
        content: 'Interesting content, looking forward to more!',
        created_at: new Date()
      },
      // Add more comments as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
