<?php
header('Access-Control-Allow-Origin: *');
$target_path = "fotos/";
 
$target_path = $target_path . basename( $_FILES['file']['name']);
 
if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
    echo "Imagen Subida Correctamente";
} else {
echo $target_path;
    echo "Error al Subir Imagen.";
}
?>