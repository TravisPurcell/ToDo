<?php 
    $task = $_POST['task'];
    $status = 0;

    //Call Database
    require(__DIR__ . '/db.php');
    
    //Prepare and bind
    $stmt = $conn->prepare("INSERT INTO Tasks (item, status) VALUES (?, ?)");
    if(!empty($task)) {
        $stmt->bind_param("ss", $task, $status);
    }

    //Execute
    $stmt->execute();

    //Close
    $stmt->close();
    $conn->close();
?>
