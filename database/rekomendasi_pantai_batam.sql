-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2026 at 09:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rekomendasi_pantai_batam`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'admin', 'admin@batampantai.local', 'batam2026', '2026-05-10 16:12:15');

-- --------------------------------------------------------

--
-- Table structure for table `fasilitas`
--

CREATE TABLE `fasilitas` (
  `id_fasilitas` int(11) NOT NULL,
  `nama_fasilitas` varchar(100) NOT NULL,
  `deskripsi_fasilitas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fasilitas`
--

INSERT INTO `fasilitas` (`id_fasilitas`, `nama_fasilitas`, `deskripsi_fasilitas`) VALUES
(1, 'toilet', 'Toilet umum'),
(2, 'mushola', 'Tempat ibadah'),
(3, 'warungMakan', 'Warung makan atau tempat kuliner'),
(4, 'parkirMotor', 'Area parkir motor'),
(5, 'parkirMobil', 'Area parkir mobil'),
(6, 'gazebo', 'Gazebo atau tempat duduk santai'),
(7, 'sewaAlat', 'Penyewaan alat wisata'),
(8, 'penginapan', 'Penginapan sekitar pantai'),
(9, 'wifi', 'Akses internet Wi-Fi'),
(10, 'penjagaPantai', 'Penjaga pantai atau petugas keamanan'),
(11, 'warung_makan', NULL),
(12, 'parkir_motor', NULL),
(13, 'parkir_mobil', NULL),
(14, 'sewa_alat', NULL),
(15, 'penjaga_pantai', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kategori_rekomendasi`
--

CREATE TABLE `kategori_rekomendasi` (
  `id_kategori_rekomendasi` int(11) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_rekomendasi`
--

INSERT INTO `kategori_rekomendasi` (`id_kategori_rekomendasi`, `id_pantai`, `suasana_score`, `fasilitas_score`, `akses_score`, `popularitas_score`, `rating_kategori`, `harga_kategori`, `jarak_kategori`, `label_rekomendasi`, `catatan_kategori`, `created_at`, `updated_at`) VALUES
(2, 'tanjung-bembang-1778433390203', 1, 1, 2, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 17:16:31', '2026-05-11 07:02:11'),
(3, 'pantai-melayu-1778433521722', 2, 2, 2, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:18:41', '2026-05-11 06:57:30'),
(4, 'pantai-nongsa-1778433680638', 3, 3, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 17:21:20', '2026-05-11 07:02:11'),
(5, 'pantai-telukmata-ikan-1778433781264', 2, 2, 3, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:23:01', '2026-05-11 06:57:30'),
(6, 'pantai-pulau-putri-nongsa-1778433886509', 2, 2, 1, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:24:46', '2026-05-11 07:33:10'),
(7, 'pantai-bale-bale-1778434152307', 2, 2, 3, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:29:12', '2026-05-11 06:57:30'),
(8, 'pantai-sekilak-1778434266041', 3, 2, 3, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:31:06', '2026-05-11 07:33:10'),
(9, 'pantai-lagorap-1778434374839', 2, 1, 2, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 17:32:54', '2026-05-11 07:02:11'),
(10, 'pantai-ketapang-1778434490075', 3, 1, 3, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:34:50', '2026-05-11 06:53:32'),
(11, 'pantai-boneta-1778434611564', 2, 1, 3, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 17:36:51', '2026-05-11 07:33:10'),
(12, 'pantai-nuvasa-bay-1778434712779', 3, 3, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 17:38:32', '2026-05-11 07:02:11'),
(13, 'pantai-biru-sehati-1778434804626', 2, 1, 2, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 17:40:04', '2026-05-11 07:02:11'),
(14, 'pantai-panau-1778434906925', 1, 1, 2, 2, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 17:41:47', '2026-05-11 07:02:11'),
(15, 'pantai-bahagia-1778434985969', 2, 2, 2, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:43:06', '2026-05-11 06:57:30'),
(16, 'pantai-payung-1778435091587', 3, 1, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 17:44:51', '2026-05-11 07:02:11'),
(17, 'pantai-melayu-barelang-1778435187412', 3, 2, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 17:46:27', '2026-05-11 07:02:11'),
(18, 'pantai-melur-barelang-1778435289814', 3, 3, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 17:48:09', '2026-05-11 07:02:11'),
(19, 'pulau-abang-1778435431624', 3, 3, 1, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 17:50:31', '2026-05-11 06:57:30'),
(20, 'pulau-ranoh-1778449451519', 3, 3, 1, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 21:44:11', '2026-05-11 06:57:30'),
(21, 'pantai-permata-1778449564129', 2, 1, 1, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 21:46:04', '2026-05-11 07:02:11'),
(22, 'pantai-mirota-1778449685155', 2, 2, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 21:48:05', '2026-05-11 07:02:11'),
(23, 'pantai-vio-vio-1778449792298', 3, 2, 2, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 21:49:52', '2026-05-11 07:02:11'),
(24, 'pantai-dendang-melayu-1778449912770', 2, 1, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 21:51:52', '2026-05-11 07:33:10'),
(25, 'pantai-3-putri-1778450076094', 3, 2, 2, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 21:54:36', '2026-05-11 06:57:30'),
(26, 'pantai-zore-1778450176946', 2, 2, 2, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 21:56:17', '2026-05-11 06:57:30'),
(27, 'pantai-air-nanti-1778450265845', 3, 1, 3, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 21:57:45', '2026-05-11 06:53:32'),
(28, 'pantai-elyora-1778450377716', 2, 3, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 21:59:37', '2026-05-11 07:02:11'),
(29, 'larantuka-pantai-1778450462897', 3, 1, 2, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:01:02', '2026-05-11 06:53:32'),
(30, 'pantai-tegar-bahari-1778450550027', 3, 2, 2, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:02:30', '2026-05-11 06:57:30'),
(31, 'pantai-reviola-1778450677105', 3, 2, 2, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 22:04:37', '2026-05-11 07:02:11'),
(32, 'pantai-cakang-1778450772074', 1, 1, 1, 1, NULL, NULL, NULL, 'tidak_direkomendasikan', NULL, '2026-05-10 22:06:12', '2026-05-11 07:02:11'),
(33, 'pantai-kalat-1778450848719', 3, 1, 3, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:07:28', '2026-05-11 06:53:32'),
(34, 'pantai-kirana-1778450960363', 3, 1, 2, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:09:20', '2026-05-11 06:53:32'),
(35, 'pantai-pasir-putih-1778451053959', 2, 2, 1, 2, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:10:54', '2026-05-11 06:57:30'),
(36, 'pantai-tanjung-pinggir-1778451140940', 2, 2, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 22:12:21', '2026-05-11 07:02:11'),
(37, 'pantai-tanjung-datuk-1778451242800', 2, 3, 3, 1, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:14:02', '2026-05-11 06:57:30'),
(38, 'marina-waterfront-1778451337291', 1, 2, 3, 3, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:15:37', '2026-05-11 06:57:30'),
(39, 'pantai-dangas-1778451429239', 1, 1, 2, 3, NULL, NULL, NULL, 'direkomendasikan', NULL, '2026-05-10 22:17:09', '2026-05-11 06:55:49'),
(40, 'pantai-cipta-land-1778451527167', 2, 2, 3, 3, NULL, NULL, NULL, 'sangat_direkomendasikan', NULL, '2026-05-10 22:18:47', '2026-05-11 07:02:11');

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `nama_kecamatan` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kecamatan`, `id_admin`, `nama_kecamatan`, `created_at`, `updated_at`) VALUES
(1, 1, 'Nongsa', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(2, 1, 'Batam Kota', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(3, 1, 'Galang', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(4, 1, 'Sekupang', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(5, 1, 'Bengkong', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(6, 1, 'Batu Aji', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(7, 1, 'Sagulung', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(8, 1, 'Batu Ampar', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(9, 1, 'Lubuk Baja', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(10, 1, 'Belakang Padang', '2026-05-10 16:12:15', '2026-05-10 16:12:15'),
(11, 1, 'Bulang', '2026-05-10 16:12:15', '2026-05-10 16:12:15');

-- --------------------------------------------------------

--
-- Table structure for table `pantai`
--

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pantai`
--

INSERT INTO `pantai` (`id_pantai`, `id_kecamatan`, `id_admin`, `nama_pantai`, `kelurahan`, `alamat`, `deskripsi_singkat`, `deskripsi_lengkap`, `highlight`, `kategori_pantai`, `aktivitas`, `cocok_untuk`, `tips_kunjungan`, `rating`, `jumlah_ulasan`, `tiket_masuk`, `tiket_masuk_rp`, `jam_buka`, `jarak_dari_kota`, `jarak_label`, `akses_jalan`, `latitude`, `longitude`, `google_maps_url`, `foto_url`, `image_gallery`, `badge`, `badge_color`, `featured`, `trending`, `verified_date`, `sumber_data`, `status_data`, `created_at`, `updated_at`) VALUES
('larantuka-pantai-1778450462897', 3, 1, 'Larantuka Pantai', 'Galang', 'Jl. Trans Barelang, Galang Baru, Galang, Kota Batam, Kepulauan Riau', 'Pantai Larantuka adalah destinasi wisata pesisir tersembunyi yang berjarak sekitar 40 km dari pusat Kota Batam. Pantai ini menawarkan suasana tenang dengan air laut yang jernih, ombak yang landai, serta dikelilingi pulau-pulau kecil bervegetasi unik.', 'Pantai Larantuka adalah destinasi wisata pesisir tersembunyi yang berlokasi di kawasan Jembatan 6 Barelang, Kota Batam. Berjarak sekitar 40 km dari pusat Kota Batam, tempat ini menawarkan suasana alam yang tenang dan cocok untuk liburan santai bersama keluarga. Keindahan Alam: Pantai ini dikelilingi oleh gugusan pulau kecil yang unik serta vegetasi pesisir yang rimbun, memberikan suasana sejuk meski pada siang hari. Aktivitas Utama: Air lautnya yang jernih dan ombak yang relatif tenang menjadikannya lokasi yang aman dan nyaman untuk berenang serta bermain air. Fasilitas: Pengelola telah menyediakan fasilitas yang cukup memadai bagi wisatawan, meliputi pondok/gazebo untuk bersantai, toilet umum, dan rumah panggung yang bisa disewa atau digunakan.', 'Suasana Privat, Air Jernih, Aman Berenang, Pemandangan Pulau dan Gubuk Panggung', '[]', '[\"Bersantai di Gazebo\",\"Menikmati Pemandangan Pulau\",\"Berenang\",\"Bermain Pasir\",\"Berfoto di Rumah Panggung\",\"Berkemah\",\"Berpiknik bersama Keluarga dan Memancing.\"]', '[\"Keluarga\"]', '[\"1. Berangkat pagi hari.\",\"2. Cek kondisi kendaraan.\",\"3. Gunakan aplikasi navigasi.\",\"4. Bawa perbekalan sendiri.\",\"5. Siapkan baju ganti.Booking gazebo/penginapan dahulu.\"]', 4.1, 18, 'Bayar', 10000, '24 Jam', 74.20, '', 'sedang', 0.6260114, 104.2689852, 'https://maps.app.goo.gl/dLjHHaUEti7kY4HS9', '/uploads/1782836253047-ogmndajg38d.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:01:02', '2026-07-01 03:23:02'),
('marina-waterfront-1778451337291', 4, 1, 'Marina Waterfront', ' Tanjung Riau', 'Pantai Marina, Kawasan Marina Water Front City, Jl. KH Ahmad Dahlan No.Kelurahan, Tj. Riau, Kec. Sekupang, Kota Batam, Kepulauan Riau', 'Marina Waterfront Sekupang adalah kawasan wisata bahari terpadu di Batam yang memadukan keindahan pantai, resor mewah, hiburan, dan pelabuhan feri internasional dalam satu tempat.', 'Marina Waterfront (sering disebut sebagai Waterfront City) di Sekupang, Batam, adalah kawasan terpadu yang memadukan pesona resor pantai, wisata bahari, dan fasilitas olahraga. Terkenal sebagai spot sunset ikonik, kawasan ini dilengkapi dermaga feri internasional, resor tepi pantai seperti Harris Resort, dan area bersantai.', 'Sunset Ikonik, One-Stop Wisata, Wahana Adrenalin dan Gerbang Internasional', '[]', '[\"Menikmati sunset di tepi pantai yang landai\",\"Bermain gokart di sirkuit balap area Waterfront\",\"Mencoba water sports seperti jet ski dan banana boat\",\"Berenang di kolam raksasa Harris Resort Batam\",\"Kulineran seafood segar di pinggir pantai saat malam\",\"Bersepeda santai mengelilingi kawasan resor yang asri dan Bermain golf di lapangan hijau sekitar kawasan Sekupang.\"]', '[\"Teman\",\"Keluarga dan Pasangan\"]', '[\"1. Datang jam 4 sore untuk cuaca adem dan momen sunset.\",\"2. Bawa baju ganti jika ingin bermain wahana air.\",\"3. Siapkan uang tunai untuk jajan di warung lokal.\",\"4. Pakai tabir surya demi melindungi kulit dari terik pantai.\",\"5. Pesan hotel jauh hari jika ingin menginap saat weekend.\",\"6. Gunakan transportasi daring karena angkutan umum masih minim.\"]', 3.7, 671, 'Bayar', 10000, '07.00 - 18.00', 20.20, '', 'mudah', 1.0827000, 103.9576000, 'https://maps.app.goo.gl/oeuCd9wLc33rbJsc6', '/uploads/1782874645020-ak12xu19wcn.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:15:37', '2026-07-01 03:23:54'),
('pantai-3-putri-1778450076094', 3, 1, 'Pantai 3 Putri', 'Rempang Cate', 'Rempang Cate, Galang, Batam City, Riau Islands', 'Pantai Tiga Putri adalah objek wisata pantai baru di kawasan Rempang (sekitar Jembatan 4 Barelang) yang menawarkan keindahan alam asri. Pantai ini digemari wisatawan lokal karena ombaknya yang tenang dan areanya yang bersih untuk berkemah.', 'Berlokasi sekitar 42 kilometer dari pusat kota Batam, Pantai Tiga Putri menjadi permata tersembunyi di wilayah Rempang Cate. Daya tarik utama destinasi ini terletak pada perairannya yang jernih, ombak yang bersahabat untuk berenang, serta ekosistem yang masih alami di mana pengunjung sering menemukan kelomang di sepanjang pasirnya. Walaupun akses jalan masuk dari jalan raya trans-Barelang masih berupa jalan tanah yang sedikit menantang (off-road), rasa lelah perjalanan akan langsung terbayar begitu melihat keindahan panorama laut lepas yang tenang dan angin sepoi-sepoi yang menyejukkan.', 'Spot Sunset Sempurna, Pasir Putih Luas & Bersih dan Suasana Tenang & Alami', '[]', '[\"Berenang\",\"Menikmati sunset\",\"Mendirikan tenda/berkemah\",\"Berburu foto estetik\",\"Bermain kelomang\",\"Piknik keluarga\",\"Bermain pasir pantai.\"]', '[\"Keluarga dengan anak kecil\",\"Komunitas camping/berkemah\",\"Pecinta ketenangan (healing)\",\"Pemburu foto matahari terbenam\",\"Pasangan.\"]', '[\"1. Gunakan kendaraan yang tangguh\",\"2. Datanglah menjelang sore hari\",\"3. Perhatikan waktu pasang surut\",\"4. Bawa bekal makanan berat sendiri\",\"5. Siapkan uang tunai\"]', 4.3, 134, 'Bayar', 10000, '24 Jam', 42.20, '', 'sedang', 0.8654400, 104.1481500, 'https://maps.app.goo.gl/WgbMECoCUpdacMEHA', '/uploads/1782875904485-ojqveljvm6.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:54:36', '2026-07-01 03:28:40'),
('pantai-air-nanti-1778450265845', 3, 1, 'Pantai Air Nanti', 'Rempang Cate', 'Rempang Cate, Galang, Kota Batam, Kepulauan Riau', 'Pantai Airnanti adalah objek wisata pantai berpasir putih kecoklatan di Pulau Rempang yang menawarkan pesona alam sederhana dan alami. Daya tarik utamanya terletak pada ketenangan ombak dan suasananya yang tidak terlalu padat pengunjung.', 'Berjarak sekitar 1,5 jam perjalanan menggunakan mobil dari pusat kota Batam Center, Pantai Airnanti berada di sebelah kanan ruas jalan setelah Anda melewati Jembatan 4 Barelang. Berbeda dengan pantai-pantai komersial lainnya yang dipenuhi banyak spot foto buatan, Pantai Airnanti mempertahankan konsepnya yang sederhana dan apa adanya. Pantai ini memiliki garis pantai yang cukup landai dengan ombak yang bersahabat untuk bermain air. Pepohonan hijau yang tumbuh di sekitar pantai memberikan keteduhan alami, sehingga udaranya terasa sejuk meski di siang hari. Keunikan inilah yang membuat para pelancong, khususnya komunitas pencinta alam dan keluarga, kerap memilih tempat ini untuk mendirikan tenda dan menghabiskan malam di tepi laut.', 'Suasana Sunyi & Tenang, Destinasi Family Camping dan Akses Sangat Mudah', '[]', '[\"Berkemah (camping bersama keluarga)\",\"Berenang santai\",\"Menikmati angin pantai yang sejuk\",\"Bersantai di bawah pohon teduh\",\"Piknik\",\"Menikmati senja sore hari.\"]', '[\"Keluarga yang membawa anak-anak\",\"Komunitas pencinta alam/kemah\",\"Wisatawan yang mencari ketenangan (healing)\",\"Pengendara touring Barelang.\"]', '[\"1. Perhatikan plang selamat datang di sebelah kanan jalan utama Trans Barelang setelah Jembatan 4 agar lokasinya tidak terlewat.\",\"2. Bawa peralatan berkemah sendiri secara lengkap jika Anda berniat menginap, karena penyewaan alat kemah di lokasi masih sangat terbatas.\",\"3. Siapkan pasokan air minum tambahan dari luar untuk kenyamanan konsumsi Anda selama bersantai.\",\"4. Bawa bekal makanan berat sendiri karena warung yang ada di lokasi umumnya hanya menyediakan menu makanan instan dan jajanan ringan.\",\"5. Selalu jaga kebersihan area sekitar tenda Anda demi mempertahankan keasrian alami pantai ini.\"]', 4.1, 187, 'Bayar', 10000, '24 Jam', 30.40, '', 'mudah', 0.8687400, 104.1611700, 'https://maps.app.goo.gl/rM1TJeoc7WbYEMdq7', '/uploads/1782876288194-uq20virajah.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:57:45', '2026-07-01 03:27:57'),
('pantai-bahagia-1778434985969', 1, 1, 'Pantai Bahagia', 'Sambau', 'Sambau, Nongsa, Batam City, Riau Islands', '⁠Pantai Bahagia Nongsa adalah objek wisata pantai klasik berpasir putih lembut yang terletak tepat di depan Pelabuhan Feri Nongsapura. Pantai ini menawarkan suasana piknik keluarga yang santai, tenang, dan rindang dengan biaya masuk yang sangat ramah di kantong.', 'Berada satu garis pantai dengan kawasan wisata komersial Nongsa, Pantai Bahagia menghadap langsung ke arah Turi Beach Resort dan Selat Singapura. Setelah mengalami renovasi dan penataan oleh pengelola lokal, pantai yang dulunya dipenuhi semak kini telah rapi dengan jajaran pondok bersantai (gazebo). Pantai ini memiliki karakter ombak yang cenderung tenang, menjadikannya lokasi aman bagi anak-anak untuk berenang atau sekadar mencari kelomang dan kepiting kecil di tepi air saat surut. Keunggulan utama dari lokasi ini adalah posisinya yang strategis di dekat pintu keluar-masuk kapal internasional, sehingga memberikan pengalaman visual unik bagi para pelancong yang ingin menikmati hembusan angin laut sambil melihat hiruk-pikuk pelayaran selat.', 'View Singapura & Feri, Spot Berkemah Favorit dan Dekat Destinasi Sejarah', '[]', '[\"Berkemah (camping)\",\"Berenang\",\"Menikmati sunset dan pemandangan Singapura\",\"Piknik keluarga\",\"Memancing ikan\",\"Berburu kepiting/kelomang\",\"Berfoto dengan latar kapal feri.\"]', '[\"Keluarga dengan anak kecil\",\"Komunitas campervan atau tenda\",\"Wisatawan luar kota/asing (karena dekat pelabuhan)\",\"Pemburu foto lanskap laut\",\"Pasangan\"]', '[\"1. Datanglah pada sore hari sekitar jam 16.30 WIB untuk menyaksikan keindahan lampu-lampu gedung Singapura yang mulai menyala di seberang laut.\",\"2. Bawa peralatan pancing jika Anda hobi memancing, karena area sekitar bebatuan pantai menjadi salah satu spot favorit warga lokal.\",\"3. Siapkan losion anti-nyamuk atau serangga, terutama jika Anda berencana mendirikan tenda dan menginap di bawah rimbunnya pepohonan pantai.\",\"4. Sewa tenda di lokasi jika tidak ingin repot membawa perlengkapan sendiri, karena pihak pengelola sudah menyediakan jasa penyewaan tenda.\",\"5. Bawa wadah plastik bagi anak-anak yang ingin mengumpulkan kerang atau mencari kepiting kecil di sela-sela pasir.\"]', 4.3, 491, 'Gratis', 0, '24 Jam', 20.50, 'Dari Pusat Kota', 'sedang', 1.1969400, 104.1021400, 'https://maps.app.goo.gl/yJ4jVvNB4UUa71Pt9', '/uploads/1782876564387-4jt2pi5gv5e.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:43:06', '2026-07-01 03:32:51'),
('pantai-bale-bale-1778434152307', 1, 1, 'Pantai Bale Bale', 'Sambau', 'Sambau, Kecamatan Nongsa, Kepulauan Riau', 'Pantai Bale Bale Nongsa adalah tempat rekreasi keluarga yang terletak di dalam kawasan Desa Wisata Kampung Tua Bakau Serip. Pantai ini menawarkan suasana santai yang teduh dengan deretan pondok beratapkan jerami di bawah pepohonan rindang.', 'Berjarak sekitar 30 menit berkendara dari pusat kota Batam Center, Pantai Bale Bale menyuguhkan pemandangan alam pesisir yang tertata rapi dan bersih. Saat memasuki area pantai, pengunjung akan disambut oleh deretan warung tradisional yang menjual pernak-pernik kerajinan tangan dan pakaian khas pantai. Keunikan utama dari destinasi ini adalah keberadaan gazebo yang sengaja dibangun menjorok di antara pepohonan bakau, memberikan sensasi bersantai yang sejuk dan berbeda dari pantai lainnya. Pantai ini memiliki area pasang surut yang unik, di mana area berbatu akan terlihat saat air surut, membuatnya lebih cocok digunakan sebagai tempat piknik, berburu foto estetis, atau olahraga panahan dibandingkan untuk aktivitas berenang intensif.', 'Perpaduan Pantai & Mangrove, Pusat Edukasi & Budaya dan Wahana Permainan Air', '[\"Pantai\"]', '[\"Bermain kano\",\"Naik banana boat\",\"Menyusuri jembatan mangrove\",\"Menikmati pertunjukan tari Melayu\",\"Piknik keluarga\",\"Memanah\",\"Berburu foto sunset\",\"Outbound kelompok.\"]', '[\"Rombongan wisata keluarga\",\"Acara kumpul komunitas (gathering)\",\"Pencinta budaya lokal\",\"Wisatawan mancanegara\",\"Pemburu foto aesthetic.\"]', '[\"1. Gunakan alas kaki yang nyaman karena area pesisirnya memiliki banyak karang dan batu kecil yang berisiko menggores kaki telanjang.\",\"2. Bawa losion anti-nyamuk atau serangga, terutama jika Anda berniat bersantai hingga sore hari di sekitar area pohon bakau.\",\"3. Agendakan kunjungan di sore hari demi mendapatkan pemandangan matahari terbenam (sunset) terbaik tanpa sengatan terik matahari siang.\",\"4. Manfaatkan paket wisata rombongan jika datang bersama kantor atau komunitas agar bisa menikmati fasilitas outbound dan atraksi tarian budaya.\",\"5. Siapkan uang tunai\"]', 4.4, 357, 'Bayar', 10000, '07.00 - 19.00', 21.70, 'Dari Pusat Kota', 'mudah', 1.1895700, 104.1020200, 'https://maps.app.goo.gl/6gMMPbtwFvV7ShU5A', '/uploads/1782876818685-xmqbdjphke.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:29:12', '2026-07-01 03:36:48'),
('pantai-biru-sehati-1778434804626', 1, 1, 'Pantai Biru Sehati', 'Kabil', 'Kabil, Nongsa, Batam City, Riau Islands', 'Pantai Biru Sehati Nongsa adalah objek wisata pantai hidden gem berkarakteristik pasir cokelat bata alami yang menawarkan ketenangan. Dikelola secara swadaya oleh warga lokal, pantai ini menjadi pelarian akhir pekan favorit karena suasananya asri dan biayanya yang sangat murah.', 'Terletak di wilayah Kabil, Kecamatan Nongsa, Pantai Biru Sehati merupakan destinasi alternatif yang menyuguhkan pesona pesisir sederhana yang belum terlalu padat komersial. Garis pantainya memang tidak terlalu panjang, namun dipercantik dengan gugusan batu karang alami dan perahu nelayan tradisional yang kerap bersandar di tepian. Pengelola lokal merawat pantai ini dengan sangat baik dan terkenal ramah kepada pengunjung. Daya tarik utama destinasi ini adalah letaknya yang strategis bagi para pemburu kuliner; Anda bisa menikmati angin sepoi-sepoi pantai di pagi atau sore hari, lalu melanjutkan perjalanan singkat ke area kelong apung Tanjung Piayu Laut untuk menyantap hidangan laut segar.', 'Air Laut Jernih, Piknik di Bawah Pohon dan Dekat Pusat Kuliner Kelong', '[]', '[\"Piknik santai di bawah pohon rindang\",\"Berenang di air jernih\",\"Berburu foto lanskap karang dan perahu nelayan\",\"Bermain pasir pantai\",\"Menikmati angin laut\",\"Wisata kuliner seafood di kelong terdekat.\"]', '[\"Keluarga yang membawa anak-anak\",\"Kelompok sahabat/anak muda\",\"Pemburu ketenangan (healing)\",\"Pecinta kuliner hidangan laut.\"]', '[\"1. Datanglah pada pagi atau sore hari untuk mendapatkan hembusan angin paling sejuk dan menghindari terik matahari siang.\",\"2. Gunakan sandal pantai atau alas kaki karet saat berjalan ke arah air karena terdapat sela-sela batu karang yang cukup tajam.\",\"3. Gabungkan kunjungan Anda dengan agenda makan di restoran seafood apung Kampung Tua Piayu Laut agar liburan lebih maksimal.\",\"4. Siapkan uang tunai pecahan kecil untuk membayar tiket masuk swadaya dan retribusi parkir kendaraan.\",\"5. Bawa mainan cetakan pasir jika Anda datang membawa anak kecil karena areanya sangat ramah dan aman untuk anak bermain.\"]', 4.3, 62, 'Bayar', 10000, '24 Jam', 21.00, 'Dari Pusat Kota', 'sedang', 0.9836880, 104.0996990, 'https://maps.app.goo.gl/vHP89Ds2KELptcpV6', '/uploads/1782877642161-us3jr7s42ps.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:40:04', '2026-07-01 03:47:28'),
('pantai-boneta-1778434611564', 1, 1, 'Pantai Boneta', 'Batu Besar', 'Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau', 'Pantai Boneta adalah objek wisata pesisir tersembunyi (hidden gem) di Batu Besar, Nongsa, yang dikelola swadaya oleh warga lokal. Pantai ini menawarkan wisata pantai sederhana yang murah meriah dengan deretan pohon kelapa dan pondokan santai di tepiannya.', 'Pantai Boneta awalnya merupakan lahan pesisir yang dipenuhi tanaman bakau lebat sebelum akhirnya dibersihkan secara bergotong royong oleh warga setempat untuk dijadikan tempat wisata. Memiliki panjang garis pantai sekitar 95 meter, pantai ini menawarkan panorama alam yang masih asri dan sederhana. Untuk menuju ke lokasi, pengunjung harus masuk melewati gang di sekitar permukiman rumah panggung warga Kampung Tua Batu Besar. Begitu sampai, Anda akan disambut pembatas tembok pantai, deretan gazebo kayu, serta angin laut sepoi-sepoi yang menyejukkan. Pantai ini sangat disukai warga Batam karena tidak terlalu padat, ombaknya bersahabat, dan sangat cocok untuk melepas penat di akhir pekan.', 'Suasana Tenang & Otentik, Pantai Landai dan Pemandangan Kapal Laut', '[]', '[\"Berenang di tepi pantai\",\"Bersantai di pondokan\",\"Piknik bersama keluarga\",\"Berburu foto kapal laut\",\"Menikmati angin sepoi-sepoi\",\"Bermain pasir pantai.\"]', '[\"Keluarga yang membawa anak-anak\",\"Wisatawan lokal yang mencari ketenangan\",\"Kelompok teman untuk kumpul santai\",\"Pencinta wisata ramah kantong.\"]', '[\"1. Gunakan bantuan navigasi digital atau bertanya ke warga sekitar karena papan petunjuk jalan masuk menuju gang pantai masih cukup kecil.\",\"2. Datanglah pada sore hari agar cuaca tidak terlalu terik dan Anda bisa bersantai dengan nyaman di pinggir pantai.\",\"3. Bawa tikar piknik sendiri sebagai cadangan apabila pondokan/gazebo kayu di lokasi sudah penuh disewa pengunjung lain.\",\"4. Siapkan uang tunai kecil untuk membayar biaya sewa pondok harian dan jajan di warung-warung sekitar.\",\"5. Selalu awasi anak-anak secara mandiri saat mereka berenang atau bermain di tepi air laut.\"]', 4.0, 37, 'Bayar', 5000, '07.00 - 21.00', 15.00, 'Dari Pusat Kota', 'mudah', 1.1465200, 104.1030600, 'https://maps.app.goo.gl/F4CoYZMLYHLhR1u87', '/uploads/1782877919105-apabh9ji99.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:36:51', '2026-07-01 03:52:03'),
('pantai-cakang-1778450772074', 3, 1, 'Pantai Cakang', 'Galang', 'Pulau Galang-baru, Galang Baru, Galang, Kota Batam, Kepulauan Riau', 'Pantai Cakang adalah objek wisata bahari tersembunyi yang terletak di ujung Pulau Galang Baru (setelah Jembatan 6 Barelang). Pantai ini menawarkan pesona alam yang murni, pasir putih kecokelatan yang lembut, serta suasana sunyi yang sangat menenangkan.', 'Berjarak sekitar 2 hingga 2,5 jam perjalanan darat dari pusat kota Batam Center, Pantai Cakang merupakan destinasi liburan bagi mereka yang menyukai petualangan berkendara jauh. Jalur menuju ke pantai ini menyuguhkan pemandangan hijau perbukitan Barelang yang memanjakan mata. Begitu tiba di lokasi, Anda akan disambut oleh kawasan pesisir yang rindang oleh pohon-pohon rindang dan angin laut yang berembus kencang. Pantai Cakang memiliki garis pantai yang cukup panjang dengan karakter ombak yang bervariasi tergantung musim. Karena lokasinya yang terpencil, pantai ini masih mempertahankan keasrian alaminya dan menjadi pelarian sempurna bagi warga Batam yang ingin berkemah atau sekadar mencari ketenangan mutlak dari kesibukan kota.', 'Pantai Ujung Barelang, Air Laut Jernih & Alami dan Pemandangan Pulau-Pulau', '[]', '[\"Berkemah (camping)\",\"Berenang di air jernih\",\"Menikmati pemandangan pulau\",\"Piknik keluarga\",\"Berburu foto lanskap alam\",\"Berbincang santai di tepi laut\",\"Memancing ikan.\"]', '[\"Komunitas pencinta alam/kemah\",\"Pengendara touring jarak jauh\",\"Wisatawan yang mencari ketenangan murni (healing)\",\"Kelompok teman/sahabat.\"]', '[\"1. Pastikan kondisi kendaraan prima dan bahan bakar terisi penuh dari pusat kota karena jarak perjalanan yang sangat jauh dan minim SPBU di ujung Barelang.\",\"2. Berangkatlah sejak pagi hari agar Anda memiliki waktu berkunjung yang cukup lama sebelum hari mulai gelap untuk perjalanan pulang.\",\"3. Bawa perlengkapan logistik lengkap seperti makanan berat dan air minum tambahan karena warung di sekitar lokasi memiliki stok yang terbatas.\",\"4. Siapkan losion anti-nyamuk atau serangga jika Anda berniat untuk mendirikan tenda dan menginap di sekitar area pohon pantai.\",\"5. Siapkan uang tunai secukupnya untuk membayar tiket masuk swadaya dan biaya retribusi kebersihan di lokasi pantai.\"]', 4.3, 181, 'Bayar', 10000, '24 Jam', 76.60, '', 'sulit', 0.6426900, 104.2609800, 'https://maps.app.goo.gl/LRVYJDC5SHDP361MA', '/uploads/1782877978629-0aai5rkks33l.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:06:12', '2026-07-01 04:05:50'),
('pantai-cipta-land-1778451527167', 4, 1, 'Pantai Cipta Land', 'Patam Lestari', 'Jl. Tiban Utara, Patam Lestari, Kec. Sekupang, Kota Batam, Kepulauan Riau', 'Pantai Cipta Land adalah ruang publik tepi laut di kawasan Tiban Utara yang menawarkan suasana santai untuk menikmati angin sepoi-sepoi. Tempat ini menjadi area favorit warga lokal untuk bercengkerama, berolahraga, dan berburu kuliner murah meriah.', 'Berada di dalam kawasan proyek perumahan Cipta Land Sekupang, pantai ini tidak berkarakteristik pasir putih alami melainkan pantai buatan berpagar bebatuan dan brica penahan ombak. Lokasinya sangat strategis dan mudah dijangkau dalam waktu 15–20 menit dari pusat kota Batam Center via jalan beraspal mulus. Pantai Cipta Land bukanlah jenis pantai untuk berenang intensif melainkan kawasan rekreasi santai urban. Di sore hari, area ini bertransformasi menjadi pusat keramaian di mana pengunjung dapat duduk di bangku-bangku tepi laut sembari menikmati sunset, melihat kapal feri berlalu-lalang, dan menikmati sajian dari kedai-kedai makanan di sekitarnya.', 'Kaki Langit Singapura, Pusat Kuliner Sore dan Area Reklamasi Strategis', '[]', '[\"Nongkrong santai\",\"Menikmati pemandangan siluet Singapura\",\"Memancing ikan di tepi batu\",\"Berburu kuliner sore/malam\",\"Joging di sepanjang jalan pantai\",\"Bermain jet ski safari.\"]', '[\"Anak muda tempat nongkrong\",\"Keluarga dengan anak-anak\",\"Pecinta wisata kuliner malam\",\"Komunitas memancing lokal\",\"Penggemar olahraga joging.\"]', '[\"1. Datanglah selepas jam 16.30 WIB agar Anda tidak kepanasan karena area pantai buatan ini cenderung minim pepohonan pelindung di tepi batunya.\",\"2. Gunakan pakaian kasual atau olahraga yang nyaman jika Anda berniat memanfaatkan trek jalannya yang panjang untuk joging sore.\",\"3. Hindari bermain air atau berenang ke tengah karena bibir pantai didominasi batuan reklamasi tajam yang tidak aman untuk berenang.\",\"4. Bawa kamera atau ponsel dengan lensa zoom untuk menangkap potret gedung Singapura di seberang laut dengan lebih detail.\",\"5. Siapkan uang tunai untuk biaya retribusi parkir masuk kendaraan\"]', 4.2, 885, 'Bayar', 20000, '07.00 - 23.00', 13.50, '', 'mudah', 1.1348100, 103.9698500, 'https://maps.app.goo.gl/JCwzYDXGrHJKRyWn8', '/uploads/1782878926285-w34d089yame.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:18:47', '2026-07-01 04:11:21'),
('pantai-dangas-1778451429239', 4, 1, 'Pantai Dangas', 'Tanjungpinggir', 'Tanjung Pinggir, Sekupang, Batam City, Riau Islands', 'Pantai Dangas adalah tempat rekreasi keluarga tersembunyi (hidden gem) di Sekupang yang menawarkan suasana damai dan tenang. Pantai ini menjadi favorit warga lokal untuk menggelar tikar, piknik, hingga mengadakan acara keluarga karena tiket masuknya sangat ekonomis.', 'Berlokasi di Kecamatan Sekupang, Pantai Dangas menawarkan konsep wisata alam pesisir yang sederhana dan ramah kantong. Tidak seperti pantai terbuka yang panas gersang, area Pantai Dangas dikelilingi oleh pepohonan rimbun yang berpadu dengan hamparan rerumputan hijau rata. Karakter air lautnya cenderung tenang dengan ombak kecil, menjadikannya kolam alam yang ramah untuk berenang anak-anak. Area ini dikelola secara swadaya dan sering dimanfaatkan oleh komunitas untuk tempat berkemah harian karena suasananya menyerupai pantai pribadi apabila dikunjungi di luar akhir pekan (weekday).', 'Teduh dengan Lapangan Rumput, Batas Laut Bebatuan Unik dan View Siluet Singapura & Tanker', '[]', '[\"Piknik di atas rumput tepi laut\",\"Berenang santai\",\"Bermain kano atau perahu karet\",\"Berkemah (camping)\",\"Arisan/kumpul keluarga\",\"Berburu foto bebatuan pantai\",\"Bermain ayunan tepi pantai.\"]', '[\"Acara arisan/kumpul keluarga besar\",\"Orang tua yang membawa anak kecil\",\"Pencinta ketenangan (healing)\",\"Komunitas pencinta alam berkemah.\"]', '[\"1. Gunakan kendaraan pribadi atau transportasi daring (online) karena tidak ada trayek angkutan umum yang langsung menjangkau lokasi pantai.\",\"2. Bawa tikar piknik sendiri dari rumah agar bisa bersantai dengan nyaman di bawah rindangnya pepohonan atau area lapangan rumput.\",\"3. Siapkan bekal makanan dari luar jika ingin menu yang variatif, karena ketersediaan warung makan di dalam lokasi masih cukup sederhana.\",\"4. Bawa sandal pantai atau alas kaki cadangan karena sebagian area pantai memiliki material bebatuan kecil yang cukup tajam.\",\"5. Pilih waktu hari kerja (weekday) jika mendambakan suasana sepi yang sunyi serasa berlibur di pantai pribadi.\"]', 3.9, 892, 'Bayar', 15000, '24 Jam', 17.00, '', 'sedang', 1.1278200, 103.9314400, 'https://maps.app.goo.gl/ua7nVRErD3G6B3pc9', '/uploads/1782880378462-s0cecnhune.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:17:09', '2026-07-01 04:35:41'),
('pantai-dendang-melayu-1778449912770', 3, 1, 'Pantai Dendang Melayu', 'Sijantung', 'Tembesi, Sagulung, Batam City, Riau Islands', 'Dendang Melayu adalah objek wisata bahari dan ruang publik buatan yang terletak persis di sisi kiri sebelum memasuki Jembatan Tengku Fisabilillah (Jembatan 1 Barelang). Tempat ini menawarkan pelataran luas bersantai untuk menikmati angin laut, panorama senja, serta wisata kuliner jajanan lokal.', 'Berjarak sekitar 45 menit berkendara dari Bandara Internasional Hang Nadim, Pantai Dendang Melayu menjadi destinasi transit wajib bagi pelancong sebelum menjelajahi rangkaian pulau Barelang. Berbeda dari pantai pesisir berpasir untuk berenang, struktur area ini berupa dataran tinggi cor terstruktur dan tanggul bebatuan yang rapi di tepi air. Kawasan ini sengaja ditata oleh pemerintah daerah sebagai etalase pariwisata menyambut wisatawan lokal maupun mancanegara. Selain pelataran pandang atas yang luas, terdapat anak tangga yang menghubungkan ke area bawah di pinggir laut. Di sana, pengunjung bisa duduk santai di kedai-kedai sederhana sambil menikmati hidangan kelapa muda, memandangi lalu lalang perahu nelayan, serta merasakan langsung hembusan angin Selat Malaka yang sejuk.', 'Spot Foto Jembatan 1 Barelang, Menara Pandang Eksklusif dan Panggung Budaya Terbuka', '[\"Keluarga\"]', '[\"Berfoto dengan latar Jembatan Barelang\",\"Naik perahu keliling bawah jembatan\",\"Menikmati sunset senja\",\"Nongkrong santai kulineran\",\"Joging di jogging track\",\"Menonton pertunjukan seni budaya pada momen tertentu.\"]', '[\"Wisatawan luar kota atau mancanegara\",\"Keluarga yang ingin bertamasya sore\",\"Fotografer lanskap\",\"Anak muda tempat nongkrong murah meriah.\"]', '[\"1. Datanglah pada sore hari mulai pukul 16.00 WIB untuk berburu foto siluet sunset Jembatan Barelang yang spektakuler.\",\"2. Gunakan sewa perahu lokal (pompong) di area bawah tanggul jika ingin merasakan sensasi menyusuri laut tepat di bawah tiang pancang jembatan megah.\",\"3. Cobalah kuliner khasnya seperti jagung bakar, olahan kepiting goreng kriuk, atau bakso hangat yang dijajakan pedagang lokal.\",\"4. Bawa kamera atau handphone bertenaga prima karena setiap sudut di kawasan pelataran dan menara pandang ini sangat fotogenik.\",\"5. Siapkan uang tunai kecil untuk membayar biaya parkir retribusi masuk kendaraan yang terjangkau.\"]', 4.4, 2159, 'Bayar', 5000, '24 Jam', 20.40, '', 'mudah', 0.9996500, 104.0438100, 'https://maps.app.goo.gl/GVX7dEbi71mvJkBT8', '/uploads/1782880593758-315dzmssnyu.jpeg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:51:52', '2026-07-01 04:39:15'),
('pantai-elyora-1778450377716', 3, 1, 'Pantai Elyora', 'Galang', 'Galang Baru, Galang, Batam City, Riau Islands', 'Pantai Elyora adalah destinasi wisata bahari unggulan di Pulau Galang Baru (setelah Jembatan 6 Barelang) yang menawarkan keasrian alami yang menakjubkan. Pantai ini menjadi tujuan favorit warga Batam untuk piknik keluarga besar dan kegiatan luar ruangan karena areanya tertata rapi dan bersih.', 'Berjarak sekitar 2 jam perjalanan darat dari pusat kota Batam Center, Pantai Elyora berada di ujung selatan rangkaian Jembatan Barelang. Meskipun jaraknya cukup jauh, akses jalan menuju lokasi sudah beraspal mulus sehingga nyaman dilalui kendaraan. Begitu tiba, Anda akan disuguhi panorama laut lepas dengan ombak yang sangat tenang, menjadikannya kolam renang alam yang aman bagi siapa saja. Keunikan utama dari pantai ini adalah jajaran pohon bakau mati yang berdiri kokoh di atas pasir putih, memberikan latar belakang visual yang artistik dan fotogenik. Kawasan ini dikelola secara profesional oleh kelompok sadar wisata setempat, sehingga kebersihan lingkungan dan fasilitas dasarnya tetap terjaga dengan baik.', 'Pohon Mangrove Mati yang Estetik, Pasir Putih Bergradasi dan Area Pasang Surut Luas', '[]', '[\"Berenang di air jernih\",\"Berburu foto estetik di pohon bakau\",\"Bermain kano atau banana boat\",\"Berkemah (camping)\",\"Piknik keluarga besar\",\"Voli pantai\",\"Mencari kerang saat air surut.\"]', '[\"Keluarga besar yang membawa anak-anak\",\"Pecinta fotografi lanskap alam\",\"Komunitas untuk acara gathering\",\"Pasangan untuk foto pranikah (pre-wedding).\"]', '[\"1. Berangkatlah sejak pagi hari agar perjalanan tidak terasa melelahkan dan Anda bisa menikmati keindahan pantai sebelum matahari terlalu terik.\",\"2. Pastikan bahan bakar kendaraan penuh karena pom bensin (SPBU) resmi sangat jarang ditemukan setelah Anda melewati Jembatan 3 Barelang.\",\"3. Bawa pakaian pelindung sinar matahari atau pakai tabir surya karena area terbuka pantai ini memiliki paparan sinar matahari yang cukup kuat.\",\"4. Siapkan uang tunai secukupnya untuk membayar tiket masuk serta biaya sewa gazebo atau kano.\",\"5. Bawa kantong sampah sendiri untuk mengumpulkan sisa makanan Anda demi membantu menjaga kebersihan pasir putih pantai yang murni ini.\"]', 4.5, 1014, 'Bayar', 10000, '24 Jam', 75.30, '', 'mudah', 0.6558200, 104.2541200, 'https://maps.app.goo.gl/2HHwz9WLGB5o74z77', '/uploads/1782880836635-em3sd4i2lto.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:59:37', '2026-07-01 04:43:04'),
('pantai-kalat-1778450848719', 3, 1, 'Pantai Kalat', 'Galang', 'Jl. Trans Barelang, Rempang Cate, Galang, Kota Batam, Kepulauan Riau', 'Pantai Kalat adalah destinasi wisata bahari swadaya yang terletak di kawasan Kampung Kalat, Pulau Rempang, setelah melewati Jembatan 4 Barelang. Pantai ini menawarkan pesona rekreasi alam yang sederhana, bersih, dan sangat bersahabat untuk tempat berkumpul keluarga.', 'Berjarak sekitar 43 kilometer atau 1 jam perjalanan darat dari pusat kota Batam Center, Pantai Kalat berada di jalur strategis Rempang Cate yang bertetangga dengan Pantai Melayu. Berbeda dengan beberapa pantai yang gersang, Pantai Kalat dikelola secara swadaya oleh masyarakat setempat dengan mempertahankan karakteristik alaminya. Garis pantainya menyajikan hamparan pasir putih bersih yang dipadukan dengan air laut yang cukup tenang. Keunggulan utama pantai ini terletak pada kenyamanannya untuk rekreasi keluarga; areanya tidak terlalu bising, memiliki ruang publik yang lapang untuk anak-anak bermain pasir, serta air yang aman untuk sekadar berendam santai menikmati embusan angin laut.', 'Bisa Kasih Makan Ikan, Teduh & Alami dan Suasana Santai & Bersih', '[]', '[\"Berenang santai\",\"Memberi makan ikan kecil di pinggir air\",\"Piknik di bawah pohon rindang\",\"Bermain pasir pantai\",\"Berburu foto lanskap laut\",\"Bersantai menikmati angin pantai.\"]', '[\"Keluarga yang membawa anak-anak kecil\",\"Pasangan yang mencari suasana tenang\",\"Rombongan wisata arisan atau kumpul keluarga\",\"Wisatawan ramah kantong.\"]', '[\"1. Bawa remah roti atau pakan ikan dari luar jika ingin merasakan pengalaman seru berinteraksi dan memberi makan ikan-ikan kecil di tepi pantai.\",\"2. Datanglah pada pagi atau sore hari untuk menghindari sengatan terik matahari siang dan menikmati udara pesisir yang paling segar.\",\"3. Gunakan kendaraan pribadi (motor atau mobil) karena lokasinya yang berada di jalur Trans Barelang belum terjangkau oleh rute angkutan umum massal.\",\"4. Bawa tikar piknik sendiri agar bisa menggelar tempat duduk dengan bebas di bawah rindangnya pepohonan tepi laut.\",\"5. Siapkan uang tunai kecil untuk pembayaran tiket masuk swadaya masyarakat serta retribusi penggunaan toilet bilas.\"]', 4.2, 164, 'Bayar', 10000, '24 Jam', 43.40, '', 'mudah', 0.8711400, 104.1673800, 'https://maps.app.goo.gl/xPrrUqo7xRdBtTrk9', '/uploads/1782881315149-e8jqmhlgzlq.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:07:28', '2026-07-01 04:51:00'),
('pantai-ketapang-1778434490075', 1, 1, 'Pantai Ketapang', 'Batu Besar', 'Kampung melayu No.11/12, RT./rw/RW.02/02, Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau', '⁠Pantai Ketapang Nongsa adalah objek wisata pantai pasir putih kecokelatan di daerah Batu Besar (tidak jauh dari Kampung Jabi) yang menawarkan suasana rekreasi sederhana. Dikelola secara swadaya oleh warga setempat, pantai ini menjadi favorit keluarga lokal untuk piknik santai di hari libur.', 'Berjarak sekitar 25–30 menit dari pusat kota Batam Center, Pantai Ketapang terletak sejalur dengan deretan pantai Kampung Melayu di kawasan timur Batam. Pantai ini mempertahankan konsep alaminya yang asri dengan jejeran pohon kelapa dan pepohonan rindang di sepanjang tepiannya. Saat air laut sedang pasang, pemandangannya akan terlihat sangat cantik dengan gradasi air biru kehijauan. Karena lokasinya yang searah dengan lintasan udara bandara, pantai ini menawarkan pengalaman unik berupa gemuruh suara pesawat komersial yang bersiap mendarat setiap beberapa jam sekali. Pengelolanya terkenal sangat ramah kepada wisatawan, menjadikan suasana berlibur di pantai ini terasa sangat hangat dan komunal.', 'Spot Berburu Pesawat (Plane Spotting), Air Dangkal & Ombak Tenang dan Sangat Ramah Kantong', '[]', '[\"Menonton dan memotret pesawat terbang\",\"Berenang di air dangkal\",\"Menggelar tikar piknik keluarga\",\"Bermain pasir pantai\",\"Bernyanyi/karaoke di warung warga\",\"Menikmati es kelapa muda.\"]', '[\"Orang tua yang membawa balita/anak kecil\",\"Pencinta dunia kedirgantaraan (avgeek/plane spotter)\",\"Wisatawan dengan bujet hemat\",\"Rombongan arisan warga.\"]', '[\"1. Datanglah saat air laut sedang pasang (bisa cek perkiraan pasang surut harian online) agar pemandangan laut terlihat maksimal, bersih, dan segar untuk berenang.\",\"2. Siapkan kamera ponsel Anda dalam mode siap rekam agar tidak ketinggalan momen estetik ketika ada pesawat terbang melintas rendah di atas kepala Anda.\",\"3. Bawa tikar piknik sendiri dari rumah agar Anda bisa bebas memilih spot duduk santai di bawah rindangnya pepohonan tepi laut.\",\"4. Siapkan uang tunai pecahan kecil untuk membayar tiket masuk serta biaya parkir kendaraan.\",\"5. Pilih kunjungan di hari kerja (weekday) jika Anda kurang menyukai suasana bising, karena di hari libur pantai ini kerap ramai oleh rombongan warga yang bernyanyi karaoke.\"]', 4.3, 58, 'Bayar', 4000, '24 Jam', 14.50, 'Dari Pusat Kota', 'mudah', 1.1436100, 104.1022200, 'https://maps.app.goo.gl/a2W3mXrjDE88pZ739', '/uploads/1782881566766-gvlxnluaati.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:34:50', '2026-07-01 04:58:16'),
('pantai-kirana-1778450960363', 3, 1, 'Pantai Kirana', 'Rempang Cate', 'Jl. Trans Barelang, Rempang Cate, Galang, Kepulauan Riau', '⁠Pantai Kirana Galang adalah objek wisata pesisir alami yang bersih dan asri di kawasan Pulau Rempang menuju Pulau Galang. Pantai ini dikelola secara swadaya dan menjadi pilihan utama untuk rekreasi keluarga berkat suasananya yang aman, tenang, dan sangat hemat biaya.', 'Berjarak sekitar 1,5 jam perjalanan darat dari pusat kota Batam Center, Pantai Kirana berada di kawasan administratif Kelurahan Rempang Cate, Galang. Pantai ini memiliki lanskap pesisir yang landai dengan hamparan pasir putih kecokelatan serta air laut yang cukup tenang. Meskipun areanya tidak sepopuler pantai komersial raksasa di sekitarnya, keunggulan utama Pantai Kirana justru terletak pada keasrian lingkungan yang selalu dijaga kebersihannya. Area sekelilingnya ditumbuhi pepohonan rimbun yang memberikan keteduhan alami, sehingga udaranya terasa sejuk. Kombinasi antara kenyamanan fasilitas penunjang, kebebasan biaya sewa pondok, dan keamanan wilayah membuat pantai ini sering kali dijadikan lokasi acara youth camp, kumpul komunitas, hingga tamasya keluarga besar.', 'Fasilitas Serba Gratis, Listrik Hidup 24 Jam dan Pengelola Sangat Ramah', '[]', '[\"Berkemah (camping malam dengan listrik harian)\",\"Berenang santai di air tenang\",\"Piknik keluarga di gazebo gratis\",\"Membakar ikan/BBQ\",\"Bermain pasir pantai\",\"Berburu foto pemandangan laut.\"]', '[\"Rombongan wisata keluarga besar\",\"Komunitas pencinta alam/kegiatan camping\",\"Wisatawan dengan bujet hemat (backpacker)\",\"Acara gathering sekolah atau kantor.\"]', '[\"1. Bawa peralatan kabel roll panjang jika Anda berniat berkemah agar bisa menyambungkan daya dari fasilitas listrik 24 jam pengelola menuju ke dalam tenda Anda.\",\"2. Bawa bahan makanan/BBQ sendiri dari luar karena pengelola menyediakan area terbuka yang nyaman untuk memasak bersama rombongan.\",\"3. Gunakan kendaraan pribadi atau sewaan karena akses menuju ke lokasi pantai di jalur Trans Barelang belum terakomodasi oleh transportasi umum reguler.\",\"4. Datanglah lebih awal di akhir pekan jika ingin mengamankan area pondokan strategis, meskipun gazebonya gratis namun jumlahnya terbatas.\",\"5. Siapkan uang tunai kecil untuk membayar tiket masuk berkendara di gerbang utama swadaya masyarakat yang sangat terjangkau.\"]', 4.5, 11, 'Bayar', 30000, '24 Jam', 52.90, '', 'sedang', 0.7818900, 104.1741400, 'https://maps.app.goo.gl/FsrcfuwbfkiBVfef8', '/uploads/1782883816205-50ebjhriftr.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:09:20', '2026-07-01 05:33:03'),
('pantai-lagorap-1778434374839', 1, 1, 'Pantai Lagorap', 'Batu Besar', 'Jl. H. Moh., Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau', 'Pantai Lagorap adalah objek wisata pantai pasir putih kecokelatan yang terletak bersebelahan dengan Pantai Payung di Kampung Melayu. Pantai ini menawarkan area yang luas dan lapang untuk bersantai keluarga, berburu kerang saat surut, dan menikmati hiburan musik harian.', 'Berjarak sekitar 30 menit berkendara dari pusat kota Batam Center, Pantai Lagorap memiliki latar belakang sejarah yang unik dari zaman penjajahan Jepang. Nama \"Lagorap\" diambil dari ucapan penduduk sekitar karena di area pesisir ini banyak ditemukan sejenis kerang lokal yang disebut kerang gorap. Garis pantainya membentang cukup luas, menjadikannya sangat ideal untuk menampung ratusan pengunjung sekaligus. Selain menyuguhkan pemandangan lautan bebas dengan embusan angin sepoi-sepoi yang menenangkan, daya tarik utama pantai ini bertumpu pada kemudahan akses, kebersihan lingkungan pesisir yang terus dijaga swadaya oleh masyarakat, serta kehadiran panggung hiburan live music atau karaoke yang menghidupkan suasana liburan akhir pekan.', 'Melintasnya Pesawat Terbang, Kolaborasi Hankang Restaurant dan Wisata Murah Meriah', '[]', '[\"Menonton pesawat terbang melintas rendah\",\"Mencari kerang gorap saat air laut surut\",\"Menyantap hidangan laut (seafood)\",\"Menikmati live music dan karaoke warga\",\"Bermain pasir pantai bersama anak-anak\",\"Berburu foto berlatar laut lepas.\"]', '[\"Wisatawan dengan bujet hemat (backpacking)\",\"Keluarga besar yang membawa anak kecil\",\"Pecinta wisata kuliner hidangan laut\",\"Pemburu foto kedirgantaraan (plane spotter).\"]', '[\"1. Datanglah pada sore hari menjelang senja untuk mendapatkan suasana angin pesisir yang sejuk tanpa sengatan terik matahari.\",\"2. Bawa wadah atau ember kecil jika Anda atau anak-anak berniat untuk menyusuri pantai dan berburu kerang gorap saat air sedang surut.\",\"3. Siapkan daftar lagu favorit Anda jika tertarik untuk ikut menyumbangkan suara di fasilitas panggung karaoke terbuka bersama pengunjung lain.\",\"4. Siapkan kamera ponsel dalam mode siap rekam agar Anda tidak kehilangan momen mengambil video estetik saat pesawat komersial terbang rendah di atas pantai.\",\"5. Siapkan uang tunai kecil untuk membayar tiket masuk dan retribusi parkir kendaraan pribadi.\"]', 4.2, 165, 'Bayar', 5000, '09.00 - 17.30', 14.70, 'Dari Pusat Kota', 'sedang', 1.1471700, 104.1032300, 'https://maps.app.goo.gl/KS3ocYidN6GkK1wE7', '/uploads/1782884060332-l85xd0ktrl.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:32:54', '2026-07-01 05:36:55'),
('pantai-melayu-1778433521722', 1, 1, 'Pantai Melayu', 'Batu Besar', 'Batu Besar, Kecamatan Nongsa, Kota Batam, Kepulauan Riau', '⁠Pantai Melayu Nongsa adalah objek wisata pantai keluarga legendaris di pesisir timur laut Batam. Pantai ini menawarkan perairan yang jernih, ombak landai yang tenang, serta fasilitas rekreasi lengkap dengan biaya tiket masuk yang sangat ekonomis', 'Berjarak sekitar 30 menit berkendara dari pusat kota Batam Center, Pantai Melayu Nongsa merupakan salah satu destinasi wisata paling teratur di kawasan Kampung Tua. Berbeda dengan Pantai Melayu yang berada di jalur Jembatan Barelang, Pantai Melayu di Nongsa ini memiliki keunggulan geografis berupa posisi pantai yang menghadap langsung ke arah Selat Singapura. Air lautnya bergradasi biru kehijauan yang cantik dan memiliki arus yang tenang, menjadikannya kolam alam raksasa yang sangat aman untuk tempat berenang semua usia, terutama anak-anak. Kawasan pantai dikelola dengan rapi bersama komunitas sadar wisata setempat. Di sepanjang tepian pasirnya, tersedia jalan setapak, spot-spot foto menarik, serta panggung hiburan musik yang kerap menghidupkan suasana sore para pelancong.', 'Gedung Singapura & Kapal Besar, Sangat Teduh & Asri dan Dekat Pulau Putri', '[\"Pantai\"]', '[\"Berenang di air tenang\",\"Naik banana boat\",\"Mencoba wahana jet ski\",\"Berburu foto siluet Singapura\",\"Piknik di bawah pohon kelapa\",\"Menyeberang ke Pulau Putri\",\"Menikmati hidangan laut segar.\"]', '[\"Rombongan wisata keluarga besar\",\"Pasangan yang mencari pemandangan senja\",\"Komunitas untuk acara gathering\",\"Pencinta wahana olahraga air.\"]', '[\"1. Datanglah selepas pukul 15.30 WIB demi mendapatkan hembusan angin pantai paling sejuk dan menyaksikan panorama lampu perkotaan Singapura yang mulai menyala saat malam tiba.\",\"2. Sewa perahu kayu nelayan lokal jika Anda tertarik untuk menyeberang ke Pulau Putri yang terletak tepat di seberang pantai dengan waktu tempuh hanya sekitar 10 menit.\",\"3. Gunakan tabir surya secara merata karena paparan sinar matahari di area pasir terbuka pantai ini cukup kuat di siang hari.\",\"4. Bawa tikar piknik mandiri sebagai alternatif jika Anda ingin bersantai langsung di bawah rindangnya pohon kelapa tanpa menyewa gazebo.\",\"5. Siapkan uang tunai pecahan kecil untuk mempermudah transaksi tiket masuk, tarif parkir, dan jajan di warung.\"]', 4.2, 346, 'Bayar', 5000, '24 Jam', 17.80, 'Dari Pusat Kota', 'sedang', 1.1444100, 104.0991800, 'https://maps.app.goo.gl/DnR9x2k4QdGtzSgx8', '/uploads/1782886833363-1912dakbp7i.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:18:41', '2026-07-01 06:23:22'),
('pantai-melayu-barelang-1778435187412', 3, 1, 'Pantai Melayu Barelang', 'Rempang Cate', 'Jalan Trans Barelang, Bulang, Rempang Cate, Galang, Kota Batam, Kepulauan Riau', 'Pantai Melayu Barelang adalah objek wisata pantai keluarga favorit di Pulau Rempang yang menawarkan perpaduan keindahan alam klasik dan fasilitas rekreasi teratur. Pantai ini menjadi andalan utama warga lokal untuk acara kumpul-kumpul karena suasananya yang sejuk, bersih, dan ekonomis.', 'Berjarak sekitar 50 menit berkendara dari kawasan Batu Aji atau pusat kota Batam, Pantai Melayu terletak di sebelah kanan ruas jalan Trans Barelang setelah Anda melewati Jembatan 4 Barelang. Sebagai salah satu pantai senior di Batam, tempat ini berhasil mempertahankan popularitasnya berkat pengelolaan kebersihan yang dinilai sangat konsisten. Pantai Melayu menawarkan keindahan gradasi laut yang memanjakan mata serta embusan angin sepoi-sepoi di bawah kanopi pepohonan rindang. Berbeda dari pantai pesisir modern yang gersang, tata ruang alamiah di sini membuat pengunjung betah berlama-lama menggelar tikar piknik di atas rumput maupun pasir. Keunggulan ini menjadikannya destinasi wajib untuk agenda rekreasi keluarga besar, perayaan sekolah, hingga kumpul komunitas di akhir pekan.', 'Super Rindang & Teduh, Garis Pantai Luas & Panjang dan Sangat Ramah Anak', '[]', '[\"Berenang di air tenang\",\"Bermain banana boat\",\"Mencoba bola air\",\"Piknik keluarga di bawah pohon\",\"Bermain pasir pantai\",\"Berburu foto sunset sore hari\",\"Mengadakan permainan kelompok/game outbound.\"]', '[\"Rombongan wisata keluarga besar\",\"Acara kumpul komunitas (gathering kantor/sekolah)\",\"Orang tua yang membawa anak-anak kecil\",\"Wisatawan dengan anggaran hemat.\"]', '[\"1. Datanglah pada hari kerja (weekdays) jika Anda mendambakan suasana pantai yang tenang dan sunyi, karena tempat ini akan sangat padat dan ramai oleh rombongan bus wisata di hari Minggu.\",\"2. Datang atau bersiaplah dari jam 4 sore untuk mendapatkan panorama matahari terbenam (sunset) terbaik dengan cuaca yang sudah sejuk.\",\"3. Bawa tikar piknik mandiri sebagai antisipasi jika gazebo kayu di lokasi sudah penuh disewa oleh rombongan lain.\",\"4. Gunakan tabir surya (sunblock) untuk melindungi kulit Anda, meskipun areanya teduh, paparan angin laut dan sinar matahari tetap cukup kuat.\",\"5. Siapkan uang tunai kecil untuk membayar tiket masuk serta penyewaan wahana permainan.\"]', 4.2, 1036, 'Bayar', 10000, '24 Jam', 43.50, 'Dari Pusat Kota', 'mudah', 1.1906600, 104.0861100, 'https://maps.app.goo.gl/xH2dDnqyMcoZHciw6', '/uploads/1782887032730-um1scptczv.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:46:27', '2026-07-01 06:26:39'),
('pantai-melur-barelang-1778435289814', 3, 1, 'Pantai Melur Barelang', 'Sijantung', 'Sijantung, Galang, Batam City, Riau Islands', 'Pantai Melur Barelang adalah objek wisata bahari premium yang terletak di Pulau Galang, tepat setelah Anda melewati Jembatan 5 Barelang. Bersebelahan dengan situs sejarah Ex-Camp Vietnam, pantai ini memadukan keindahan alam tropis yang asri dengan pengelolaan wahana rekreasi modern bergaya resor.', 'Berjarak sekitar 57 kilometer atau 1 jam lebih berkendara dari pusat kota Batam Center, Pantai Melur merupakan salah satu destinasi wisata senior yang sukses bertransformasi menjadi kawasan rekreasi modern di Batam. Gerbang masuk pantai ini memiliki kontur jalan turunan bukit yang menyuguhkan pemandangan laut biru lepas yang memukau dari ketinggian. Berbeda dari pantai Barelang lainnya yang cenderung alami seadanya, Pantai Melur menyajikan tata ruang yang sangat teratur. Di sepanjang pesisirnya, tumbuh deretan pohon kelapa ikonik yang berpadu dengan payung pantai warna-warni, tempat tidur gantung (beanbag), dan pedestrian ramah pejalan kaki. Karena air lautnya jernih dan berombak sangat tenang, pantai ini tidak hanya diminati untuk rekreasi harian, tetapi juga menjadi pusat kegiatan outbound, doa bersama komunitas, hingga liburan menginap di akhir pekan.', 'Pasir Putih Terhalus, Bibir Pantai Super Landai dan Fasilitas Premium & Resort-Style', '[]', '[\"Berenang di laut dangkal\",\"Bermain jet ski\",\"Naik banana boat\",\"Mengendarai ATV atau sepeda motor listrik di pedestrian\",\"Berkeliling dengan perahu kano\",\"Bersantai di beanbag bawah payung pantai\",\"Mengadakan pesta BBQ/barbekyu laut\",\"Berkemah (camping tepi laut)\",\"Bermain voli pantai.\"]', '[\"Keluarga besar yang membawa anak kecil\",\"Rombongan wisata kantor/instansi (gathering)\",\"Komunitas pencinta olahraga air\",\"Wisatawan luar kota yang menjelajahi Barelang\",\"Pasangan berburu foto estetik.\"]', '[\"1. Pastikan sistem pengereman kendaraan prima karena jalur masuk utama menuju kawasan Pantai Melur memiliki turunan berliku yang cukup tajam.\",\"2. Sewa gazebo jika ingin menyanyi atau memutar musik, karena pondokan di pantai ini sudah dilengkapi fasilitas stopkontak arus listrik untuk menyalakan perangkat elektronik Anda.\",\"3. Sewa ATV atau motor listrik untuk anak-anak atau keluarga agar bisa menjelajahi jalur pedestrian panjang tepi pantai tanpa kelelahan.\",\"4. Gunakan tabir surya (sunblock) berkualitas karena area pasir terbuka di pantai ini cukup luas dan minim pohon pelindung besar di dekat air.\",\"5. Siapkan uang tunai untuk mempermudah transaksi tiket masuk serta biaya sewa wahana permainan air.\"]', 4.4, 566, 'Bayar', 15000, '24 Jam', 56.90, 'Dari Pusat Kota', 'mudah', 0.7425100, 104.2259300, 'https://maps.app.goo.gl/P6AWzJHqp4euy8d86', '/uploads/1782887248487-ob0kj7hr78g.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:48:09', '2026-07-01 06:29:49');
INSERT INTO `pantai` (`id_pantai`, `id_kecamatan`, `id_admin`, `nama_pantai`, `kelurahan`, `alamat`, `deskripsi_singkat`, `deskripsi_lengkap`, `highlight`, `kategori_pantai`, `aktivitas`, `cocok_untuk`, `tips_kunjungan`, `rating`, `jumlah_ulasan`, `tiket_masuk`, `tiket_masuk_rp`, `jam_buka`, `jarak_dari_kota`, `jarak_label`, `akses_jalan`, `latitude`, `longitude`, `google_maps_url`, `foto_url`, `image_gallery`, `badge`, `badge_color`, `featured`, `trending`, `verified_date`, `sumber_data`, `status_data`, `created_at`, `updated_at`) VALUES
('pantai-mirota-1778449685155', 3, 1, 'Pantai Mirota', 'Sijantung', 'Desa Sijantung, Kelurahan Galang Barelang, Pulau Galang, Batam, Sijantung, Galang, Kota Batam, Kepulauan Ria', 'Pantai Mirota Barelang adalah objek wisata bahari populer di Pulau Galang yang menawarkan perpaduan pemandangan alam tropis yang indah dan fasilitas rekreasi modern yang lengkap. Destinasi ini menjadi andalan warga lokal maupun pelancong luar daerah untuk berlibur karena dikelola secara profesional.', 'Berjarak sekitar 1 hingga 1,5 jam perjalanan darat dari pusat kota Batam Center, Pantai Mirota terletak di sebelah kanan jalan Trans Barelang tak jauh setelah Anda melewati Jembatan 5 (Jembatan Tuanku Tambusai). Pantai ini memiliki lanskap yang menawan dengan pepohonan rindang di tepian, jajaran tanggul batu penahan abrasi, serta anjungan foto yang menjorok ke laut. Berbeda dengan pantai-pantai tradisional, Pantai Mirota dikembangkan dengan konsep resor harian terpadu. Di sini, wisatawan tidak hanya bisa menikmati hamparan pasir yang bersih, tetapi juga dapat menyewa berbagai wahana olahraga air, memancing dari pelantar, atau bahkan bermalam di vila ber-AC bersama keluarga sembari mendengarkan syahdu deburan ombak malam.', 'Pantai Terbersih & Terawat, Vila Panggung Warna-Warni dan Kolam Air Alami Dangkal', '[]', '[\"Berenang di laut dangkal\",\"Bermain banana boat\",\"Mendayung kayak atau kano\",\"Berburu foto di spot anjungan estetis\",\"Memancing di pelantar kayu\",\"Berkemah (family camping)\",\"Bersantai di saung bawah pohon.\"]', '[\"Liburan keluarga besar bersama anak-anak\",\"Komunitas pencinta alam untuk berkemah\",\"Wisatawan yang mendambakan suasana tenang (healing)\",\"Pemburu foto lanskap laut.\"]', '[\"1. Perhatikan plang petunjuk jalan di sebelah kanan jalur Trans Barelang setelah melintasi Jembatan 5 agar gerbang masuknya tidak terlewat.\",\"2. Pesan vila jauh-jauh hari melalui kontak pengelola jika Anda berencana menginap saat akhir pekan karena kapasitasnya terbatas.\",\"3. Siapkan losion anti-nyamuk apabila Anda memutuskan untuk berkemah atau bermalam di area terbuka sekitar pantai.\",\"4. Bawa bekal makanan berat sendiri karena opsi warung makan besar permanen di dalam lokasi pantai ini masih tergolong minim.\",\"5. Siapkan uang tunai secukupnya karena seluruh sistem pembayaran tiket masuk dan sewa alat masih berbasis tunai.\"]', 4.3, 1136, 'Bayar', 10000, '06.00 - 19.00', 53.40, '', 'mudah', 0.7411200, 104.2238300, 'https://maps.app.goo.gl/yvjgxBiyhRQGKXfs9', '/uploads/1782887478447-imyi5buamgh.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:48:05', '2026-07-01 06:33:09'),
('pantai-nongsa-1778433680638', 1, 1, 'Pantai Nongsa', 'Sambau', 'Sambau, Nongsa, Batam City, Riau Islands', '⁠Pantai Nongsa adalah objek wisata pantai legendaris berpasir putih kecokelatan di ujung timur laut Pulau Batam. Pantai ini menawarkan suasana santai untuk tamasya keluarga, deburan ombak yang tenang untuk bermain air, serta biaya masuk yang sangat terjangkau bagi semua kalangan.', 'Berjarak sekitar 30 menit berkendara dari pusat kota Batam Center, Pantai Nongsa merupakan tanah kelahiran pariwisata Batam yang berada di dalam kawasan Kampung Tua Nongsa. Berbeda dari resor mewah di sekitarnya, pantai publik ini menyajikan keindahan alam tropis yang bersahaja dengan jajaran pohon kelapa ikonik di sepanjang garis pantainya. Perairannya yang tenang karena terlindung oleh pulau-pulau kecil menjadikannya kolam alam yang aman untuk berenang. Daya tarik visual utama pantai ini akan memuncak saat sore hari menjelang malam, di mana lampu-lampu dari gedung pencakar langit Singapura mulai menyala secara bergantian, menciptakan latar belakang foto yang eksotis dan memanjakan mata para pelancong.', 'Gedung Singapura & Pesawat, Gerbang Pulau Putri dan Kawasan Kampung Tua', '[\"Pantai\"]', '[\"Berenang di air tenang\",\"Menyeberang ke Pulau Putri naik perahu pompong\",\"Menikmati pemandangan siluet Singapura\",\"Berburu foto sunset dan pesawat terbang\",\"Piknik keluarga di bawah pohon kelapa\",\"Menikmati kuliner otak-otak bakar.\"]', '[\"Rombongan wisata keluarga besar\",\"Wisatawan luar daerah/mancanegara\",\"Pencinta fotografi lanskap senja\",\"Pemburu kuliner lokal tradisional\",\"Pasangan.\"]', '[\"1. Sewa perahu pompong nelayan lokal untuk menyeberang ke Pulau Putri demi mendapatkan pengalaman pasir putih yang lebih luas dan jernih.\",\"2. Datanglah pada sore hari sekitar pukul 16.30 WIB agar cuaca adem dan Anda bisa langsung melihat keindahan lampu kota Singapura saat gelap tiba.\",\"3. Cobalah jajanan otak-otak khas Melayu yang dibakar langsung oleh warga setempat di sepanjang pinggiran area masuk pantai.\",\"4. Bawa tikar piknik mandiri untuk diletakkan di bawah barisan pohon kelapa jika Anda ingin bersantai hemat tanpa perlu menyewa gazebo.\",\"5. Siapkan uang tunai pecahan kecil untuk mempermudah pembayaran tiket masuk dan biaya retribusi fasilitas lainnya.\"]', 4.2, 1296, 'Bayar', 3000, '24 Jam', 22.40, 'Dari Pusat Kota', 'mudah', 1.1458000, 104.1192000, 'https://maps.app.goo.gl/iQXYVY7LVdYci8aYA', '/uploads/1782887629118-h2d53j65o3j.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:21:20', '2026-07-01 06:36:42'),
('pantai-nuvasa-bay-1778434712779', 1, 1, 'Pantai Nuvasa Bay', 'Kabil', 'Sambau, Nongsa, Batam City, Riau Islands', 'Pantai Nuvasa Bay (dahulu dikenal sebagai Pantai Palm Spring) adalah destinasi wisata pantai premium di timur laut Batam. Dikelola secara profesional oleh Sinar Mas Land, kawasan ini menawarkan rekreasi kelas dunia yang higienis, tertata rapi, dan sarat akan wahana permainan adrenalin.', 'Berjarak sekitar 30–40 minut berkendara dari pusat kota Batam Center via jalan raya Nongsa, Pantai Nuvasa Bay menawarkan konsep liburan pesisir mewah bergaya resor modern. Dikembangkan di atas lahan masterplan seluas 228 hektare, pantai privat ini memiliki keunggulan pada kebersihan pasir putihnya yang selalu terjaga dan air laut biru yang jernih. Nuvasa Bay mengintegrasikan wisata pantai harian dengan fasilitas olahraga ekstrem seperti paintball, sirkuit motor petualangan, serta wahana apung Water World. Tidak hanya ramah untuk kunjungan rekreasi keluarga, area ini juga dirancang sebagai tempat peristirahat elite regional yang sering menjadi lokasi gathering korporat skala besar, berkat penataan tamannya yang estetik dan amenitasnya yang sangat komplet.', 'Kawasan Eco-Tourism Terpadu, Pusat Wahana Sea Forest Adventure dan View Singapura & Marina Bay', '[]', '[\"Bermain wahana banana boat\",\"Mengendarai jet ski\",\"Bermain paintball atau airsoft di Rain Forest battlefield\",\"Menyusuri hutan mangrove\",\"Bermain kano\",\"Snorkeling melihat terumbu karang\",\"Bermain golf di lapangan internasional\",\"Bermain di floating park Aqua Adventure\",\"Berfoto estetis di jembatan pantai\",\"Mengadakan acara company gathering.\"]', '[\"Perusahaan/instansi untuk acara team building\",\"Rombongan keluarga besar\",\"Pasangan untuk liburan romantis (staycation)\",\"Wisatawan mancanegara\",\"Pencinta olahraga air dan aktivitas luar ruangan (outdoor).\"]', '[\"1. Cek jam operasional resmi sebelum datang, di mana area pantai umumnya buka pukul 09.00–17.00 WIB pada hari kerja dan pukul 08.00–18.00 WIB saat akhir pekan.\",\"2. Gunakan pakaian olahraga atau kasual yang menyerap keringat jika ingin mencoba paket permainan fisik atau outbound di area Sea Forest Adventure.\",\"3. Siapkan dana liburan lebih karena tiket masuk dan sewa wahana permainan air di sini menggunakan tarif standar pariwisata profesional.\",\"4. Pesan kamar apartemen/vila jauh hari di klaster The Nove (seperti Menara Kalani atau Kaina) jika Anda berniat melakukan staycation mewah tepi laut.\",\"5. Bawa kamera dengan lensa mumpuni untuk mengabadikan momen sore hari karena perpaduan lapangan golf, laut biru, dan siluet Singapura menghasilkan pemandangan yang sangat fotogenik.\"]', 4.3, 621, 'Bayar', 34999, '07.00 - 19.00', 21.00, 'Dari Pusat Kota', 'mudah', 1.1927800, 104.0955600, 'https://maps.app.goo.gl/YwdkrwVm5rMRSJ7R8', '/uploads/1782887889434-uvchimabe5.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:38:32', '2026-07-01 06:40:26'),
('pantai-panau-1778434906925', 1, 1, 'Pantai Panau', 'Kabil', 'Kabil, Nongsa, Batam City, Riau Islands', 'Pantai pasir cokelat alami di perkampungan nelayan Kabil yang menawarkan suasana sunyi dan damai tanpa polesan komersial.', 'Terletak di Kampung Tua Panau, pantai ini menyuguhkan kearifan lokal yang kental. Garis pantainya tidak terlalu luas, namun asri karena dikelilingi pepohonan dan perahu nelayan tradisional. Destinasi harian yang sangat murah untuk sekadar mencari ketenangan.', 'Kampung Tua nelayan otentik, suasana sangat sunyi, view kapal tangki bersandar.', '[]', '[\"Bersantai di tepi laut\",\"Memancing ikan\",\"Berburu foto kehidupan nelayan\",\"Menikmati angin sepoi-sepoi.\"]', '[\"Pemburu ketenangan (healing)\",\"Fotografer human interest\",\"Wisatawan beranggaran hemat.\"]', '[\"1. Datang sore hari agar bisa berinteraksi langsung dengan nelayan setempat yang baru pulang melaut.\",\"2. Bawa bekal makanan sendiri karena warung di lokasi hanya menyediakan jajanan ringan.\"]', 4.1, 206, 'Bayar', 5000, '09.00 - 18.00', 13.90, 'Dari Pusat Kota', 'sedang', 1.0573900, 104.1378300, 'https://maps.app.goo.gl/sVZFgRundPpNUuJm9', '/uploads/1782888164335-4vfexfmyfic.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:41:47', '2026-07-01 06:44:12'),
('pantai-pasir-putih-1778451053959', 10, 1, 'Pantai Pasir Putih', 'Sekanakraya', 'Sekanak Raya, Belakang Padang, Batam City, Riau Islands', 'Pantai eksotis di Pulau Belakang Padang yang terkenal dengan panorama jajaran gedung pencakar langit Singapura yang terlihat sangat megah dan dekat.', 'Untuk menuju ke pantai ini, pengunjung harus menyeberang menggunakan perahu pancung dari pelabuhan Sekupang. Pantai ini dikelola dengan baik oleh masyarakat pulau, memiliki pasir yang bersih, serta udara yang terbebas dari polusi kendaraan perkotaan.', 'View paling dekat ke gedung Singapura, pasir putih bersih, ikon Pulau Penawar Rindu.', '[]', '[\"Menikmati skyline Singapura\",\"Berenang\",\"Berkeliling pulau naik becak tradisional\",\"Piknik keluarga\",\"Memotret kapal besar.\"]', '[\"Wisatawan luar daerah\",\"Keluarga\",\"Pencinta sejarah kota tua\",\"Fotografer lanskap.\"]', '[\"1. Cek jadwal kepulangan perahu pancung terakhir ke Batam agar Anda tidak tertinggal di pulau.\",\"2. Manfaatkan jasa sewa becak dari pelabuhan Belakang Padang untuk menuju lokasi pantai secara praktis.\"]', 4.0, 228, 'Bayar', 5000, '07.00 - 17.00', 17.40, '', 'sulit', 1.1491700, 103.8821900, 'https://maps.app.goo.gl/Ynu6vDDB64a224rP9', '/uploads/1782888274643-o2zkyrtyb1n.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:10:53', '2026-07-01 06:46:09'),
('pantai-payung-1778435091587', 1, 1, 'Pantai Payung', 'Batu Besar', 'No. 47, RT. 2 RW. 2, Kampung Melayu, Batu Besar, Batam, Kota Batam, Kepulauan Riau', 'Pantai publik populer yang searah lintasan pendaratan pesawat Bandara Hang Nadim, menjadikannya tempat favorit untuk nongkrong sore murah meriah.', 'Terletak bersebelahan dengan Pantai Melayu Nongsa, Pantai Payung selalu ramai saat akhir pekan. Pantai ini dilapisi pasir putih kecokelatan yang landai dengan ombak kecil, serta dipercantik dengan jajaran payung pantai warna-warni milik pedagang.', 'Spot plane spotting terbaik, kuliner kaki lima melimpah, pantai ramah anak.', '[]', '[\"Menonton pesawat melintas rendah\",\"Berenang aman\",\"Karaoke komunal di warung\",\"Menyantap otak-otak bakar\",\"Bermain pasir\"]', '[\"Keluarga dengan balita\",\"Anak muda tempat nongkrong\",\"Komunitas pemburu foto pesawat (plane spotter)\"]', '[\"1. Datang jam 4 sore agar cuaca teduh dan bisa menikmati kelap-kelip lampu pelayaran laut saat petang.\",\"2. Siapkan uang tunai kecil karena jajanan di sepanjang pantai didominasi oleh UMKM lokal tradisional.\"]', 4.1, 1000, 'Bayar', 5000, '07.30 - 21.00', 14.50, 'Dari Pusat Kota', 'mudah', 1.1475700, 104.1035500, 'https://maps.app.goo.gl/oMNPWdiYqkCYrDTaA', '/uploads/1782888396126-hdzagieozz.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:44:51', '2026-07-01 06:48:00'),
('pantai-permata-1778449564129', 3, 1, 'Pantai Permata', 'Subangmas', 'Subang Mas, Galang, Batam City, Riau Islands', 'Pantai urban tersembunyi di kawasan Kampung Tua Tanjung Uma yang menyajikan pesona laut di tengah pusat perkotaan Batam.', 'Aksesnya sangat dekat dari kawasan bisnis Nagoya dan Jodoh. Pantai ini tidak memiliki pasir putih yang luas melainkan pesisir bebatuan buatan, namun sangat populer bagi warga lokal sebagai tempat melarikan diri sejenak untuk melihat matahari terbenam.', 'Berada di tengah kota, view Jembatan Laluan Madani & pelabuhan, sangat ramah kantong.', '[]', '[\"Menikmati sunset perkotaan\",\"Memancing di dermaga/batu\",\"Nongkrong sore\",\"Kulineran jajanan gerobak.\"]', '[\"Pekerja kantoran untuk melepas penat\",\"Anak muda\",\"Komunitas memancing lokal.\"]', '[\"1. Gunakan sepeda motor jika berkunjung saat akhir pekan karena akses jalan masuk kampung tua cenderung padat.\",\"2. Hindari berenang ke tengah karena area ini merupakan jalur lalu lintas kapal kayu dan dekat pemukiman pelabuhan.\"]', 4.9, 12, 'Bayar', 15000, '24 Jam', 19.00, '', 'sulit', 0.9022600, 104.1481100, 'https://maps.app.goo.gl/hrrKzLHQm8dq92rp7', '/uploads/1782888512858-wb1uk155lc8.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:46:04', '2026-07-01 06:50:14'),
('pantai-pulau-putri-nongsa-1778433886509', 1, 1, 'Pantai Pulau Putri Nongsa', 'Sambau', 'Kelurahan Sambau, Kecamatan Nongsa, Kota Batam,', 'Cagar alam pulau kecil terluar yang menawarkan keindahan pasir putih bersih menakjubkan dan air laut jernih berjarak 1 km dari Pantai Nongsa.', 'Pengunjung harus menyeberang menggunakan perahu pompong selama 10 menit dari Pantai Nongsa. Pulau ini tidak berpenghuni tetap, berukuran kecil dan berbentuk unik melingkar. Keindahan alamnya sangat murni karena dijaga ketat oleh negara.', 'Pulau terluar Indonesia, pasir putih murni melingkar, monumen titik referensi geografis nasional.', '[\"Pantai\"]', '[\"Berenang di air jernih\",\"Berfoto di tugu pulau terluar\",\"Snorkeling pinggir pantai\",\"Mengitari pulau berjalan kaki\",\"Piknik murni.\"]', '[\"Pencinta petualangan alam\",\"Wisatawan mancanegara\",\"Pemburu foto estetik pantai alami.\"]', '[\"1. Bawa kantong plastik sendiri untuk membawa pulang sampah Anda kembali ke Batam guna menjaga kelestarian pulau.\",\"2. Datanglah saat pagi hari agar air laut sedang pasang sempurna, membuat gradasi warna airnya terlihat sangat jernih kebiruan.\"]', 4.4, 173, 'Bayar', 2999, '24 Jam', 22.70, 'Dari Pusat Kota', 'sulit', 1.2079400, 104.0797200, 'https://maps.app.goo.gl/DjoqR5DUkPqxouA2A', '/uploads/1782888656627-eejqkjtull8.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:24:46', '2026-07-01 06:52:42'),
('pantai-reviola-1778450677105', 3, 1, 'Pantai Reviola', 'Galang', 'Galang Baru, Galang, Batam City, Riau Islands', ' Pantai pasir putih modern setelah Jembatan 4 Barelang yang menawarkan suasana teduh khas pohon pinus dan fasilitas rekreasi keluarga yang tertata rapi.', 'Terletak satu jalur dengan kawasan pariwisata Rempang, pantai ini dikelola dengan sangat baik. Keberadaan jajaran pohon pinus laut di sepanjang bibir pantai memberikan keteduhan alami dari terik matahari. Ombaknya sangat tenang, menjadikannya kolam alam yang aman untuk berenang.', 'Jajaran pohon pinus laut estetis, pasir putih sangat bersih, ombak tenang ramah anak.', '[]', '[\"Berenang\",\"Piknik di bawah pohon pinus\",\"Berburu foto ayunan pantai\",\"Bermain kano\",\"Berkemah (camping).\"]', '[\"Keluarga dengan anak kecil\",\"Komunitas kumpul bersama (gathering)\",\"Pemburu foto estetis.\"]', '[\"1. Datang sore hari untuk menikmati angin sepoi-sepoi pinus saat matahari mulai teduh.\",\"2. Manfaatkan area gazebo yang dekat dengan fasilitas bilas jika membawa anak-anak.\"]', 4.5, 644, 'Bayar', 10000, '24 Jam', 75.60, '', 'sedang', 0.6508900, 104.2546400, 'https://maps.app.goo.gl/ZnfoGd3i8SksXrpq5', '/uploads/1782888966479-x7b2i2wcccg.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:04:37', '2026-07-01 06:58:06'),
('pantai-sekilak-1778434266041', 1, 1, 'Pantai Sekilak', 'Batu Besar', 'Batu Besar, Nongsa, Batam City, Riau Islands', 'Pantai legendaris di Nongsa yang terkenal dengan keunikan tebing karang merah dan panorama langsung ke pelayaran kapal internasional.', 'Pantai Sekilak memiliki lanskap yang berbeda dari pantai pasir biasa. Di sini terdapat semenanjung kecil (Tanjung Buding) dan bukit karang yang bisa dinaiki pengunjung untuk melihat laut lepas. Area ini juga memiliki danau buatan di bagian dalamnya.', 'Gugusan batu karang merah eksotis, Tanjung Buding, pemandangan Selat Singapura.', '[]', '[\"Trekking batu karang\",\"Berfoto di atas tebing\",\"Memancing ikan\",\"Bersantai melihat kapal besar\",\"Piknik.\"]', '[\"Pecinta fotografi lanskap\",\"Anak muda yang suka petualangan\",\"Wisatawan lokal.\"]', '[\"1. Gunakan alas kaki yang tidak licin karena Anda akan banyak berjalan di atas batuan karang alami.\",\"2. Siapkan kamera untuk menangkap deburan ombak yang menghantam batuan karang di tepi tebing.\"]', 4.2, 341, 'Bayar', 5000, '09.00 - 19.00', 15.10, 'Dari Pusat Kota', 'mudah', 1.1118200, 104.1432100, 'https://maps.app.goo.gl/bHWCi7cgXfVoNBup9', '/uploads/1782889254814-6zwt67ssmy6.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:31:06', '2026-07-01 07:00:58'),
('pantai-tanjung-datuk-1778451242800', 4, 1, 'Pantai Tanjung Datuk', 'Tanjung Pinggir', 'Jl. Kolonel sugiono No.1, Tj. Pinggir, Kec. Sekupang, Kota Batam, Kepulauan Riau', 'Terletak di area Tanjung Pinggir, Sekupang, destinasi ini menawarkan area bersantai tepi laut yang menghadap langsung ke Selat Singapura dan Pulau Belakang Padang.', 'Berbeda dengan pantai pasir konvensional, Tanjung Dato didesain dengan tembok pembatas (tanggul) di sepanjang bibir pantai. Area ini populer sebagai tempat nongkrong sore hari karena dilengkapi kafe mini, jajaran tempat duduk, dan panorama laut lepas yang estetis.', 'Spot sunset eksklusif di tepi tebing/tembok laut dengan latar belakang jelas gedung pencakar langit Singapura.', '[]', '[\"Menikmati sunset\",\"Bersantai di kafe\",\"Fotografi lanskap\",\"Nongkrong sore hari\"]', '[\"Pasangan\",\"Anak muda\",\"Komunitas fotografi\",\"Keluarga\"]', '[\"1. Datanglah mulai pukul 16.30 WIB agar bisa mengamankan tempat duduk terbaik untuk berburu momen sunset.\",\"2. Siapkan biaya tambahan karena biasanya ada ketentuan batas minimum pemesanan makanan/minuman jika Anda ingin menggunakan fasilitas tempat duduk kafe.\",\"3. Harap dicatat bahwa tempat ini kurang cocok untuk aktivitas berenang karena seluruh bibir pantainya sudah dipagari tembok keliling.\"]', 4.1, 156, 'Bayar', 10000, '13.00 - 21.00', 20.10, '', 'mudah', 1.1305400, 103.9248200, 'https://maps.app.goo.gl/TEB1j9QQdjcUQJPMA', '/uploads/1782891734465-7wsnx87wf0h.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:14:02', '2026-07-01 07:50:42'),
('pantai-tanjung-pinggir-1778451140940', 4, 1, 'Pantai Tanjung Pinggir', 'Tanjung Pinggir', 'Tanjung Pinggir, Sekupang, Batam City, Riau Islands', 'Pantai perkotaan strategis di Sekupang yang menawarkan pemandangan langsung gedung-gedung ikonik Singapura seolah berada di depan mata.', 'Pantai ini menjadi tujuan paling populer bagi warga Batam untuk melihat kembang api Singapura saat perayaan tahun baru. Garis pantainya berlumpur pasir cokelat dengan bebatuan alami, namun lokasinya sangat teduh karena rimbun pohon kelapa.', ' View paling jelas ke Marina Bay Sands, monumen burung elang, dekat pusat kota Sekupang.', '[]', '[\"Memotret lanskap Singapura\",\"Bermain wahana permainan anak\",\"Piknik sore hari\",\"Berburu foto sunset.\"]', '[\"Tamasya keluarga perkotaan\",\"anak muda tempat nongkrong sore dan fotografer perkotaan\"]', '[\"1. Datang sore untuk sunset.\",\"2. Bawa kamera foto Singapura.\",\"3. Gunakan tabir surya.\",\"4. Bawa baju ganti.\",\"5. Siapkan uang tunai.\"]', 4.0, 1292, 'Bayar', 10000, '07.00 - 19.00', 19.90, '', 'mudah', 1.1257200, 103.9292500, 'https://maps.app.goo.gl/n7TqRwaoVo2sSZNF7', '/uploads/1782890020718-8r8qqblm176.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:12:21', '2026-07-01 07:17:21'),
('pantai-tegar-bahari-1778450550027', 3, 1, 'Pantai Tegar Bahari', 'Galang', 'Galang Baru, Galang, Batam City, Riau Islands', '⁠Pantai Tegar Bahari (dikenal juga sebagai Pantai Tegar Putri) terletak di Jembatan 6 Barelang dan menyuguhkan keasrian alam yang alami', 'Destinasi ini menjadi favorit baru bagi pelancong karena letaknya yang tersembunyi, menghasilkan suasana privat dengan air biru jernih dan bebas tumpukan sampah kota.', ' Hamparan pasir putih bersih di ujung Pulau Galang Baru yang tenang dan bebas polusi.', '[]', '[\"Bermain air\",\"Berenang\",\"Naik banana boat\",\"Bersantai di gazebo\"]', '[\"Keluarga\",\"Pasangan\",\"Backpacker\",\"Pencari ketenangan\"]', '[\"1. Gunakan kendaraan pribadi atau sewa karena minim transportasi umum.\",\"2. Datanglah dari pagi agar puas mengeksplorasi ujung pulau Barelang ini.\"]', 4.4, 364, 'Bayar', 20000, '24 Jam', 76.00, '', 'sedang', 0.6506300, 104.2562400, 'https://maps.app.goo.gl/W9aM1Mu77SaaNdpc7', '/uploads/1782890517737-pfmb0tp8h6g.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 22:02:30', '2026-07-01 07:24:44'),
('pantai-telukmata-ikan-1778433781264', 1, 1, 'Pantai Telukmata Ikan', 'Sambau', 'Sambau, Nongsa, Batam City, Riau Islands', 'Terletak di daerah Sambau, Nongsa, pantai ini kental dengan budaya Melayu dan menyajikan gapura khas yang menyambut wisatawan.', 'Selain keasrian pantainya, destinasi ini hits berkat kehadiran ⁠Mini Seaworld Gallery (aquarium biota laut) di Pantai Nemo serta keunikan homestay berbentuk kapal.', 'Kampung tua Melayu pesisir dengan pemandangan langsung ke gedung-gedung pencakar langit Singapura.', '[\"Pantai\"]', '[\"Edukasi biota laut\",\"Bersepeda\",\"Fotografi lanskap Singapura\",\"Menikmati kuliner laut\"]', '[\"Anak-anak\",\"Edukasi sekolah\",\"Keluarga\",\"Wisatawan mancanegara\"]', '[\"1. Wajib membawa tabir surya dan kacamata hitam karena pantulan terik matahari pantai sangat kuat.\",\"2. Siapkan uang kecil untuk tiket masuk pantai dan galeri aquarium.\"]', 4.5, 131, 'Bayar', 3000, '24 Jam', 20.70, 'Dari Pusat Kota', 'mudah', 1.1913900, 104.1132200, 'https://maps.app.goo.gl/Hgke5aM8Gkf66ECe9', '/uploads/1782890963483-rzew83knuw9.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:23:01', '2026-07-01 07:29:51'),
('pantai-vio-vio-1778449792298', 3, 1, 'Pantai Vio-Vio', 'Sijantung', 'Sijantung, Galang, Batam City, Riau Islands', 'Destinasi super hits di Sijantung, Galang, yang memadukan keindahan pantai pasir putih dengan fasilitas wisata kekinian.', 'Dikelola secara profesional sebagai ⁠Desa Wisata Viovio, tempat ini menawarkan pengalaman rekreasi lengkap mulai dari wahana air, panggung sunset, hingga pesta musik DJ di akhir pekan.', 'Spot ayunan laut ikonik dan glamping premium yang romantis ala Bali di Pulau Galang.', '[]', '[\"Berenang\",\"Bermain banana boat\",\"Berkemah (camping)\",\"Sunset dinner\",\"Foto estetis\"]', '[\"Anak muda\",\"Pasangan (honey-moon)\",\"Fotografer\",\"Rombongan keluarga\"]', '[\"1. Jalur akses masuk dari jalan utama agak terjal dan masih berupa tanah, harap berkendara hati-hati.\",\"2. Jika ingin suasana tenang, datanglah di hari biasa jika mencari hiburan, datanglah Sabtu malam.\"]', 4.2, 1329, 'Bayar', 15000, '09.00 - 21.00', 57.90, '', 'sedang', 0.7495000, 104.1904000, 'https://maps.app.goo.gl/CjjhYMFvcxSkYE8P9', '/uploads/1782891071491-8roogcttp17.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:49:52', '2026-07-01 07:34:07'),
('pantai-zore-1778450176946', 3, 1, 'Pantai Zore', 'Rempang Cate', 'Rempang Cate, Galang, Batam City, Riau Islands', 'Terletak tidak jauh setelah Jembatan 4 Barelang, Pantai Zore menyajikan pemandangan barisan kebun buah naga di sisi jalurnya.', 'Pantai ini tergolong sepi dan tenang, menjadikannya lokasi favorit bagi komunitas pencinta alam yang ingin mendirikan tenda dan menikmati jus buah naga segar langsung di pinggir pantai.', 'Kombinasi unik antara agrowisata perkebunan buah naga tepi pantai dan tempat camping yang sunyi.', '[]', '[\"Berkemah (camping)\",\"Memetik/menikmati buah naga\",\"Berenang santai\",\"Barbeque\"]', '[\"Pencinta alam\",\"Komunitas camping\",\"Keluarga kecil\"]', '[\"1. Sangat direkomendasikan untuk memesan jus buah naga khas di café pantai saat cuaca terik.\",\"2. Jika ingin camping, bawa peralatan logistik yang lengkap karena warung sekitar tidak buka 24 jam.\"]', 3.9, 73, 'Bayar', 10000, '08.00 - 19.00', 30.00, '', 'sedang', 0.8631100, 104.1485600, 'https://maps.app.goo.gl/adZtHT2VDCDr9Ar48', '/uploads/1782891293114-zbn21bdaky.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:56:17', '2026-07-01 07:36:55'),
('pulau-abang-1778435431624', 3, 1, 'Pulau Abang', 'Pulau Abang', 'Abang Island, Batam City, Riau Islands', 'Pulau di selatan Batam yang terkenal secara internasional sebagai destinasi menyelam dan snorkeling utama di Kepulauan Riau.', 'Perairan di sekitar ⁠Pulau Abang memiliki air laut yang jernih safir dengan ekosistem laut yang dilindungi, di mana pengunjung bisa berenang bersama ribuan ikan tropis.', 'Surga wisata bawah laut Batam dengan konservasi terumbu karang Blue Coral yang langka.', '[\"Pulau\"]', '[\"Snorkeling\",\"Diving\",\"Memancing\",\"Naik perahu wisata\",\"Trekking pulau\"]', '[\"Pencinta petualangan\",\"Penyelam\",\"Backpacker\",\"Turis mancanegara\"]', '[\"1. Sangat disarankan mengambil paket open trip/private trip dari pelabuhan Jembatan 6 Barelang demi kemudahan transportasi kapal dan alat selam.\",\"2. Selalu patuhi instruksi pelatih/pemandu untuk tidak menginjak atau merusak terumbu karang saat snorkeling\"]', 4.1, 41, 'Bayar', 290000, '07.00 - 18.00', 65.00, 'Dari Pusat kota', 'sulit', 0.5650000, 104.1930500, 'https://maps.app.goo.gl/a16A5X6kkYEAbBry7', '/uploads/1782891574831-wj9pi6bq0r.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:50:31', '2026-07-01 07:41:47'),
('pulau-ranoh-1778449451519', 3, 1, 'Pulau Ranoh', 'Pulau Abang', 'Near Abang-besar Island, Pulau Abang, Galang, Kota Batam, Kepulauan Riau', '⁠Pulau Ranoh (Ranoh Island) adalah pulau rekreasi eksklusif seluas 1 hektar di area Galang yang menawarkan wahana air modern yang sangat lengkap.', 'Dikembangkan dari pulau kosong menjadi destinasi liburan tropis premium, pulau ini memanjakan turis dengan pantai bersih bebas polusi, restoran mewah, serta fasilitas olahraga luar ruangan yang terintegrasi.', 'Resor pulau tropis premium privat dengan pantai berpasir putih bersih layaknya pulau pribadi mewah. ', '[\"Pulau\"]', '[\"Snorkeling\",\"Bermain kano\",\"Bermain voli pantai\",\"Memanah\",\"Bermain jet ski/flying ufo\"]', '[\"Acara gathering kantor\",\"Liburan mewah\",\"Keluarga besar\",\"Turis Singapura\"]', '[\"1. Lakukan pemesanan paket tur/resort terlebih dahulu karena akses masuk utama menggunakan speedboat khusus dari Pelabuhan PT Labun.\",\"2. Bawa pakaian olahraga ekstra karena banyak pilihan aktivitas non-air seperti memanah dan voli.\"]', 4.7, 165, 'Bayar', 550000, '12.00 - 24.00', 70.00, '', 'sulit', 0.5741600, 104.1830600, 'https://maps.app.goo.gl/wiTpnPbca9792BzXA', '/uploads/1782891841539-4p12h2poehi.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 21:44:11', '2026-07-01 07:45:58'),
('tanjung-bembang-1778433390203', 1, 1, 'Tanjung Bemban', 'Batu Besar', 'Batu Besar, Nongsa, Batam City, Riau Islands', 'Tanjung Bembang merupakan kawasan wisata pesisir pantai legendaris di Nongsa yang terkenal sebagai surga makanan laut segar di Batam.', 'Selain pantainya yang landai berbatu, daya tarik utama tempat ini terletak pada deretan restoran kelong (restoran di atas laut) yang menyajikan masakan khas Melayu Kepri dengan latar belakang lalu lalang kapal selat Singapura.', 'Pusat wisata kuliner seafood tepi pantai tertua di Nongsa dengan pemandangan kapal feri internasional.', '[\"Pantai\"]', '[\"Wisata kuliner\",\"Menikmati sunset\",\"Berfoto di jembatan kelong\",\"Bersantai menikmati angin laut\"]', '[\"Pencinta kuliner\",\"Rombongan makan malam keluarga\",\"Wisatawan transit bisnis\"]', '[\"1. Datanglah menjelang sore hari sekitar pukul 16.30 agar bisa memilih tempat duduk kelong terbaik luar ruangan untuk makan malam romantis sambil melihat sunset.\",\"2. Pastikan menanyakan harga seafood per ons/kilogram terlebih dahulu sebelum memesan agar sesuai anggaran.\"]', 4.3, 182, 'Gratis', 0, '09.00 - 19.00', 17.60, '', 'sedang', 1.1686900, 104.1391000, 'https://maps.app.goo.gl/Y5amcx6M2QsrWzj87', '/uploads/1782892034082-iss9vuic6hs.jpg', '[]', '', '#3B82F6', 0, 0, '2026-05-10', NULL, 'valid', '2026-05-10 17:16:31', '2026-07-01 07:48:57');

-- --------------------------------------------------------

--
-- Table structure for table `pantai_fasilitas`
--

CREATE TABLE `pantai_fasilitas` (
  `id_pantai_fasilitas` int(11) NOT NULL,
  `id_pantai` varchar(100) NOT NULL,
  `id_fasilitas` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pantai_fasilitas`
--

INSERT INTO `pantai_fasilitas` (`id_pantai_fasilitas`, `id_pantai`, `id_fasilitas`, `keterangan`) VALUES
(215, 'larantuka-pantai-1778450462897', 1, NULL),
(216, 'larantuka-pantai-1778450462897', 2, NULL),
(217, 'larantuka-pantai-1778450462897', 11, NULL),
(218, 'larantuka-pantai-1778450462897', 12, NULL),
(219, 'larantuka-pantai-1778450462897', 13, NULL),
(220, 'larantuka-pantai-1778450462897', 6, NULL),
(221, 'larantuka-pantai-1778450462897', 14, NULL),
(222, 'larantuka-pantai-1778450462897', 8, NULL),
(223, 'larantuka-pantai-1778450462897', 15, NULL),
(224, 'marina-waterfront-1778451337291', 1, NULL),
(225, 'marina-waterfront-1778451337291', 2, NULL),
(226, 'marina-waterfront-1778451337291', 11, NULL),
(227, 'marina-waterfront-1778451337291', 12, NULL),
(228, 'marina-waterfront-1778451337291', 13, NULL),
(229, 'marina-waterfront-1778451337291', 6, NULL),
(230, 'marina-waterfront-1778451337291', 14, NULL),
(231, 'marina-waterfront-1778451337291', 8, NULL),
(232, 'marina-waterfront-1778451337291', 9, NULL),
(233, 'marina-waterfront-1778451337291', 15, NULL),
(241, 'pantai-air-nanti-1778450265845', 1, NULL),
(242, 'pantai-air-nanti-1778450265845', 2, NULL),
(243, 'pantai-air-nanti-1778450265845', 11, NULL),
(244, 'pantai-air-nanti-1778450265845', 12, NULL),
(245, 'pantai-air-nanti-1778450265845', 13, NULL),
(246, 'pantai-air-nanti-1778450265845', 6, NULL),
(247, 'pantai-air-nanti-1778450265845', 14, NULL),
(248, 'pantai-3-putri-1778450076094', 1, NULL),
(249, 'pantai-3-putri-1778450076094', 2, NULL),
(250, 'pantai-3-putri-1778450076094', 11, NULL),
(251, 'pantai-3-putri-1778450076094', 12, NULL),
(252, 'pantai-3-putri-1778450076094', 13, NULL),
(253, 'pantai-3-putri-1778450076094', 6, NULL),
(254, 'pantai-3-putri-1778450076094', 14, NULL),
(255, 'pantai-bahagia-1778434985969', 1, NULL),
(256, 'pantai-bahagia-1778434985969', 2, NULL),
(257, 'pantai-bahagia-1778434985969', 11, NULL),
(258, 'pantai-bahagia-1778434985969', 12, NULL),
(259, 'pantai-bahagia-1778434985969', 13, NULL),
(260, 'pantai-bahagia-1778434985969', 6, NULL),
(261, 'pantai-bahagia-1778434985969', 14, NULL),
(262, 'pantai-bahagia-1778434985969', 15, NULL),
(263, 'pantai-bale-bale-1778434152307', 1, NULL),
(264, 'pantai-bale-bale-1778434152307', 2, NULL),
(265, 'pantai-bale-bale-1778434152307', 11, NULL),
(266, 'pantai-bale-bale-1778434152307', 12, NULL),
(267, 'pantai-bale-bale-1778434152307', 13, NULL),
(268, 'pantai-bale-bale-1778434152307', 6, NULL),
(269, 'pantai-bale-bale-1778434152307', 14, NULL),
(270, 'pantai-bale-bale-1778434152307', 8, NULL),
(271, 'pantai-bale-bale-1778434152307', 15, NULL),
(272, 'pantai-biru-sehati-1778434804626', 1, NULL),
(273, 'pantai-biru-sehati-1778434804626', 2, NULL),
(274, 'pantai-biru-sehati-1778434804626', 11, NULL),
(275, 'pantai-biru-sehati-1778434804626', 12, NULL),
(276, 'pantai-biru-sehati-1778434804626', 13, NULL),
(277, 'pantai-biru-sehati-1778434804626', 6, NULL),
(278, 'pantai-biru-sehati-1778434804626', 14, NULL),
(279, 'pantai-boneta-1778434611564', 1, NULL),
(280, 'pantai-boneta-1778434611564', 2, NULL),
(281, 'pantai-boneta-1778434611564', 11, NULL),
(282, 'pantai-boneta-1778434611564', 12, NULL),
(283, 'pantai-boneta-1778434611564', 13, NULL),
(284, 'pantai-boneta-1778434611564', 6, NULL),
(285, 'pantai-boneta-1778434611564', 14, NULL),
(286, 'pantai-cakang-1778450772074', 1, NULL),
(287, 'pantai-cakang-1778450772074', 2, NULL),
(288, 'pantai-cakang-1778450772074', 11, NULL),
(289, 'pantai-cakang-1778450772074', 12, NULL),
(290, 'pantai-cakang-1778450772074', 13, NULL),
(291, 'pantai-cakang-1778450772074', 6, NULL),
(292, 'pantai-cakang-1778450772074', 14, NULL),
(293, 'pantai-cipta-land-1778451527167', 1, NULL),
(294, 'pantai-cipta-land-1778451527167', 2, NULL),
(295, 'pantai-cipta-land-1778451527167', 11, NULL),
(296, 'pantai-cipta-land-1778451527167', 12, NULL),
(297, 'pantai-cipta-land-1778451527167', 13, NULL),
(298, 'pantai-cipta-land-1778451527167', 6, NULL),
(299, 'pantai-cipta-land-1778451527167', 14, NULL),
(300, 'pantai-dangas-1778451429239', 1, NULL),
(301, 'pantai-dangas-1778451429239', 2, NULL),
(302, 'pantai-dangas-1778451429239', 11, NULL),
(303, 'pantai-dangas-1778451429239', 12, NULL),
(304, 'pantai-dangas-1778451429239', 13, NULL),
(305, 'pantai-dangas-1778451429239', 6, NULL),
(306, 'pantai-dangas-1778451429239', 14, NULL),
(307, 'pantai-dendang-melayu-1778449912770', 1, NULL),
(308, 'pantai-dendang-melayu-1778449912770', 2, NULL),
(309, 'pantai-dendang-melayu-1778449912770', 11, NULL),
(310, 'pantai-dendang-melayu-1778449912770', 12, NULL),
(311, 'pantai-dendang-melayu-1778449912770', 13, NULL),
(312, 'pantai-dendang-melayu-1778449912770', 6, NULL),
(313, 'pantai-dendang-melayu-1778449912770', 14, NULL),
(314, 'pantai-elyora-1778450377716', 1, NULL),
(315, 'pantai-elyora-1778450377716', 2, NULL),
(316, 'pantai-elyora-1778450377716', 11, NULL),
(317, 'pantai-elyora-1778450377716', 12, NULL),
(318, 'pantai-elyora-1778450377716', 13, NULL),
(319, 'pantai-elyora-1778450377716', 6, NULL),
(320, 'pantai-elyora-1778450377716', 14, NULL),
(321, 'pantai-elyora-1778450377716', 15, NULL),
(322, 'pantai-kalat-1778450848719', 1, NULL),
(323, 'pantai-kalat-1778450848719', 2, NULL),
(324, 'pantai-kalat-1778450848719', 11, NULL),
(325, 'pantai-kalat-1778450848719', 12, NULL),
(326, 'pantai-kalat-1778450848719', 13, NULL),
(327, 'pantai-kalat-1778450848719', 6, NULL),
(328, 'pantai-kalat-1778450848719', 14, NULL),
(329, 'pantai-ketapang-1778434490075', 1, NULL),
(330, 'pantai-ketapang-1778434490075', 2, NULL),
(331, 'pantai-ketapang-1778434490075', 11, NULL),
(332, 'pantai-ketapang-1778434490075', 12, NULL),
(333, 'pantai-ketapang-1778434490075', 13, NULL),
(334, 'pantai-ketapang-1778434490075', 6, NULL),
(335, 'pantai-ketapang-1778434490075', 14, NULL),
(336, 'pantai-kirana-1778450960363', 1, NULL),
(337, 'pantai-kirana-1778450960363', 2, NULL),
(338, 'pantai-kirana-1778450960363', 11, NULL),
(339, 'pantai-kirana-1778450960363', 12, NULL),
(340, 'pantai-kirana-1778450960363', 13, NULL),
(341, 'pantai-kirana-1778450960363', 6, NULL),
(342, 'pantai-kirana-1778450960363', 14, NULL),
(343, 'pantai-lagorap-1778434374839', 1, NULL),
(344, 'pantai-lagorap-1778434374839', 2, NULL),
(345, 'pantai-lagorap-1778434374839', 11, NULL),
(346, 'pantai-lagorap-1778434374839', 12, NULL),
(347, 'pantai-lagorap-1778434374839', 13, NULL),
(348, 'pantai-lagorap-1778434374839', 6, NULL),
(349, 'pantai-lagorap-1778434374839', 14, NULL),
(350, 'pantai-melayu-1778433521722', 1, NULL),
(351, 'pantai-melayu-1778433521722', 2, NULL),
(352, 'pantai-melayu-1778433521722', 11, NULL),
(353, 'pantai-melayu-1778433521722', 12, NULL),
(354, 'pantai-melayu-1778433521722', 13, NULL),
(355, 'pantai-melayu-1778433521722', 6, NULL),
(356, 'pantai-melayu-1778433521722', 14, NULL),
(357, 'pantai-melayu-1778433521722', 8, NULL),
(358, 'pantai-melayu-1778433521722', 15, NULL),
(359, 'pantai-melayu-barelang-1778435187412', 1, NULL),
(360, 'pantai-melayu-barelang-1778435187412', 2, NULL),
(361, 'pantai-melayu-barelang-1778435187412', 11, NULL),
(362, 'pantai-melayu-barelang-1778435187412', 12, NULL),
(363, 'pantai-melayu-barelang-1778435187412', 13, NULL),
(364, 'pantai-melayu-barelang-1778435187412', 6, NULL),
(365, 'pantai-melayu-barelang-1778435187412', 14, NULL),
(366, 'pantai-melayu-barelang-1778435187412', 15, NULL),
(367, 'pantai-melur-barelang-1778435289814', 1, NULL),
(368, 'pantai-melur-barelang-1778435289814', 2, NULL),
(369, 'pantai-melur-barelang-1778435289814', 11, NULL),
(370, 'pantai-melur-barelang-1778435289814', 12, NULL),
(371, 'pantai-melur-barelang-1778435289814', 13, NULL),
(372, 'pantai-melur-barelang-1778435289814', 6, NULL),
(373, 'pantai-melur-barelang-1778435289814', 14, NULL),
(374, 'pantai-melur-barelang-1778435289814', 8, NULL),
(375, 'pantai-melur-barelang-1778435289814', 9, NULL),
(376, 'pantai-melur-barelang-1778435289814', 15, NULL),
(377, 'pantai-mirota-1778449685155', 1, NULL),
(378, 'pantai-mirota-1778449685155', 2, NULL),
(379, 'pantai-mirota-1778449685155', 11, NULL),
(380, 'pantai-mirota-1778449685155', 12, NULL),
(381, 'pantai-mirota-1778449685155', 13, NULL),
(382, 'pantai-mirota-1778449685155', 6, NULL),
(383, 'pantai-mirota-1778449685155', 14, NULL),
(384, 'pantai-mirota-1778449685155', 8, NULL),
(385, 'pantai-mirota-1778449685155', 9, NULL),
(386, 'pantai-mirota-1778449685155', 15, NULL),
(387, 'pantai-nongsa-1778433680638', 1, NULL),
(388, 'pantai-nongsa-1778433680638', 2, NULL),
(389, 'pantai-nongsa-1778433680638', 11, NULL),
(390, 'pantai-nongsa-1778433680638', 12, NULL),
(391, 'pantai-nongsa-1778433680638', 13, NULL),
(392, 'pantai-nongsa-1778433680638', 6, NULL),
(393, 'pantai-nongsa-1778433680638', 14, NULL),
(394, 'pantai-nongsa-1778433680638', 8, NULL),
(395, 'pantai-nongsa-1778433680638', 9, NULL),
(396, 'pantai-nongsa-1778433680638', 15, NULL),
(397, 'pantai-nuvasa-bay-1778434712779', 1, NULL),
(398, 'pantai-nuvasa-bay-1778434712779', 2, NULL),
(399, 'pantai-nuvasa-bay-1778434712779', 11, NULL),
(400, 'pantai-nuvasa-bay-1778434712779', 12, NULL),
(401, 'pantai-nuvasa-bay-1778434712779', 13, NULL),
(402, 'pantai-nuvasa-bay-1778434712779', 6, NULL),
(403, 'pantai-nuvasa-bay-1778434712779', 14, NULL),
(404, 'pantai-nuvasa-bay-1778434712779', 8, NULL),
(405, 'pantai-nuvasa-bay-1778434712779', 9, NULL),
(406, 'pantai-nuvasa-bay-1778434712779', 15, NULL),
(407, 'pantai-panau-1778434906925', 1, NULL),
(408, 'pantai-panau-1778434906925', 2, NULL),
(409, 'pantai-panau-1778434906925', 11, NULL),
(410, 'pantai-panau-1778434906925', 12, NULL),
(411, 'pantai-panau-1778434906925', 13, NULL),
(412, 'pantai-panau-1778434906925', 6, NULL),
(413, 'pantai-pasir-putih-1778451053959', 1, NULL),
(414, 'pantai-pasir-putih-1778451053959', 2, NULL),
(415, 'pantai-pasir-putih-1778451053959', 11, NULL),
(416, 'pantai-pasir-putih-1778451053959', 12, NULL),
(417, 'pantai-pasir-putih-1778451053959', 13, NULL),
(418, 'pantai-pasir-putih-1778451053959', 6, NULL),
(419, 'pantai-pasir-putih-1778451053959', 14, NULL),
(420, 'pantai-pasir-putih-1778451053959', 8, NULL),
(421, 'pantai-payung-1778435091587', 1, NULL),
(422, 'pantai-payung-1778435091587', 2, NULL),
(423, 'pantai-payung-1778435091587', 11, NULL),
(424, 'pantai-payung-1778435091587', 12, NULL),
(425, 'pantai-payung-1778435091587', 13, NULL),
(426, 'pantai-payung-1778435091587', 6, NULL),
(427, 'pantai-payung-1778435091587', 14, NULL),
(428, 'pantai-permata-1778449564129', 1, NULL),
(429, 'pantai-permata-1778449564129', 2, NULL),
(430, 'pantai-permata-1778449564129', 11, NULL),
(431, 'pantai-permata-1778449564129', 12, NULL),
(432, 'pantai-permata-1778449564129', 13, NULL),
(433, 'pantai-pulau-putri-nongsa-1778433886509', 1, NULL),
(434, 'pantai-pulau-putri-nongsa-1778433886509', 11, NULL),
(435, 'pantai-pulau-putri-nongsa-1778433886509', 6, NULL),
(436, 'pantai-pulau-putri-nongsa-1778433886509', 14, NULL),
(437, 'pantai-pulau-putri-nongsa-1778433886509', 15, NULL),
(438, 'pantai-reviola-1778450677105', 1, NULL),
(439, 'pantai-reviola-1778450677105', 2, NULL),
(440, 'pantai-reviola-1778450677105', 11, NULL),
(441, 'pantai-reviola-1778450677105', 12, NULL),
(442, 'pantai-reviola-1778450677105', 13, NULL),
(443, 'pantai-reviola-1778450677105', 6, NULL),
(444, 'pantai-reviola-1778450677105', 14, NULL),
(445, 'pantai-reviola-1778450677105', 15, NULL),
(453, 'pantai-sekilak-1778434266041', 1, NULL),
(454, 'pantai-sekilak-1778434266041', 2, NULL),
(455, 'pantai-sekilak-1778434266041', 11, NULL),
(456, 'pantai-sekilak-1778434266041', 12, NULL),
(457, 'pantai-sekilak-1778434266041', 13, NULL),
(458, 'pantai-sekilak-1778434266041', 6, NULL),
(459, 'pantai-sekilak-1778434266041', 14, NULL),
(460, 'pantai-tanjung-pinggir-1778451140940', 12, NULL),
(461, 'pantai-tanjung-pinggir-1778451140940', 13, NULL),
(462, 'pantai-tegar-bahari-1778450550027', 1, NULL),
(463, 'pantai-tegar-bahari-1778450550027', 2, NULL),
(464, 'pantai-tegar-bahari-1778450550027', 11, NULL),
(465, 'pantai-tegar-bahari-1778450550027', 12, NULL),
(466, 'pantai-tegar-bahari-1778450550027', 13, NULL),
(467, 'pantai-tegar-bahari-1778450550027', 6, NULL),
(468, 'pantai-tegar-bahari-1778450550027', 14, NULL),
(478, 'pantai-telukmata-ikan-1778433781264', 1, NULL),
(479, 'pantai-telukmata-ikan-1778433781264', 2, NULL),
(480, 'pantai-telukmata-ikan-1778433781264', 11, NULL),
(481, 'pantai-telukmata-ikan-1778433781264', 12, NULL),
(482, 'pantai-telukmata-ikan-1778433781264', 13, NULL),
(483, 'pantai-telukmata-ikan-1778433781264', 6, NULL),
(484, 'pantai-telukmata-ikan-1778433781264', 14, NULL),
(485, 'pantai-telukmata-ikan-1778433781264', 8, NULL),
(486, 'pantai-telukmata-ikan-1778433781264', 15, NULL),
(487, 'pantai-vio-vio-1778449792298', 1, NULL),
(488, 'pantai-vio-vio-1778449792298', 2, NULL),
(489, 'pantai-vio-vio-1778449792298', 11, NULL),
(490, 'pantai-vio-vio-1778449792298', 12, NULL),
(491, 'pantai-vio-vio-1778449792298', 13, NULL),
(492, 'pantai-vio-vio-1778449792298', 6, NULL),
(493, 'pantai-vio-vio-1778449792298', 14, NULL),
(494, 'pantai-vio-vio-1778449792298', 8, NULL),
(495, 'pantai-vio-vio-1778449792298', 9, NULL),
(496, 'pantai-vio-vio-1778449792298', 15, NULL),
(497, 'pantai-zore-1778450176946', 1, NULL),
(498, 'pantai-zore-1778450176946', 2, NULL),
(499, 'pantai-zore-1778450176946', 11, NULL),
(500, 'pantai-zore-1778450176946', 12, NULL),
(501, 'pantai-zore-1778450176946', 13, NULL),
(502, 'pantai-zore-1778450176946', 6, NULL),
(503, 'pantai-zore-1778450176946', 14, NULL),
(504, 'pulau-abang-1778435431624', 1, NULL),
(505, 'pulau-abang-1778435431624', 2, NULL),
(506, 'pulau-abang-1778435431624', 11, NULL),
(507, 'pulau-abang-1778435431624', 12, NULL),
(508, 'pulau-abang-1778435431624', 13, NULL),
(509, 'pulau-abang-1778435431624', 6, NULL),
(510, 'pulau-abang-1778435431624', 14, NULL),
(511, 'pulau-abang-1778435431624', 8, NULL),
(512, 'pulau-abang-1778435431624', 15, NULL),
(516, 'pulau-ranoh-1778449451519', 1, NULL),
(517, 'pulau-ranoh-1778449451519', 2, NULL),
(518, 'pulau-ranoh-1778449451519', 11, NULL),
(519, 'pulau-ranoh-1778449451519', 12, NULL),
(520, 'pulau-ranoh-1778449451519', 13, NULL),
(521, 'pulau-ranoh-1778449451519', 6, NULL),
(522, 'pulau-ranoh-1778449451519', 14, NULL),
(523, 'pulau-ranoh-1778449451519', 8, NULL),
(524, 'pulau-ranoh-1778449451519', 9, NULL),
(525, 'pulau-ranoh-1778449451519', 15, NULL),
(526, 'tanjung-bembang-1778433390203', 1, NULL),
(527, 'tanjung-bembang-1778433390203', 2, NULL),
(528, 'tanjung-bembang-1778433390203', 11, NULL),
(529, 'tanjung-bembang-1778433390203', 12, NULL),
(530, 'tanjung-bembang-1778433390203', 13, NULL),
(531, 'tanjung-bembang-1778433390203', 6, NULL),
(532, 'tanjung-bembang-1778433390203', 8, NULL),
(533, 'tanjung-bembang-1778433390203', 9, NULL),
(534, 'pantai-tanjung-datuk-1778451242800', 1, NULL),
(535, 'pantai-tanjung-datuk-1778451242800', 2, NULL),
(536, 'pantai-tanjung-datuk-1778451242800', 11, NULL),
(537, 'pantai-tanjung-datuk-1778451242800', 12, NULL),
(538, 'pantai-tanjung-datuk-1778451242800', 13, NULL),
(539, 'pantai-tanjung-datuk-1778451242800', 6, NULL),
(540, 'pantai-tanjung-datuk-1778451242800', 8, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD PRIMARY KEY (`id_fasilitas`),
  ADD UNIQUE KEY `nama_fasilitas` (`nama_fasilitas`);

--
-- Indexes for table `kategori_rekomendasi`
--
ALTER TABLE `kategori_rekomendasi`
  ADD PRIMARY KEY (`id_kategori_rekomendasi`),
  ADD KEY `fk_rekomendasi_pantai` (`id_pantai`);

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id_kecamatan`),
  ADD UNIQUE KEY `nama_kecamatan` (`nama_kecamatan`),
  ADD KEY `fk_kecamatan_admin` (`id_admin`);

--
-- Indexes for table `pantai`
--
ALTER TABLE `pantai`
  ADD PRIMARY KEY (`id_pantai`),
  ADD KEY `fk_pantai_kecamatan` (`id_kecamatan`),
  ADD KEY `fk_pantai_admin` (`id_admin`);

--
-- Indexes for table `pantai_fasilitas`
--
ALTER TABLE `pantai_fasilitas`
  ADD PRIMARY KEY (`id_pantai_fasilitas`),
  ADD UNIQUE KEY `unique_pantai_fasilitas` (`id_pantai`,`id_fasilitas`),
  ADD KEY `fk_pf_fasilitas` (`id_fasilitas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fasilitas`
--
ALTER TABLE `fasilitas`
  MODIFY `id_fasilitas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kategori_rekomendasi`
--
ALTER TABLE `kategori_rekomendasi`
  MODIFY `id_kategori_rekomendasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pantai_fasilitas`
--
ALTER TABLE `pantai_fasilitas`
  MODIFY `id_pantai_fasilitas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kategori_rekomendasi`
--
ALTER TABLE `kategori_rekomendasi`
  ADD CONSTRAINT `fk_rekomendasi_pantai` FOREIGN KEY (`id_pantai`) REFERENCES `pantai` (`id_pantai`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD CONSTRAINT `fk_kecamatan_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pantai`
--
ALTER TABLE `pantai`
  ADD CONSTRAINT `fk_pantai_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pantai_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`) ON UPDATE CASCADE;

--
-- Constraints for table `pantai_fasilitas`
--
ALTER TABLE `pantai_fasilitas`
  ADD CONSTRAINT `fk_pf_fasilitas` FOREIGN KEY (`id_fasilitas`) REFERENCES `fasilitas` (`id_fasilitas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pf_pantai` FOREIGN KEY (`id_pantai`) REFERENCES `pantai` (`id_pantai`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
