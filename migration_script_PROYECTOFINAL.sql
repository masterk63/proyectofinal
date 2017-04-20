-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: proyectofinal
-- Source Schemata: proyectofinal
-- Created: Thu Apr 20 20:40:43 2017
-- Workbench Version: 6.3.6
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema proyectofinal
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `proyectofinal` ;
CREATE SCHEMA IF NOT EXISTS `proyectofinal` ;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.bichos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`bichos` (
  `idBicho` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idBicho`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.registros
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`registros` (
  `idRegistro` INT(11) NOT NULL,
  `indice` INT(11) NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitud` FLOAT NOT NULL,
  `longitud` FLOAT NOT NULL,
  `fotoPaisaje` MEDIUMBLOB NOT NULL,
  `fotoMuestra` MEDIUMBLOB NOT NULL,
  `fotoMapa` MEDIUMBLOB NOT NULL,
  `observacion` TEXT NULL DEFAULT NULL,
  `valido` INT(11) NULL DEFAULT '1',
  `pendiente` INT(11) NULL DEFAULT '1',
  `idUsuario` INT(11) NOT NULL,
  `idUbicacion` INT(11) NOT NULL,
  PRIMARY KEY (`idRegistro`, `idUsuario`, `idUbicacion`),
  INDEX `fk_registros_ubicaciones1_idx` (`idUbicacion` ASC),
  INDEX `fk_registros_usuarios1_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_registros_ubicaciones1`
    FOREIGN KEY (`idUbicacion`)
    REFERENCES `proyectofinal`.`ubicaciones` (`idUbicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registros_usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `proyectofinal`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.registros_tienen_bichos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`registros_tienen_bichos` (
  `idRegistro` INT(11) NOT NULL,
  `idBicho` INT(11) NOT NULL,
  PRIMARY KEY (`idRegistro`, `idBicho`),
  INDEX `fk_registros_has_bichos_bichos1_idx` (`idBicho` ASC),
  INDEX `fk_registros_has_bichos_registros1_idx` (`idRegistro` ASC),
  CONSTRAINT `fk_registros_has_bichos_bichos1`
    FOREIGN KEY (`idBicho`)
    REFERENCES `proyectofinal`.`bichos` (`idBicho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registros_has_bichos_registros1`
    FOREIGN KEY (`idRegistro`)
    REFERENCES `proyectofinal`.`registros` (`idRegistro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.reset_password
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`reset_password` (
  `idToken` INT(11) NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `idUsuario` INT(11) NOT NULL,
  PRIMARY KEY (`idToken`, `idUsuario`),
  INDEX `idusuario_idx` (`idUsuario` ASC),
  CONSTRAINT `idusuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `proyectofinal`.`usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.test
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`test` (
  `idTest` INT(11) NOT NULL AUTO_INCREMENT,
  `fotoPaisaje` MEDIUMBLOB NULL DEFAULT NULL,
  `fotoMuestra` MEDIUMBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idTest`))
ENGINE = InnoDB
AUTO_INCREMENT = 104
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.ubicaciones
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`ubicaciones` (
  `idUbicacion` INT(11) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUbicacion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table proyectofinal.usuarios
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectofinal`.`usuarios` (
  `idUsuario` INT(11) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(20) NOT NULL,
  `contrasenia` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `institucion` VARCHAR(150) NOT NULL,
  `grado` VARCHAR(15) NULL DEFAULT NULL,
  `residencia` VARCHAR(100) NULL DEFAULT NULL,
  `rol` ENUM('administrador', 'usuario') NOT NULL DEFAULT 'usuario',
  `estado` CHAR(1) NOT NULL DEFAULT 'A',
  `fechaCreado` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizado` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `correo_UNIQUE` (`mail` ASC),
  UNIQUE INDEX `username_UNIQUE` (`usuario` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.registros_listar
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
			IF( rtb.idBicho = 1, 'si', null ) as Elmido,
			IF( rtb.idBicho = 2, 'si', null) as Patudo,
			IF( rtb.idBicho = 3, 'si', null ) as Plecoptero,
            IF( rtb.idBicho = 4, 'si', null ) as Tricoptero
	FROM registros_tienen_bichos AS rtb
    LEFT JOIN bichos AS b ON b.idBicho=rtb.idBicho);

DROP TEMPORARY TABLE IF EXISTS coincidencia;
CREATE TEMPORARY TABLE IF NOT EXISTS coincidencia AS 
	( SELECT idRegistro,
        GROUP_concat(Elmido) as Elmido, 
		GROUP_concat(Patudo) as Patudo,
		GROUP_concat(Plecoptero) as Plecoptero,
		GROUP_concat(Tricoptero) as Tricoptero 
	FROM filasAColumna AS t GROUP by idRegistro);
        
SELECT r.idRegistro, r.indice, r.fecha, r.latitud, r.longitud, r.valido, r.pendiente, t.Elmido, t.Patudo, t.Plecoptero, t.Tricoptero
FROM registros AS r
LEFT JOIN coincidencia AS t ON r.idRegistro=t.idRegistro;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.registro_nuevo_completo
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_nuevo_completo`(rIndice INT, rFecha TIMESTAMP, rLatitud FLOAT, rLongitud FLOAT, rFotoPaisaje MEDIUMBLOB, rFotoMuestra MEDIUMBLOB, rFotoMapa MEDIUMBLOB, rObservacion TEXT, rIdUsuario VARCHAR(50), uCiudad VARCHAR(45), uProvincia VARCHAR(45), uPais VARCHAR (45), bElmidos VARCHAR(2), bPatudos VARCHAR(2), bPlecopteros VARCHAR(2), bTricopteros VARCHAR(2))
PROC: BEGIN

	DECLARE rIdRegistro INT;
    DECLARE rIdUbicacion INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo,'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
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
		INSERT INTO registros VALUES (rIdRegistro,rIndice,rFecha,rLatitud,rLongitud,rFotoPaisaje,rFotoMuestra,rFotoMapa,rObservacion,1,1,rIdUsuario,rIdUbicacion);
		SELECT rIdRegistro AS codigo, 'Registro creado exitosamente' mensaje;
        
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

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.token_buscar
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.token_nuevo
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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

    START TRANSACTION;
		SET tIdToken = 1 + (SELECT COALESCE(MAX(idToken),0) FROM reset_password);
		INSERT INTO reset_password VALUES (tIdToken,tToken,tIdUsuario);
    SELECT 1 AS codigo, 'Token creado exitosamente' mensaje;
    COMMIT;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.ubicacion_nueva
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SHOW ERRORS;
			SELECT 0 as codigo, 'Error en la transacción.' mensaje;
            ROLLBACK;
		END;
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
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuarios_listar
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
    
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_actualizarContrasenia
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
		SELECT 0 as codigo, 'Debe ingresar una Contresenia.' mensaje;
        LEAVE PROC;
	END IF;
	
	START TRANSACTION;
		UPDATE usuarios SET contrasenia=uContrasenia
        WHERE idUsuario=uIdUsuario;
		SELECT 1 as codigo, 'Contrasenia actualizada con exito.' mensaje;
	COMMIT;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_baja
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_buscarPorMail
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_buscarPorMail`(uMail VARCHAR(50))
PROC: BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			SELECT 0 as codigo, 'Error en la transaccion.' mensaje;
            SHOW ERRORS;
            ROLLBACK;
        END;
        
	IF NOT EXISTS (SELECT idUsuario FROM usuarios WHERE mail = uMail) THEN
		SELECT 0 as codigo, 'El mail no existe' mensaje;
        LEAVE PROC;
	END IF;
    
	IF ((SELECT estado FROM usuarios WHERE mail = uMail) = 'B') THEN
		SELECT 0 as codigo, 'El usuario con este mail esta dado de baja' mensaje;
        LEAVE PROC;
	END IF;
    
	SELECT idUsuario as codigo, u.*
    FROM usuarios u
    WHERE mail=uMail AND estado='A';
    
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_dame
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
    WHERE   u.idUsuario=uIdUsuario AND estado='A';
    
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_ingresar
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_ingresar`(uUsuario VARCHAR(20))
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
    
	SELECT idUsuario as codigo, u.*
    FROM usuarios u
    WHERE usuario=uUsuario AND estado='A';
    
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_modificar
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine proyectofinal.usuario_nuevo
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `proyectofinal`$$
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
END$$

DELIMITER ;
SET FOREIGN_KEY_CHECKS = 1;
