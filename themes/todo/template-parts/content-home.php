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
		$query  = "SELECT item FROM Tasks";

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
									$rowNumber = 0;
									while ($row = mysqli_fetch_assoc($result)) { 
										foreach ($row as $key) { ?>
											<div class="checkbox__wrapper">
												<input type="checkbox" id="item" name="item">
												<label id="checkLabel" for="item">
													<?php echo $key?>
												</label>
											</div>
										<?php } 

										//Iterate row number
										$rowNumber++;
									}

									//Generate output for text file
									//Get CSV directoy
									$path = get_template_directory() . '/tasks.csv';

									//Check if file exists
									if( !file_exists( $path ) ){ 
										$fp = fopen($path, 'a');

										//Create Header data
										$dataHeader = array('Task', 'Submitted On', 'Completed?');
										fputcsv($fp, $dataHeader);	
									}

									//Check if task if done or not
									$completion = '';
									if(isset($task)) : 
										$completion = 'Completed';
									else :
										$completion = 'In Progress';
									endif;

									//Open file
									$fp = fopen($path, 'a');
									$data = array($key, $submissionTime->format('m/d/y H:i:s'), $completion);

									fputcsv($fp, $data);
									fclose($fp);
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
										<input type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">
									</div>
								</div>
							<?php // Show Clear button if there is at least one task
							else : ?>
								<div class="btn__wrapper">
									<a id="delete" href="#" class="btn slideFromLeft" aria-label="Clear tasks">Clear tasks</a>
								</div>
								<?php endif; ?>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>