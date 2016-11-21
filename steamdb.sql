Use steamTeam;

DROP table if exists userTable;

CREATE TABLE userTable (
  `userId` int NOT NULL,
  `userName` text NOT NULL,
  `dateJoined` date,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_unq` (`userId`)
);

DROP table if exists libraryTable;
CREATE TABLE libraryTable (
  `userId` int NOT NULL REFERENCES userTable.userId,
  `gameId` int NOT NULL REFERENCES gameTable.gameId,
  `hoursPlayed` int NOT NULL,
  PRIMARY KEY (`userId`, `gameId`)
);
 
DROP table if exists gameTable;
CREATE TABLE gameTable (
    `gameId` INT NOT NULL,
    `title` TEXT NOT NULL,
    `dateReleased` DATETIME NOT NULL,
    PRIMARY KEY (`gameId`)
);
  
DROP table if exists achievement;
CREATE TABLE achievement (
    `achievementId` INT NOT NULL,
    `achieved` BOOL NOT NULL,
    `nameAchievement` TEXT,
    PRIMARY KEY (`achievementId`)
);

DROP table if exists achievementsByUser;

CREATE TABLE achievementsByUser (
    `userId` INT NOT NULL,
    `achievementId` INT NOT NULL,
    FOREIGN KEY (`userId`)
        REFERENCES userTable (`userId`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `userToAchievement` FOREIGN KEY (`achievementId`)
        REFERENCES achievement (`achivementId`)
        ON UPDATE CASCADE ON DELETE CASCADE
);
