<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$sid = $data['sid'];
// echo $sid;
// die;

include 'config.php';

$sql = "SELECT *from users where id = '{$sid}'";
$query = mysqli_query($conn, $sql);

if (mysqli_num_rows($query) > 0) {
    $output = mysqli_fetch_all($query, MYSQLI_ASSOC);
    echo json_encode($output);
} else {
    echo json_encode(['status' => false, 'message' => 'Data not found']);
}