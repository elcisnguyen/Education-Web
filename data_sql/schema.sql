create table general_credential(
    username varchar(50) not null unique,
    permission enum('STUDENT', 'TEACHER', 'ADMIN') not null,
    password_hash varchar(255) not null,
    fullname varchar(50) not null,
    email varchar(50) not null unique,
    ava_link varchar(255) default 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610470583/ava/noavatar_og91yw.png',
    teaching_place varchar(50) default null,
    disabled bool default false,

    primary key(username)
);

create table category(
    id varchar(50) not null,
    title varchar(50) not null unique,
    parent_cat_id varchar(50) default null,
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
    price float check(price > 0) not null,
    discount float check(0 <= discount <= 100) default 0,
    small_description varchar(5000) not null,
    full_description varchar(5000) not null,
    date_created date not null,
    last_modified date not null,
    total_view int default 0,
    total_sub int default 0,
    disabled bool default false,
    status enum('INCOMPLETE', 'COMPLETE') default 'INCOMPLETE',

    primary key(id),
    foreign key(cat_id) references category(id),
    foreign key(teacher_id) references general_credential(username)
);
alter table course add fulltext(title);

create table course_material(
    course_id varchar(50) not null,
    serial int not null check(serial > 0),
    title varchar(50) not null,
    vid_link varchar(255) not null,

    primary key(course_id, serial),
    foreign key(course_id) references course(id)
);

create table student_course(
    student varchar(50) not null,
    course_id varchar(50) not null,

    foreign key(student) references general_credential(username),
    foreign key(course_id) references course(id)
);

create table student_watched(
    student varchar(50) not null,
    course_id varchar(50) not null,
    serial int not null check(serial > 0),

    foreign key(student) references general_credential(username),
    foreign key(course_id, serial) references course_material(course_id, serial)
);

create table student_wishlist(
    student varchar(50) not null,
    course_id varchar(50) not null,

    foreign key(student) references general_credential(username),
    foreign key(course_id) references course(id)
);

create table student_feedback(
    student_id varchar(50) not null,
    course_id varchar(50) not null,
    rate int not null check(1 <= rate <= 5),
    feedback varchar(5000) not null,
    date_created date not null,

    foreign key(student_id) references general_credential(username),
    foreign key(course_id) references course(id)
);