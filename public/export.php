<?php
$stringData = $_POST['data'];
$fileName = $_POST['fileName'] . '.txt';
try {
    $fh = fopen($fileName, 'w') or die("can't open file");

    fwrite($fh, $stringData);
    fclose($fh);
    exit('exported');
} catch (PDOException $e) {
    exit('not_exported: ' . $e);
}

?>