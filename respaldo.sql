CREATE DATABASE  IF NOT EXISTS `proyectofinal` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyectofinal`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectofinal
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bichos`
--

DROP TABLE IF EXISTS `bichos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bichos` (
  `idBicho` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idBicho`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bichos`
--

LOCK TABLES `bichos` WRITE;
/*!40000 ALTER TABLE `bichos` DISABLE KEYS */;
INSERT INTO `bichos` VALUES (1,'Elmidos'),(2,'Patudos'),(3,'Plecopteros'),(4,'Tricopteros');
/*!40000 ALTER TABLE `bichos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registros` (
  `idRegistro` int(11) NOT NULL,
  `indice` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `latitudFoto` float DEFAULT NULL,
  `longitudFoto` float DEFAULT NULL,
  `criterioCienMetros` char(2) DEFAULT NULL,
  `fotoPaisaje` longblob NOT NULL,
  `fotoMuestra` longblob NOT NULL,
  `fotoMapa` mediumblob NOT NULL,
  `observacion` text,
  `estado` char(11) DEFAULT '0' COMMENT 'Valido tiene 3 valores: INVALIDO PENDIENTE DE VALIDACION y  VALIDO',
  `idUsuario` int(11) NOT NULL,
  `idUbicacion` int(11) NOT NULL,
  `comentAdmin` text,
  `validationIdAdmin` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRegistro`,`idUsuario`,`idUbicacion`) USING BTREE,
  KEY `fk_registros_ubicaciones1_idx` (`idUbicacion`) USING BTREE,
  KEY `fk_registros_usuarios1_idx` (`idUsuario`) USING BTREE,
  CONSTRAINT `fk_registros_ubicaciones1` FOREIGN KEY (`idUbicacion`) REFERENCES `ubicaciones` (`idUbicacion`),
  CONSTRAINT `fk_registros_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros_tienen_bichos`
--

DROP TABLE IF EXISTS `registros_tienen_bichos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registros_tienen_bichos` (
  `idRegistro` int(11) NOT NULL,
  `idBicho` int(11) NOT NULL,
  PRIMARY KEY (`idRegistro`,`idBicho`) USING BTREE,
  KEY `fk_registros_has_bichos_bichos1_idx` (`idBicho`) USING BTREE,
  KEY `fk_registros_has_bichos_registros1_idx` (`idRegistro`) USING BTREE,
  CONSTRAINT `fk_registros_has_bichos_bichos1` FOREIGN KEY (`idBicho`) REFERENCES `bichos` (`idBicho`),
  CONSTRAINT `fk_registros_has_bichos_registros1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`idRegistro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros_tienen_bichos`
--

LOCK TABLES `registros_tienen_bichos` WRITE;
/*!40000 ALTER TABLE `registros_tienen_bichos` DISABLE KEYS */;
/*!40000 ALTER TABLE `registros_tienen_bichos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password`
--

DROP TABLE IF EXISTS `reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reset_password` (
  `idToken` int(11) NOT NULL,
  `token` varchar(45) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idToken`,`idUsuario`) USING BTREE,
  KEY `idusuario_idx` (`idUsuario`) USING BTREE,
  CONSTRAINT `idusuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password`
--

LOCK TABLES `reset_password` WRITE;
/*!40000 ALTER TABLE `reset_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `test` (
  `idTest` int(11) NOT NULL AUTO_INCREMENT,
  `fotoPaisaje` mediumblob,
  `fotoMuestra` mediumblob,
  PRIMARY KEY (`idTest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ubicaciones` (
  `idUbicacion` int(11) NOT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  PRIMARY KEY (`idUbicacion`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (1,'San Miguel de Tucumán','Tucumán','Argentina'),(2,'San!','TUC','AR'),(3,'San M de Tuc','Tuc','Arg'),(4,'0','0','0'),(5,'Tucuamn','Tucuamn','Argentina'),(6,'santiago','santiago','Argentina'),(7,'Trancas','Tucuman','Argentina'),(8,'Yerba Buena','Tucumán','Argentina'),(9,'undefined','Tucumán','Argentina');
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `usuario` varchar(150) NOT NULL,
  `contrasenia` varchar(250) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `institucion` varchar(150) NOT NULL,
  `grado` varchar(15) DEFAULT NULL,
  `residencia` varchar(100) DEFAULT NULL,
  `rol` enum('administrador','usuario') NOT NULL DEFAULT 'usuario',
  `estado` char(1) NOT NULL DEFAULT 'A',
  `fechaCreado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fotoPerfil` longblob,
  `fb` int(1) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`usuario`) USING BTREE,
  UNIQUE KEY `correo_UNIQUE` (`mail`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'prueba@prueba.com','admin','c902b0284a3b91260c73dfd9fb6131b6','Admin','Admin','Unt','8','Corrientes 4162','administrador','A','2018-11-12 22:41:45','2018-11-12 22:41:45',_binary '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',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'proyectofinal'
--

--
-- Dumping routines for database 'proyectofinal'
--
/*!50003 DROP PROCEDURE IF EXISTS `registros_coordenadas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registros_coordenadas`()
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
        
	SELECT r.idRegistro, r.latitud, r.longitud, CONVERT(r.fotoPaisaje USING utf8) as fotoPaisaje,r.fecha, r.indice,u.usuario
    FROM registros as r INNER JOIN usuarios as u ON r.idUsuario=u.idUsuario
    WHERE r.estado = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registros_listar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registros_listar`(
	IN `rInicio` TIMESTAMP,
	IN `rFin` TIMESTAMP,
	IN `rEstado` INT

)
BEGIN


    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
        
DROP TEMPORARY TABLE IF EXISTS filasAColumna;
CREATE TEMPORARY TABLE IF NOT EXISTS filasAColumna AS 
	(SELECT rtb.idRegistro,
			IF( rtb.idBicho = 1, 1, 0 ) as elmido,
			IF( rtb.idBicho = 2, 1, 0) as patudo,
			IF( rtb.idBicho = 3, 1, 0 ) as plecoptero,
            IF( rtb.idBicho = 4, 1, 0 ) as tricoptero
	FROM registros_tienen_bichos AS rtb
    LEFT JOIN bichos AS b ON b.idBicho=rtb.idBicho);

DROP TEMPORARY TABLE IF EXISTS coincidencia;
CREATE TEMPORARY TABLE IF NOT EXISTS coincidencia AS 
	( SELECT idRegistro,
    
    
    
        SUM(Elmido) as elmido, 
		SUM(Patudo) as patudo,
		SUM(Plecoptero) as plecoptero,
		SUM(Tricoptero) as tricoptero 
	FROM filasAColumna AS t GROUP by idRegistro);

IF rEstado < 2 THEN
	SELECT r.idRegistro, r.indice, r.fecha, r.latitud, r.longitud, r.estado, t.elmido, t.patudo, t.plecoptero, t.tricoptero,u.ciudad,u.provincia,u.pais,us.nombre,us.apellido,r.comentAdmin,us.usuario,r.latitudFoto,r.longitudFoto,r.criterioCienMetros,r.observacion,usa.nombre as nombreAdmin
	FROM registros AS r
	LEFT JOIN coincidencia AS t ON r.idRegistro=t.idRegistro
	JOIN usuarios AS us ON r.idUsuario = us.idUsuario
	JOIN ubicaciones as u ON r.idUbicacion= u.idUbicacion 
	LEFT JOIN usuarios AS usa ON r.validationIdAdmin = usa.idUsuario
	WHERE r.fecha >= rInicio AND rFin <= rFin AND r.estado = rEstado
    ORDER BY r.idRegistro DESC;
ELSE 
	SELECT r.idRegistro, r.indice, r.fecha, r.latitud, r.longitud, r.estado, t.elmido, t.patudo, t.plecoptero, t.tricoptero,u.ciudad,u.provincia,u.pais,us.nombre,us.apellido,r.comentAdmin,us.usuario,r.latitudFoto,r.longitudFoto,r.criterioCienMetros,r.observacion,usa.nombre as nombreAdmin
	FROM registros AS r
	LEFT JOIN coincidencia AS t ON r.idRegistro=t.idRegistro
	JOIN usuarios AS us ON r.idUsuario = us.idUsuario
	JOIN ubicaciones as u ON r.idUbicacion= u.idUbicacion
	LEFT JOIN usuarios AS usa ON r.validationIdAdmin = usa.idUsuario
	WHERE r.fecha >= rInicio AND rFin <= rFin
    ORDER BY r.idRegistro DESC;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registros_listar_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registros_listar_usuario`(uIdUsuario INT)
BEGIN


    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
SELECT r.idRegistro, r.indice, r.fecha, r.latitud, r.longitud,CONVERT(r.fotoMapa USING utf8) as fotoMapa, u.ciudad,u.provincia,u.pais,r.estado
FROM registros AS r
JOIN ubicaciones as u ON r.idUbicacion= u.idUbicacion 
WHERE r.idUsuario = uIdUsuario
ORDER BY r.idRegistro DESC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro_actualizarComentarioAdmin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registro_actualizarComentarioAdmin`( rIdRegistro INT, rComment TEXT)
PROC : 

BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	 
	START TRANSACTION;
		UPDATE 	registros as r
        SET		comentAdmin = rComment
        WHERE	r.idRegistro = rIdRegistro;
        SELECT 1 as codigo, 'Comemtario actualizado con exito.' mensaje;
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro_dame` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registro_dame`(uIdRegistro INT)
PROC: BEGIN

	IF ((SELECT estado FROM registros WHERE idRegistro = uIdRegistro) = 'i') THEN
		SELECT 0 as codigo, 'El registro es invalido' mensaje;
        LEAVE PROC;
	END IF;
    
	IF NOT EXISTS (SELECT idRegistro FROM registros WHERE idRegistro = uIdRegistro) THEN
		SELECT 0 as codigo, 'El registro no existe' mensaje;
        LEAVE PROC;
	END IF;
	
	DROP TEMPORARY TABLE IF EXISTS filasAColumna;
CREATE TEMPORARY TABLE IF NOT EXISTS filasAColumna AS 
	(SELECT rtb.idRegistro,
			IF( rtb.idBicho = 1, 1, 0 ) as elmido,
			IF( rtb.idBicho = 2, 1, 0) as patudo,
			IF( rtb.idBicho = 3, 1, 0 ) as plecoptero,
            IF( rtb.idBicho = 4, 1, 0 ) as tricoptero
	FROM registros_tienen_bichos AS rtb
    LEFT JOIN bichos AS b ON b.idBicho=rtb.idBicho);

DROP TEMPORARY TABLE IF EXISTS coincidencia;
CREATE TEMPORARY TABLE IF NOT EXISTS coincidencia AS 
	( SELECT idRegistro,
    
    
    
        SUM(Elmido) as elmido, 
		SUM(Patudo) as patudo,
		SUM(Plecoptero) as plecoptero,
		SUM(Tricoptero) as tricoptero 
	FROM filasAColumna AS t GROUP by idRegistro);
        
		
    SELECT	uIdRegistro as codigo,r.idRegistro,r.indice,r.fecha,r.latitud,r.longitud,r.observacion,r.comentAdmin,
		r.estado,r.idUsuario, CONVERT(r.fotoMapa USING utf8) as fotoMapa,
		CONVERT(r.fotoPaisaje USING utf8) as fotoPaisaje,CONVERT(r.fotoMuestra USING utf8) as fotoMuestra
		,u.nombre,u.apellido,u.institucion,u.grado,u.residencia,u.usuario,ub.*, t.elmido, t.patudo, t.plecoptero, t.tricoptero
    FROM	registros as r
		INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuario
		INNER JOIN ubicaciones AS ub ON ub.idUbicacion = r.idUbicacion
		LEFT JOIN coincidencia AS t ON r.idRegistro=t.idRegistro
    WHERE   r.idRegistro = uIdRegistro;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro_invalidar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registro_invalidar`(vCadena VARCHAR(100), vIdAdmin INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	 
	START TRANSACTION;
		SET @SQL = CONCAT( 'UPDATE 	registros SET	estado = -1, validationIdAdmin = ',vIdAdmin,' WHERE idRegistro IN (', vCadena, ')' );
		PREPARE stmt 
		FROM
			@SQL;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
		SELECT 1 as codigo, 'Registro/s validado/s con exito.' mensaje;
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro_nuevo_completo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registro_nuevo_completo`(rIndice INT, rFecha TIMESTAMP, rLatitud FLOAT, rLongitud FLOAT,  rLatitudFoto FLOAT, rLongitudFoto FLOAT, rCriterioCienMetros CHAR(2), rFotoPaisaje MEDIUMBLOB, rFotoMuestra MEDIUMBLOB, rFotoMapa MEDIUMBLOB, rObservacion TEXT, rIdUsuario VARCHAR(50), uCiudad VARCHAR(45), uProvincia VARCHAR(45), uPais VARCHAR (45), bElmidos VARCHAR(25), bPatudos VARCHAR(25), bPlecopteros VARCHAR(25), bTricopteros VARCHAR(25))
PROC: BEGIN
	 DECLARE rIdRegistro INT;
   DECLARE rIdUbicacion INT;
	 
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	 
	
		
	
    IF (rFecha IS NULL) THEN
		SELECT 0 as codigo,'Debe ingresar una fecha.' mensaje;
        LEAVE PROC;
	END IF;
    IF (rLatitud IS NULL OR rLatitud = 0 ) THEN
		SELECT 0 as codigo,'Debe ingresar una latitud.' mensaje;
        LEAVE PROC;
	END IF;
    IF (rLongitud IS NULL OR rLongitud = 0 ) THEN
		SELECT 0 as codigo,'Debe ingresar una longitud.' mensaje;
        LEAVE PROC;
	END IF;
    IF (rFotoPaisaje IS NULL) THEN
		SELECT 0 as codigo,'Debe ingresar una foto de paisaje.' mensaje;
        LEAVE PROC;
	END IF;
    IF (rFotoMuestra IS NULL) THEN
		SELECT 0 as codigo,'Debe ingresar una foto de muestra.' mensaje;
        LEAVE PROC;
	END IF;
    IF (rFotoMapa IS NULL) THEN
		SELECT 0 as codigo,'Debe ingresar una foto de mapa.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uProvincia IS NULL OR uProvincia = '') THEN
		SELECT 0 as codigo,'Debe ingresar una provincia.' mensaje;
        LEAVE PROC;
	END IF;
	IF (uPais IS NULL OR uPais = '') THEN
		SELECT 0 as codigo,'Debe ingresar un pais.' mensaje;
        LEAVE PROC;
	END IF;
    
    IF ((SELECT estado FROM usuarios WHERE idUsuario = rIdUsuario ) = 'B') THEN
		SELECT 0 as codigo,'El usuario esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
    
	START TRANSACTION;
    
    CALL ubicacion_nueva(uCiudad,uProvincia,uPais,@idUbicacionOut,@mensaje);
		SET rIdUbicacion = @idUbicacionOut;   
		
		SET rIdRegistro = 1 + (SELECT COALESCE(MAX(idRegistro),0) FROM registros);
		INSERT INTO registros VALUES (rIdRegistro,rIndice,rFecha,rLatitud,rLongitud,rLatitudFoto,rLongitudFoto,rCriterioCienMetros,rFotoPaisaje,rFotoMuestra,rFotoMapa,rObservacion,0,rIdUsuario,rIdUbicacion,'',null);
		SELECT rIdRegistro AS codigo, 'Registro creado exitosamente' mensaje,uCiudad as ciudad,uProvincia as provincia,uPais as pais,CONVERT(rFotoMapa USING utf8) as fotoMapa;
        
      IF bElmidos='si' THEN 
			INSERT INTO registros_tienen_bichos VALUES (rIdRegistro,1);
		END IF;
		IF bPatudos='si' THEN 
			INSERT INTO registros_tienen_bichos VALUES (rIdRegistro,2);
		END IF;
        IF bPlecopteros='si' THEN 
			INSERT INTO registros_tienen_bichos VALUES (rIdRegistro,3);
		END IF;
        IF bTricopteros='si' THEN 
			INSERT INTO registros_tienen_bichos VALUES (rIdRegistro,4);
        END IF;
        
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro_validar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `registro_validar`( vCadena VARCHAR(100), vIdAdmin INT )
PROC : 

BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	 
	START TRANSACTION;
		SET @SQL = CONCAT( 'UPDATE 	registros SET	estado = 1, validationIdAdmin = ',vIdAdmin,' WHERE idRegistro IN (', vCadena, ')' );
		PREPARE stmt 
		FROM
			@SQL;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
		SELECT 1 as codigo, 'Registro/s validado/s con exito.' mensaje;
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `token_buscar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `token_buscar`(tToken VARCHAR(45))
PROC: BEGIN
	
	
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	
	IF (tToken IS NULL OR tToken = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un token.' mensaje;
        LEAVE PROC;
	END IF;
	
    IF NOT EXISTS (SELECT * FROM reset_password as r WHERE token = tToken) THEN
		SELECT 0 as codigo, 'El Token no existe o expiro su tiempo' mensaje;
        LEAVE PROC;
	END IF;
    
    SELECT 1 as codigo,r.* 
    FROM reset_password as r WHERE token = tToken;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `token_nuevo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `token_nuevo`(tToken VARCHAR(45), tIdUsuario INT(11))
PROC: BEGIN
	
	
    DECLARE tIdToken INT;
	 
   DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
		
	
	IF (tIdUsuario IS NULL OR tIdUsuario = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un id de Usuario.' mensaje;
        LEAVE PROC;
	END IF;
	IF (tToken IS NULL OR tToken = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un token.' mensaje;
        LEAVE PROC;
	END IF;
    
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = tIdUsuario AND estado='A') THEN
		SELECT 0 as codigo, 'El ID de usuario no existe o esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
	
	IF EXISTS (SELECT idToken FROM reset_password WHERE idUsuario = tIdUsuario) THEN
		SELECT 200 as codigo,r.token as token, 'El usuario ya posee un token, el mail fue reenviado a su casilla de correo' mensaje from reset_password
		as r where idUsuario = tIdUsuario;
        LEAVE PROC;
	END IF;

    START TRANSACTION;
		SET tIdToken = 1 + (SELECT COALESCE(MAX(idToken),0) FROM reset_password);
		INSERT INTO reset_password VALUES (tIdToken,tToken,tIdUsuario);
    SELECT 201 AS codigo, 'Por favor revise su casilla de correo electonico, para continuar con el procesos de restablecimiento de contraseña' mensaje;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ubicacion_nueva` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `ubicacion_nueva`(IN uCiudad VARCHAR(45),IN uProvincia VARCHAR(45),IN uPais VARCHAR(45), OUT idUbicacionOut VARCHAR(5), OUT mensaje VARCHAR(100))
PROC: BEGIN
	
    
   
    DECLARE uIdUbicacion INT;
    
    
   
	
	IF EXISTS (SELECT idUbicacion
				FROM ubicaciones 
                WHERE ciudad LIKE CONCAT('%',uCiudad,'%') 
				AND provincia LIKE CONCAT('%',uProvincia,'%')
                AND pais LIKE CONCAT('%',uPais,'%')) 
                THEN
		SET uIdUbicacion = (SELECT idUbicacion
				FROM ubicaciones 
                WHERE ciudad LIKE uCiudad
				AND provincia LIKE uProvincia
                AND pais LIKE uPais);
                
        SELECT uIdUbicacion INTO idUbicacionOut;
        SELECT 'Ubicacion existente' INTO mensaje;
        LEAVE PROC;
	END IF;

    START TRANSACTION;
		SET uIdUbicacion = 1 + (SELECT COALESCE(MAX(idUbicacion),0) FROM ubicaciones);
		INSERT INTO ubicaciones VALUES (uIdUbicacion,uCiudad,uProvincia,uPais); 
    
	SELECT uIdUbicacion INTO idUbicacionOut;
    SELECT 'Ubicacion creada con exito' INTO mensaje;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_listar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuarios_listar`(uEstado CHAR)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
    
	SELECT u.idUsuario, u.usuario, u.mail, u.nombre, u.apellido, u.institucion, u.grado, u.residencia, u.estado, COUNT(r.idRegistro) as registros
    FROM usuarios AS u 
    LEFT OUTER JOIN registros AS r ON r.idUsuario=u.idUsuario
    WHERE u.estado=uEstado
    GROUP BY u.idUsuario
    ORDER BY u.apellido;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_activar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_activar`(uIdUsuario INT)
PROC: BEGIN
	
    IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = uIdUsuario) THEN
		SELECT 0 as codigo, 'Usuario inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    IF (SELECT estado FROM usuarios WHERE idUsuario = uIdUsuario) = 'A' THEN
		SELECT 0 as codigo, 'El usuario ya se encuentra activo.' mensaje;
		LEAVE PROC;
	END IF;
    
    START TRANSACTION;
		UPDATE 	usuarios
        SET		estado = 'A', fechaActualizado = NOW()
        WHERE	idUsuario = uIdUsuario;
        SELECT uIdUsuario as codigo, 'Usuario activado con exito.' mensaje;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_actualizarContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_actualizarContrasenia`(uContrasenia VARCHAR(45),uIdUsuario INT(11))
PROC: BEGIN
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	
	IF (uContrasenia IS NULL OR uContrasenia = '') THEN
		SELECT 0 as codigo, 'Debe ingresar una Contreseña.' mensaje;
        LEAVE PROC;
	END IF;
	
	START TRANSACTION;
		DELETE FROM reset_password WHERE idUsuario=uIdUsuario;
		UPDATE usuarios SET contrasenia=MD5(uContrasenia) WHERE idUsuario=uIdUsuario;
		SELECT 1 as codigo, 'Contraseña actualizada con exito.' mensaje,mail FROM usuarios where idUsuario=uIdUsuario;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_actulizarFotoPerfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_actulizarFotoPerfil`(uIdUsuario INT,uFotoPerfil MEDIUMBLOB)
PROC: BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	 
    START TRANSACTION;
		UPDATE 	usuarios as u
        SET		fotoPerfil = uFotoPerfil
        WHERE	u.idUsuario = uIdUsuario;
        SELECT 1 as codigo, 'Foto Perfil Actulizado Con Exito.' mensaje;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_adm_ingresar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_adm_ingresar`(uUsuario VARCHAR(50),uContrasenia VARCHAR(45))
PROC: BEGIN

     DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
        
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE usuario = uUsuario) THEN
		SELECT 0 as codigo, 'El usuario no existe' mensaje;
        LEAVE PROC;
	END IF;
    
	IF ((SELECT estado FROM usuarios WHERE usuario = uUsuario) = 'B') THEN
		SELECT 0 as codigo, 'El usuario esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
    
    IF NOT EXISTS (SELECT idUsuario FROM Usuarios WHERE usuario=uUsuario AND contrasenia=MD5(uContrasenia))
    THEN
		SELECT 0 as codigo, 'Nombre de Usuario y contraseña incorrectos' mensaje;
        LEAVE PROC;
	END IF;
    
    IF (SELECT rol FROM usuarios WHERE usuario = uUsuario) = 'usuario' THEN
		SELECT 0 codigo, "El usuario no tiene permiso de administrador" mensaje;
		LEAVE PROC;
    END IF;
	
	SELECT 1 as codigo, idUsuario, usuario, nombre, apellido, rol, CONVERT(fotoPerfil USING utf8) as fotoPerfil FROM usuarios WHERE usuario=uUsuario;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_baja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_baja`(uIdUsuario INT)
PROC: BEGIN
	
    IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = uIdUsuario) THEN
		SELECT 0 as codigo, 'Usuario inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    IF (SELECT estado FROM usuarios WHERE idUsuario = uIdUsuario) = 'B' THEN
		SELECT 0 as codigo, 'El usuario ya se encuentra dado de baja.' mensaje;
		LEAVE PROC;
	END IF;
    
    START TRANSACTION;
		UPDATE 	usuarios
        SET		estado = 'B', fechaActualizado = NOW()
        WHERE	idUsuario = uIdUsuario;
        SELECT uIdUsuario as codigo, 'Usuario dado de baja con exito.' mensaje;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_buscarPorMail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_buscarPorMail`(uMail VARCHAR(50))
PROC: BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE mail = uMail) THEN
		SELECT 0 as codigo, 'El mail solicitado no existe' mensaje;
        LEAVE PROC;
	END IF;
    
	IF ((SELECT estado FROM usuarios WHERE mail = uMail) = 'B') THEN
		SELECT 0 as codigo, 'El usuario con este mail esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
    
	SELECT idUsuario as codigo, u.*
    FROM usuarios u
    WHERE mail=uMail AND estado='A';
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_dame` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_dame`(uIdUsuario INT)
PROC: BEGIN
	
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = uIdUsuario) THEN
		SELECT 0 as codigo, 'El usuario no existe' mensaje;
        LEAVE PROC;
	END IF;
    
    SELECT	uIdUsuario as codigo, u.idUsuario, u.nombre, u.apellido, u.usuario, u.mail, u.institucion, u.grado, u.residencia, u.rol, u.estado, COUNT(r.idRegistro) as registros,CONVERT(u.fotoPerfil USING utf8) as fotoPerfil, fechaCreado, fechaActualizado
    FROM	usuarios as u
    LEFT OUTER JOIN registros AS r ON r.idUsuario=u.idUsuario
    WHERE   u.idUsuario=uIdUsuario;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_facebook` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_facebook`(
	uMail VARCHAR ( 55 ),
	uUsuario VARCHAR ( 150 ),
	uContrasenia VARCHAR ( 45 ),
	uNombre VARCHAR ( 45 ),
	uApellido VARCHAR ( 45 ),
	ufotoPerfil LONGBLOB 
)
PROC : 
BEGIN
	DECLARE
		uIdUsuario INT;

	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
			SHOW ERRORS;
		SELECT
			0 AS codigo,
			'Error en la transacción.' mensaje;
		ROLLBACK;
		
	END;

	IF
		( uUsuario IS NULL OR uUsuario = '' ) THEN
		SELECT
			0 AS codigo,
			'Debe ingresar un nombre de Usuario.' mensaje;
		LEAVE PROC;
		
	END IF;
	IF
		( uMail IS NULL OR uMail = '' ) THEN
		SELECT
			0 AS codigo,
			'Debe ingresar un mail.' mensaje;
		LEAVE PROC;
		
	END IF;
	IF
		( uNombre IS NULL OR uNombre = '' ) THEN
		SELECT
			0 AS codigo,
			'Debe ingresar un nombre.' mensaje;
		LEAVE PROC;
		
	END IF;
	IF
		( uApellido IS NULL OR uApellido = '' ) THEN
		SELECT
			0 AS codigo,
			'Debe ingresar un apellido.' mensaje;
		LEAVE PROC;
		
	END IF;
	IF
		( uContrasenia IS NULL OR uContrasenia = '' ) THEN
		SELECT
			0 AS codigo,
			'Debe ingresar una contraseña.' mensaje;
		LEAVE PROC;
		
	END IF;

	IF
		( SELECT idUsuario FROM usuarios WHERE mail = uMail ) THEN
		IF
			( ( SELECT fb FROM usuarios WHERE mail = uMail AND estado = 'A' ) = 1 ) THEN
			SELECT
				u.idUsuario AS codigo,
				'El usuario es facebook' mensaje from usuarios as u where mail = uMail;
			LEAVE PROC;
			ELSE
			IF
				( SELECT idUsuario FROM usuarios WHERE mail = uMail AND estado = 'B' ) THEN
				SELECT
					0 AS codigo,
					'El usuario esta dado de baja' mensaje;
				LEAVE PROC;
				ELSE
				IF
					( ( SELECT fb FROM usuarios WHERE mail = uMail AND estado = 'A' ) = 0 ) THEN
					SELECT
						0 AS codigo,
						'El usuario ya se encuentra en nuestro sistema' mensaje;
					LEAVE PROC;
					
				END IF;
				
			END IF;
			
		END IF;
		ELSE 
			SET uIdUsuario = 1+ ( SELECT COALESCE ( MAX( idUsuario ), 0 ) FROM usuarios );
			INSERT INTO usuarios ( idUsuario, mail, usuario, contrasenia, nombre, apellido, institucion, grado, residencia, rol, estado, fechaCreado, fechaActualizado, fotoPerfil, fb )
			VALUES
				(
					uIdUsuario,
					uMail,
					LOWER(uUsuario),
					MD5( uContrasenia ),
					uNombre,
					uApellido,
					'',
					'',
					'',
					'usuario',
					'A',
					CURRENT_TIMESTAMP,
					CURRENT_TIMESTAMP,
					ufotoPerfil,
					1 
				);
			SELECT
				uIdUsuario AS codigo,
				'Usuario creado exitosamente' mensaje;
		END IF;
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_ingresar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_ingresar`(uUsuario VARCHAR(50),uContrasenia VARCHAR(45))
PROC: BEGIN

     DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
        
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE usuario = uUsuario) THEN
		SELECT 0 as codigo, 'El usuario no existe' mensaje;
        LEAVE PROC;
	END IF;
    
	IF ((SELECT estado FROM usuarios WHERE usuario = uUsuario) = 'B') THEN
		SELECT 0 as codigo, 'El usuario esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
	
	IF NOT EXISTS (SELECT idUsuario FROM Usuarios WHERE usuario=uUsuario AND contrasenia=MD5(uContrasenia))
    THEN
		SELECT 0 as codigo, 'Nombre de Usuario y contraseña incorrectos' mensaje;
        LEAVE PROC;
	ELSE 
	SELECT 1 as codigo, 'Ingreso Correcto' mensaje, idUsuario, usuario, nombre, apellido, rol, CONVERT(fotoPerfil USING utf8) as fotoPerfil FROM usuarios WHERE usuario=uUsuario;
        LEAVE PROC;
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_modificar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_modificar`(uIdUsuario INT, uNombre VARCHAR(45), uApellido VARCHAR(45), uResidencia VARCHAR(100), uInstitucion VARCHAR(150), uGrado VARCHAR(15))
PROC: BEGIN
	
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	
    IF (uNombre IS NULL OR uNombre = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un nombre.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uApellido IS NULL OR uApellido = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un apellido.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uInstitucion IS NULL OR uInstitucion = '') THEN
		SELECT 0 as codigo, 'Debe ingresar una institucion.' mensaje;
        LEAVE PROC;
	END IF;

	START TRANSACTION;
		UPDATE usuarios SET nombre=uNombre, apellido=uApellido, residencia=uResidencia, institucion=uInstitucion, grado=uGrado
        WHERE idUsuario=uIdUsuario;
		SELECT uIdUsuario as codigo, 'Usuario actualizado con exito.' mensaje;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_nuevo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_nuevo`(uMail VARCHAR(45), uUsuario VARCHAR(50), uContrasenia VARCHAR(45), uNombre VARCHAR(45), uApellido VARCHAR(45), uInstitucion VARCHAR(150), uGrado VARCHAR(15), uResidencia VARCHAR(100), uProfileImg LONGBLOB)
PROC: BEGIN
	
	DECLARE uIdUsuario INT;
    
    	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT 0 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
	
	IF (uUsuario IS NULL OR uUsuario = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un nombre de Usuario.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uNombre IS NULL OR uNombre = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un nombre.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uApellido IS NULL OR uApellido = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un apellido.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uContrasenia IS NULL OR uContrasenia = '') THEN
		SELECT 0 as codigo, 'Debe ingresar una contraseña.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uInstitucion IS NULL OR uInstitucion = '') THEN
		SELECT 0 as codigo, 'Debe ingresar una institucion.' mensaje;
        LEAVE PROC;
	END IF;
    
	IF EXISTS (SELECT idUsuario FROM usuarios WHERE usuario = uUsuario AND estado='A') THEN
		SELECT 0 as codigo, 'El usuario ya existe' mensaje;
        LEAVE PROC;
	END IF;

    START TRANSACTION;
		SET uIdUsuario = 1 + (SELECT COALESCE(MAX(idUsuario),0) FROM usuarios);
		INSERT INTO usuarios VALUES (uIdUsuario,uMail,LOWER(uUsuario),MD5(uContrasenia),uNombre,uApellido,uInstitucion,uGrado,uResidencia,'usuario','A',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,uProfileImg,0);
    SELECT uIdUsuario AS codigo, 'Usuario creado exitosamente' mensaje;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_set_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ingeit`@`localhost` PROCEDURE `usuario_set_admin`(idAdmin INT, uIdUsuario INT)
PROC: BEGIN
    DECLARE rolNuevo VARCHAR(15);
    
    IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = idAdmin) THEN
		SELECT 0 as codigo, 'Administrador inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = uIdUsuario) THEN
		SELECT 0 as codigo, 'Usuario inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    
	IF (SELECT rol FROM usuarios WHERE idUsuario = idAdmin) = 'usuario' THEN
		SELECT 0 as codigo, 'Usted no es un usuario administrador. Modificacion denegada' mensaje;
		LEAVE PROC;
	END IF;
	
	IF (SELECT rol FROM usuarios WHERE idUsuario = uIdUsuario) = 'usuario' THEN
		SET rolNuevo = 'administrador';
	ELSE
		SET rolNuevo = 'usuario';
	END IF;
    
    START TRANSACTION;
		UPDATE 	usuarios
        SET		rol = rolNuevo
        WHERE	idUsuario = uIdUsuario;
        SELECT uIdUsuario as codigo, 'Se cambio el permiso del usuario de manera correcta' mensaje;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-14 17:32:23
