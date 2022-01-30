<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Method,Authorization,X-Requested-With');

include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['sid'];

$sql = "DELETE from users where id = '${id}'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => true, 'message' => 'Data deleted.']);
} else {
    echo json_encode(['status' => true, 'message' => 'Data not deleted.']);
}