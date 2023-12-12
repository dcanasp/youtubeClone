CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  profile_picture_url VARCHAR(255)
);

CREATE TYPE video_status AS ENUM('pending', 'processing', 'completed');
CREATE TABLE IF NOT EXISTS Videos (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags VARCHAR(255),
  views INT4 DEFAULT 0,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processing_status video_status NOT NULL DEFAULT 'pending',
  file_url VARCHAR(255),
  thumbnail_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Comments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(id),
  video_id INT NOT NULL REFERENCES Videos(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE like_dislike AS ENUM ('like', 'dislike');
CREATE TABLE IF NOT EXISTS LikesDislikes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(id),
  video_id INT NOT NULL REFERENCES Videos(id),
  type like_dislike NOT NULL,
  CHECK (type IN ('like', 'dislike'))
);

CREATE TABLE IF NOT EXISTS Subscriptions (
  id SERIAL PRIMARY KEY,
  subscriber_id INT NOT NULL REFERENCES Users(id),
  channel_id INT NOT NULL REFERENCES Users(id),
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
