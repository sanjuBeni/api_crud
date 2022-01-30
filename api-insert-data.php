<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Method,Authorization,X-Requested-With');


include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['uname'];
$email = $data['uemail'];
$pwd = $data['upwd'];
$mobile = $data['umobile'];

$sql = "INSERT into users(name,email,pass,mobile) values('{$name}','{$email}','{$pwd}','{$mobile}')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => true, 'message' => 'Data inserted successfully']);
} else {
    echo json_encode(['status' => false, 'meassage' => 'Data not inserted']);
}