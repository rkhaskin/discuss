-- create table
-- npx prisma db pull
-- npx prisma generate

drop table sessions;
drop table accounts;
drop table users;
CREATE TABLE IF NOT EXISTS users
(
    id integer(11) not null AUTO_INCREMENT,
    name varchar(80) not null,
    email varchar(60) NOT NULL unique,
    email_verified timestamp null default null,
    image varchar(512) null default null,
    createdAt timestamp null DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NULL default current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS accounts
(
    id integer(11) not null AUTO_INCREMENT,
    user_id integer(11) NULL default null,
    type varchar(60) NOT NULL,
    provider varchar(60) null default null,
    provider_account_id varchar(60) null default null,
    refresh_token varchar(2048),
    access_token varchar(2048),
    expires_at integer(11),
    token_type varchar(60),
    scope varchar(60),
    id_token varchar(512),
    session_state varchar(512),
    createdAt timestamp null DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NULL default current_timestamp,
    PRIMARY KEY (id),
    CONSTRAINT `account_user_id_fk` FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE cascade ON DELETE cascade,
    UNIQUE KEY `account_uniq_1` (`provider`,`provider_account_id`)
);

CREATE TABLE IF NOT EXISTS sessions
(
    id integer(11) not null AUTO_INCREMENT,
    user_id integer(11) not null,
    session_token varchar(1024) not null unique,
    expires timestamp,
    CONSTRAINT `session_user_id_fk` FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE cascade ON DELETE cascade,
    PRIMARY KEY (id)
);



