<?php

require_once './dbConn.php';
/** @var $pdo \PDO */




if (isset($_POST)) {

    $test = $_POST;
    $webname = $test['name'];
    $pass = $test['pass'];

    $statment = $pdo->prepare('INSERT INTO web_save (webname, pass) VALUES (:webname, :pass)');
    $statment->bindValue(':webname',$webname);
    $statment->bindValue(':pass', $pass);
    $statment->execute();
    exit('ok');

}

