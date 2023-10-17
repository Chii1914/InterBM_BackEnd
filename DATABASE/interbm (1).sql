-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2023 a las 21:30:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interbm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta`
--

CREATE TABLE `boleta` (
  `id_boleta` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `monto` int(100) DEFAULT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boleta`
--

INSERT INTO `boleta` (`id_boleta`, `estado`, `descripcion`, `monto`, `fecha`) VALUES
('1', 0, 'PAGO MENSUALIDAD', 5000, '1939-03-02 00:00:00'),
('2', 1, 'PAGO MENSUALIDAD', 10000, '1945-03-02 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id_evento` int(100) NOT NULL,
  `descripcion` char(200) NOT NULL,
  `titulo` char(50) NOT NULL,
  `localizacion` char(50) NOT NULL,
  `organizador` char(50) NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id_evento`, `descripcion`, `titulo`, `localizacion`, `organizador`, `fecha_hora`) VALUES
(1, 'EVENTO PULENTO', 'INAUGURACIÓN', 'LOS AROMOS 3231', 'AUTOGESTIÓN', '1914-03-02 00:00:00'),
(2, 'EVENTO no pulento', 'cierre', 'LOS AROMOS 11111', 'PRESIDENCIA DE CHILE', '1523-03-02 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participa_en`
--

CREATE TABLE `participa_en` (
  `RUN` varchar(10) NOT NULL,
  `id_evento` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `participa_en`
--

INSERT INTO `participa_en` (`RUN`, `id_evento`) VALUES
('111', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `realizar_pago`
--

CREATE TABLE `realizar_pago` (
  `RUN` varchar(10) NOT NULL,
  `id_boleta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `realizar_pago`
--

INSERT INTO `realizar_pago` (`RUN`, `id_boleta`) VALUES
('111', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `RUN` varchar(10) NOT NULL,
  `Dirección_completa` varchar(50) NOT NULL,
  `telefono_emergencia` int(10) NOT NULL,
  `nombre_completo` char(50) NOT NULL,
  `rol` enum('tesorero','administrador','jugador','entrenador') NOT NULL,
  `categoria` char(20) DEFAULT NULL,
  `telefono` int(10) NOT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`RUN`, `Dirección_completa`, `telefono_emergencia`, `nombre_completo`, `rol`, `categoria`, `telefono`, `password`) VALUES
('01', 'calleeeeee aaaa', 46198077, 'Vladimir Illiych Lenin', 'jugador', '1era', 2147483647, '$2a$10$/ZF2fm4jjuu1ZtZ/meXwJORBwyBWZ3RnG.cw0UeJqI4Mog3uVxviS'),
('013', 'calleeeeee aaaa', 46198077, 'Vladimir Illiych Lenin', 'jugador', '1era', 2147483647, '$2a$10$tqVJhrR4vAIhqfCKLwSXOO/ATdR0rZJfVyftBG6PARCpQH7XzxYRG'),
('0939393939', 'Los Andes 598', 946198077, 'Maximiliano Aguirre Faúndes', 'tesorero', 'juvenil', 945552154, 'Contraseñia d pana'),
('111', 'calleeeeee aaaa', 46198077, 'Vladimir Illiych Lenin', 'jugador', '1era', 2147483647, '$2a$10$MvAKn9Nb079IJtRlCt/7Tep6c2XYg.22wfxhSu1ra/jj5IrtH36vy'),
('1112', '', 0, '', 'tesorero', NULL, 0, '$2a$10$c595lLnDV7NnR623XcwPwexp.rrWVqIW2FSoxyJ4BrEnBT7GA3VhW'),
('132', '', 0, '', 'tesorero', NULL, 0, 'adsas'),
('13233', '', 0, '', 'tesorero', NULL, 0, 'adsas'),
('222', 'CALLE 4', 222222222, 'CC DD EEC', 'tesorero', NULL, 3123123, '222'),
('2312', '', 0, '', 'tesorero', NULL, 0, '$2a$10$cMev69rs2cXuiV8TbettPOj6/4mDgH9/8lQwmsrwOpZrVzy2Bnnxu'),
('23223', '', 0, '', 'tesorero', NULL, 0, 'dasdaads'),
('321312213', '', 0, '', 'tesorero', NULL, 0, 'dsiasdk'),
('3213123', '', 0, '', 'tesorero', NULL, 0, 'dsiasdk'),
('333', 'calleeeeee aaaa', 46198077, 'Vladimir Illiych Lenin', 'jugador', '1era', 2147483647, '$2a$10$X1vUjXzDugh9RINfFFB1YOfdVkLgYp7e9eLzurzC6epCdS5gxDNwa'),
('6787', '', 0, '', 'tesorero', NULL, 0, '$2a$10$OqFQtFexiFbRy1AZ2c7QP.xr1yWnIv3gZrOZXR5ULdolo2lapL/8K');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD PRIMARY KEY (`id_boleta`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id_evento`);

--
-- Indices de la tabla `participa_en`
--
ALTER TABLE `participa_en`
  ADD PRIMARY KEY (`RUN`,`id_evento`),
  ADD KEY `id_evento` (`id_evento`);

--
-- Indices de la tabla `realizar_pago`
--
ALTER TABLE `realizar_pago`
  ADD PRIMARY KEY (`RUN`,`id_boleta`),
  ADD KEY `id_boleta` (`id_boleta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`RUN`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `participa_en`
--
ALTER TABLE `participa_en`
  ADD CONSTRAINT `participa_en_ibfk_1` FOREIGN KEY (`RUN`) REFERENCES `usuario` (`RUN`),
  ADD CONSTRAINT `participa_en_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id_evento`);

--
-- Filtros para la tabla `realizar_pago`
--
ALTER TABLE `realizar_pago`
  ADD CONSTRAINT `realizar_pago_ibfk_1` FOREIGN KEY (`RUN`) REFERENCES `usuario` (`RUN`),
  ADD CONSTRAINT `realizar_pago_ibfk_2` FOREIGN KEY (`id_boleta`) REFERENCES `boleta` (`id_boleta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
