<?php
switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'register':
                    register($data);
                    break;
                case 'login':
                    login($data);
                    break;
                case 'logout':
                    logout();
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(array("message" => "Invalid action"));
                    break;
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Action not specified"));
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function register($data) {
    global $pdo;
    
    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$name, $email, $password])) {
        echo json_encode(array("message" => "User registered successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to register user"));
    }
}

function login($data) {
    global $pdo;
    
    $email = $data['email'];
    $password = $data['password'];
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['is_admin'] = $user['is_admin'];
        echo json_encode(array("message" => "Login successful", "user" => array(
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "is_admin" => $user['is_admin']
        )));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials"));
    }
}

function logout() {
    session_destroy();
    echo json_encode(array("message" => "Logged out successfully"));
}