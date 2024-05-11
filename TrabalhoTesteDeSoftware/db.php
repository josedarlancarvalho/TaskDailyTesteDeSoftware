<?php


$db_host = 'localhost';
$db_user = 'root';
$db_password = '1227';
$db_name = 'usersdb';

$conexao = new mysqli($db_host, $db_user, $db_password, $db_name)

if($conexao->connect_errno)
{
    echo "Erro"
}
else
{
    echo "Conexao com sucesso"
}
?>
