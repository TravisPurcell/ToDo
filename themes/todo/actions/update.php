<?php 

    //Store formdata into variable
    $update = $_POST['update'];
    $taskSelect = $_POST['taskSelect'];

    if(!empty($_POST['update'])) {

        // foreach ($item as $key => $value) { 

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

            // SQL QUERY
            $query  = "SELECT * FROM Tasks";

            // FETCHING DATA FROM DATABASE
            $result = mysqli_query($conn, $query);

            //Update Data in Database
            if (mysqli_num_rows($result) > 0) {
                $numberOfRows = mysqli_num_rows($result);
                $row = mysqli_fetch_assoc($result);
                $sql = "UPDATE Tasks SET item = '$update' WHERE ID = $taskSelect"; 
                $sql2 = "UPDATE Tasks SET status = 0 WHERE ID = $taskSelect";
                print($update);
            }

            //Check connection success
            if (mysqli_query($conn, $sql)) {
                echo 'Row ' . $update . ' has been updated' . '<br>';
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }

            if (mysqli_query($conn, $sql2)) {
                echo 'Row ' . $update . ' has been updated' . '<br>';
            } else {
                echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
            }
            mysqli_close($conn);
        }
        
    // }

  
?>