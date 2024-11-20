<?php
// Получаем данные из тела запроса
$_POST = json_decode(file_get_contents("php://input"), true);

$data = json_decode(file_get_contents("db.json"), true);

if (!is_array($data)) {
    $data = [];
}

if (!isset($data['customers'])) {
    $data['customers'] = [];
}

$data['customers'][] = $_POST;

file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode($_POST, JSON_UNESCAPED_UNICODE);
?>

