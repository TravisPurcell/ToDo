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
    printf('Connected successfully.<br />');

    //Update Data in Database
    $sql = "UPDATE Tasks SET status = 0";

    //Check connection success
    if (mysqli_query($conn, $sql)) {
        echo 'Row ' . $value . ' has been updated' . '<br>';
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
?>