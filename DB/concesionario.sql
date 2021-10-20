-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2021 a las 01:51:51
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `CatId` int(11) NOT NULL,
  `CatTipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`CatId`, `CatTipo`) VALUES
(1, 'Camioneta'),
(2, 'Automoviles'),
(3, 'Camperos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `DatId` int(11) NOT NULL,
  `UsuId` int(11) NOT NULL,
  `DatNombre` varchar(50) NOT NULL,
  `DatApellido` varchar(50) NOT NULL,
  `DaTipoId` varchar(20) NOT NULL,
  `DatNumeroId` varchar(20) NOT NULL,
  `DaTelefono` varchar(20) NOT NULL,
  `DatCorreo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`DatId`, `UsuId`, `DatNombre`, `DatApellido`, `DaTipoId`, `DatNumeroId`, `DaTelefono`, `DatCorreo`) VALUES
(1, 1, 'Andres', 'Tellez', 'O+', '+57', '3152481022', 'andres12@gmail.com'),
(2, 2, 'Jose', 'Hernandez', 'O-', '+57', '3142100655', 'jose23@hotmail.com'),
(3, 3, 'Fernando', 'Gutierrez', 'A+', '+57', '3154217859', 'fernando34@hotmail.c'),
(4, 4, 'Jose', 'Hernandez', 'O-', '+57', '3142100655', 'jose23@hotmail.com'),
(7, 7, 'Andres', 'Tellez', 'O+', '+57', '3152481022', 'andres12@gmail.com'),
(11, 9, 'Ernesto', 'Ramirez', 'O+', '+57', '3142514789', 'ernesto45@gmail.com'),
(12, 11, 'Ernesto', 'Ramirez', 'O+', '+57', '3142514789', 'ernesto45@gmail.com'),
(14, 13, 'Jesus', 'Gutierrez', 'O+', '+57', '3128745123', 'jesus123@gmail.com'),
(15, 14, 'Pepe', 'Ramirez', 'O+', '+57', '3158741236', 'pepe12@hotmail.com'),
(16, 15, 'Pepe', 'Ramirez', 'O+', '+57', '3158741236', 'pepe12@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `RolId` int(11) NOT NULL,
  `RolTipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`RolId`, `RolTipo`) VALUES
(2, 'Comprador'),
(1, 'Vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuId` int(11) NOT NULL,
  `UsuLogin` varchar(20) NOT NULL,
  `UsuPass` varchar(20) NOT NULL,
  `RolId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuId`, `UsuLogin`, `UsuPass`, `RolId`) VALUES
(1, 'andres', 'con2415david', 1),
(2, 'jose', 'jose123', 1),
(3, 'fernando', 'fer123', 1),
(4, 'jose', 'jose123', 2),
(7, 'andres', 'con2415david', 2),
(9, 'ernesto', 'ernesto123', 2),
(11, 'ernesto', 'ernesto123', 1),
(13, 'jesus', 'jesus123', 2),
(14, 'pepe', 'pepe123', 1),
(15, 'pepe', 'pepe123', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `VehPlaca` varchar(10) NOT NULL,
  `DatId` int(11) NOT NULL,
  `CatId` int(11) NOT NULL,
  `VehModelo` int(11) NOT NULL,
  `VehMarca` varchar(50) NOT NULL,
  `VehEstado` varchar(30) NOT NULL,
  `VehPrecio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`VehPlaca`, `DatId`, `CatId`, `VehModelo`, `VehMarca`, `VehEstado`, `VehPrecio`) VALUES
('115DKC', 1, 1, 2006, 'Chevrolet', 'Usado', 45000000),
('125JGD', 2, 1, 2008, 'Renault', 'Nuevo', 85000000),
('137HTY', 1, 3, 2005, 'Mazda', 'Usado', 45000000),
('142DFG', 1, 1, 2005, 'Honda', 'Nuevo', 80000000),
('145GHC', 3, 3, 2007, 'Toyota', 'Usado', 40000000),
('147CGX', 3, 2, 2009, 'Renault', 'Nuevo', 90000000),
('187DFB', 2, 1, 2005, 'Chevrolet', 'Nuevo', 85000000),
('345FGB', 15, 3, 2008, 'Chevrolet', 'Nuevo', 40000000),
('542SEH', 3, 1, 2004, 'Chevrolet', 'Usado', 35000000),
('571VGH', 2, 3, 2008, 'Mazda', 'Usado', 27000000),
('859GHX', 1, 2, 2010, 'Toyota', 'Nuevo', 70000000),
('875SDF', 1, 2, 2010, 'Hyundai', 'Nuevo', 78000000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CatId`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`DatId`),
  ADD UNIQUE KEY `UsuId` (`UsuId`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`RolId`),
  ADD UNIQUE KEY `RolTipo` (`RolTipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuId`),
  ADD KEY `RolId` (`RolId`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`VehPlaca`),
  ADD KEY `CatId` (`CatId`) USING BTREE,
  ADD KEY `DatId` (`DatId`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `DatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `RolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `datos_ibfk_1` FOREIGN KEY (`UsuId`) REFERENCES `usuarios` (`UsuId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`RolId`) REFERENCES `rol` (`RolId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`CatId`) REFERENCES `categorias` (`CatId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehiculos_ibfk_2` FOREIGN KEY (`DatId`) REFERENCES `datos` (`DatId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
