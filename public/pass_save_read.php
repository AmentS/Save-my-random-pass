<?php

require_once './dbConn.php';
/** @var $pdo \PDO */

/*$statment = $pdo->prepare('select * from web_save');

$statment->execute();
$passwords = $statment->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($passwords);*/


if (isset($_POST)) {

    $test = $_POST;
    $webname = $test['name'];
    $pass = $test['pass'];

    $statment = $pdo->prepare('INSERT INTO web_save (webname, pass) VALUES (:webname, :pass)');
    $statment->bindValue(':webname',$webname);
    $statment->bindValue(':pass', $pass);
    $statment->execute();


}

