<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include 'config.php';

$sql = "SELECT *from users";
$squery = mysqli_query($conn, $sql);

if (mysqli_num_rows($squery) > 0) {
    $output = mysqli_fetch_all($squery, MYSQLI_ASSOC);
    echo json_encode($output);
} else {
    echo json_encode(['status' => false, 'message' => 'Record not found']);
}