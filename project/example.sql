
CREATE TABLE `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `subject`
--
 
INSERT INTO `subject` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11');
INSERT INTO `subject` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10');
INSERT INTO `subject` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10');
INSERT INTO `subject` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03');
INSERT INTO `subject` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03');