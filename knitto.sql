-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2024 at 03:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `knitto`
--

-- --------------------------------------------------------

--
-- Table structure for table `d_customer`
--

CREATE TABLE `d_customer` (
  `id` int(11) NOT NULL,
  `kode_cust` int(11) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `pekerjaan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_customer`
--

INSERT INTO `d_customer` (`id`, `kode_cust`, `tanggal_lahir`, `jenis_kelamin`, `pekerjaan`) VALUES
(1, 1, '1990-01-01', 'Laki-laki', 'Pegawai Swasta'),
(2, 1, '1992-05-15', 'Perempuan', 'Wiraswasta'),
(3, 2, '1985-08-20', 'Laki-laki', 'Dosen'),
(4, 2, '1988-12-10', 'Perempuan', 'Dokter'),
(5, 3, '1979-03-25', 'Laki-laki', 'Pengusaha'),
(14, 8, '1880-01-01', 'Laki-laki', 'Pegawai Swasta'),
(15, 8, '1882-03-15', 'Perempuan', 'Mahasiswa');

-- --------------------------------------------------------

--
-- Table structure for table `m_customer`
--

CREATE TABLE `m_customer` (
  `kode_cust` int(11) NOT NULL,
  `nama_cust` varchar(255) NOT NULL,
  `alamat_cust` varchar(255) DEFAULT NULL,
  `telp_cust` varchar(20) DEFAULT NULL,
  `email_cust` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_customer`
--

INSERT INTO `m_customer` (`kode_cust`, `nama_cust`, `alamat_cust`, `telp_cust`, `email_cust`) VALUES
(1, 'John Doe', 'Jl. Pahlawan No. 123', '081234567890', 'john.doe@example.com'),
(2, 'Jane Smith', 'Jl. Merdeka No. 456', '085678901234', 'jane.smith@example.com'),
(3, 'Michael Johnson', 'Jl. Surya No. 789', '087654321098', 'michael.johnson@example.com'),
(5, 'John Doe Edited', '123 Main Street', '123456789', 'john.doe@example.com'),
(8, 'John Doe Edited', '123 Main Street', '123456789', 'john.doe@example.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `d_customer`
--
ALTER TABLE `d_customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kode_cust` (`kode_cust`);

--
-- Indexes for table `m_customer`
--
ALTER TABLE `m_customer`
  ADD PRIMARY KEY (`kode_cust`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `d_customer`
--
ALTER TABLE `d_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `m_customer`
--
ALTER TABLE `m_customer`
  MODIFY `kode_cust` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `d_customer`
--
ALTER TABLE `d_customer`
  ADD CONSTRAINT `d_customer_ibfk_1` FOREIGN KEY (`kode_cust`) REFERENCES `m_customer` (`kode_cust`),
  ADD CONSTRAINT `d_customer_ibfk_2` FOREIGN KEY (`kode_cust`) REFERENCES `m_customer` (`kode_cust`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
