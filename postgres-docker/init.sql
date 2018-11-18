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
    fk_public_corkboard_id INTEGER REFERENCES PublicCorkBoard(public_corkboard_id)
);

CREATE TABLE Liked (
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id)
);

CREATE TABLE Follow (
    fk_user_follower_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_user_followee_id INTEGER REFERENCES CorkBoardItUser(user_id)
);

INSERT INTO CorkBoardItUser (email, pin, first_name, last_name)
VALUES
    ('icylin@gg.com', 1234, 'Bing', 'Lin'), 
    ('ronpatel@gg.com', 1234, 'Rohan', 'Patel'),
    ('juliematchamer@gg.com', 1234, 'Julie', 'Matchamer'),
    ('dtsui@gg.com', 1234, 'David', 'Tsui'),
    ('bamthe25th@gg.com', 1234, 'Viole', 'Grace');

INSERT INTO CorkBoard (fk_user_id, email, date_time, title, category, visibility)
VALUES
    (1, 'icyling@gg.com', '2018-06-22 19:10:25-07', 'Adventures in Iceland', 'cat1, cat2', false),
    (1, 'icyling@gg.com', '2018-06-21 19:10:25-07', 'Spicy Memes', 'cat1', false),
    (2, 'ronpatel@gg.com', '2018-06-22 19:10:25-07', 'Super Secret', 'cat1', true),
    (5, 'bamthe25th@gg.com', '2018-06-20 19:10:25-07', 'Friends4Life', 'cat1, cat2, cat3', false);

INSERT INTO PublicCorkBoard(fk_corkboard_id)
VALUES 
    (1),
    (2),
    (4);

INSERT INTO PrivateCorkBoard(fk_corkboard_id, password)
VALUES
    (3, 'imsoop');

INSERT INTO PushPin (fk_user_id, fk_corkboard_id, date_time, url, description)
VALUES
    (1, 1, '2018-06-22 19:10:25-07', 'https://image.redbull.com/rbcom/052/2018-04-18/3defc76b-795c-4cfa-a005-c2fabd43f6fb/0012/0/130/0/2008/2816/1500/1/adventure-travel-cliff.jpg', 'my first adventure'),
    (1, 1, '2018-06-22 19:10:25-07', 'https://media.treehugger.com/assets/images/2018/04/hiking_in_South_Africa.jpg.860x0_q70_crop-scale.jpg', 'my second adventure'),
    (1, 2, '2018-06-21 19:10:25-07', 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/10/1024x537/gallery-1520361809-skittles-sweet-heat-image-1024.jpg', 'my spicy meme 1'),
    (5, 4, '2018-06-22 19:10:25-07', 'https://media.newyorker.com/photos/597c214e3f7572208e963e46/master/w_1800,c_limit/CVN_TNY_08_07_17RGB.jpg', 'hell train');

INSERT INTO Tag (fk_pushpin_id, tag)
VALUES
    (1, 'so coool'),
    (1, 'such ice'),
    (1, 'much bing');

INSERT INTO Comment (date_time, text, fk_user_id, fk_pushpin_id)
VALUES
    ('2018-06-22 19:10:25-07', 'this is so beautiful~', 2, 1),
    ('2018-06-22 19:10:25-07', 'this is so ugly', 3, 1),
    ('2018-06-22 19:10:25-07', 'this is alright', 4, 1),
    ('2018-06-22 19:10:25-07', 'rachel is the best', 4, 4);

INSERT INTO Watch (fk_user_id, fk_public_corkboard_id)
VALUES
    (1, 3),
    (2, 1),
    (3, 3),
    (4, 3);

INSERT INTO Liked (fk_user_id, fk_pushpin_id)
VALUES
    (1, 4),
    (2, 4),
    (3, 4),
    (4, 4);

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





