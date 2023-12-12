'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('videos', [
      {
        user_id: 2, // Assuming this user ID exists in your 'users' table
        title: 'First Video',
        description: 'Description of the first video',
        tags: 'tag1, tag2',
        views: 100,
        upload_date: new Date(),
        processing_status: 'completed',
        file_url: 'http://example.com/video1.mp4',
        thumbnail_url: 'http://example.com/thumbnail1.jpg'
      },
      {
        user_id: 1, // Assuming this user ID exists in your 'users' table
        title: 'Second Video',
        description: 'Description of the second video',
        tags: 'tag3, tag4',
        views: 150,
        upload_date: new Date(),
        processing_status: 'completed',
        file_url: 'http://example.com/video2.mp4',
        thumbnail_url: 'http://example.com/thumbnail2.jpg'
      },
      {
        user_id: 1, // Assuming this user ID exists in your 'users' table
        title: 'third video',
        description: 'Description of the second video',
        tags: 'tag3, tag4',
        views: 150,
        upload_date: new Date(),
        processing_status: 'completed',
        file_url: 'http://example.com/video2.mp4',
        thumbnail_url: 'http://example.com/thumbnail2.jpg'
      }
      // Add more video entries as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('videos', null, {});
  }
};
