-- MySQL dump 10.13  Distrib 8.0.5, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: brzo_kucanje
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kategorija` (
  `kategorija_id` int NOT NULL AUTO_INCREMENT,
  `kategorija` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`kategorija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorija`
--

LOCK TABLES `kategorija` WRITE;
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` VALUES (1,'Romani'),(2,'Naucni'),(3,'Citati'),(4,'Razgovori'),(5,'Programiranje');
/*!40000 ALTER TABLE `kategorija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `korisnik` (
  `korisnik_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pw_hash` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `rank_id` int DEFAULT NULL,
  PRIMARY KEY (`korisnik_id`),
  KEY `korisnik_rank_rank_id_fk` (`rank_id`),
  CONSTRAINT `korisnik_rank_rank_id_fk` FOREIGN KEY (`rank_id`) REFERENCES `rank` (`rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'a','$2b$10$9iXlA0xMzGA1IzcwwLVyf.YTFT8JnVUKxJ1y6EE/RPgJP5UId/ZS2','t@t.com','a',1),(2,'BB','$2b$10$bFqszAZDv6oQR9iQU2rnhuaAmX5Uhzrgao3/tyEuYmwWWUiXyXxlq','b@b.com','BB',1);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rank` (
  `rank_id` int NOT NULL AUTO_INCREMENT,
  `rank` varchar(255) NOT NULL,
  `broj_sekundi` int DEFAULT NULL,
  `opseg_pocetak` double DEFAULT NULL,
  `opseg_kraj` double DEFAULT NULL,
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank`
--

LOCK TABLES `rank` WRITE;
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
INSERT INTO `rank` VALUES (1,'Veoma spor',20,0,0.5),(2,'Spor',15,0.51,0.6),(3,'Srednje',12,0.61,0.75),(4,'Brz',10,0.76,0.85),(5,'Veoma brz',8,0.86,1);
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sesija`
--

DROP TABLE IF EXISTS `sesija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sesija` (
  `sesija_id` int NOT NULL AUTO_INCREMENT,
  `brzina` double DEFAULT NULL,
  `korisnik_id` int DEFAULT NULL,
  `tekst_id` int DEFAULT NULL,
  PRIMARY KEY (`sesija_id`),
  KEY `sesija_korisnik_korisnik_id_fk` (`korisnik_id`),
  KEY `sesija_tekst_tekst_id_fk` (`tekst_id`),
  CONSTRAINT `sesija_korisnik_korisnik_id_fk` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `sesija_tekst_tekst_id_fk` FOREIGN KEY (`tekst_id`) REFERENCES `tekst` (`tekst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesija`
--

LOCK TABLES `sesija` WRITE;
/*!40000 ALTER TABLE `sesija` DISABLE KEYS */;
INSERT INTO `sesija` VALUES (1,0.61,1,1),(2,0.61,1,1),(3,0.61,1,1),(4,0.61,1,1),(5,0.61,1,1),(6,0.61,1,1),(7,0.61,1,1),(8,0.61,1,1),(9,0.61,1,1),(10,0.61,1,1),(11,0.78,1,1),(12,0.27,1,1),(13,0.78,1,1),(14,0.78,1,1),(15,0,1,1),(16,0,1,1),(17,0.04,1,1);
/*!40000 ALTER TABLE `sesija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tekst`
--

DROP TABLE IF EXISTS `tekst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tekst` (
  `tekst_id` int NOT NULL AUTO_INCREMENT,
  `tekst` text,
  `naslov` varchar(255) DEFAULT NULL,
  `kategorija_id` int NOT NULL,
  PRIMARY KEY (`tekst_id`),
  KEY `tekst_kategorija_kategorija_id_fk` (`kategorija_id`),
  CONSTRAINT `tekst_kategorija_kategorija_id_fk` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`kategorija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tekst`
--

LOCK TABLES `tekst` WRITE;
/*!40000 ALTER TABLE `tekst` DISABLE KEYS */;
INSERT INTO `tekst` VALUES (1,'TAKSJ KASJ KJ ASKJ KAS||JKJAKS KAJSKJS \\asjdask||jskjsad AJSKJ ASJK||KJS AJS AKJAS JKSD','Tekst 1',1);
/*!40000 ALTER TABLE `tekst` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-12  0:55:32
