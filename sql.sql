CREATE table propit.missions(
    missionId INT NOT NULL AUTO_INCREMENT,
    userId INT,
    name VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(200),
    detail VARCHAR(1000),
    date DATE,
    FOREIGN KEY (userId) REFERENCES propit.accounts(userId),
    PRIMARY KEY (missionId)
)
    DEFAULT CHARACTER SET utf8   
 COLLATE utf8_general_ci;


DROP TABLE propit.missions;
DROP TABLE propit.accounts;



CREATE TABLE IF NOT EXISTS propit.accounts (
userId INT NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  type varchar(10) NOT NULL,
  phone varchar(20) NOT NULL,
  PRIMARY KEY (userId)
)
    DEFAULT CHARACTER SET utf8   
 COLLATE utf8_general_ci;

INSERT INTO propit.accounts
VALUES
(null, "אביב", "123456", "אביב חכמון","avivhkn@gmail.com","admin","0584848488")