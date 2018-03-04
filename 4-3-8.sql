CREATE DATABASE  IF NOT EXISTS `proyectofinal` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `proyectofinal`;
-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: localhost    Database: proyectofinal
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bichos` (
  `idBicho` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idBicho`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registros` (
  `idRegistro` int(11) NOT NULL,
  `indice` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `fotoPaisaje` longblob NOT NULL,
  `fotoMuestra` longblob NOT NULL,
  `fotoMapa` mediumblob NOT NULL,
  `observacion` text,
  `estado` char(11) DEFAULT '0' COMMENT 'Valido tiene 3 valores: INVALIDO PENDIENTE DE VALIDACION y  VALIDO',
  `idUsuario` int(11) NOT NULL,
  `idUbicacion` int(11) NOT NULL,
  PRIMARY KEY (`idRegistro`,`idUsuario`,`idUbicacion`) USING BTREE,
  KEY `fk_registros_ubicaciones1_idx` (`idUbicacion`) USING BTREE,
  KEY `fk_registros_usuarios1_idx` (`idUsuario`) USING BTREE,
  CONSTRAINT `fk_registros_ubicaciones1` FOREIGN KEY (`idUbicacion`) REFERENCES `ubicaciones` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_registros_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registros_tienen_bichos`
--

DROP TABLE IF EXISTS `registros_tienen_bichos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registros_tienen_bichos` (
  `idRegistro` int(11) NOT NULL,
  `idBicho` int(11) NOT NULL,
  PRIMARY KEY (`idRegistro`,`idBicho`) USING BTREE,
  KEY `fk_registros_has_bichos_bichos1_idx` (`idBicho`) USING BTREE,
  KEY `fk_registros_has_bichos_registros1_idx` (`idRegistro`) USING BTREE,
  CONSTRAINT `fk_registros_has_bichos_bichos1` FOREIGN KEY (`idBicho`) REFERENCES `bichos` (`idBicho`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_registros_has_bichos_registros1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`idRegistro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reset_password`
--

DROP TABLE IF EXISTS `reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicaciones` (
  `idUbicacion` int(11) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `provincia` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  PRIMARY KEY (`idUbicacion`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `mail` varchar(45) NOT NULL,
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
  UNIQUE KEY `correo_UNIQUE` (`mail`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`usuario`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registros_coordenadas`()
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
        
	SELECT r.idRegistro, r.latitud, r.longitud, CONVERT(r.fotoPaisaje USING utf8) as fotoPaisaje,r.fecha, r.indice,u.usuario
    FROM registros as r INNER JOIN usuarios as u ON r.idUsuario=u.idUsuario
    WHERE r.estado = 'v';

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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registros_listar`()
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
    -- TODO ESTO y lo anterior es para transformar las filas de coincidencias en columnas
    -- USAMOS SUM porque el if de arriba asigna INT = 1 o 0
    -- En caso de no usar INT y usar String como "si" o "no" hay que usar GROUP_CONCAT
        SUM(Elmido) as elmido, 
		SUM(Patudo) as patudo,
		SUM(Plecoptero) as plecoptero,
		SUM(Tricoptero) as tricoptero 
	FROM filasAColumna AS t GROUP by idRegistro);
        
SELECT r.idRegistro, r.indice, r.fecha, r.latitud, r.longitud, r.estado, t.elmido, t.patudo, t.plecoptero, t.tricoptero,u.ciudad,u.provincia,u.pais
FROM registros AS r
LEFT JOIN coincidencia AS t ON r.idRegistro=t.idRegistro
JOIN ubicaciones as u ON r.idUbicacion= u.idUbicacion;

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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_dame`(uIdRegistro INT)
PROC: BEGIN

	IF ((SELECT estado FROM registros WHERE idRegistro = uIdRegistro) = 'i') THEN
		SELECT 0 as codigo, 'El registro es invalido' mensaje;
        LEAVE PROC;
	END IF;
    
	IF NOT EXISTS (SELECT idRegistro FROM registros WHERE idRegistro = uIdRegistro) THEN
		SELECT 0 as codigo, 'El registro no existe' mensaje;
        LEAVE PROC;
	END IF;
    SELECT	uIdRegistro as codigo,r.idRegistro,r.indice,r.fecha,r.latitud,r.longitud,r.observacion,
		r.estado,r.idUsuario, CONVERT(r.fotoMapa USING utf8) as fotoMapa,
		CONVERT(r.fotoPaisaje USING utf8) as fotoPaisaje,CONVERT(r.fotoMuestra USING utf8) as fotoMuestra
		,u.nombre,u.apellido,u.institucion,u.grado,u.residencia,u.usuario,ub.*
    FROM	registros as r
		INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuario
		INNER JOIN ubicaciones AS ub ON ub.idUbicacion = r.idUbicacion
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_invalidar`(rIdRegistro INT)
PROC: BEGIN
	/*
    Procedimiento que valida un registro.
    */
    IF NOT EXISTS (SELECT idRegistro FROM registros WHERE idRegistro = rIdRegistro) THEN
		SELECT 0 as codigo, 'Registro inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    IF (SELECT valido FROM registros WHERE idRegistro = rIdRegistro) = -1 THEN
		SELECT 0 as codigo, 'El registro ya se encuentra invalidado.' mensaje;
		LEAVE PROC;
	END IF;
    
    START TRANSACTION;
		UPDATE 	registros
        SET		valido = -1
        WHERE	idRegistro = rIdRegistro;
        SELECT rIdRegistro as codigo, 'Registro invalidado con exito.' mensaje;
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_nuevo_completo`(rIndice INT, rFecha TIMESTAMP, rLatitud FLOAT, rLongitud FLOAT, rFotoPaisaje MEDIUMBLOB, rFotoMuestra MEDIUMBLOB, rFotoMapa MEDIUMBLOB, rObservacion TEXT, rIdUsuario VARCHAR(50), uCiudad VARCHAR(45), uProvincia VARCHAR(45), uPais VARCHAR (45), bElmidos VARCHAR(25), bPatudos VARCHAR(25), bPlecopteros VARCHAR(25), bTricopteros VARCHAR(25))
PROC: BEGIN

	DECLARE rIdRegistro INT;
    DECLARE rIdUbicacion INT;

	/*DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo,'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;*/
	-- Control de parametros vacios
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
    IF (uCiudad IS NULL OR uCiudad ='' ) THEN
		SELECT 0 as codigo,'Debe ingresar una ciudad.' mensaje;
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
		INSERT INTO registros VALUES (rIdRegistro,rIndice,rFecha,rLatitud,rLongitud,rFotoPaisaje,rFotoMuestra,rFotoMapa,rObservacion,1,rIdUsuario,rIdUbicacion);
		SELECT rIdRegistro AS codigo, 'Registro creado exitosamente' mensaje,uCiudad as ciudad,uProvincia as provincia,uPais as pais;
        
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_validar`(rIdRegistro INT)
PROC: BEGIN
	/*
    Procedimiento que valida un registro.
    */
    IF NOT EXISTS (SELECT idRegistro FROM registros WHERE idRegistro = rIdRegistro) THEN
		SELECT 0 as codigo, 'Registro inexistente en el sistema.' mensaje;
        LEAVE PROC;
	END IF;
    IF (SELECT valido FROM registros WHERE idRegistro = rIdRegistro) = 1 THEN
		SELECT 0 as codigo, 'El registro ya se encuentra validado.' mensaje;
		LEAVE PROC;
	END IF;
    
    START TRANSACTION;
		UPDATE 	registros
        SET		valido = 1
        WHERE	idRegistro = rIdRegistro;
        SELECT rIdRegistro as codigo, 'Registro validado con exito.' mensaje;
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `token_buscar`(tToken VARCHAR(45))
PROC: BEGIN
	/*
    Procedimiento que crea un nuevo token, para resetear el password
    se autoelimina despues de 1 hora, con un evento.
    */
	
    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	-- Satinizacion de datos
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `token_nuevo`(tToken VARCHAR(45), tIdUsuario INT(11))
PROC: BEGIN
	/*
    Procedimiento que crea un nuevo token, para resetear el password
    se autoelimina despues de 1 hora, con un evento.
    */
	
    DECLARE tIdToken INT;
	 -- Manejo de errores
   DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
		
	-- Satinizacion de datos
	IF (tIdUsuario IS NULL OR tIdUsuario = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un id de Usuario.' mensaje;
        LEAVE PROC;
	END IF;
	IF (tToken IS NULL OR tToken = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un token.' mensaje;
        LEAVE PROC;
	END IF;
    -- Control de parametros incorrectos
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ubicacion_nueva`(IN uCiudad VARCHAR(45),IN uProvincia VARCHAR(45),IN uPais VARCHAR(45), OUT idUbicacionOut VARCHAR(5), OUT mensaje VARCHAR(100))
PROC: BEGIN
	/*
    Procedimiento que permite dar de alta una venta a partir de sus Lineas de Venta, contenidas en pLineas.
    Formato de pLineas: idItem|cantidad|precio*
    El operador '|' se utiliza para separar los atributos de un Item.
    El operador '*' se utiliza para separar las Lineas de Venta.
    Devuelve el 'OK' mas el id de la nueva venta en Mensaje.
    */
    -- Declaración de variabless
   
    DECLARE uIdUbicacion INT;
    
    -- Manejo de errores
   /* DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;*/
	-- Control de parámetros vacíos
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarios_listar`()
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
    
	SELECT u.idUsuario, u.usuario, u.mail, u.nombre, u.apellido, u.institucion, u.grado, u.residencia, u.fechaCreado, COUNT(r.idRegistro) as registros
    FROM usuarios AS u 
    LEFT OUTER JOIN registros AS r ON r.idUsuario=u.idUsuario
    WHERE u.estado='A'
    GROUP BY u.idUsuario
    ORDER BY u.apellido;
    
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_actualizarContrasenia`(uContrasenia VARCHAR(45),uIdUsuario INT(11))
PROC: BEGIN
    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	-- Satinizacion de datos
	IF (uContrasenia IS NULL OR uContrasenia = '') THEN
		SELECT 0 as codigo, 'Debe ingresar una Contreseña.' mensaje;
        LEAVE PROC;
	END IF;
	
	START TRANSACTION;
		DELETE FROM reset_password WHERE idUsuario=uIdUsuario;
		UPDATE usuarios SET contrasenia=uContrasenia WHERE idUsuario=uIdUsuario;
		SELECT 1 as codigo, 'Contraseña actualizada con exito.' mensaje,mail FROM usuarios where idUsuario=uIdUsuario;
	COMMIT;
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_baja`(uIdUsuario INT)
PROC: BEGIN
	/*
    Procedimiento que da de baja un producto.
    */
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
        SET		estado = 'B'
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_buscarPorMail`(uMail VARCHAR(50))
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_dame`(uIdUsuario INT)
PROC: BEGIN
	/*
    Procedimiento que devuelve productos a partir de una cadena. Para buscar todo, cadena vacia.
    */
	IF ((SELECT estado FROM usuarios WHERE idUsuario = uIdUsuario) = 'B') THEN
		SELECT 0 as codigo, 'El usuario esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
    
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE idUsuario = uIdUsuario) THEN
		SELECT 0 as codigo, 'El usuario no existe' mensaje;
        LEAVE PROC;
	END IF;
    
    SELECT	uIdUsuario as codigo, u.idUsuario, u.nombre, u.apellido, u.usuario, u.mail, u.institucion, u.grado, u.residencia, u.rol, u.estado, COUNT(r.idRegistro) as registros
    FROM	usuarios as u
    LEFT OUTER JOIN registros AS r ON r.idUsuario=u.idUsuario
    WHERE   u.idUsuario=uIdUsuario AND u.estado='A';
    
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_facebook`(
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
-- Manejo de errores
	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
			SHOW ERRORS;
		SELECT
			0 AS codigo,
			'Error en la transacción.' mensaje;
		ROLLBACK;
		
	END;
-- Control de usuario existente
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
-- Control de parametros incorrectos
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
					uUsuario,
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_ingresar`(uUsuario VARCHAR(50),uContrasenia VARCHAR(45))
PROC: BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
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
	SELECT 1 as codigo, 'Ingreso Correcto' mensaje,u.* FROM usuarios as  u WHERE usuario=uUsuario;
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_modificar`(uIdUsuario INT, uNombre VARCHAR(45), uApellido VARCHAR(45), uResidencia VARCHAR(100), uInstitucion VARCHAR(150), uGrado VARCHAR(15))
PROC: BEGIN
	/*
    Procedimiento que permite dar de alta una venta a partir de sus Lineas de Venta, contenidas en pLineas.
    Formato de pLineas: idItem|cantidad|precio*
    El operador '|' se utiliza para separar los atributos de un Item.
    El operador '*' se utiliza para separar las Lineas de Venta.
    Devuelve el 'OK' mas el id de la nueva venta en Mensaje.
    */
    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	-- Control de usuario existente
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_nuevo`(uMail VARCHAR(45), uUsuario VARCHAR(20), uContrasenia VARCHAR(45), uNombre VARCHAR(45), uApellido VARCHAR(45), uInstitucion VARCHAR(150), uGrado VARCHAR(15), uResidencia VARCHAR(100))
PROC: BEGIN
	/*
    Procedimiento que permite dar de alta una venta a partir de sus Lineas de Venta, contenidas en pLineas.
    Formato de pLineas: idItem|cantidad|precio*
    El operador '|' se utiliza para separar los atributos de un Item.
    El operador '*' se utiliza para separar las Lineas de Venta.
    Devuelve el 'OK' mas el id de la nueva venta en Mensaje.
    */
	DECLARE uIdUsuario INT;
    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
	-- Control de usuario existente
	IF (uUsuario IS NULL OR uUsuario = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un nombre de Usuario.' mensaje;
        LEAVE PROC;
	END IF;
	IF (uMail IS NULL OR uMail = '') THEN
		SELECT 0 as codigo, 'Debe ingresar un mail.' mensaje;
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
    -- Control de parametros incorrectos
	IF EXISTS (SELECT idUsuario FROM usuarios WHERE usuario = uUsuario AND estado='A') THEN
		SELECT 0 as codigo, 'El usuario ya existe' mensaje;
        LEAVE PROC;
	END IF;
	IF EXISTS (SELECT idUsuario FROM usuarios WHERE mail = uMail AND estado='A') THEN
		SELECT 0 as codigo, 'El mail ya existe' mensaje;
        LEAVE PROC;
	END IF;

    START TRANSACTION;
		SET uIdUsuario = 1 + (SELECT COALESCE(MAX(idUsuario),0) FROM usuarios);
		INSERT INTO usuarios VALUES (uIdUsuario,uMail,uUsuario,uContrasenia,uNombre,uApellido,uInstitucion,uGrado,uResidencia,'usuario','A',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
    SELECT uIdUsuario AS codigo, 'Usuario creado exitosamente' mensaje;
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

-- Dump completed on 2018-03-04 13:05:12
