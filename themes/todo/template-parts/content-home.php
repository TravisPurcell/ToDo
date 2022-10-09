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
								// $taskedCompleted = array_map(function ($arr) {
								// 	return $arr['num'];
								// }, $arr);

								// echo print_r($tasksCompleted);

								//OUTPUT DATA OF EACH ROW
								if (mysqli_num_rows($result) > 0) {
					
									$uniqueID = 0;
									while ($row = mysqli_fetch_assoc($result)) :
										$uniqueID++;
									?>

									<?php
										if(isset($_POST['item'])) {
										$checked = $_POST['item'];
										$counter = count($checked);
										echo $counter;
									}
									?>
									
									<div class="checkbox__wrapper">
										<div>
											<?php if(!isset($_POST['item'])) { ?>
												<input class="complete" name="item[]" value="<?php echo $uniqueID ?>" id="complete<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
											<?php } else { ?>
												<input class="uncheck" name="item[]" value="<?php echo $uniqueID ?>" id="complete<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
											<?php }?>
											<label id="checkLabel" for="item"><?php echo $row['item'] ?></label>
										</div>
										<input placeholder="Update task" type="text" id="updateTask" name="update[]">
										<label class="sr" for="fname">First name:</label>
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

								//Open 
								$fp = fopen($path, 'a');
								$data = array($row['item'], $submissionTime->format('m/d/y H:i:s'));

								fputcsv($fp, $data);
								fclose($fp);
							endwhile;
							?>
							<div class="flex__wrapper">
								<div class="marker">
									<?php if ($tasksRemaining == 0) : ?>
										<p>Goods News! You have nothing to do!</p>
									<?php elseif 
									($tasksRemaining < 5) : ?>
										<p>Almost there. Keep going!</p>
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
									<a id="update" href="#" class="btn slideFromLeft" aria-label="Update tasks">Update tasks</a>
									<a id="clear" href="#" class="btn slideFromLeft" aria-label="Clear tasks">Clear tasks</a>
									<a id="delete" href="#" class="btn slideFromLeft" aria-label="Dlete tasks">Delete tasks</a>
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