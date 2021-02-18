<?php
require_once './dbConn.php';
/** @var $pdo \PDO */


if (isset($_POST)) {

    $id = $_POST['id'];
    $pass = $_POST['pass'];

    try {

        $statment = $pdo->prepare('UPDATE web_save SET pass=:pass WHERE id=:id');
        $statment->bindValue(':id', $id);
        $statment->bindValue(':pass', $pass);
        $statment->execute();
        exit('password updated');
    } catch (PDOException $e) {
        exit('not_ok');
    }

}
