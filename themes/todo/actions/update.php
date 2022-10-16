<?php 

    //Store formdata into variable
    $update = $_POST['update'];
    $id = $_POST['updateID'];
    $count = count($update);

    if(isset($_POST['update'])) {

        for ($x = 0; $x < $count; $x++){

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

            //Prepare and bind
            $stmt = $conn->prepare("UPDATE Tasks SET item = ? WHERE ID = ?");
            $stmt->bind_param("ss", $update[$x], $id[$x]);

            //Execute
            $stmt->execute();

            //Close
            $stmt->close();
            $conn->close();
        }
    }

?>