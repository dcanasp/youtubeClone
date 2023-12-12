'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password', // Note: In a real-world scenario, store hashed passwords
        bio: 'Bio of user1',
        profile_picture_url: 'http://example.com/user1.jpg',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password', // Note: In a real-world scenario, store hashed passwords
        bio: 'Bio of user2',
        profile_picture_url: 'http://example.com/user2.jpg',
      },
      {
        username: 'user3',
        email: 'user3@example.com',
        password: 'password', // Note: In a real-world scenario, store hashed passwords
        bio: 'Bio of user3',
        profile_picture_url: 'http://example.com/user2.jpg',
      },
      // Add more users as needed
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
