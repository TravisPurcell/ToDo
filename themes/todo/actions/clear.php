<?php 

    //Call Database
    require(__DIR__ . '/db.php');

    //Prepare and bind
    $stmt = $conn->prepare("UPDATE Tasks SET status = ?");
    $value = 0;
    $stmt->bind_param("s", $value);

    //Execute
    $stmt->execute();

    //Close
    $stmt->close();
    $conn->close();
?>