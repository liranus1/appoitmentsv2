<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

switch ($request[0]) {
    case 'auth':
        require_once 'auth_routes.php';
        break;
    case 'appointments':
        require_once 'appointments.php';
        break;
    case 'customers':
        require_once 'customers.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(array("message" => "Route not found."));
        break;
}