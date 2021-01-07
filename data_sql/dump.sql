create table general_credential(
    id int not null auto_increment,
    permission enum('STUDENT', 'TEACHER') not null,
    username varchar(50) not null unique,
    password varchar(50) not null,
    fullname varchar(50) not null,
    email varchar(50) not null unique,
    ava_link varchar(256),

    primary key(id)
);

create table teacher(
    credential_id int not null,
    work_place varchar(50) not null,

    foreign key(credential_id) references general_credential(id)
);

create table category(
    id int not null auto_increment,
    title varchar(50) not null,

    primary key(id)
);

create table sub_category(
    id int not null auto_increment,
    cat_id int not null,
    title varchar(50) not null,

    primary key(id),
    foreign key(cat_id) references category(id)
);

create table course(
    id int not null auto_increment,
    sub_cat_id int not null,
    title varchar(50) not null unique,
    teacher_id int not null,
    ava_link varchar(256),
    price float check(price > 0),
    discount float check(0 <= discount <= 100),
    total_view int not null default 0,
    total_sub int not null default 0,
    status enum('INCOMPLETE', 'COMPLETE') not null,

    primary key(id),
    foreign key(sub_cat_id) references sub_category(id),
    foreign key(teacher_id) references teacher(credential_id)
);

create table course_detail(
    course_id int not null,
    description varchar(16000),
    week_view int not null default 0,
    date_added date not null,
    last_modified date not null,

    foreign key(course_id) references course(id)
);

create table course_material(
    course_id int not null,
    mat_order int not null check(mat_order > 0),
    vid_link varchar(256) not null,

    primary key(course_id, mat_order),
    foreign key(course_id) references course(id)
);

create table student_course(
    student_id int not null,
    course_id int not null,
    mat_order int not null default 1,

    foreign key(student_id) references general_credential(id),
    foreign key(course_id, mat_order) references course_material(course_id, mat_order)
);

create table student_watchlist(
    student_id int not null,
    course_id int not null,

    foreign key(student_id) references general_credential(id),
    foreign key(course_id) references course(id)
);

create table student_feedback(
    student_id int not null,
    course_id int not null,
    rate int not null check(1 <= rate <= 5),
    comment varchar(512),

    foreign key(student_id) references general_credential(id),
    foreign key(course_id) references course(id)
);


INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES (1, 'STUDENT', 'thanh', '1', 'Nguyen Quy Thanh', 'thanhqng1510@gmail.com', null);
INSERT INTO edu_web.general_credential (id, permission, username, password, fullname, email, ava_link) VALUES (2, 'TEACHER', 'hao', '1', 'Nguyen Tan Hao', 'tanhao@gmail.com', null);

INSERT INTO edu_web.teacher (credential_id, work_place) VALUES (2, 'HCMUS');

INSERT INTO edu_web.category (id, title) VALUES (1, 'Development');
INSERT INTO edu_web.category (id, title) VALUES (2, 'Design');

INSERT INTO edu_web.sub_category (id, cat_id, title) VALUES (1, 1, 'Web Development');
INSERT INTO edu_web.sub_category (id, cat_id, title) VALUES (2, 1, 'Mobile Development');
INSERT INTO edu_web.sub_category (id, cat_id, title) VALUES (3, 2, 'Design Tools');
INSERT INTO edu_web.sub_category (id, cat_id, title) VALUES (4, 2, 'Game Design');

INSERT INTO edu_web.course (id, sub_cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES (1, 1, 'The Web Developer Bootcamp 2021', 2, null, null, null, 0, 0, 'INCOMPLETE');
INSERT INTO edu_web.course (id, sub_cat_id, title, teacher_id, ava_link, price, discount, total_view, total_sub, status) VALUES (2, 2, 'Twitter SwiftUI Clone | iOS 14 & Swift 5', 2, null, null, null, 0, 0, 'INCOMPLETE');

INSERT INTO edu_web.course_detail (course_id, description, week_view, date_added, last_modified) VALUES (1, null, 0, '2021-01-07', '2021-01-07');
INSERT INTO edu_web.course_detail (course_id, description, week_view, date_added, last_modified) VALUES (2, null, 0, '2021-01-07', '2021-01-07');

INSERT INTO edu_web.course_material (course_id, mat_order, vid_link) VALUES (1, 1, 'https://www.youtube.com/watch?v=oavMtUWDBTM');
INSERT INTO edu_web.course_material (course_id, mat_order, vid_link) VALUES (2, 1, 'https://www.youtube.com/watch?v=oavMtUWDBTM');

INSERT INTO edu_web.student_course (student_id, course_id, mat_order) VALUES (1, 1, 1);

INSERT INTO edu_web.student_watchlist (student_id, course_id) VALUES (1, 2);

INSERT INTO edu_web.student_feedback (student_id, course_id, rate, comment) VALUES (1, 1, 5, 'Very Good');