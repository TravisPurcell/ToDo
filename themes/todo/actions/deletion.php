<?php 

    //Call Database
    require(__DIR__ . '/db.php');

    //Prepare and bind
    $stmt = $conn->prepare("TRUNCATE TABLE Tasks");

    //Execute
    $stmt->execute();

    //Close
    $stmt->close();
    $conn->close();
?>