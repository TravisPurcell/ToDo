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
        // printf('Connected successfully.<br />');

        //Complete item
        $sql = "UPDATE Tasks SET status = '$complete[$x]' WHERE ID = '$id[$x]'";
        echo $complete[$x] . PHP_EOL;
        echo $id[$x] . PHP_EOL;

        //Check connection success
        if (mysqli_query($conn, $sql)) {
            echo 'Row ' . $id[$x] . ' has been updated' . '<br>';
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
    }
?>