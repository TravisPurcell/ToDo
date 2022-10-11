<?php
/**
 * Template part for displaying page content in front-page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package todo
 */

?>

	<?php //Generate full URL
		if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
			$link = "https";
		else $link = "http";
		
		// Here append the common URL characters.
		$link .= "://";
		
		// Append the host(domain name, ip) to the URL.
		$link .= $_SERVER['HTTP_HOST'];
		
		// Append the requested resource location to the URL
		$link .= $_SERVER['REQUEST_URI'];

		$link ;
	?>

	<?php //Connect to Database
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
	?>

	<section class="outer__wrapper">
		<div class="container-lg"><!--Class Placeholder for Bootstrap installation. Bootstrap not used for demo -->
			<div class="row"><!--Class Placeholder for Bootstrap installation. Bootstrap not used for demo -->
				<div class="col-12"><!--Class Placeholder for Bootstrap installation. Bootstrap not used for demo -->
					<div class="form__wrapper">
						<form id="form" action="actions/storage.php" method="post">
							<!--Check for submission error -->
							<?php if (isset($_GET['error'])) : ?> <p class="error"><?php echo $_GET['error']; ?></p> <?php endif; ?>
							
							<!--Submission is disabled in the 'Add new task' input itself to allow realtime updates via AJAX -->
							<input class="add" type="text" placeholder="Add new task*" id="task" name="task">
							<label class="sr" for="task">Add a new task</label>
							<p class="warning">*Task will not be added if field is left empty.</p>
							<h2>Things to Do</h2>

							<?php //Get Submission time
								date_default_timezone_set("America/New_York");
								$submissionTime = new DateTime();
								$tasksTotal = mysqli_num_rows($result);
							?>

							<?php //Prepare new CSV file
								//Get CSV directoy
								$path = get_template_directory() . '/tasks.csv';

								//Delete old CSV file
								unlink($path);

								//Check if file exists
								if( !file_exists( $path ) ){ 
									$fp = fopen($path, 'a');

									//Create Header data
									$dataHeader = array('Task', 'Created On');
									fputcsv($fp, $dataHeader);	
								}
							?>
							
							<?php //Fetch SQL Data
								if (mysqli_num_rows($result) > 0) {
									$uniqueID = 0;
									while ($row = mysqli_fetch_assoc($result)) {
										$uniqueID++; //Increment ID for each task checkbox 

										//Store database data into variable
										$item = $row['item']; ?>
				
										<div class="checkbox__wrapper">
											<div>
												<?php if(!isset($_POST['item'])) { ?>
													<p class="number"><?php echo $uniqueID . '. ' ?></p><input class="complete" name="item[]" value="<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
												<?php } else { ?>
													<p class="number"><?php echo $uniqueID . '. ' ?></p><input class="uncheck" name="item[]" value="<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
												<?php }?>
												<label id="checkLabel" for="item"><?php echo $item ?></label>
											</div>
										</div>

									<?php //Create & Write tasks to CSV
									
									//Open file
										$fp = fopen($path, 'a');
										$data = array($item, $submissionTime->format('m/d/y | H:i:s'));

										//Write to file
										fputcsv($fp, $data);

										fclose($fp);
									} 
								} // End SQL Data fetch 
							?>
						
							<?php //Show Task update & select & first wrapper if tasks are more than 0
								if ($tasksTotal !== 0) { ?>

								<!--Task Update & Select -->
								<input placeholder="Update task" type="text" id="updateTask" name="update">
								<label class="sr" for="fname">First name:</label>
								<input placeholder="1" min="1" max="<?php echo $tasksTotal ?>" type="number" id="selectTask" name="taskSelect">
								<label class="taskSelect" for="taskSelect">Select a task number by row to update. &nbsp;<strong>(Required)</strong></label>


								<div class="flex__wrapper">
									<div class="marker">
										<p id="tasksRemaining"></p>
									</div>
							<?php } ?> 

							<?php //Show only Add tasks button if there are no tasks
								if ($tasksTotal == 0) { ?>
									<div class="flex__wrapper">
										<div class="marker">
											<p id="tasksRemaining2"></p>
										</div>
										<div class="btn__wrapper">
											<a style="margin-bottom: 0;" tabindex="0" id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
										</div>
									</div>
								<?php // Show all buttons if there is at least one task
								} else { ?>
									<div class="btn__wrapper">
										<a tabindex="0" id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
										<a tabindex="0" id="update" href="#" class="btn slideFromLeft" aria-label="Update tasks">Update tasks</a>
										<a tabindex="0" id="clear" href="#" class="btn slideFromLeft" aria-label="Uncheck tasks">Uncheck tasks</a>
										<a tabindex="0" id="delete" href="#" class="btn slideFromLeft" aria-label="Dlete tasks">Delete tasks</a>
									</div>
								</div>
								<div class="download__wrapper">
									<a download="Tasks.csv" id="download" href="<?php echo $link . 'wp-content/themes/todo/tasks.csv' ?>" aria-label="Download tasks">Download CSV</a>
								</div>
							<?php } ?>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>