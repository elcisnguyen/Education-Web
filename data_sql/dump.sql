create table general_credential(
    id varchar(50) not null,
    permission enum('STUDENT', 'TEACHER', 'ADMIN') not null,
    username varchar(50) not null unique,
    password varchar(255) not null,
    fullname varchar(50) not null,
    email varchar(50) not null unique,
    ava_link varchar(255) default 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png',

    primary key(id)
);

create table teacher(
    credential_id varchar(50) not null unique,
    work_place varchar(50) not null,

    foreign key(credential_id) references general_credential(id) on delete cascade on update cascade
);

create table category(
    id varchar(50) not null,
    title varchar(50) not null unique,
    parent_cat_id varchar(50),
    ava_link varchar(255) default 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg',

    primary key(id),
    foreign key(parent_cat_id) references category(id)
);

alter table category add fulltext(title);

create table course(
    id varchar(50) not null,
    cat_id varchar(50) not null,
    title varchar(50) not null unique,
    teacher_id varchar(50) not null,
    ava_link varchar(255) default 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470874/ava/nocourseava_slbrfp.png',
    price float check(price > 0),
    discount float check(0 <= discount <= 100),
    total_view int default 0,
    total_sub int default 0,
    status enum('INCOMPLETE', 'COMPLETE') default 'INCOMPLETE',

    primary key(id),
    foreign key(cat_id) references category(id),
    foreign key(teacher_id) references teacher(credential_id)
);

alter table course add fulltext(title);

create table course_detail(
    course_id varchar(50) not null unique,
    description varchar(16000),
    week_view int default 0,
    date_added date not null,
    last_modified date not null,

    foreign key(course_id) references course(id) on delete cascade on update cascade
);

create table course_material(
    course_id varchar(50) not null,
    mat_order int not null check(mat_order > 0),
    vid_link varchar(255) not null,

    primary key(course_id, mat_order),
    foreign key(course_id) references course(id)
);

create table student_course(
    student_id varchar(50) not null,
    course_id varchar(50) not null,
    mat_order int default 1,

    foreign key(student_id) references general_credential(id),
    foreign key(course_id, mat_order) references course_material(course_id, mat_order)
);

create table student_watchlist(
    student_id varchar(50) not null,
    course_id varchar(50) not null,

    foreign key(student_id) references general_credential(id),
    foreign key(course_id) references course(id)
);

create table student_feedback(
    student_id varchar(50) not null,
    course_id varchar(50) not null,
    rate int not null check(1 <= rate <= 5),
    feedback varchar(510),

    foreign key(student_id) references general_credential(id),
    foreign key(course_id) references course(id)
);


INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('19b69fea-1187-4e72-a3df-bd72cd4ae87c', 'ADMIN', 'admin', '$2b$10$kFWLwKLexZYgy/K4/gds7OV/JXmhEgZKv1El8acovlRt5fgocaCdC', 'admin', 'ad@min', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('53fdd2d8-add2-4d9e-8f07-42321a32ae8d', 'TEACHER', 'nndk', '$2b$10$hHviaFIHcvhZa76k2UlRDeDe1tdVDuyik0c9we6Z241vWwpv1MfEa', 'Ngo Ngoc Dang Khoa', 'nndk@gmail.com', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('615ea11e-bb66-407f-b24a-dc9fa439be66', 'STUDENT', 'thanhqng1510', '$2b$10$6debgpkbQx.77ESMSygUhuK3FObYg1quPR6C3z7N/iqU3njroTLVi', 'Nguyễn Quy Thanh', 'thanhqng1510@gmail.com', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('66119c34-334f-4fd2-9071-08707b1ed606', 'STUDENT', 'tamphuc', '$2b$10$Tou8WvRyYSmUPOAYcMkJ3.HOVLws7jL3PCyEQM1t.HVkQxBfMraMy', 'Nguyen Thi Tam Phuc', 'tamphuc@gmail.com', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('c5534e62-144d-4760-acee-ec0f76f8e41a', 'STUDENT', 'htt', '$2b$10$aj3tOG2M8P/crAAVa6stDeLfPekuDtjpYZBtFymMLZipIrc6PKHK.', 'Ho Tuan Thanh', 'htt@gmail.com', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES ('db487bbd-b203-4ee2-a051-8eee2b330f4b', 'STUDENT', 'tanhao', '$2b$10$DJ.7sqjdOOwxN5N0wIaB1eKsZ34j1Ambne2msFHHWjs6wzh3FyJsK', 'Nguyễn Tan Hao', 'tanhao@gmail.com', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png');


INSERT INTO edu_web.teacher (credential_id, work_place) VALUES ('53fdd2d8-add2-4d9e-8f07-42321a32ae8d', 'HCMUS');
INSERT INTO edu_web.teacher (credential_id, work_place) VALUES ('c5534e62-144d-4760-acee-ec0f76f8e41a', 'HCMUS');


INSERT INTO edu_web.category (id, title, parent_cat_id) VALUES ('44166555-b47c-4868-8abe-3abeb5b35cd3', 'Business', null);
INSERT INTO edu_web.category (id, title, parent_cat_id) VALUES ('89deb919-b075-499f-abe9-f6ebd4b87ea3', 'IT', null);
INSERT INTO edu_web.category (id, title, parent_cat_id) VALUES ('decebd85-01c8-4ad4-b65e-7c5d0481f593', 'Design', null);
INSERT INTO edu_web.category (id, title, parent_cat_id) VALUES ('64be6b1d-7ecd-4a64-ac7b-55d1362eab3f', 'Web Development', '89deb919-b075-499f-abe9-f6ebd4b87ea3');
INSERT INTO edu_web.category (id, title, parent_cat_id) VALUES ('a10bc917-3053-44de-b87e-237234ed6443', 'Android Development', '89deb919-b075-499f-abe9-f6ebd4b87ea3');


INSERT INTO edu_web.course (id, cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES ('165cbc43-9ca0-4f44-acac-64bc8c3a0da1', '64be6b1d-7ecd-4a64-ac7b-55d1362eab3f', 'Build Your First Website', '53fdd2d8-add2-4d9e-8f07-42321a32ae8d', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470874/ava/nocourseava_slbrfp.png', null, null, 0, 0, 'INCOMPLETE');
INSERT INTO edu_web.course (id, cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES ('53cb35c2-cadb-4c14-a541-6e2db00643ec', 'a10bc917-3053-44de-b87e-237234ed6443', 'Build Your First Android App', 'c5534e62-144d-4760-acee-ec0f76f8e41a', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470874/ava/nocourseava_slbrfp.png', 450, 0, 0, 0, 'COMPLETE');
INSERT INTO edu_web.course (id, cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES ('a44665c2-2f9d-4f52-b4ec-281eade9ab6c', '64be6b1d-7ecd-4a64-ac7b-55d1362eab3f', 'ExpressJS Basic', '53fdd2d8-add2-4d9e-8f07-42321a32ae8d', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470874/ava/nocourseava_slbrfp.png', 500, 10, 0, 0, 'COMPLETE');
INSERT INTO edu_web.course (id, cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES ('e11b0727-8a67-40ef-a9d1-02605c46ae27', 'a10bc917-3053-44de-b87e-237234ed6443', 'Security In Android App', 'c5534e62-144d-4760-acee-ec0f76f8e41a', 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470874/ava/nocourseava_slbrfp.png', null, null, 0, 0, 'INCOMPLETE');


INSERT INTO edu_web.course_detail (course_id, description, week_view, date_added, last_modified) VALUES ('53cb35c2-cadb-4c14-a541-6e2db00643ec', 'Learn all the basic steps to create an Android app on your own.', 0, '2021-01-13', '2021-01-13');
INSERT INTO edu_web.course_detail (course_id, description, week_view, date_added, last_modified) VALUES ('a44665c2-2f9d-4f52-b4ec-281eade9ab6c', 'Learn how to use ExpressJS to build a server for your dream website.', 0, '2021-01-13', '2021-01-13');


INSERT INTO edu_web.course_material (course_id, mat_order, vid_link) VALUES ('53cb35c2-cadb-4c14-a541-6e2db00643ec', 1, 'https://www.youtube.com/watch?v=boPyHl3iptQ');
INSERT INTO edu_web.course_material (course_id, mat_order, vid_link) VALUES ('a44665c2-2f9d-4f52-b4ec-281eade9ab6c', 1, 'https://www.youtube.com/watch?v=boPyHl3iptQ');


INSERT INTO edu_web.student_course (student_id, course_id, mat_order) VALUES ('66119c34-334f-4fd2-9071-08707b1ed606', '53cb35c2-cadb-4c14-a541-6e2db00643ec', 1);
INSERT INTO edu_web.student_course (student_id, course_id, mat_order) VALUES ('615ea11e-bb66-407f-b24a-dc9fa439be66', 'a44665c2-2f9d-4f52-b4ec-281eade9ab6c', 1);


INSERT INTO edu_web.student_watchlist (student_id, course_id) VALUES ('db487bbd-b203-4ee2-a051-8eee2b330f4b', '53cb35c2-cadb-4c14-a541-6e2db00643ec');


INSERT INTO edu_web.student_feedback (student_id, course_id, rate, feedback) VALUES ('615ea11e-bb66-407f-b24a-dc9fa439be66', 'a44665c2-2f9d-4f52-b4ec-281eade9ab6c', 5, 'Very good course.');