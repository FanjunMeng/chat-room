insert into t_user (name,password,email,isAdmin) 
	select name,password,email,isAdmin from(
		select 'admin' name,'admin' password,'940483935@qq.com' email,true isAdmin) temp
	where not exists (select * from t_user where name='admin');
	
delete from t_room;
insert into t_room(title,capacity,currentSize,password) values('万事屋',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('东方幻想乡',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('削骨成笛·夏目起笙歌',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('尾崎医院太少人院长都不工作了！(lll￢',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('(:з」彭格列并盛高校公关部∠)_',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('赏金猎人的酒馆',10,0,'');
insert into t_room(title,capacity,currentSize,password) values('魔都高校异闻录',10,0,'');