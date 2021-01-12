create table general_credential(
    id varchar(50) not null unique,
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
    id varchar(50) not null unique,
    title varchar(50) not null,
    parent_cat_id varchar(50),

    primary key(id),
    foreign key(parent_cat_id) references category(id)
);

create table course(
    id varchar(50) not null unique,
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
    foreign key(teacher_id) references teacher(credential_id) on delete cascade on update cascade
);

create table course_detail(
    course_id varchar(50) not null unique,
    description varchar(16000),
    week_view int default 0,
    date_added date not null,
    last_modified date not null,

    foreign key(course_id) references course(id) on delete cascade on update cascade
);

create table course_material(
    course_id varchar(50) not null unique,
    mat_order int not null check(mat_order > 0),
    vid_link varchar(255) not null,

    primary key(course_id, mat_order),
    foreign key(course_id) references course(id) on delete cascade on update cascade
);

create table student_course(
    student_id varchar(50) not null unique,
    course_id varchar(50) not null unique,
    mat_order int default 1,

    foreign key(student_id) references general_credential(id) on delete cascade on update cascade,
    foreign key(course_id, mat_order) references course_material(course_id, mat_order)
);

create table student_watchlist(
    student_id varchar(50) not null unique,
    course_id varchar(50) not null unique,

    foreign key(student_id) references general_credential(id) on delete cascade on update cascade,
    foreign key(course_id) references course(id) on delete cascade on update cascade
);

create table student_feedback(
    student_id varchar(50) not null unique,
    course_id varchar(50) not null unique,
    rate int not null check(1 <= rate <= 5),
    feedback varchar(510),

    foreign key(student_id) references general_credential(id) on delete cascade on update cascade,
    foreign key(course_id) references course(id) on delete cascade on update cascade
);