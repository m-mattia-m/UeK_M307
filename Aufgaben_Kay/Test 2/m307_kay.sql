-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Mrz 2021 um 16:14
-- Server-Version: 10.4.12-MariaDB
-- PHP-Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `m307_kay`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kay_apps`
--

CREATE TABLE `kay_apps` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `datum` date NOT NULL,
  `preis` decimal(7,2) DEFAULT NULL,
  `kategorie` varchar(255) DEFAULT NULL,
  `rating` decimal(7,2) DEFAULT NULL,
  `stat` tinyint(4) DEFAULT NULL,
  `additional_information` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `kay_apps`
--

INSERT INTO `kay_apps` (`id`, `name`, `datum`, `preis`, `kategorie`, `rating`, `stat`, `additional_information`) VALUES
(1, 'Todos!', '2016-12-01', '15.50', 'Work', '4.50', 1, NULL),
(2, 'SlashnGo', '2017-02-01', '12.00', 'Games', '3.75', 0, NULL),
(3, 'Uzmosy', '2017-03-01', '10.50', 'Social', '4.00', 1, NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `kay_apps`
--
ALTER TABLE `kay_apps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `kay_apps`
--
ALTER TABLE `kay_apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
