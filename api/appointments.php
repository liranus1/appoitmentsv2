<?php
requireLogin();

switch($method) {
    case 'GET':
        if (isAdmin()) {
            getAllAppointments();
        } else {
            getUserAppointments();
        }
        break;
    case 'POST':
        createAppointment();
        break;
    case 'PUT':
        if (isAdmin()) {
            updateAppointment();
        } else {
            http_response_code(403);
            echo json_encode(array("message" => "Forbidden"));
        }
        break;
    case 'DELETE':
        if (isAdmin()) {
            deleteAppointment();
        } else {
            http_response_code(403);
            echo json_encode(array("message" => "Forbidden"));
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function getAllAppointments() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM appointments");
    echo json_encode($stmt->fetchAll());
}

function getUserAppointments() {
    global $pdo;
    $user_id = $_SESSION['user_id'];
    $stmt = $pdo->prepare("SELECT * FROM appointments WHERE user_id = ?");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll());
}

function createAppointment() {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $_SESSION['user_id'];
    
    $stmt = $pdo->prepare("INSERT INTO appointments (user_id, date, time, service) VALUES (?, ?, ?, ?)");
    if ($stmt->execute([$user_id, $data['date'], $data['time'], $data['service']])) {
        echo json_encode(array("message" => "Appointment created successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to create appointment"));
    }
}

function updateAppointment() {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("UPDATE appointments SET date = ?, time = ?, service = ? WHERE id = ?");
    if ($stmt->execute([$data['date'], $data['time'], $data['service'], $data['id']])) {
        echo json_encode(array("message" => "Appointment updated successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to update appointment"));
    }
}

function deleteAppointment() {
    global $pdo;
    $id = $_GET['id'];
    
    $stmt = $pdo->prepare("DELETE FROM appointments WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(array("message" => "Appointment deleted successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to delete appointment"));
    }
}