-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: edu_web
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `parent_cat_id` varchar(50) DEFAULT NULL,
  `ava_link` varchar(255) DEFAULT 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg',
  PRIMARY KEY (`id`),
  KEY `parent_cat_id` (`parent_cat_id`),
  FULLTEXT KEY `title_2` (`title`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parent_cat_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

INSERT INTO `category` VALUES ('0a897057-97dd-412a-960a-07e28b1fd45e','Design',NULL,'https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('12ee0bd8-0970-486c-af23-884ba3c75459','Android Development','e597b3dc-d18d-40ce-9740-7531829083cd','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('3593fc44-8674-428b-b742-21c42271bf87','Business',NULL,'https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('4a10b268-08c5-4960-b587-7aac03c8b65c','Design Tools','0a897057-97dd-412a-960a-07e28b1fd45e','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('8761cb14-848c-402b-887f-402add00ffb1','Sales','3593fc44-8674-428b-b742-21c42271bf87','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('bdef1d71-222d-42f5-99e5-8776fdc52699','Game Design','0a897057-97dd-412a-960a-07e28b1fd45e','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('e597b3dc-d18d-40ce-9740-7531829083cd','IT',NULL,'https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('e7c4fda1-e0dc-49e2-89e6-619dfacda203','Web Development','e597b3dc-d18d-40ce-9740-7531829083cd','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');
INSERT INTO `category` VALUES ('f8b62a4a-90cc-469a-a10c-05f192e9dde3','Management','3593fc44-8674-428b-b742-21c42271bf87','https://res.cloudinary.com/eduwebcloud/image/upload/v1610594973/ava/thumbnail2_eba4nc.jpg');

--
-- Table structure for table `course`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` varchar(50) NOT NULL,
  `cat_id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `teacher_id` varchar(50) NOT NULL,
  `ava_link` varchar(255) DEFAULT 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',
  `price` float NOT NULL,
  `discount` float DEFAULT '0',
  `small_description` varchar(5000) NOT NULL,
  `full_description` varchar(5000) NOT NULL,
  `date_created` date NOT NULL,
  `last_modified` date NOT NULL,
  `total_view` int DEFAULT '0',
  `total_sub` int DEFAULT '0',
  `disabled` tinyint(1) DEFAULT '0',
  `status` enum('INCOMPLETE','COMPLETE') DEFAULT 'INCOMPLETE',
  `final_price` double GENERATED ALWAYS AS ((`price` - ((`price` / 100) * `discount`))) VIRTUAL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `cat_id` (`cat_id`),
  KEY `teacher_id` (`teacher_id`),
  FULLTEXT KEY `title_2` (`title`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`),
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `general_credential` (`username`),
  CONSTRAINT `course_chk_1` CHECK ((`price` > 0)),
  CONSTRAINT `course_chk_2` CHECK (((0 <= `discount`) <= 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f','4a10b268-08c5-4960-b587-7aac03c8b65c','Adobe Illustrator Advance','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',99,5,'small description','full description','2021-01-15','2021-01-17',2,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('0c77b8c5-7d26-42f3-b297-9f32fbba5c09','8761cb14-848c-402b-887f-402add00ffb1','Sales Training: Practical Sales Techniques','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',120,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0','12ee0bd8-0970-486c-af23-884ba3c75459','Android App Development Masterclass using Kotlin','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',120,0,'small description','full description','2021-01-15','2021-01-17',14,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('19d37070-1cbf-4dcb-8c0c-0960d8d5c283','f8b62a4a-90cc-469a-a10c-05f192e9dde3','The Complete Product Management Course','ntmt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',99,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('22b1e194-5bbd-4e28-9d9d-fdad056a20cc','12ee0bd8-0970-486c-af23-884ba3c75459','Kotlin Android Development Masterclass','htt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',50,10,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('259f3e36-ecdf-4e1d-8f60-a3084d7d49d1','f8b62a4a-90cc-469a-a10c-05f192e9dde3','Leadership: Practical Leadership Skills','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',99,30,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15','bdef1d71-222d-42f5-99e5-8776fdc52699','Learn Professional Pixel Art & Animation','tad','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',140,0,'small description','full description','2021-01-15','2021-01-17',7,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d','4a10b268-08c5-4960-b587-7aac03c8b65c','Adobe Illustrator Basic','htt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',100,0,'small description','full description','2021-01-15','2021-01-17',1,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea','e7c4fda1-e0dc-49e2-89e6-619dfacda203','The Web Developer Bootcamp 2021','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',129,0,'small description','full description','2021-01-15','2021-01-17',39,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30','e7c4fda1-e0dc-49e2-89e6-619dfacda203','Angular - The Complete Guide (2021 Edition)','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',129,10,'small description','full description','2021-01-15','2021-01-17',6,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('598b7ec5-6655-4c3b-a763-c36820496d71','bdef1d71-222d-42f5-99e5-8776fdc52699','The Ultimate Guide to Digitally Painting','tad','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',120,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88','8761cb14-848c-402b-887f-402add00ffb1','Learn to Sell Anything','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',80,15,'small description','full description','2021-01-15','2021-01-17',31,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('73e42494-a13e-49a5-8487-e3b0e7b66bd1','12ee0bd8-0970-486c-af23-884ba3c75459','The Complete Android 10 & Kotlin Development','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',230,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('766d4767-e3b8-4b29-bd88-d612c68904af','bdef1d71-222d-42f5-99e5-8776fdc52699','Blender 2.8 Game Character Creation','tad','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',120,0,'small description','full description','2021-01-15','2021-01-17',5,1,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('8b464686-a741-4ba2-87b0-06c5aa1143fd','12ee0bd8-0970-486c-af23-884ba3c75459','Android Java Masterclass - Become an App Developer','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',99,15,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('a072cb38-ffb4-4785-bbdc-b229caff9138','e7c4fda1-e0dc-49e2-89e6-619dfacda203','The Complete JavaScript Course 2021','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',129,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('a21d1546-211c-4cdf-bd2b-46f17d996805','f8b62a4a-90cc-469a-a10c-05f192e9dde3','Product Management 101','ntmt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',99,5,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2','e7c4fda1-e0dc-49e2-89e6-619dfacda203','JavaScript: Understanding the Weird Parts','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',129,15,'small description','full description','2021-01-15','2021-01-17',1,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f','4a10b268-08c5-4960-b587-7aac03c8b65c','Adobe Photoshop Basic','htt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',50,0,'small description','full description','2021-01-15','2021-01-17',24,1,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('c30ff367-f9e7-4973-8118-40731057e374','8761cb14-848c-402b-887f-402add00ffb1','Smart Marketing with Price Psychology','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',155,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('cb4c9e9c-18ba-474f-a462-5750b95394e2','4a10b268-08c5-4960-b587-7aac03c8b65c','Adobe Photoshop Advance','htt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',70,15,'small description','full description','2021-01-15','2021-01-17',1,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('ccec01f3-51df-4e0b-ae07-b48eb03f4ba8','bdef1d71-222d-42f5-99e5-8776fdc52699','Pixel art for Video games','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',200,25,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('fe0e0fc4-c52f-46e0-8cf6-2e82083d4fad','8761cb14-848c-402b-887f-402add00ffb1','Sales and Persuasion Skills for Startups','nndk','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',90,0,'small description','full description','2021-01-15','2021-01-17',0,0,0,'INCOMPLETE');
INSERT INTO `course` (`id`, `cat_id`, `title`, `teacher_id`, `ava_link`, `price`, `discount`, `small_description`, `full_description`, `date_created`, `last_modified`, `total_view`, `total_sub`, `disabled`, `status`) VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b','12ee0bd8-0970-486c-af23-884ba3c75459','The Complete Android N Developer Course','dbt','https://res.cloudinary.com/eduwebcloud/image/upload/v1610895593/ava/online-3412473_1920_1_wxcd5l.jpg',100,50,'small description','full description','2021-01-15','2021-01-17',2,0,0,'INCOMPLETE');

--
-- Table structure for table `course_material`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_material` (
  `course_id` varchar(50) NOT NULL,
  `serial` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `vid_link` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`,`serial`),
  CONSTRAINT `course_material_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `course_material_chk_1` CHECK ((`serial` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_material`
--

INSERT INTO `course_material` VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('083ae800-3b88-45a4-9f49-3de12ed2032f',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('0fc16d12-51e4-4296-b478-10ba1e952fb0',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('3a072832-d0bc-4eb3-9e23-b6a139dadd15',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('42c77ec3-c059-4ccf-b344-03abde1c479d',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('563db2fc-9c02-4a8b-ae2a-4dd65d6f35ea',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('571ad99f-8c80-485a-bd3a-41fad96f0c30',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('6e8025e1-219d-48b9-bce6-c208e909dc88',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('af2aa709-26bf-4fd8-a4a2-ddd0589f7ac2',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('c2bee36e-268a-49e7-8642-2b4dace22a9f',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b',1,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b',2,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b',3,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b',4,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');
INSERT INTO `course_material` VALUES ('fe355d3b-c00f-4049-ab41-736c61b8c68b',5,'Demo Video Title','//www.youtube.com/embed/O7WbVj5apxU');

--
-- Table structure for table `general_credential`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_credential` (
  `username` varchar(50) NOT NULL,
  `permission` enum('STUDENT','TEACHER','ADMIN') NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ava_link` varchar(255) DEFAULT 'https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',
  `disabled` tinyint(1) DEFAULT '0',
  `secret_key` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_credential`
--

INSERT INTO `general_credential` VALUES ('admin','ADMIN','$2b$10$64dSkbvnmfiEOPTAHmDzD.6DZTxdeptG5A0rlolAsmyWOzhodKvpS','admin','admin@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('dbt','TEACHER','$2b$10$Zdk29qJfSBw.LMBfndt9fuRAUCXsCHiIOG/leZFgn8ETD0wA5W86S','Dinh Ba Tien','dbt@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('giahuy','STUDENT','$2b$10$/ziD9njgNhKy5ydYgB6YheqcmK/Alc2KgflHzDAMSARgnjA1gxL1q','Pham Gia Huy','giahuy@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',1,'OK');
INSERT INTO `general_credential` VALUES ('htt','TEACHER','$2b$10$dUVIIYLsKVkEeNnu2ZseWOGhWP4uD6XiGQLZzE/JhNDx7Iz2B7AH.','Ho Tuan Thanh','htt@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('mat','TEACHER','$2b$10$Sr2BbNftaD22/KFBHKKYvO6lmOdvX3d1pqymNAeXE/ryebInRLYBW','Mai Anh Tuan','mat@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',1,'OK');
INSERT INTO `general_credential` VALUES ('nndk','TEACHER','$2b$10$UyHDgVMJTBmnvieWcrZkiuca6QCaTved05C0yztjTObLLjOHf5KyC','Ngo Ngoc Dang Khoa','nndk@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('ntmt','TEACHER','$2b$10$Qq7HBzWnfzJCP9.J4SlmvOttZSvjOtCjSpE4QFTIp9UWY0YmPtl0C','Nguyen Thi Minh Tuyen','ntmt@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('tad','TEACHER','$2b$10$AV1Zd0hCryhfXSGVf9THGeCA5epFZl/XBko8zaopj3wKe5KHSRtse','Tran Anh Duy','tad@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('tamphuc','STUDENT','$2b$10$MtjRtxJ2YS9f.N52JUKfW.IgoT1M0jpfKBdp5grxJSve9II/hgFPC','Nguyen Thi Tam Phuc','tamphuc@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('tanhao','STUDENT','$2b$10$C.wfFb1kxrHd9t4EvfdmmOxreKqhHHMAKF3XzCOxi.4.lWDZYPlDm','Nguyen Tan Hao','tanhao@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');
INSERT INTO `general_credential` VALUES ('thanhqng','STUDENT','$2b$10$Kc7e0mNCYul/cDyl7w2.5O61aQHEVj3fv4ujmswtHXpwzmNmZFpka','Nguyen Quy Thanh','quythanh@gmail.com','https://res.cloudinary.com/eduwebcloud/image/upload/v1610965049/ava/avatar_rhiz4u.jpg',0,'OK');

--
-- Table structure for table `sessions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--


--
-- Table structure for table `student_course`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_course` (
  `student` varchar(50) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  KEY `student` (`student`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `student_course_ibfk_1` FOREIGN KEY (`student`) REFERENCES `general_credential` (`username`),
  CONSTRAINT `student_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_course`
--

INSERT INTO `student_course` VALUES ('thanhqng','766d4767-e3b8-4b29-bd88-d612c68904af');
INSERT INTO `student_course` VALUES ('tamphuc','c2bee36e-268a-49e7-8642-2b4dace22a9f');

--
-- Table structure for table `student_feedback`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_feedback` (
  `student_id` varchar(50) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  `rate` int NOT NULL,
  `feedback` varchar(5000) NOT NULL,
  `date_created` date NOT NULL,
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `student_feedback_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `general_credential` (`username`),
  CONSTRAINT `student_feedback_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `student_feedback_chk_1` CHECK (((1 <= `rate`) <= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_feedback`
--

INSERT INTO `student_feedback` VALUES ('tamphuc','c2bee36e-268a-49e7-8642-2b4dace22a9f',5,'I love this course !','2021-01-18');

--
-- Table structure for table `student_watched`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_watched` (
  `student` varchar(50) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  `serial` int NOT NULL,
  KEY `student` (`student`),
  KEY `course_id` (`course_id`,`serial`),
  CONSTRAINT `student_watched_ibfk_1` FOREIGN KEY (`student`) REFERENCES `general_credential` (`username`),
  CONSTRAINT `student_watched_ibfk_2` FOREIGN KEY (`course_id`, `serial`) REFERENCES `course_material` (`course_id`, `serial`),
  CONSTRAINT `student_watched_chk_1` CHECK ((`serial` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_watched`
--


--
-- Table structure for table `student_wishlist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_wishlist` (
  `student` varchar(50) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  KEY `student` (`student`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `student_wishlist_ibfk_1` FOREIGN KEY (`student`) REFERENCES `general_credential` (`username`),
  CONSTRAINT `student_wishlist_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_wishlist`
--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-19  8:13:07
