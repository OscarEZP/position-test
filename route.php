<?php
require('config/database.php');
require('controllers/Apicontrollers.php');

if(isset($_GET['index']) && $_GET['index'] == 'postData'){

    $data = new Apicontrollers();

    $data->postData($_POST['data']);
    return $data;
}
