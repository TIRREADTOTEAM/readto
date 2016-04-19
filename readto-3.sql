-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 18, 2016 at 01:28 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `readto`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(100) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `author` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `location`, `isbn`, `author`, `user_id`, `like_count`) VALUES
(1, 'Haskell Book', 'pdf/HaskellBook.pdf', '1112223334444', 'ABC', 1, 1),
(2, 'Algorithm', 'pdf/algorithms_alternate.pdf', '1112223334444', 'DEF', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `html_id` varchar(100) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `page_no` int(11) NOT NULL,
  `scroll_pos` int(11) NOT NULL,
  `left_pos` int(11) NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT '0',
  `date` varchar(10) NOT NULL,
  `photo` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `html_id`, `comment`, `book_id`, `user_id`, `page_no`, `scroll_pos`, `left_pos`, `like_count`, `date`, `photo`) VALUES
(15, 'savedcomment410px2', 'BAC', 2, 0, 1, 410, 1098, 0, 'Sun Apr 17', ''),
(16, 'savedcomment830px3', 'DEF', 2, 0, 1, 830, 1098, 0, 'Sun Apr 17', ''),
(17, 'savedcomment577px4', 'HGAHA', 2, 0, 3, 577, 1098, 0, 'Sun Apr 17', ''),
(18, 'savedcomment909px5', 'yuaej', 2, 0, 3, 909, 1098, 0, 'Sun Apr 17', ''),
(19, 'savedcomment326px2', 'THIS IS PAGE 2', 2, 0, 2, 326, 1098, 0, 'Sun Apr 17', ''),
(20, 'savedcomment436px2', 'First Page', 1, 0, 1, 436, 1080, 0, 'Sun Apr 17', ''),
(21, 'savedcomment835px3', 'First Page 2', 1, 0, 1, 835, 1080, 0, 'Sun Apr 17', ''),
(22, 'savedcomment376px4', 'Second Page', 1, 0, 2, 376, 1080, 0, 'Sun Apr 17', ''),
(23, 'savedcomment815px5', 'Second Page 2', 1, 0, 2, 815, 1080, 0, 'Sun Apr 17', ''),
(24, 'savedcomment470px3', 'Third', 1, 0, 3, 470, 1080, 0, 'Sun Apr 17', ''),
(25, 'savedcomment858px4', 'Third 2', 1, 0, 3, 858, 1080, 0, 'Sun Apr 17', '');

-- --------------------------------------------------------

--
-- Table structure for table `summary`
--

CREATE TABLE `summary` (
  `summary_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `summary` varchar(1000) NOT NULL,
  `book_id` int(11) NOT NULL,
  `page_no` int(11) NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT '0',
  `date` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `photo` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `summary`
--
ALTER TABLE `summary`
  ADD PRIMARY KEY (`summary_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `summary`
--
ALTER TABLE `summary`
  MODIFY `summary_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
