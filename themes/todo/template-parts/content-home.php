<?php
/**
 * Template part for displaying page content in front-page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package todo
 */

?>
	<?php 
		//Store Post form data in variable
		if (isset($_POST['task'])) :
			$task = $_POST['task'];
		endif;
		if (isset($_POST['item'])) :
			$status = $_POST['item'];
		endif;
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
	?>

	<?php
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
	?>

	<section class="outer__wrapper">
		<div class="container-lg">
			<div class="row">
				<div class="col">
					<div class="form__wrapper">
						<form id="form" action="storage.php" method="post">
							<?php if (isset($_GET['error'])) : ?> <p class="error"><?php echo $_GET['error']; ?></p> <?php endif; ?>
								<input type="text" placeholder="Add new task" id="task" name="task">
								<label class="sr" for="task">Add a new task</label>
							<h2>Things to Do</h2>
							<?php 
								//Get Submission time
								date_default_timezone_set("America/New_York");
								$submissionTime = new DateTime();

								//Calculate number of tasks remaining 
								$tasksRemaining = mysqli_num_rows($result);

								//OUTPUT DATA OF EACH ROW
								if (mysqli_num_rows($result) > 0) {
					
									$uniqueID = 0;
									while ($row = mysqli_fetch_assoc($result)) :
										$uniqueID++;
									?>
									
									<div class="checkbox__wrapper">
										<input name="item[]" value="<?php echo $uniqueID ?>" id="item<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
										<label id="checkLabel" for="item">
											<?php echo $row['item'] ?>
										</label>
									</div>
								<?php 

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

								//Open file
								$fp = fopen($path, 'a');
								$data = array($row['item'], $submissionTime->format('m/d/y H:i:s'));

								fputcsv($fp, $data);
								fclose($fp);
							endwhile;
							?>
							<div class="flex__wrapper">
								<div class="marker">
									<?php if ($tasksRemaining == 0) : ?>
										<p>Goods News! You have nothing to do.<br> <?php echo $tasksRemaining ?> tasks remaining.</p>
									<?php elseif 
									($tasksRemaining < 5) : ?>
										<p>Almost there.<br> You have <?php echo $tasksRemaining ?> thing left to do!</p>
									 <?php else : ?>
										<p>You have way too many tasks to do! (<?php echo $tasksRemaining ?>)</p>
									<?php endif; ?>
								</div>
							<?php //End mysqli fetch while loop 
							} ?>

							<?php // Show Add tasks button if there are no tasks
							if ($tasksRemaining == 0) : ?>
								<div class="flex__wrapper">
									<div class="marker">
										<p>You have no tasks. Add some now!</p>
									</div>
									<div class="btn__wrapper">
										<a id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
									</div>
								</div>
							<?php // Show Clear button if there is at least one task
							else : ?>
								<div class="btn__wrapper">
									<a id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
									<a id="update" href="#" class="btn slideFromLeft" aria-label="Clear tasks">Update tasks</a>
									<a id="delete" href="#" class="btn slideFromLeft" aria-label="Clear tasks">Clear tasks</a>
								</div>
						
								<?php endif; ?>
							</div>
							<div class="download__wrapper">
								<a download="Tasks.csv" id="download" href="<?php echo $link . 'tasks.csv'?>" aria-label="Clear tasks">Download tasks</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>