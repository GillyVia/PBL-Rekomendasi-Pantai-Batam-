-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: rekomendasi_pantai_batam
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `rekomendasi_pantai_batam`
--

/*!40000 DROP DATABASE IF EXISTS `rekomendasi_pantai_batam`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `rekomendasi_pantai_batam` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `rekomendasi_pantai_batam`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin@batampantai.local','batam2026','2026-05-10 16:12:15');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fasilitas`
--

DROP TABLE IF EXISTS `fasilitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fasilitas` (
  `id_fasilitas` int(11) NOT NULL AUTO_INCREMENT,
  `nama_fasilitas` varchar(100) NOT NULL,
  `deskripsi_fasilitas` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fasilitas`),
  UNIQUE KEY `nama_fasilitas` (`nama_fasilitas`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fasilitas`
--

LOCK TABLES `fasilitas` WRITE;
/*!40000 ALTER TABLE `fasilitas` DISABLE KEYS */;
INSERT INTO `fasilitas` VALUES (1,'toilet','Toilet umum'),(2,'mushola','Tempat ibadah'),(3,'warungMakan','Warung makan atau tempat kuliner'),(4,'parkirMotor','Area parkir motor'),(5,'parkirMobil','Area parkir mobil'),(6,'gazebo','Gazebo atau tempat duduk santai'),(7,'sewaAlat','Penyewaan alat wisata'),(8,'penginapan','Penginapan sekitar pantai'),(9,'wifi','Akses internet Wi-Fi'),(10,'penjagaPantai','Penjaga pantai atau petugas keamanan');
/*!40000 ALTER TABLE `fasilitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori_rekomendasi`
--

DROP TABLE IF EXISTS `kategori_rekomendasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategori_rekomendasi` (
  `id_kategori_rekomendasi` int(11) NOT NULL AUTO_INCREMENT,
  `id_pantai` varchar(100) NOT NULL,
  `suasana_score` tinyint(4) DEFAULT 1,
  `fasilitas_score` tinyint(4) DEFAULT 1,
  `akses_score` tinyint(4) DEFAULT 1,
  `popularitas_score` tinyint(4) DEFAULT 1,
  `rating_kategori` varchar(50) DEFAULT NULL,
  `harga_kategori` varchar(50) DEFAULT NULL,
  `jarak_kategori` varchar(50) DEFAULT NULL,
  `label_rekomendasi` enum('tidak_direkomendasikan','direkomendasikan','sangat_direkomendasikan') DEFAULT 'direkomendasikan',
  `catatan_kategori` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_kategori_rekomendasi`),
  KEY `fk_rekomendasi_pantai` (`id_pantai`),
  CONSTRAINT `fk_rekomendasi_pantai` FOREIGN KEY (`id_pantai`) REFERENCES `pantai` (`id_pantai`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_rekomendasi`
--

LOCK TABLES `kategori_rekomendasi` WRITE;
/*!40000 ALTER TABLE `kategori_rekomendasi` DISABLE KEYS */;
INSERT INTO `kategori_rekomendasi` VALUES (2,'tanjung-bembang-1778433390203',1,1,2,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 17:16:31','2026-05-11 07:02:11'),(3,'pantai-melayu-1778433521722',2,2,2,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:18:41','2026-05-11 06:57:30'),(4,'pantai-nongsa-1778433680638',3,3,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 17:21:20','2026-05-11 07:02:11'),(5,'pantai-telukmata-ikan-1778433781264',2,2,3,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:23:01','2026-05-11 06:57:30'),(6,'pantai-pulau-putri-nongsa-1778433886509',2,2,1,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:24:46','2026-05-11 07:33:10'),(7,'pantai-bale-bale-1778434152307',2,2,3,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:29:12','2026-05-11 06:57:30'),(8,'pantai-sekilak-1778434266041',3,2,3,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:31:06','2026-05-11 07:33:10'),(9,'pantai-lagorap-1778434374839',2,1,2,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 17:32:54','2026-05-11 07:02:11'),(10,'pantai-ketapang-1778434490075',3,1,3,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:34:50','2026-05-11 06:53:32'),(11,'pantai-boneta-1778434611564',2,1,3,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 17:36:51','2026-05-11 07:33:10'),(12,'pantai-nuvasa-bay-1778434712779',3,3,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 17:38:32','2026-05-11 07:02:11'),(13,'pantai-biru-sehati-1778434804626',2,1,2,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 17:40:04','2026-05-11 07:02:11'),(14,'pantai-panau-1778434906925',1,1,2,2,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 17:41:47','2026-05-11 07:02:11'),(15,'pantai-bahagia-1778434985969',2,2,2,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:43:06','2026-05-11 06:57:30'),(16,'pantai-payung-1778435091587',3,1,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 17:44:51','2026-05-11 07:02:11'),(17,'pantai-melayu-barelang-1778435187412',3,2,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 17:46:27','2026-05-11 07:02:11'),(18,'pantai-melur-barelang-1778435289814',3,3,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 17:48:09','2026-05-11 07:02:11'),(19,'pulau-abang-1778435431624',3,3,1,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 17:50:31','2026-05-11 06:57:30'),(20,'pulau-rano-1778449451519',3,3,1,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 21:44:11','2026-05-11 06:57:30'),(21,'pantai-subangmas-1778449564129',2,1,1,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 21:46:04','2026-05-11 07:02:11'),(22,'pantai-mirota-1778449685155',2,2,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 21:48:05','2026-05-11 07:02:11'),(23,'pantai-vio-vio-1778449792298',3,2,2,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 21:49:52','2026-05-11 07:02:11'),(24,'pantai-dendang-melayu-1778449912770',2,1,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 21:51:52','2026-05-11 07:33:10'),(25,'pantai-3-putri-1778450076094',3,2,2,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 21:54:36','2026-05-11 06:57:30'),(26,'pantai-zore-1778450176946',2,2,2,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 21:56:17','2026-05-11 06:57:30'),(27,'pantai-air-nanti-1778450265845',3,1,3,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 21:57:45','2026-05-11 06:53:32'),(28,'pantai-elyora-1778450377716',2,3,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 21:59:37','2026-05-11 07:02:11'),(29,'larantuka-pantai-1778450462897',3,1,2,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:01:02','2026-05-11 06:53:32'),(30,'pantai-tegar-bahari-1778450550027',3,2,2,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:02:30','2026-05-11 06:57:30'),(31,'pantai-reviola-1778450677105',3,2,2,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 22:04:37','2026-05-11 07:02:11'),(32,'pantai-cakang-1778450772074',1,1,1,1,NULL,NULL,NULL,'tidak_direkomendasikan',NULL,'2026-05-10 22:06:12','2026-05-11 07:02:11'),(33,'pantai-kalat-1778450848719',3,1,3,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:07:28','2026-05-11 06:53:32'),(34,'pantai-kirana-1778450960363',3,1,2,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:09:20','2026-05-11 06:53:32'),(35,'pantai-pasir-putih-1778451053959',2,2,1,2,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:10:54','2026-05-11 06:57:30'),(36,'pantai-tanjung-pinggir-1778451140940',2,2,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 22:12:21','2026-05-11 07:02:11'),(37,'pantai-tanjung-datuk-1778451242800',2,3,3,1,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:14:02','2026-05-11 06:57:30'),(38,'marina-waterfront-1778451337291',1,2,3,3,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:15:37','2026-05-11 06:57:30'),(39,'pantai-dangas-1778451429239',1,1,2,3,NULL,NULL,NULL,'direkomendasikan',NULL,'2026-05-10 22:17:09','2026-05-11 06:55:49'),(40,'pantai-cipta-land-1778451527167',2,2,3,3,NULL,NULL,NULL,'sangat_direkomendasikan',NULL,'2026-05-10 22:18:47','2026-05-11 07:02:11');
/*!40000 ALTER TABLE `kategori_rekomendasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kecamatan`
--

DROP TABLE IF EXISTS `kecamatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) DEFAULT NULL,
  `nama_kecamatan` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_kecamatan`),
  UNIQUE KEY `nama_kecamatan` (`nama_kecamatan`),
  KEY `fk_kecamatan_admin` (`id_admin`),
  CONSTRAINT `fk_kecamatan_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kecamatan`
--

LOCK TABLES `kecamatan` WRITE;
/*!40000 ALTER TABLE `kecamatan` DISABLE KEYS */;
INSERT INTO `kecamatan` VALUES (1,1,'Nongsa','2026-05-10 16:12:15','2026-05-10 16:12:15'),(2,1,'Batam Kota','2026-05-10 16:12:15','2026-05-10 16:12:15'),(3,1,'Galang','2026-05-10 16:12:15','2026-05-10 16:12:15'),(4,1,'Sekupang','2026-05-10 16:12:15','2026-05-10 16:12:15'),(5,1,'Bengkong','2026-05-10 16:12:15','2026-05-10 16:12:15'),(6,1,'Batu Aji','2026-05-10 16:12:15','2026-05-10 16:12:15'),(7,1,'Sagulung','2026-05-10 16:12:15','2026-05-10 16:12:15'),(8,1,'Batu Ampar','2026-05-10 16:12:15','2026-05-10 16:12:15'),(9,1,'Lubuk Baja','2026-05-10 16:12:15','2026-05-10 16:12:15'),(10,1,'Belakang Padang','2026-05-10 16:12:15','2026-05-10 16:12:15'),(11,1,'Bulang','2026-05-10 16:12:15','2026-05-10 16:12:15');
/*!40000 ALTER TABLE `kecamatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pantai`
--

DROP TABLE IF EXISTS `pantai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pantai` (
  `id_pantai` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `nama_pantai` varchar(150) NOT NULL,
  `kelurahan` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `deskripsi_singkat` text DEFAULT NULL,
  `deskripsi_lengkap` text DEFAULT NULL,
  `highlight` varchar(255) DEFAULT NULL,
  `kategori_pantai` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`kategori_pantai`)),
  `aktivitas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`aktivitas`)),
  `cocok_untuk` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cocok_untuk`)),
  `tips_kunjungan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tips_kunjungan`)),
  `rating` decimal(2,1) DEFAULT 0.0,
  `jumlah_ulasan` int(11) DEFAULT 0,
  `tiket_masuk` varchar(100) DEFAULT 'Gratis',
  `tiket_masuk_rp` int(11) DEFAULT 0,
  `jam_buka` varchar(100) DEFAULT '24 Jam',
  `jarak_dari_kota` decimal(6,2) DEFAULT 0.00,
  `jarak_label` varchar(150) DEFAULT NULL,
  `akses_jalan` enum('mudah','sedang','sulit') DEFAULT 'mudah',
  `latitude` decimal(10,7) DEFAULT 0.0000000,
  `longitude` decimal(10,7) DEFAULT 0.0000000,
  `google_maps_url` text DEFAULT NULL,
  `foto_url` text DEFAULT NULL,
  `image_gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_gallery`)),
  `badge` varchar(100) DEFAULT NULL,
  `badge_color` varchar(20) DEFAULT '#3B82F6',
  `featured` tinyint(1) DEFAULT 0,
  `trending` tinyint(1) DEFAULT 0,
  `verified_date` date DEFAULT NULL,
  `sumber_data` varchar(100) DEFAULT NULL,
  `status_data` enum('draft','valid','perlu_kurasi') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_pantai`),
  KEY `fk_pantai_kecamatan` (`id_kecamatan`),
  KEY `fk_pantai_admin` (`id_admin`),
  CONSTRAINT `fk_pantai_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pantai_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pantai`
--

LOCK TABLES `pantai` WRITE;
/*!40000 ALTER TABLE `pantai` DISABLE KEYS */;
INSERT INTO `pantai` VALUES ('larantuka-pantai-1778450462897',3,1,'Larantuka Pantai','Galang','Jl. Trans Barelang, Galang Baru, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai yang terletak di Galang Baru, ujung Jembatan 6 Barelang, Kota Batam. Pantai ini menawarkan pemandangan alam yang asri, berpasir cukup lembut, dan dikelilingi pulau-pulau kecil, menjadikannya lokasi yang tenang dan cocok untuk bersantai.','','','[]','[]','[]','[]',4.1,18,'Bayar',10000,'24 Jam',74.20,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:01:02','2026-05-25 12:52:23'),('marina-waterfront-1778451337291',4,1,'Marina Waterfront','Tanjungriau','Pantai Marina, Kawasan Marina Water Front City, Jl. KH Ahmad Dahlan No.Kelurahan, Tj. Riau, Kec. Sekupang, Kota Batam, Kepulauan Riau','Destinasi wisata populer yang terletak di dalam kawasan Marina Waterfront City, tepatnya di sisi barat Pulau Batam, Kecamatan Sekupang.','','','[]','[]','[]','[]',3.7,671,'Bayar',10000,'07.00 - 18.00',20.20,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:15:37','2026-05-10 22:15:37'),('pantai-3-putri-1778450076094',3,1,'Pantai 3 Putri','Rempang Cate','Rempang Cate, Galang, Batam City, Riau Islands','Adalah destinasi wisata pantai yang asri dengan pasir putih halus dan air laut biru jernih.','','','[]','[]','[]','[]',4.3,134,'Bayar',10000,'24 Jam',42.20,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:54:36','2026-05-10 21:54:36'),('pantai-air-nanti-1778450265845',3,1,'Pantai Air Nanti','Rempang Cate','Rempang Cate, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai tersembunyi yang tenang di Pulau Rempang, Barelang, Batam, terkenal dengan pasir putih bersih dan air laut jernih. Pantai ini menawarkan suasana santai dengan ombak kecil, pepohonan rindang, serta pemandangan matahari terbenam yang memukau, menjadikannya lokasi ideal untuk piknik keluarga.','','','[]','[]','[]','[]',4.1,187,'Bayar',10000,'24 Jam',30.40,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:57:45','2026-05-10 21:57:45'),('pantai-bahagia-1778434985969',1,1,'Pantai Bahagia','Sambau','Sambau, Nongsa, Batam City, Riau Islands','Destinasi wisata pesisir yang terletak di kawasan Nongsa, tepatnya di Kelurahan Sambau, Kota Batam','','','[]','[]','[]','[]',4.3,491,'Gratis',0,'24 Jam',20.50,'Dari Pusat Kota','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:43:06','2026-05-10 17:43:06'),('pantai-bale-bale-1778434152307',1,1,'Pantai Bale Bale','Sambau','Sambau, Kecamatan Nongsa, Kepulauan Riau','destinasi wisata pesisir di Nongsa, Batam, yang memadukan keindahan alam pantai dengan kearifan lokal masyarakat Kampung Tua','','','[\"Pantai\"]','[]','[]','[]',4.4,357,'Bayar',10000,'07.00 - 19.00',21.70,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:29:12','2026-05-10 17:29:12'),('pantai-biru-sehati-1778434804626',1,1,'Pantai Biru Sehati','Kabil','Kabil, Nongsa, Batam City, Riau Islands','Destinasi wisata pantai yang terletak di kawasan Kampung Tua Tanjung Piayu Laut, Batam, Kepulauan Riau','','','[]','[]','[]','[]',4.3,62,'Bayar',10000,'24 Jam',21.00,'Dari Pusat Kota','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:40:04','2026-05-10 17:40:04'),('pantai-boneta-1778434611564',1,1,'Pantai Boneta','Batu Besar','Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau','Adalah destinasi wisata pantai di kawasan Kampung Tua Batu Besar, Nongsa, Batam, yang terkenal dengan pasir putihnya yang lembut, air jernih, serta suasana yang landai.','','','[]','[]','[]','[]',4.0,37,'Bayar',5000,'07.00 - 21.00',15.00,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:36:51','2026-05-10 17:36:51'),('pantai-cakang-1778450772074',3,1,'Pantai Cakang','Galang','Pulau Galang-baru, Galang Baru, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai yang terletak di ujung Pulau Galang Baru, Batam, Kepulauan Riau, dan sering disebut sebagai titik 0 kilometer daratan terujung di Barelang','','','[]','[]','[]','[]',4.3,181,'Bayar',10000,'24 Jam',76.60,'','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:06:12','2026-05-10 22:06:12'),('pantai-cipta-land-1778451527167',4,1,'Pantai Cipta Land','Patam Lestari','Jl. Tiban Utara, Patam Lestari, Kec. Sekupang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai populer di kawasan Tiban, Sekupang, Batam, yang menawarkan pemandangan laut yang tenang dengan panorama gedung-gedung Singapura di kejauhan','','','[]','[]','[]','[]',4.2,885,'Bayar',20000,'07.00 - 23.00',13.50,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:18:47','2026-05-10 22:18:47'),('pantai-dangas-1778451429239',4,1,'Pantai Dangas','Tanjungpinggir','Tanjung Pinggir, Sekupang, Batam City, Riau Islands','Destinasi wisata pantai tersembunyi yang terletak di Kecamatan Sekupang, Batam, menawarkan suasana tenang dan sejuk dengan perairan berombak kecil yang cocok untuk bersantai','','','[]','[]','[]','[]',3.9,892,'Bayar',15000,'24 Jam',17.00,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:17:09','2026-05-10 22:17:09'),('pantai-dendang-melayu-1778449912770',3,1,'Pantai Dendang Melayu','Sijantung','Tembesi, Sagulung, Batam City, Riau Islands','Kawasan wisata alam dan ruang publik yang menjadi pintu gerbang menuju ikon Kota Batam, yaitu Jembatan I Barelang. Destinasi ini menawarkan perpaduan pesona panorama laut yang tenang dengan fasilitas modern seperti menara pandang dan panggung hiburan.','','','[\"Keluarga\"]','[\"Foto\"]','[\"Keluarga\"]','[]',4.4,2159,'Bayar',5000,'24 Jam',20.40,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:51:52','2026-05-10 21:51:52'),('pantai-elyora-1778450377716',3,1,'Pantai Elyora','Galang','Galang Baru, Galang, Batam City, Riau Islands','Destinasi wisata populer di ujung Jembatan 6 Barelang, Galang Baru, Batam, yang terkenal dengan pasir putih halus, air laut jernih berwarna hijau tosca, dan suasana santai.','','','[]','[]','[]','[]',4.5,1014,'Bayar',10000,'24 Jam',75.30,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:59:37','2026-05-10 21:59:37'),('pantai-kalat-1778450848719',3,1,'Pantai Kalat','Galang','Jl. Trans Barelang, Rempang Cate, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai di Kampung Kalat, Pulau Rempang, Batam (sekitar jembatan 4 Barelang) yang menawarkan pasir putih bersih dan air laut dangkal yang tenang','','','[]','[]','[]','[]',4.2,164,'Bayar',10000,'24 Jam',43.40,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:07:28','2026-05-10 22:07:28'),('pantai-ketapang-1778434490075',1,1,'Pantai Ketapang','Batu Besar','Kampung melayu No.11/12, RT./rw/RW.02/02, Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau','Kawasan pesisir alami yang berfungsi sebagai desa wisata dan dermaga penyeberangan, bukan sebuah resort mewah tunggal atau pulau tersendiri','','','[]','[]','[]','[]',4.3,58,'Bayar',8000,'24 Jam',14.50,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:34:50','2026-05-10 17:34:50'),('pantai-kirana-1778450960363',3,1,'Pantai Kirana','Rempang Cate','Jl. Trans Barelang, Rempang Cate, Galang, Kepulauan Riau','Salah satu destinasi wisata pantai yang terletak di kawasan Galang, tepatnya di sepanjang jalur Jl. Trans Barelang, Batam. Pantai ini menawarkan suasana yang tenang dan alami, menjadikannya pilihan menarik bagi pengunjung yang ingin melepas penat dari hiruk-pikuk kota','','','[]','[]','[]','[]',4.5,11,'Bayar',30000,'24 Jam',52.90,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:09:20','2026-05-10 22:09:20'),('pantai-lagorap-1778434374839',1,1,'Pantai Lagorap','Batu Besar','Jl. H. Moh., Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau','Pantai Lagorap di Nongsa, Batam, adalah destinasi wisata pantai berpasir putih yang bersih dan ekonomis, ideal untuk bersantai','','','[]','[]','[]','[]',4.2,165,'Bayar',5000,'09.00 - 17.30',14.70,'Dari Pusat Kota','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:32:54','2026-05-10 17:32:54'),('pantai-melayu-1778433521722',1,1,'Pantai Melayu','Batu Besar','Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau','adalah destinasi wisata pantai lokal yang populer dengan pasir putih halus, suasana teduh karena banyak pohon, dan perairan landai yang aman untuk berenang','','','[\"Pantai\"]','[\".\"]','[\".\"]','[]',4.2,346,'Bayar',5000,'24 Jam',17.80,'Dari Pusat Kota','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:18:41','2026-05-10 17:18:41'),('pantai-melayu-barelang-1778435187412',3,1,'Pantai Melayu Barelang','Rempang Cate','Jalan Trans Barelang, Bulang, Rempang Cate, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata pantai populer di Pulau Rempang, Batam, yang terkenal dengan pasir putih halus dan air laut jernih','','','[]','[]','[]','[]',4.2,1036,'Bayar',10000,'24 Jam',43.50,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:46:27','2026-05-10 17:46:27'),('pantai-melur-barelang-1778435289814',3,1,'Pantai Melur Barelang','Sijantung','Sijantung, Galang, Batam City, Riau Islands','Destinasi wisata pesisir yang terletak di Pulau Galang, Kepulauan Riau, sekitar 45 km di selatan pusat Kota Batam','','','[]','[]','[]','[]',4.4,566,'Bayar',15000,'24 Jam',56.90,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:48:09','2026-05-10 17:48:09'),('pantai-mirota-1778449685155',3,1,'Pantai Mirota','Sijantung','Desa Sijantung, Kelurahan Galang Barelang, Pulau Galang, Batam, Sijantung, Galang, Kota Batam, Kepulauan Ria','Destinasi wisata populer di kawasan Jembatan 5 Barelang, Sijantung, Batam, yang terkenal dengan pasir putih halus, air laut jernih yang tidak pernah surut, dan pemandangan matahari terbenam yang indah','','','[]','[]','[]','[]',4.3,1136,'Bayar',10000,'06.00 - 19.00',53.40,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:48:05','2026-05-10 21:48:05'),('pantai-nongsa-1778433680638',1,1,'Pantai Nongsa','Sambau','Sambau, Nongsa, Batam City, Riau Islands','destinasi wisata pantai populer di timur laut Batam, Kepulauan Riau, yang menawarkan pasir putih, perairan tenang, dan pemandangan langsung ke gedung pencakar langit Singapura','','','[\"Pantai\"]','[]','[]','[]',4.2,1296,'Bayar',3000,'24 Jam',22.40,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:21:20','2026-05-10 17:21:20'),('pantai-nuvasa-bay-1778434712779',1,1,'Pantai Nuvasa Bay','Kabil','Sambau, Nongsa, Batam City, Riau Islands','Kawasan hunian dan wisata terpadu seluas 228 hektar di Nongsa, Batam, yang dikembangkan oleh Sinar Mas Land dengan konsep resor premium','','','[]','[]','[]','[]',4.3,621,'Bayar',30000,'07.00 - 19.00',21.00,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:38:32','2026-05-10 17:38:32'),('pantai-panau-1778434906925',1,1,'Pantai Panau','Kabil','Kabil, Nongsa, Batam City, Riau Islands','Destinasi wisata pesisir yang terletak di Kampung Tua Panau, Nongsa, Batam, menawarkan suasana tradisional yang tenang','','','[]','[]','[]','[]',4.1,206,'Bayar',5000,'09.00 - 18.00',13.90,'Dari Pusat Kota','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:41:47','2026-05-10 17:41:47'),('pantai-pasir-putih-1778451053959',10,1,'Pantai Pasir Putih','Sekanakraya','Sekanak Raya, Belakang Padang, Batam City, Riau Islands','Destinasi wisata \"healing\" tersembunyi di Batam yang menawarkan hamparan pasir putih halus dan air laut jernih. Terletak di pulau yang tenang, pantai ini menyuguhkan suasana asri, pemandangan Selat Malaka, serta pemandangan Singapura di kejauhan, menjadikannya lokasi ideal untuk melepas penat.','','','[]','[]','[]','[]',4.0,228,'Bayar',5000,'07.00 - 17.00',17.40,'','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:10:53','2026-05-10 22:10:53'),('pantai-payung-1778435091587',1,1,'Pantai Payung','Batu Besar','No. 47, RT. 2 RW. 2, Kampung Melayu, Batu Besar, Batam, Kota Batam, Kepulauan Riau','Adalah destinasi wisata pantai yang menawan dengan pasir putih bersih, air laut jernih, dan suasananya tenang.','','','[]','[]','[]','[]',4.1,1000,'Bayar',5000,'07.30 - 21.00',14.50,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:44:51','2026-05-10 17:44:51'),('pantai-pulau-putri-nongsa-1778433886509',1,1,'Pantai Pulau Putri Nongsa','Sambau','Kelurahan Sambau, Kecamatan Nongsa, Kota Batam,','destinasi wisata pantai terdepan di Batam, Kepulauan Riau, yang berbatasan langsung dengan Singapura','','','[\"Pantai\"]','[]','[]','[]',4.4,173,'Bayar',3000,'24 Jam',22.70,'Dari Pusat Kota','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:24:46','2026-05-10 17:24:46'),('pantai-reviola-1778450677105',3,1,'Pantai Reviola','Galang','Galang Baru, Galang, Batam City, Riau Islands','Destinasi wisata pantai pasir putih yang menawan di Pulau Galang Baru, setelah Jembatan 6 Barelang, Kota Batam. Diresmikan pada awal 2020, pantai ini dikenal memiliki garis pantai panjang (sekitar 700 meter) yang bersih, berpasir putih, dan teduh oleh pohon cemara serta bakau, menjadikannya lokasi favorit untuk bersantai, piknik, dan berfoto di akhir pekan','','','[]','[]','[]','[]',4.5,644,'Bayar',10000,'24 Jam',75.60,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:04:37','2026-05-10 22:04:37'),('pantai-sekilak-1778434266041',1,1,'Pantai Sekilak','Batu Besar','Batu Besar, Nongsa, Batam City, Riau Islands','Destinasi wisata bahari seluas 30 hektar yang terletak di daerah Batu Besar, Nongsa, Batam. Pantai ini menawarkan perpaduan pemandangan alam yang asri dengan berbagai fasilitas rekreasi air yang terjangkau','','','[]','[]','[]','[]',4.2,341,'Bayar',5000,'09.00 - 19.00',15.10,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:31:06','2026-05-10 17:31:06'),('pantai-subangmas-1778449564129',3,1,'Pantai Subangmas','Subangmas','Subang Mas, Galang, Batam City, Riau Islands','Destinasi wisata bahari yang terletak di Pulau Subang Mas, Batam. Pantai ini dikenal dengan julukan \"hidden gem\" karena lokasinya yang tersembunyi dan suasana alamnya yang masih sangat asri','','','[]','[]','[]','[]',4.9,12,'Bayar',15000,'24 Jam',19.00,'','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:46:04','2026-05-10 21:46:04'),('pantai-tanjung-datuk-1778451242800',4,1,'Pantai Tanjung Datuk','Tanjung Pinggir','Jl. Kolonel sugiono No.1, Tj. Pinggir, Kec. Sekupang, Kota Batam, Kepulauan Riau','Destinasi wisata pesisir populer, terutama yang berlokasi di Sekupang, Batam, yang menawarkan pemandangan laut, garis pantai panjang, dan matahari terbenam (sunset) memukau dengan latar gedung pencakar langit Singapura','','','[]','[]','[]','[]',4.1,156,'Bayar',10000,'13.00 - 21.00',20.10,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:14:02','2026-05-10 22:14:02'),('pantai-tanjung-pinggir-1778451140940',4,1,'Pantai Tanjung Pinggir','Tanjung Pinggir','Tanjung Pinggir, Sekupang, Batam City, Riau Islands','Destinasi wisata populer di Sekupang, Batam, yang menawarkan pemandangan langsung ke gedung-gedung tinggi Singapura.','','','[]','[]','[]','[]',4.0,1292,'Bayar',10000,'07.00 - 19.00',19.90,'','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:12:21','2026-05-10 22:12:21'),('pantai-tegar-bahari-1778450550027',3,1,'Pantai Tegar Bahari','Galang','Galang Baru, Galang, Batam City, Riau Islands','Destinasi wisata pasir putih di Pulau Galang Baru, Batam (Jembatan 6 Barelang), yang terkenal dengan suasana tenang, asri, dan air laut jernih','','','[]','[]','[]','[]',4.4,364,'Bayar',20000,'24 Jam',76.00,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 22:02:30','2026-05-10 22:02:30'),('pantai-telukmata-ikan-1778433781264',1,1,'Pantai Telukmata Ikan','Sambau','Sambau, Nongsa, Batam City, Riau Islands','salah satu destinasi wisata pesisir yang terletak di Kampung Tua Teluk Mata Ikan, Kelurahan Sambau, Kecamatan Nongsa, Kota Batam.','','','[\"Pantai\"]','[]','[]','[]',4.5,131,'Bayar',3000,'24 Jam',20.70,'Dari Pusat Kota','mudah',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:23:01','2026-05-10 17:23:01'),('pantai-vio-vio-1778449792298',3,1,'Pantai Vio-Vio','Sijantung','Sijantung, Galang, Batam City, Riau Islands','Destinasi wisata populer di Pulau Galang, Batam, yang terkenal dengan pasir putih halus, air laut jernih berwarna biru-kehijauan, serta spot foto Instagramable seperti ayunan di tengah laut dan jembatan kayu','','','[]','[]','[]','[]',4.2,1329,'Bayar',15000,'09.00 - 21.00',57.90,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:49:52','2026-05-10 21:49:52'),('pantai-zore-1778450176946',3,1,'Pantai Zore','Rempang Cate','Rempang Cate, Galang, Batam City, Riau Islands','Objek wisata di Pulau Rempang, Batam, yang unik karena memadukan pemandangan laut dengan perkebunan buah naga seluas 4 hektare. Pantai ini menawarkan pengalaman bersantai di kafe, memetik buah naga segar, dan menikmati suasana pantai yang santai, namun pantainya kurang cocok untuk mandi atau berenang.','','','[]','[]','[]','[]',3.9,73,'Bayar',10000,'08.00 - 19.00',30.00,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:56:17','2026-05-10 21:56:17'),('pulau-abang-1778435431624',3,1,'Pulau Abang','Pulau Abang','Abang Island, Batam City, Riau Islands','Destinasi wisata bahari unggulan di Kecamatan Galang, Batam, yang terkenal sebagai surga snorkeling dan diving dengan julukan \"Maldives\"-nya Batam','','','[\"Pulau\"]','[\"Snorkeling\"]','[]','[]',4.1,41,'Bayar',290000,'07.00 - 18.00',65.00,'Dari Pusat kota','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:50:31','2026-05-10 17:50:31'),('pulau-rano-1778449451519',3,1,'Pulau Rano','Pulau Abang','Near Abang-besar Island, Pulau Abang, Galang, Kota Batam, Kepulauan Riau','Destinasi wisata tropis eksklusif di Kepulauan Riau, Batam, yang menawarkan pasir putih halus, air laut biru jernih, dan pemandangan bawah laut menawan, cocok untuk snorkeling dan water sports','','','[\"Pulau\"]','[\"Snokerling\"]','[]','[]',4.7,165,'Bayar',550000,'12.00 - 24.00',70.00,'','sulit',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 21:44:11','2026-05-10 21:44:11'),('tanjung-bembang-1778433390203',1,1,'Tanjung Bembang','Batu Besar','Batu Besar, Nongsa, Batam City, Riau Islands','Tanjung Bemban adalah destinasi wisata pantai dan kampung tua yang terletak di Kecamatan Nongsa, Batu Besar, Batam, Kepulauan Ria','','','[\"Pantai\"]','[\"Berenang\"]','[]','[]',4.3,182,'Gratis',0,'09.00 - 19.00',17.60,'','sedang',0.0000000,0.0000000,'','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80','[]','','#3B82F6',0,0,'2026-05-10',NULL,'valid','2026-05-10 17:16:31','2026-05-10 17:16:31');
/*!40000 ALTER TABLE `pantai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pantai_fasilitas`
--

DROP TABLE IF EXISTS `pantai_fasilitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pantai_fasilitas` (
  `id_pantai_fasilitas` int(11) NOT NULL AUTO_INCREMENT,
  `id_pantai` varchar(100) NOT NULL,
  `id_fasilitas` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pantai_fasilitas`),
  UNIQUE KEY `unique_pantai_fasilitas` (`id_pantai`,`id_fasilitas`),
  KEY `fk_pf_fasilitas` (`id_fasilitas`),
  CONSTRAINT `fk_pf_fasilitas` FOREIGN KEY (`id_fasilitas`) REFERENCES `fasilitas` (`id_fasilitas`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pf_pantai` FOREIGN KEY (`id_pantai`) REFERENCES `pantai` (`id_pantai`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pantai_fasilitas`
--

LOCK TABLES `pantai_fasilitas` WRITE;
/*!40000 ALTER TABLE `pantai_fasilitas` DISABLE KEYS */;
INSERT INTO `pantai_fasilitas` VALUES (9,'tanjung-bembang-1778433390203',1,NULL),(10,'tanjung-bembang-1778433390203',2,NULL),(11,'pantai-melayu-1778433521722',1,NULL),(12,'pantai-melayu-1778433521722',2,NULL),(13,'pantai-melayu-1778433521722',4,NULL),(14,'pantai-melayu-1778433521722',5,NULL),(15,'pantai-melayu-1778433521722',6,NULL),(16,'pantai-nongsa-1778433680638',1,NULL),(17,'pantai-nongsa-1778433680638',2,NULL),(18,'pantai-nongsa-1778433680638',3,NULL),(19,'pantai-nongsa-1778433680638',4,NULL),(20,'pantai-nongsa-1778433680638',5,NULL),(21,'pantai-nongsa-1778433680638',6,NULL),(22,'pantai-nongsa-1778433680638',10,NULL),(23,'pantai-telukmata-ikan-1778433781264',1,NULL),(24,'pantai-telukmata-ikan-1778433781264',2,NULL),(25,'pantai-telukmata-ikan-1778433781264',4,NULL),(26,'pantai-telukmata-ikan-1778433781264',6,NULL),(27,'pantai-pulau-putri-nongsa-1778433886509',1,NULL),(28,'pantai-pulau-putri-nongsa-1778433886509',2,NULL),(29,'pantai-pulau-putri-nongsa-1778433886509',4,NULL),(30,'pantai-pulau-putri-nongsa-1778433886509',5,NULL),(31,'pantai-pulau-putri-nongsa-1778433886509',6,NULL),(32,'pantai-bale-bale-1778434152307',1,NULL),(33,'pantai-bale-bale-1778434152307',2,NULL),(34,'pantai-bale-bale-1778434152307',4,NULL),(35,'pantai-bale-bale-1778434152307',5,NULL),(36,'pantai-bale-bale-1778434152307',6,NULL),(37,'pantai-sekilak-1778434266041',1,NULL),(38,'pantai-sekilak-1778434266041',2,NULL),(39,'pantai-sekilak-1778434266041',3,NULL),(40,'pantai-sekilak-1778434266041',4,NULL),(41,'pantai-sekilak-1778434266041',5,NULL),(42,'pantai-lagorap-1778434374839',1,NULL),(43,'pantai-lagorap-1778434374839',4,NULL),(44,'pantai-ketapang-1778434490075',4,NULL),(45,'pantai-ketapang-1778434490075',6,NULL),(46,'pantai-boneta-1778434611564',1,NULL),(47,'pantai-boneta-1778434611564',4,NULL),(48,'pantai-nuvasa-bay-1778434712779',1,NULL),(49,'pantai-nuvasa-bay-1778434712779',2,NULL),(50,'pantai-nuvasa-bay-1778434712779',3,NULL),(51,'pantai-nuvasa-bay-1778434712779',4,NULL),(52,'pantai-nuvasa-bay-1778434712779',5,NULL),(53,'pantai-nuvasa-bay-1778434712779',6,NULL),(54,'pantai-nuvasa-bay-1778434712779',8,NULL),(55,'pantai-nuvasa-bay-1778434712779',9,NULL),(56,'pantai-nuvasa-bay-1778434712779',10,NULL),(57,'pantai-biru-sehati-1778434804626',4,NULL),(58,'pantai-biru-sehati-1778434804626',6,NULL),(59,'pantai-panau-1778434906925',4,NULL),(60,'pantai-bahagia-1778434985969',1,NULL),(61,'pantai-bahagia-1778434985969',2,NULL),(62,'pantai-bahagia-1778434985969',4,NULL),(63,'pantai-bahagia-1778434985969',5,NULL),(64,'pantai-bahagia-1778434985969',6,NULL),(65,'pantai-payung-1778435091587',4,NULL),(66,'pantai-melayu-barelang-1778435187412',1,NULL),(67,'pantai-melayu-barelang-1778435187412',2,NULL),(68,'pantai-melayu-barelang-1778435187412',4,NULL),(69,'pantai-melayu-barelang-1778435187412',5,NULL),(70,'pantai-melayu-barelang-1778435187412',6,NULL),(71,'pantai-melur-barelang-1778435289814',1,NULL),(72,'pantai-melur-barelang-1778435289814',2,NULL),(73,'pantai-melur-barelang-1778435289814',3,NULL),(74,'pantai-melur-barelang-1778435289814',4,NULL),(75,'pantai-melur-barelang-1778435289814',5,NULL),(76,'pantai-melur-barelang-1778435289814',6,NULL),(77,'pantai-melur-barelang-1778435289814',9,NULL),(78,'pantai-melur-barelang-1778435289814',10,NULL),(79,'pulau-abang-1778435431624',1,NULL),(80,'pulau-abang-1778435431624',2,NULL),(81,'pulau-abang-1778435431624',3,NULL),(82,'pulau-abang-1778435431624',7,NULL),(83,'pulau-abang-1778435431624',8,NULL),(84,'pulau-abang-1778435431624',10,NULL),(85,'pulau-rano-1778449451519',1,NULL),(86,'pulau-rano-1778449451519',2,NULL),(87,'pulau-rano-1778449451519',3,NULL),(88,'pulau-rano-1778449451519',6,NULL),(89,'pulau-rano-1778449451519',7,NULL),(90,'pulau-rano-1778449451519',8,NULL),(91,'pulau-rano-1778449451519',9,NULL),(92,'pulau-rano-1778449451519',10,NULL),(93,'pantai-subangmas-1778449564129',1,NULL),(94,'pantai-subangmas-1778449564129',6,NULL),(95,'pantai-mirota-1778449685155',1,NULL),(96,'pantai-mirota-1778449685155',2,NULL),(97,'pantai-mirota-1778449685155',4,NULL),(98,'pantai-mirota-1778449685155',5,NULL),(99,'pantai-mirota-1778449685155',6,NULL),(100,'pantai-vio-vio-1778449792298',1,NULL),(101,'pantai-vio-vio-1778449792298',2,NULL),(102,'pantai-vio-vio-1778449792298',3,NULL),(103,'pantai-vio-vio-1778449792298',4,NULL),(104,'pantai-vio-vio-1778449792298',6,NULL),(105,'pantai-dendang-melayu-1778449912770',4,NULL),(106,'pantai-dendang-melayu-1778449912770',5,NULL),(107,'pantai-3-putri-1778450076094',1,NULL),(108,'pantai-3-putri-1778450076094',4,NULL),(109,'pantai-3-putri-1778450076094',5,NULL),(110,'pantai-3-putri-1778450076094',6,NULL),(111,'pantai-zore-1778450176946',1,NULL),(112,'pantai-zore-1778450176946',3,NULL),(113,'pantai-zore-1778450176946',4,NULL),(114,'pantai-zore-1778450176946',5,NULL),(115,'pantai-zore-1778450176946',9,NULL),(116,'pantai-air-nanti-1778450265845',4,NULL),(117,'pantai-air-nanti-1778450265845',5,NULL),(118,'pantai-elyora-1778450377716',1,NULL),(119,'pantai-elyora-1778450377716',2,NULL),(120,'pantai-elyora-1778450377716',3,NULL),(121,'pantai-elyora-1778450377716',4,NULL),(122,'pantai-elyora-1778450377716',5,NULL),(123,'pantai-elyora-1778450377716',6,NULL),(124,'larantuka-pantai-1778450462897',4,NULL),(125,'pantai-tegar-bahari-1778450550027',1,NULL),(126,'pantai-tegar-bahari-1778450550027',4,NULL),(127,'pantai-tegar-bahari-1778450550027',5,NULL),(128,'pantai-tegar-bahari-1778450550027',6,NULL),(129,'pantai-reviola-1778450677105',1,NULL),(130,'pantai-reviola-1778450677105',4,NULL),(131,'pantai-reviola-1778450677105',5,NULL),(132,'pantai-reviola-1778450677105',6,NULL),(133,'pantai-cakang-1778450772074',4,NULL),(134,'pantai-cakang-1778450772074',5,NULL),(135,'pantai-kalat-1778450848719',1,NULL),(136,'pantai-kalat-1778450848719',4,NULL),(137,'pantai-kirana-1778450960363',4,NULL),(138,'pantai-kirana-1778450960363',5,NULL),(139,'pantai-pasir-putih-1778451053959',1,NULL),(140,'pantai-pasir-putih-1778451053959',2,NULL),(141,'pantai-pasir-putih-1778451053959',3,NULL),(142,'pantai-pasir-putih-1778451053959',6,NULL),(143,'pantai-tanjung-pinggir-1778451140940',1,NULL),(144,'pantai-tanjung-pinggir-1778451140940',2,NULL),(145,'pantai-tanjung-pinggir-1778451140940',3,NULL),(146,'pantai-tanjung-pinggir-1778451140940',4,NULL),(147,'pantai-tanjung-pinggir-1778451140940',5,NULL),(153,'marina-waterfront-1778451337291',1,NULL),(154,'marina-waterfront-1778451337291',4,NULL),(155,'marina-waterfront-1778451337291',5,NULL),(156,'marina-waterfront-1778451337291',6,NULL),(157,'pantai-dangas-1778451429239',4,NULL),(158,'pantai-dangas-1778451429239',6,NULL),(159,'pantai-cipta-land-1778451527167',1,NULL),(160,'pantai-cipta-land-1778451527167',2,NULL),(161,'pantai-cipta-land-1778451527167',3,NULL),(162,'pantai-cipta-land-1778451527167',4,NULL),(163,'pantai-cipta-land-1778451527167',5,NULL),(164,'pantai-tanjung-datuk-1778451242800',1,NULL),(165,'pantai-tanjung-datuk-1778451242800',2,NULL),(166,'pantai-tanjung-datuk-1778451242800',3,NULL),(167,'pantai-tanjung-datuk-1778451242800',4,NULL),(168,'pantai-tanjung-datuk-1778451242800',5,NULL),(169,'pantai-tanjung-datuk-1778451242800',9,NULL);
/*!40000 ALTER TABLE `pantai_fasilitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'rekomendasi_pantai_batam'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-10 21:06:39
