<?php

require_once './dbConn.php';
/** @var $pdo \PDO */


if (isset($_POST)) {

    $webname = $_POST['name'];
    $pass = $_POST['pass'];

    try {
        $statment = $pdo->prepare('INSERT INTO web_save (webname, pass) VALUES (:webname, :pass)');
        $statment->bindValue(':webname', $webname);
        $statment->bindValue(':pass', $pass);
        $statment->execute();
        exit('saved');
    }
    catch (PDOException $e){
        exit('not_ok');
    }


}

