use s09p12c210;

# member 더미 데이터
INSERT INTO MEMBER VALUES (1, now(), now(), 'byh9811@naver.com', 'imagename123', 1, '배용현', '너시련나길여', 'token12345', 'naver', 1);
INSERT INTO MEMBER VALUES (2, now(), now(), 'byh9811@google.com', 'imagename456', 3, '김범창', 'sillyeog', 'token67890', 'naver', 2);

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