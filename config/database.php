<?php

function Connect() {
    $conn = new mysqli("localhost", "root", "yoma1994", "position-test");
    $conn->query("SET NAMES 'utf-8';");
    if ($conn->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error;
    }
    return $conn;
}
