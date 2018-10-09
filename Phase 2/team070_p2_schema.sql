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
    date_time_posted TIMESTAMP NOT NULL,
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
    date_time_posted TIMESTAMP NOT NULL,
    url VARCHAR(250) NOT NULL,
    description(200) NOT NULL
);

CREATE TABLE Tag (
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id),
    tag VARCHAR(20) NOT NULL
);

CREATE TABLE Comment (
    comment_id SERIAL PRIMARY KEY,
    date_time_posted TIMESTAMP NOT NULL,
    text VARCHAR(250) NOT NULL,
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id)
);

CREATE TABLE Watch (
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_public_corkboard_id INTEGER REFERENCES PublicCorkBoard(public_corkboard_id)
);

CREATE TABLE Like (
    fk_user_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_pushpin_id INTEGER REFERENCES PushPin(pushpin_id)
);

CREATE TABLE Follow (
    fk_user_follower_id INTEGER REFERENCES CorkBoardItUser(user_id),
    fk_user_followee_id INTEGER REFERENCES CorkBoardItUser(user_id)
);