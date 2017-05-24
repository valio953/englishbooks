<?php
    $img_name = $_REQUEST['imgname'];
    move_uploaded_file($_FILES['webcam']['tmp_name'], 'temp_imgs/' . $img_name . '.jpg');
?>