-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 30. Mrz 2021 um 16:38
-- Server-Version: 10.4.18-MariaDB
-- PHP-Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `m307_mattia`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mattia_artikel`
--

CREATE TABLE `mattia_artikel` (
  `id` int(11) NOT NULL,
  `artikel_Artikelbezeichnung` varchar(255) NOT NULL,
  `artikel_Kategorie` varchar(255) NOT NULL,
  `artikel_Zustand` varchar(255) NOT NULL,
  `artikel_Preis` float NOT NULL,
  `artikel_Bemerkungen` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `mattia_artikel`
--

INSERT INTO `mattia_artikel` (`id`, `artikel_Artikelbezeichnung`, `artikel_Kategorie`, `artikel_Zustand`, `artikel_Preis`, `artikel_Bemerkungen`, `timestamp`) VALUES
(1, 'Apple MacBook Air 13.3', 'Computer **', 'Neu **', 1199, '13.30, WXGA+, Intel Core i7, 8GB, SSD', '2021-03-30 13:28:39'),
(2, 'Apple Magic Mouse 2', 'Zubehör', 'Gebraucht', 79, 'Neu entwickelt zum Wiederaufladen…', '2021-03-30 13:28:39'),
(3, 'Apple Thunderbolt/Ethernet', 'Kabel', 'Neu', 39, 'Mit dem Apple Thunderbolt auf Gigabit…', '2021-03-30 13:28:39');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `mattia_artikel`
--
ALTER TABLE `mattia_artikel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `mattia_artikel`
--
ALTER TABLE `mattia_artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
