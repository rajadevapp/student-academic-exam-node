-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2025 at 07:20 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_class`
--

CREATE TABLE `tbl_class` (
  `id` int(12) NOT NULL,
  `class_name` varchar(256) NOT NULL,
  `class_code` varchar(256) NOT NULL,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_class`
--

INSERT INTO `tbl_class` (`id`, `class_name`, `class_code`, `is_active`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, '1st std', '001', 1, 1, 1, '2025-06-25 23:26:37', '2025-06-25 23:26:37'),
(2, '2nd std', '002', 1, 1, 1, '2025-06-25 23:26:37', '2025-06-25 23:26:37'),
(3, '3rd std', '003', 1, 1, 1, '2025-06-25 23:26:37', '2025-06-25 23:26:37'),
(4, '4th std', '004', 1, 1, 1, '2025-06-25 23:26:37', '2025-06-25 23:26:37'),
(5, '5th std', '005', 1, 1, 1, '2025-06-25 23:26:37', '2025-06-25 23:26:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

CREATE TABLE `tbl_section` (
  `id` int(11) NOT NULL,
  `section_name` varchar(255) NOT NULL,
  `section_code` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_section`
--

INSERT INTO `tbl_section` (`id`, `section_name`, `section_code`, `is_active`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'A', '001', 1, 1, 1, '2025-06-25 23:33:34', '2025-06-25 23:33:34'),
(2, 'B', '002', 1, 1, 1, '2025-06-25 23:33:34', '2025-06-25 23:33:34'),
(3, 'C', '003', 1, 1, 1, '2025-06-25 23:33:34', '2025-06-25 23:33:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `id` int(12) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `mobile_number` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `class_id` int(12) NOT NULL,
  `section_id` int(12) NOT NULL,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`id`, `first_name`, `last_name`, `email`, `mobile_number`, `address`, `class_id`, `section_id`, `is_active`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'ram', NULL, 'ram@gmail.com', '9988995520', 'abc', 1, 1, 1, 1, 1, '2025-06-22 23:48:30', '2025-06-22 23:48:30'),
(2, 'raj', NULL, 'raj@gmail.com', '9288995520', 'asdc', 1, 1, 1, 1, 1, '2025-06-23 07:10:08', '2025-06-23 07:10:08'),
(3, 'raja', NULL, 'raja@gmail.com', '9888995520', 'asdd', 1, 1, 1, 1, 1, '2025-06-23 07:13:40', '2025-06-23 07:13:40'),
(4, 'rj', NULL, 'rj@gmail.com', '9888995550', 'asdd', 1, 1, 1, 1, 1, '2025-06-23 07:19:36', '2025-06-23 07:19:36'),
(5, 'vj-1', NULL, 'vj@gmail.com', '9887995550', 'asdd', 1, 1, 0, 1, 1, '2025-06-23 07:21:24', '2025-06-23 07:30:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student_academic_exam`
--

CREATE TABLE `tbl_student_academic_exam` (
  `id` int(12) NOT NULL,
  `exam_name` varchar(256) NOT NULL,
  `exam_start_date` date NOT NULL,
  `exam_end_date` date NOT NULL,
  `class_id` int(12) NOT NULL,
  `section_id` int(12) NOT NULL,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student_academic_exam_mark_details`
--

CREATE TABLE `tbl_student_academic_exam_mark_details` (
  `id` int(12) NOT NULL,
  `academic_exam_id` int(12) NOT NULL,
  `academic_exam_student_id` int(12) NOT NULL,
  `subject_id` int(12) NOT NULL,
  `total_mark` varchar(256) NOT NULL,
  `mark_scored` varchar(256) NOT NULL,
  `comments` text,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student_academic_exam_student_details`
--

CREATE TABLE `tbl_student_academic_exam_student_details` (
  `id` int(12) NOT NULL,
  `academic_exam_id` int(12) NOT NULL DEFAULT '0',
  `student_id` int(12) NOT NULL,
  `class_id` int(12) NOT NULL,
  `section_id` int(12) NOT NULL,
  `total_mark` varchar(256) NOT NULL,
  `total_mark_scored` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subject`
--

CREATE TABLE `tbl_subject` (
  `id` int(12) NOT NULL,
  `subject_name` varchar(256) NOT NULL,
  `subject_code` varchar(256) NOT NULL,
  `is_active` int(12) NOT NULL,
  `created_by` int(12) NOT NULL,
  `updated_by` int(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subject`
--

INSERT INTO `tbl_subject` (`id`, `subject_name`, `subject_code`, `is_active`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Tamil', '001', 1, 1, 1, '2025-06-26 04:51:59', '2025-06-26 04:51:59'),
(2, 'English', '002', 1, 1, 1, '2025-06-26 04:51:59', '2025-06-26 04:51:59'),
(3, 'Maths', '003', 1, 1, 1, '2025-06-26 04:51:59', '2025-06-26 04:51:59'),
(4, 'Science', '004', 1, 1, 1, '2025-06-26 04:51:59', '2025-06-26 04:51:59'),
(5, 'Social', '005', 1, 1, 1, '2025-06-26 04:51:59', '2025-06-26 04:51:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_class`
--
ALTER TABLE `tbl_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_student_academic_exam`
--
ALTER TABLE `tbl_student_academic_exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_student_academic_exam_mark_details`
--
ALTER TABLE `tbl_student_academic_exam_mark_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_student_academic_exam_student_details`
--
ALTER TABLE `tbl_student_academic_exam_student_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_class`
--
ALTER TABLE `tbl_class`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_section`
--
ALTER TABLE `tbl_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_student`
--
ALTER TABLE `tbl_student`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_student_academic_exam`
--
ALTER TABLE `tbl_student_academic_exam`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_student_academic_exam_mark_details`
--
ALTER TABLE `tbl_student_academic_exam_mark_details`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_student_academic_exam_student_details`
--
ALTER TABLE `tbl_student_academic_exam_student_details`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
