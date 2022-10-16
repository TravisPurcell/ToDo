<?php 

    $complete = $_POST['complete'];
    $id = $_POST['completeID'];
    $count = count($id);

    for ($x = 0; $x < $count; $x++){
        //Connect to Database
        // $dbhost = 'localhost';
        // $dbuser = 'tnpportf_WPK9D';
        // $dbpass = 'Gr-l~=L~*hQU';
        // $dbname = 'tnpportf_WPK9D';

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
        printf('Connected successfully.<br />');

        //Prepare and bind
        $stmt = $conn->prepare("UPDATE Tasks SET status = ? WHERE ID = ?");
        $stmt->bind_param("ss", $complete[$x], $id[$x]);

        //Execute
        $stmt->execute();

        //Close
        $stmt->close();
        $conn->close();
    }
?>