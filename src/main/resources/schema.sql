create table if not exists t_user(name varchar(64) primary key,
                                  password varchar(64),
                                  email varchar(64),
                                  isAdmin boolean);
                                  
create table if not exists t_room(id int identity,
                                  title varchar(64) unique,
                                  capacity int,
                                  currentSize int,
                                  password varchar(64));                                  
                                  