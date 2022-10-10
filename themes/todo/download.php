<?php 
    function download() {
        //Generate output for text file
        //Get CSV directoy
        $path = get_template_directory() . '/tasks.csv';

        //Check if file exists
        if( !file_exists( $path ) ){ 
            $fp = fopen($path, 'a');

            //Create Header data
            $dataHeader = array('Task', 'Submitted On');
            fputcsv($fp, $dataHeader);	
        }

        //Open 
        $fp = fopen($path, 'a');
        $data = array($row['item'], $submissionTime->format('m/d/y H:i:s'));

        fputcsv($fp, $data);
        fclose($fp);
    }
?>