<?php 

    //Connect to Database
    // $dbhost = 'localhost';
    // $dbuser = 'tnpportf_WPK9D';
    // $dbpass = 'Gr-l~=L~*hQU';
    // $dbname = 'tnpportf_WPK9D';

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

    //Prepare and bind
    $stmt = $conn->prepare("TRUNCATE TABLE Tasks");

    //Execute
    $stmt->execute();

    //Close
    $stmt->close();
    $conn->close();
?>