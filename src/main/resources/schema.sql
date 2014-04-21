create table if not exists t_user(name varchar(64) primary key,
                                  password varchar(64),
                                  email varchar(64),
                                  isAdmin boolean);
                                  
create table if not exists t_chatroom(title varchar(64) primary key,
                                      capacity int,
                                      password varchar(64));                                  
                                  