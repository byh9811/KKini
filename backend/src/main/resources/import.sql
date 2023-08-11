# category 데이터
INSERT INTO category (name, image) VALUES ('한식', 'https://upload.wikimedia.org/wikipedia/commons/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg?20140320225932');
INSERT INTO category (name, image) VALUES ('중식','https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Beijing_DUck_sliced.jpeg/1200px-Beijing_DUck_sliced.jpeg?20170110051654' );
INSERT INTO category (name, image) VALUES ('일식', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Osechi_001.jpg/1200px-Osechi_001.jpg?20131231080221');
INSERT INTO category (name, image) VALUES ('양식', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Osechi_001.jpg/1200px-Osechi_001.jpg?20131231080221');
INSERT INTO category (name, image) VALUES ('기타', 'https://cdn.pixabay.com/photo/2017/02/01/00/26/cranium-2028555_1280.png');

# member 더미 데이터
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@naver.com', 'imagename123', 1, '배용현', '너시련나길여', 'oatuh2id1', 'token12345', 'ROLE_USER', 1);
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@google.com', 'imagename456', 3, '김범창', 'sillyeog', 'oauth2id2', 'token67890', 'ROLE_USER', 2);
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@google.com', 'imagename789', 3, '진병욱', 'IUFAN', 'oauth2id2', 'token67890', 'ROLE_USER', 2);
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@google.com', 'imagename789', 3, '박태규', 'IUFAN', 'oauth2id2', 'token67890', 'ROLE_USER', 2);
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@google.com', 'imagename789', 3, '김승영', 'IUFAN', 'oauth2id2', 'token67890', 'ROLE_USER', 2);
INSERT INTO MEMBER(create_date_time, modify_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role, stars) VALUES (now(), now(), 'NAVER', 'byh9811@google.com', 'imagename789', 3, '이승태', 'IUFAN', 'oauth2id2', 'token67890', 'ROLE_USER', 2);

# recipe 더미 데이터
INSERT INTO Recipe (member_id, category_id, name, time, difficulty, ingredient, image, steps, deleted) VALUES (1, 1, '맛있는 초콜릿 케이크', 45, 3, '밀가루 2컵, 설탕 2컵, 코코아 파우더 3/4컵, ...', 'https://example.com/chocolate-cake.jpg', '1. 오븐 예열...\n2. 건조 재료 섞기...\n3. 습기 있는 재료 추가하기...', false);
INSERT INTO Recipe (member_id, category_id, name, time, difficulty, ingredient, image, steps, deleted) VALUES (2, 2, '크리미한 치킨 알프레도', 30, 2, '뼈 없는 닭가슴살 2조각, 생크림 1컵, 파마산 치즈 1/2컵, ...', 'https://example.com/chicken-alfredo.jpg', '1. 닭살 조리...\n2. 파스타 준비...\n3. 알프레도 소스 만들기...', false);
INSERT INTO Recipe (member_id, category_id, name, time, difficulty, ingredient, image, steps, deleted) VALUES (3, 1, '매콤한 소고기 타코', 25, 2, '1파운드 갈은 소고기, 타코 시즈닝 1팩, 샐러드용 양상추 1컵, ...', 'https://example.com/beef-tacos.jpg', '1. 소고기 볶기...\n2. 시즈닝 추가...\n3. 타코 조립하기...', false);
INSERT INTO Recipe (member_id, category_id, name, time, difficulty, ingredient, image, steps, deleted) VALUES (1, 3, '신선한 가든 샐러드', 15, 1, '잡채 채소 2컵, 체리 토마토 1/2컵, 얇게 썬 오이 1/4컵, ...', 'https://example.com/garden-salad.jpg', '1. 채소 씻고 다듬기...\n2. 보울에 재료 넣기...\n3. 드레싱 뿌리기...', false);
INSERT INTO Recipe (member_id, category_id, name, time, difficulty, ingredient, image, steps, deleted) VALUES (2, 2, '클래식 마르게리따 피자', 20, 2, '피자 반죽 1개, 토마토 소스 1/2컵, 모짜렐라 치즈 1 1/2컵, ...', 'https://example.com/margherita-pizza.jpg', '1. 반죽 펴기...\n2. 소스 바르기...\n3. 치즈와 토핑 추가하기...\n4. 예열한 오븐에서 굽기...', false);

# post 더미 데이터
INSERT INTO Post (member_id, recipe_id, contents, avg_price, avg_price_cnt, like_cnt, dis_like_cnt) VALUES (1, 1, '맛있는 초콜릿 케이크를 만들었어요!', 10000, 1, 15, 2);
INSERT INTO Post (member_id, recipe_id, contents, avg_price, avg_price_cnt, like_cnt, dis_like_cnt) VALUES (2, 2, '오늘 치킨 알프레도를 시도해보았는데 정말 맛있었어요.', 15000, 2, 23, 1);
INSERT INTO Post (member_id, recipe_id, contents, avg_price, avg_price_cnt, like_cnt, dis_like_cnt) VALUES (3, 3, '소고기 타코 완성! 매콤하고 고소해요~', 8000, 1, 10, 3);
INSERT INTO Post (member_id, recipe_id, contents, avg_price, avg_price_cnt, like_cnt, dis_like_cnt) VALUES (1, 4, '가든 샐러드를 간단하게 만들었어요.', 5000, 1, 8, 0);
INSERT INTO Post (member_id, recipe_id, contents, avg_price, avg_price_cnt, like_cnt, dis_like_cnt) VALUES (2, 5, '클래식 마르게리따 피자 퍼펙트!', 12000, 1, 18, 2);

# evaluation 더미 데이터
INSERT INTO Evaluation (member_id, post_id, price) VALUES (1, 1, 10000);
INSERT INTO Evaluation (member_id, post_id, price) VALUES (1, 2, 20000);
INSERT INTO Evaluation (member_id, post_id, price) VALUES (2, 2, 10000);
INSERT INTO Evaluation (member_id, post_id, price) VALUES (3, 3, 8000);
INSERT INTO Evaluation (member_id, post_id, price) VALUES (1, 4, 5000);
INSERT INTO Evaluation (member_id, post_id, price) VALUES (1, 5, 12000);

# image 더미 데이터
INSERT INTO Post_image (post_id, image) VALUES (1, 'https://example.com/image1.jpg');
INSERT INTO Post_image (post_id, image) VALUES (2, 'https://example.com/image2.jpg');
INSERT INTO Post_image (post_id, image) VALUES (3, 'https://example.com/image3.jpg');
INSERT INTO Post_image (post_id, image) VALUES (4, 'https://example.com/image4.jpg');
INSERT INTO Post_image (post_id, image) VALUES (5, 'https://example.com/image5.jpg');

# scrap 더미 데이터
-- Scrap 테이블에 더미 데이터 5개 삽입
INSERT INTO Scrap (member_id, post_id) VALUES (1, 1);
INSERT INTO Scrap (member_id, post_id) VALUES (2, 2);
INSERT INTO Scrap (member_id, post_id) VALUES (3, 3);
INSERT INTO Scrap (member_id, post_id) VALUES (1, 4);
INSERT INTO Scrap (member_id, post_id) VALUES (2, 5);

# reaction 더미 데이터
INSERT INTO Reaction (post_id, member_id, state) VALUES (1, 1, TRUE);
INSERT INTO Reaction (post_id, member_id, state) VALUES (2, 2, FALSE);
INSERT INTO Reaction (post_id, member_id, state) VALUES (3, 3, TRUE);
INSERT INTO Reaction (post_id, member_id, state) VALUES (4, 1, FALSE);
INSERT INTO Reaction (post_id, member_id, state) VALUES (5, 2, TRUE);

# comment 더미 데이터
INSERT INTO Comment (member_id, post_id, parents_id, contents) VALUES (1, 1, NULL, '맛있어 보이네요!');
INSERT INTO Comment (member_id, post_id, parents_id, contents) VALUES (2, 2, NULL, '치즈가 녹는 모습이 멋지네요.');
INSERT INTO Comment (member_id, post_id, parents_id, contents) VALUES (3, 3, NULL, '타코 색다른 아이디어네요!');
INSERT INTO Comment (member_id, post_id, parents_id, contents) VALUES (1, 4, NULL, '가든 샐러드 신선하게 보이네요.');
INSERT INTO Comment (member_id, post_id, parents_id, contents) VALUES (2, 5, NULL, '피자 완성도 높아보여요.');

# follow 더미 데이터
INSERT INTO Follow (me_id, target_id) VALUES (1, 2), (1, 3), (1, 4), (1, 5);
INSERT INTO Follow (me_id, target_id) VALUES (2, 1), (2, 3), (2, 5);
INSERT INTO Follow (me_id, target_id) VALUES (3, 1), (3, 4);
INSERT INTO Follow (me_id, target_id) VALUES (4, 2), (4, 5);
INSERT INTO Follow (me_id, target_id) VALUES (5, 1), (5, 3);

# preference 더미 데이터
INSERT INTO Preference (member_id, category_id, weight) VALUES (1, 1, 1), (1, 2, 1), (1, 3, 1), (1, 4, 1), (1, 5, 1);
INSERT INTO Preference (member_id, category_id, weight) VALUES (2, 1, 1), (2, 2, 1), (2, 3, 1), (2, 4, 1), (2, 5, 1);
INSERT INTO Preference (member_id, category_id, weight) VALUES (3, 1, 1), (3, 2, 1), (3, 3, 1), (3, 4, 1), (3, 5, 1);
INSERT INTO Preference (member_id, category_id, weight) VALUES (4, 1, 1), (4, 2, 1), (4, 3, 1), (4, 4, 1), (4, 5, 1);
INSERT INTO Preference (member_id, category_id, weight) VALUES (5, 1, 1), (5, 2, 1), (5, 3, 1), (5, 4, 1), (5, 5, 1);
