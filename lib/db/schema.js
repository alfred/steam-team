'use strict';

module.exports = `drop database if exists steamTeam;
create schema steamTeam;
Use steamTeam;

DROP table if exists user_table;
CREATE TABLE user_table (
  steamId VARCHAR(25) NOT NULL,
  userName TEXT NOT NULL,
  dateJoined INT,
  PRIMARY KEY (steamId)
);

DROP table if exists game_table;
CREATE TABLE game_table (
    gameId INT NOT NULL,
    title TEXT NOT NULL,
    PRIMARY KEY (gameId)
);

DROP table if exists users_owned_games;
CREATE TABLE users_owned_games (
  steamId VARCHAR(25) NOT NULL,
  gameId INT NOT NULL,
  minutesPlayed INT NOT NULL,
  PRIMARY KEY (steamId, gameId),
  foreign key (steamId) REFERENCES user_table(steamId) ON UPDATE CASCADE ON DELETE CASCADE,
  foreign key (gameId) REFERENCES game_table(gameId) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP table if exists achievement;
CREATE TABLE achievement (
    achievementId INT NOT NULL,
    achieved BOOL NOT NULL,
    nameAchievement TEXT,
    PRIMARY KEY (achievementId)
);

DROP table if exists achievements_by_user;
CREATE TABLE achievements_by_user (
    steamId VARCHAR(25) NOT NULL,
    achievementId INT NOT NULL,
    FOREIGN KEY (steamId) REFERENCES user_table(steamId) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (achievementId) REFERENCES achievement(achievementId) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS results;
CREATE TABLE results(
  resultId INT PRIMARY KEY AUTO_INCREMENT,
  query LONGTEXT NOT NULL,
  result LONGTEXT NOT NULL
);

`;
