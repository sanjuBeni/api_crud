<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Method,Authorization,X-Requested-With');

include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['sid'];
$name = $data['uname'];
$email = $data['uemail'];
$pass = $data['upass'];
$mobile = $data['umobile'];

$sql = "UPDATE `users` SET `name`='{$name}',`email`='{$email}',`pass`='{$pass}',
        `mobile`='{$mobile}' WHERE id = '{$id}'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => true, 'message' => 'Data update successfully.']);
} else {
    echo json_encode(['status' => false, 'message' => 'Data not update.']);
}