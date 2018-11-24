-- Tables
-- Tables
CREATE TABLE CorkBoardItUser (
    user_id SERIAL PRIMARY KEY ,
    email VARCHAR(250) NOT NULL,
    pin NUMERIC(4) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
);

CREATE TABLE CorkBoard (
    corkboard_id SERIAL PRIMARY KEY,
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    email VARCHAR(250) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(250) NOT NULL,
    visibility BOOLEAN NOT NULL
);

CREATE TABLE PublicCorkBoard (
    public_corkboard_id SERIAL PRIMARY KEY,
    fk_corkboard_id INTEGER REFERENCES CorkBoard(corkboard_id)
);

CREATE TABLE PrivateCorkBoard (
    private_corkboard_id SERIAL PRIMARY KEY,
    fk_corkboard_id INTEGER REFERENCES CorkBoard(corkboard_id),
    password VARCHAR(250) NOT NULL
);

CREATE TABLE PushPin (
    pushpin_id SERIAL PRIMARY KEY,
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_corkboard_id INTEGER REFERENCES CorkBoard(corkboard_id),
    date_time TIMESTAMP NOT NULL,
    url VARCHAR(250) NOT NULL,
    description VARCHAR(200) NOT NULL
);

CREATE TABLE Tag (
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id),
    tag VARCHAR(20) NOT NULL
);

CREATE TABLE Comment (
    comment_id SERIAL PRIMARY KEY,
    date_time TIMESTAMP NOT NULL,
    text VARCHAR(250) NOT NULL,
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id)
);

CREATE TABLE Watch (
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_public_corkboard_id INTEGER REFERENCES PublicCorkBoard(public_corkboard_id),
    UNIQUE(fk_user_id, fk_public_corkboard_id)
);

CREATE TABLE Liked (
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id),
    UNIQUE(fk_user_id,fk_pushpin_id)
);

CREATE TABLE Follow (
    fk_user_follower_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_user_followee_id INTEGER REFERENCES CorkBoardItUser(user_id),
    UNIQUE(fk_user_follower_id, fk_user_followee_id)
);

INSERT INTO CorkBoardItUser (email, pin, first_name, last_name)
VALUES
    ('icylin@gg.com', 1234, 'Bing', 'Lin'), 
    ('ronpatel@gg.com', 1234, 'Rohan', 'Patel'),
    ('juliematchamer@gg.com', 1234, 'Julie', 'Matchamer'),
    ('dtsui@gg.com', 1234, 'David', 'Tsui'),
    ('bamthe25th@gg.com', 1234, 'Viole', 'Grace'),
    ('steve@gg.com', 1234, 'Steve', 'Watson'),
    ('dwoods@gg.com', 1234, 'Daniel', 'Woods'),
    ('sharma@gg.com', 1234, 'Chris', 'Sharma'),
    ('puccio@gg.com', 1234, 'Alex', 'Puccio');

INSERT INTO CorkBoard (fk_user_id, email, date_time, title, category, visibility)
VALUES
    (1, 'icyling@gg.com', '2018-06-22 19:10:25-07', 'GaTech', 'Education', true),
    (4, 'juliematchamer@gg.com', '2018-06-20 19:10:25-07', 'College Stuff', 'Education', true),
    (1, 'icyling@gg.com', '2018-06-21 19:10:25-07', 'Peeps', 'People', true),
    (2, 'ronpatel@gg.com', '2018-06-22 19:10:25-07', 'Cool Buildings', 'Architecture', false),
    (9, 'puccio@gg.com', '2018-06-20 19:10:25-07', 'I love Climbing', 'Sports', true),
    (8, 'sharma@gg.com', '2018-06-20 19:10:25-07', 'Good Drinks', 'Food & Drink', false),
    (7, 'sharma@gg.com', '2018-06-20 19:10:25-07', 'Cool Tech Stuff', 'Technology', true),
    (6, 'steve@gg.com', '2018-06-20 19:10:25-07', 'Places I want to go', 'Travel', false),
    (4, 'juliematchamer@gg.com', '2018-06-20 19:10:25-07', 'Cats', 'Pest', true),
    (5, 'bamthe25th@gg.com', '2018-06-20 19:10:25-07', 'Dogs', 'Pets', true);

INSERT INTO PublicCorkBoard(fk_corkboard_id)
VALUES 
    (1),
    (2),
    (4),
    (6),
    (7),
    (9),
    (10);

INSERT INTO PrivateCorkBoard(fk_corkboard_id, password)
VALUES
    (3, 'imsoop'),
    (5, 'imsoop'),
    (8, 'imsoop');

INSERT INTO PushPin (fk_user_id, fk_corkboard_id, date_time, url, description)
VALUES
    (1, 1, '2018-06-22 19:10:25-07', 'https://www.cc.gatech.edu/sites/default/files/images/mercury/oms-cs-web-rotator_2_0_3.jpeg', 'OMSCS program logo'),
    (1, 1, '2018-06-22 19:10:25-07', 'http://www.buzzcard.gatech.edu/sites/default/files/uploads/images/superblock_images/img_2171.jpg', 'student ID for Georgia Tech'),
    (4, 2, '2018-06-22 19:10:25-07', 'https://www.news.gatech.edu/sites/default/files/uploads/mercury_images/piazza-icon.png', 'logo for Piazza'),
    (4, 2, '2018-06-22 19:10:25-07', 'http://www.comm.gatech.edu/sites/default/files/images/brand-graphics/gt-seal.png', 'official seal of Georgia Tech'),
    (1, 3, '2018-06-22 19:10:25-07', 'http://www.me.gatech.edu/sites/default/files/styles/180_240/public/gpburdell.jpg', 'the struggle is real!'),
    (1, 3, '2018-06-21 19:10:25-07', 'https://www.cc.gatech.edu/projects/XMLApe/people/imgs/leo.jpg', 'Leo Mark, CS 6400 professor'),
    (1, 3, '2018-06-22 19:10:25-07', 'https://www.cc.gatech.edu/sites/default/files/images/27126038747_06d417015b_z.jpg', 'fearless leader of OMSCS'),
    (2, 4, '2018-06-22 19:10:25-07', 'http://daily.gatech.edu/sites/default/files/styles/1170_x_x/public/hgt-tower-crop.jpg', 'Tech Tower interior photo'),
    (2, 4, '2018-06-22 19:10:25-07', 'http://www.livinghistory.gatech.edu/s/1481/images/content_images/techtower1_636215523842964533.jpg', 'Tech Tower exterior photo'),
    (2, 4, '2018-06-22 19:10:25-07', 'https://www.ece.gatech.edu/sites/default/files/styles/1500_x_scale/public/images/mercury/kessler2.0442077-p16-49.jpg', 'Kessler Campanile at Georgia Tech'),
    (2, 4, '2018-06-22 19:10:25-07', 'https://www.scs.gatech.edu/sites/scs.gatech.edu/files/files/klaus-building.jpg', 'Klaus building'),
    (2, 4, '2018-06-22 19:10:25-07', 'https://www.news.gatech.edu/sites/default/files/styles/740_x_scale/public/uploads/mercury_images/Tech_Tower_WebFeature_1.jpg', 'Tech tower sign');



INSERT INTO Tag (fk_pushpin_id, tag)
VALUES
    (1, 'OMSCS'),
    (2, 'buzzcard'),
    (3, 'Piazza'),
    (4, 'Georgia tech seal'),
    (4, 'great seal'),
    (4, 'official'),
    (5, 'burdell'),
    (5, 'george p burdell'),
    (5, 'student'),
    (6, 'database faculty'),
    (6, 'computing'),
    (6, 'gtcomputing'),
    (7, 'zvi'),
    (7, 'dean'),
    (7, 'computer science'),
    (7, 'computing'),
    (7, 'gtcomputing'),
    (8, 'administration'),
    (8, 'facilities'),
    (9, 'administration'),
    (9, 'facilities'),
    (11, 'computing'),
    (11, 'student facilities'),
    (11, 'gtcomputing');



--INSERT INTO Comment (date_time, text, fk_user_id, fk_pushpin_id)
--VALUES
--    ('2018-06-22 19:10:25-07', 'this is so beautiful~', 2, 1),
--    ('2018-06-22 19:10:35-07', 'foo', 3, 1),
--    ('2018-06-22 19:10:05-07', 'bar', 2, 1),
--    ('2018-06-22 19:11:25-07', 'this is so ugly', 3, 2),
--    ('2018-06-22 19:12:25-07', 'this is alright', 4, 2),
--    ('2018-06-22 19:14:25-07', 'rachel is the best', 4, 3),
--    ('2018-06-22 19:18:25-07', 'catherine is the best', 4, 3),
--    ('2018-06-22 19:12:25-07', 'foo', 4, 4),
--    ('2018-06-22 19:19:25-07', 'foo', 4, 5),
--    ('2018-06-22 19:00:25-07', 'foo', 4, 6),
--    ('2018-06-22 19:11:25-07', 'bar', 4, 7);

INSERT INTO Watch (fk_user_id, fk_public_corkboard_id)
VALUES
    (1, 3),
    (2, 1),
    (3, 3),
    (4, 3);

--INSERT INTO Liked (fk_user_id, fk_pushpin_id)
--VALUES
--    (2, 1),
--    (9, 1),
--    (8, 1),
--    (7, 2),
--    (6, 2),
--    (5, 2),
--    (4, 3),
--    (3, 5),
--    (2, 5),
--    (1, 7);

INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 4),
    (4, 1),
    (5, 1);





