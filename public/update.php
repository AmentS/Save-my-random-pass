<?php
require_once './dbConn.php';
/** @var $pdo \PDO */


if (isset($_POST)) {

    $webname = $_POST['name'];
    $pass = $_POST['pass'];

    try {

        $statment = $pdo->prepare('UPDATE web_save SET pass=:pass WHERE webname=:webname');
        $statment->bindValue(':webname', $webname);
        $statment->bindValue(':pass', $pass);
        $statment->execute();
        exit('updated');
    } catch (PDOException $e) {
        exit('not_ok');
    }

}
