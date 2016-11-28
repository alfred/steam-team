drop database if exists steamTeam;
create schema steamTeam;
Use steamTeam;

DROP table if exists user_table;
CREATE TABLE user_table (
  `userId` INT NOT NULL,
  `userName` TEXT NOT NULL,
  `dateJoined` DATE,
  PRIMARY KEY (`userId`)
);
 
DROP table if exists game_table;
CREATE TABLE game_table (
    `gameId` INT NOT NULL,
    `title` TEXT NOT NULL,
    `dateReleased` DATE NOT NULL,
    PRIMARY KEY (`gameId`)
);

DROP table if exists users_owned_games;
CREATE TABLE users_owned_games (
  `userId` INT NOT NULL,
  `gameId` INT NOT NULL,
  `hoursPlayed` INT NOT NULL,
  PRIMARY KEY (`userId`, `gameId`),
  foreign key (`userId`) REFERENCES user_table(`userId`) ON UPDATE CASCADE ON DELETE CASCADE,
  foreign key (`gameId`) REFERENCES game_table(`gameId`) ON UPDATE CASCADE ON DELETE CASCADE
);
  
DROP table if exists achievement;
CREATE TABLE achievement (
    `achievementId` INT NOT NULL,
    `achieved` BOOL NOT NULL,
    `nameAchievement` TEXT,
    PRIMARY KEY (`achievementId`)
);

DROP table if exists achievements_by_user;
CREATE TABLE achievements_by_user (
    `userId` INT NOT NULL,
    `achievementId` INT NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES user_table(`userId`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (`achievementId`) REFERENCES achievement(`achievementId`) ON UPDATE CASCADE ON DELETE CASCADE
);
