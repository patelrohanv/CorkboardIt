-- Tables

CREATE TABLE `User` (
    email varchar(250) NOT NULL,
    pin varchar(60) NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    PRIMARY KEY (email),
);

CREATE TABLE `Comment` (
    user_email varchar(250) NOT NULL,
    date_time datetime NOT NULL,
    comment_text varchar(1000) NOT NULL,
    -- Some way to connect to pushpin
    PRIMARY KEY (user_email,date_time),
);

CREATE TABLE 'PushPin' (
    description varchar(250) NOT NULL,
    url varchar(250) NOT NULL,
    date_time datetime NOT NULL,
    user_email varchar(250) NOT NULL
    corkboard_title varchar(250) NOT NULL
    PRIMARY KEY (user_email, corkboard_title, date_time),
);

CREATE TABLE 'PushPinTags' (
    pushpin_date_time datetime NOT NULL,
    user_email varchar(250) NOT NULL,
    corkboard_title varchar(250) NOT NULL,
    tag varchar(250) NOT NULL
    PRIMARY KEY (pushpin_date_time, user_email, corkboard_title)
);

CREATE TABLE CorkBoard (
    user_email varchar(250) NOT NULL,
    date_time datetime NOT NULL,
    title varchar(250) NOT NULL,
    visability varchar(250) NOT NULL,
    password varchar(250),
    PRIMARY KEY (user_email, title),
);

CREATE TABLE 'CorkBoardCategories' (
    user_email varchar(250) NOT NULL,
    corkboard_title varchar(250) NOT NULL,
    category varchar(250) NOT NULL
    PRIMARY KEY (user_email, corkboard_title)
);