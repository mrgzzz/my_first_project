<?php
require_once 'config/database.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

try {
    $database = new Database();
    $pdo = $database->getConnection();
    
   
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $users = $stmt->fetchAll();

    require 'views/user_table.php';
    
} catch (PDOException $e) {

    error_log("Database error: " . $e->getMessage());

    die("Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
}
?>