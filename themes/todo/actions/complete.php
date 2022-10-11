<?php 
   
   if(isset($_POST['item'])) {

        foreach ($_POST['item'] as $key => $value) { 

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

            // SQL QUERY
            $query  = "SELECT * FROM Tasks";

            // FETCHING DATA FROM DATABASE
            $result = mysqli_query($conn, $query);

            //Update Data in Database
            if (mysqli_num_rows($result) > 0) {
                $numberOfRows = mysqli_num_rows($result);
                $row = mysqli_fetch_assoc($result);
                $sql = "UPDATE Tasks SET status = 1 WHERE ID = $value";
            }

            //Check connection success
            if (mysqli_query($conn, $sql)) {
                echo 'Row ' . $value . ' has been updated' . '<br>';
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
            mysqli_close($conn);
        }
    }
  
?>