<?php 

    $taskSelect = $_POST['taskSelect'];

    //Connect to Database
    $dbhost = 'localhost';
    $dbuser = 'wp';
    $dbpass = 'wp';
    $dbname = 'todo';
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    if($conn->connect_errno ) {
        printf("Connect failed: %s<br />", $conn->connect_error);
        exit();
    }
    printf('Connection Successful.<br />');

    //Clear the database
    $sql = "TRUNCATE TABLE Tasks";

    //Check Connection
    if (mysqli_query($conn, $sql)) {
        echo "Records successfully deleted";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
?>