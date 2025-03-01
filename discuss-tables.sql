  create table topic (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name varchar(128) not null unique,
    description varchar(1024) not null,
    created_on timestamp null DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp null DEFAULT CURRENT_TIMESTAMP
  );

  create table post (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title varchar(128) not null,
    content varchar(1024) not null,
    topic_id int(11) not null,
    user_id int(11) not null,
    created_on timestamp null DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp null DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `post_user_id_fk` FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE cascade ON DELETE cascade,
    CONSTRAINT `post_topic_id_fk` FOREIGN KEY (topic_id) REFERENCES topic (id) ON UPDATE cascade ON DELETE cascade
    
  );
  
  create table comment (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    content varchar(1024) not null,
    post_id int(11) not null,
    user_id int(11) not null,
    parent_id int(11) not null,
    created_on timestamp null DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp null DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `comment_user_id_fk` FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE cascade ON DELETE cascade,
    CONSTRAINT `comment_post_id_fk` FOREIGN KEY (post_id) REFERENCES post (id) ON UPDATE cascade ON DELETE cascade
  );
