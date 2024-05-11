<?php
// register.php

include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Verifica se as senhas coincidem
    if ($password !== $confirm_password) {
        echo "As senhas não coincidem!";
        exit;
    }

    // Verifica se o email é válido
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email inválido!";
        exit;
    }

    // Verifica se o nome de usuário ou email já estão em uso
    $check_query = "SELECT * FROM users WHERE username=? OR email=?";
    $stmt = mysqli_prepare($conn, $check_query);
    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        echo "Nome de usuário ou e-mail já está em uso!";
        exit;
    }

    // Hash da senha    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insere o novo usuário no banco de dados
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashed_password);

    if (mysqli_stmt_execute($stmt)) {
        echo "Usuário registrado com sucesso!";
        header("Location: index.html");
exit();             
    } else {
        echo "Erro ao registrar usuário: " . mysqli_error($conn);
    }
}



?>
