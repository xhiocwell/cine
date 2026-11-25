-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2026 a las 21:55:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cine_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleto`
--

CREATE TABLE `boleto` (
  `idBoleto` int(11) NOT NULL,
  `idFuncion` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `numeroAsiento` int(11) NOT NULL,
  `precioPagado` decimal(10,2) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boleto`
--

INSERT INTO `boleto` (`idBoleto`, `idFuncion`, `idCliente`, `numeroAsiento`, `precioPagado`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 1, 1, 5, 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(2, 1, 2, 6, 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(3, 1, 3, 7, 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(4, 2, 4, 10, 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(5, 3, 1, 15, 20.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(6, 4, 2, 3, 35.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(7, 5, 3, 20, 28.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `paterno` varchar(255) NOT NULL,
  `materno` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombres`, `paterno`, `materno`, `email`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 'Juan', 'Pérez', 'Gómez', 'juan.perez@correo.com', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(2, 'María', 'López', 'Ruiz', 'maria.lopez@correo.com', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(3, 'Carlos', 'Ramírez', 'Soto', 'carlos.ramirez@correo.com', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(4, 'Ana', 'Torres', 'Vega', 'ana.torres@correo.com', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcion`
--

CREATE TABLE `funcion` (
  `idFuncion` int(11) NOT NULL,
  `idSala` int(11) NOT NULL,
  `idPelicula` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funcion`
--

INSERT INTO `funcion` (`idFuncion`, `idSala`, `idPelicula`, `fechaHora`, `precio`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 1, 1, '2026-12-01 18:00:00', 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(2, 1, 1, '2026-12-01 21:00:00', 25.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(3, 2, 2, '2026-12-02 15:00:00', 20.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(4, 3, 4, '2026-12-02 19:30:00', 35.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(5, 1, 5, '2026-12-03 22:00:00', 28.00, '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `idGenero` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`idGenero`, `nombre`, `descripcion`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 'Acción', 'Películas con mucha adrenalina y peleas', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(2, 'Comedia', 'Películas para reír y pasar un buen rato', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(3, 'Drama', 'Historias serias y emotivas', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(4, 'Ciencia Ficción', 'Futurismo, tecnología y espacio', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(5, 'Terror', 'Películas para asustarse', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

CREATE TABLE `pelicula` (
  `idPelicula` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `sinopsis` text NOT NULL,
  `duracionMin` int(11) NOT NULL,
  `clasificacion` varchar(255) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`idPelicula`, `titulo`, `sinopsis`, `duracionMin`, `clasificacion`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 'Inception', 'Un ladrón que roba secretos a través de los sueños.', 148, '+13', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(2, 'Toy Story', 'Un grupo de juguetes cobra vida cuando no hay humanos.', 81, 'ATP', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(3, 'El Padrino', 'La historia de una familia mafiosa en Nueva York.', 175, '+18', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(4, 'Interstellar', 'Un grupo de astronautas viaja por un agujero de gusano.', 169, '+13', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL),
(5, 'El Conjuro', 'Una familia vive aterradoras experiencias paranormales.', 112, '+18', '2026-11-23 15:45:47.000000', '2026-11-23 15:45:47.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula_genero`
--

CREATE TABLE `pelicula_genero` (
  `idPelicula` int(11) NOT NULL,
  `idGenero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pelicula_genero`
--

INSERT INTO `pelicula_genero` (`idPelicula`, `idGenero`) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sala`
--

CREATE TABLE `sala` (
  `idSala` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sala`
--

INSERT INTO `sala` (`idSala`, `nombre`, `capacidad`, `tipo`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 'Sala 1 - Central', 50, '2D', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(2, 'Sala 2 - VIP', 30, '3D', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL),
(3, 'Sala 3 - IMAX', 80, 'IMAX', '2026-11-23 15:45:46.000000', '2026-11-23 15:45:46.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `actualizadoEn` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `eliminadoEn` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `username`, `email`, `password`, `creadoEn`, `actualizadoEn`, `eliminadoEn`) VALUES
(1, 'admin', 'admin@cine.com', '$2b$10$/8HswmH7QnGd/mzNq9Ur1uLucZq9rvuQlsEv9aStQoL4s8fuWoIK6', '2026-11-23 19:10:15.546376', '2026-11-23 19:10:15.546376', NULL),
(2, 'akndday', 'akndday@cine.com', '$2b$10$cfzYEcR1Z0gBYlZ3z.PsWutu68L0uKTUuRV5dyAOiGMRXAIovU7EW', '2026-11-23 19:12:17.193752', '2026-11-23 19:12:17.193752', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boleto`
--
ALTER TABLE `boleto`
  ADD PRIMARY KEY (`idBoleto`),
  ADD KEY `FK_8ce30cc3b92b92f6f0a2a255443` (`idFuncion`),
  ADD KEY `FK_bf559fdcfeca192ea26a3c65c50` (`idCliente`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `funcion`
--
ALTER TABLE `funcion`
  ADD PRIMARY KEY (`idFuncion`),
  ADD KEY `FK_695ba51a4eefd58cf4bd9d69414` (`idSala`),
  ADD KEY `FK_464c24603f681dc8568a747af1b` (`idPelicula`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`idGenero`);

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`idPelicula`);

--
-- Indices de la tabla `pelicula_genero`
--
ALTER TABLE `pelicula_genero`
  ADD PRIMARY KEY (`idPelicula`,`idGenero`),
  ADD KEY `IDX_b367a1507b23172fe9669cf224` (`idPelicula`),
  ADD KEY `IDX_9ac2e189130ca04841b7e63c0f` (`idGenero`);

--
-- Indices de la tabla `sala`
--
ALTER TABLE `sala`
  ADD PRIMARY KEY (`idSala`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `IDX_2863682842e688ca198eb25c12` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boleto`
--
ALTER TABLE `boleto`
  MODIFY `idBoleto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `funcion`
--
ALTER TABLE `funcion`
  MODIFY `idFuncion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `idGenero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `idPelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sala`
--
ALTER TABLE `sala`
  MODIFY `idSala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `boleto`
--
ALTER TABLE `boleto`
  ADD CONSTRAINT `FK_8ce30cc3b92b92f6f0a2a255443` FOREIGN KEY (`idFuncion`) REFERENCES `funcion` (`idFuncion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bf559fdcfeca192ea26a3c65c50` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `funcion`
--
ALTER TABLE `funcion`
  ADD CONSTRAINT `FK_464c24603f681dc8568a747af1b` FOREIGN KEY (`idPelicula`) REFERENCES `pelicula` (`idPelicula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_695ba51a4eefd58cf4bd9d69414` FOREIGN KEY (`idSala`) REFERENCES `sala` (`idSala`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pelicula_genero`
--
ALTER TABLE `pelicula_genero`
  ADD CONSTRAINT `FK_9ac2e189130ca04841b7e63c0f6` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`idGenero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b367a1507b23172fe9669cf224d` FOREIGN KEY (`idPelicula`) REFERENCES `pelicula` (`idPelicula`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
