<?php
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_id']) && $_SESSION['is_admin'] == 1;
}

function requireLogin() {
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
        exit();
    }
}

function requireAdmin() {
    if (!isAdmin()) {
        http_response_code(403);
        echo json_encode(array("message" => "Forbidden"));
        exit();
    }
}