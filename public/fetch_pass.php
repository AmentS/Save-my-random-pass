<?php

require_once './dbConn.php';
/** @var $pdo \PDO */

//ovaj dio je tacan
$statment = $pdo->prepare('select * from web_save');

$statment->execute();
$passwords = $statment->fetchAll(PDO::FETCH_ASSOC);
exit(json_encode($passwords));


