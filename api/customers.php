<?php
// Simulating a database with a JSON file
$customersFile = 'customers.json';

function getCustomers() {
    global $customersFile;
    if (file_exists($customersFile)) {
        return json_decode(file_get_contents($customersFile), true);
    }
    return [];
}

function saveCustomers($customers) {
    global $customersFile;
    file_put_contents($customersFile, json_encode($customers));
}

switch($method) {
    case 'GET':
        echo json_encode(getCustomers());
        break;
    case 'POST':
        $customer = json_decode(file_get_contents("php://input"), true);
        $customers = getCustomers();
        $customer['id'] = time(); // Simple ID generation
        $customers[] = $customer;
        saveCustomers($customers);
        echo json_encode($customer);
        break;
    // Add PUT and DELETE methods here if needed
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}