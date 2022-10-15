<?php 
    $deleteSelect = $_POST['deleteSelect'];

    foreach ($_POST['deleteSelect'] as $key => $value) { 

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

        // SQL QUERY
        $query  = "SELECT * FROM Tasks";

        // FETCHING DATA FROM DATABASE
        $result = mysqli_query($conn, $query);

        //Clear deleted selected task
        $sql = "DELETE FROM Tasks WHERE ID = $value";

        //Check Connection
        if (mysqli_query($conn, $sql)) {
            echo "Records successfully deleted";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
    }
?>