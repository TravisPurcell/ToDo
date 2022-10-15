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

            $sql = "UPDATE Tasks SET item = '$update[$x]' WHERE ID = '$id[$x]'";

            //Check connection success
            if (mysqli_query($conn, $sql)) {
                echo 'Row ' . $update[$x] . ' has been updated' . '<br>';
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
            mysqli_close($conn);
        }
    }

?>