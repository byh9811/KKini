use s09p12c210;

# member 더미 데이터
INSERT INTO MEMBER VALUES (1, now(), now(), 'NAVER', 'byh9811@naver.com', 'imagename123', 1, '배용현', '너시련나길여', 'oatuh2id1', 'token12345', 'ROLE_USER', 1);
INSERT INTO MEMBER VALUES (2, now(), now(), 'NAVER', 'byh9811@google.com', 'imagename456', 3, '김범창', 'sillyeog', 'oauth2id2', 'token67890', 'ROLE_USER', 2);

# category 더미 데이터
insert into category values (1, '한식', 'image12345');
insert into category values (2, '중식', 'image67890');

# recipe 더미 데이터
insert into recipe values (1, now(),now(), 1, 1, 'image124578', '양파, 갈비', '갈비찜', 180, 1, 1);
insert into recipe values (2, now(),now(), 0, 2, 'image124578', '양파, 갈비', '갈비찜', 180, 2, 2);
insert into recipe values (3, now(),now(), 0, 1, 'image124578', '양파, 갈비', '갈비찜', 180, 1, 2);

# step 더미 데이터
insert into step values (1, '1. 양파를 준비한다.', 1);
insert into step values (2, '2. 양파를 썬다.', 1);

# badge 더미 데이터
insert into badge values (1, 'image123', '손');
insert into badge values (2, 'image234', '흙수저');
insert into badge values (3, 'image345', '동수저');

# own 더미 데이터
insert into own values (1, now(), 0, 1, 1);
insert into own values (2, now(), 1, 2, 1);
insert into own values (3, now(), 1, 1, 2);

# history 더미 데이터
insert into history values (1, now(), '갈비찜', 1);
insert into history values (2, now(), '갈비탕', 1);
insert into history values (3, now(), '삼합', 2);

# collection 더미 데이터
insert into collection values (1, now(), 1, 1);
insert into collection values (2, now(), 1, 2);
insert into collection values (3, now(), 2, 3);

INSERT INTO s09p12c210.post
(create_date_time, modify_date_time, contents, dislikes, likes, price, member_id, recipe_id)
VALUES(NULL, NULL, "test", 0, 0, 0, 1, 1);

select * from post;
select * from scrap;
select * from post_image;

INSERT INTO s09p12c210.post_image
(image, post_id)
VALUES(NULL, 1);