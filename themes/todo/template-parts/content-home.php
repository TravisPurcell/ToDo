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
		echo $link;
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
								<input type="text" placeholder="Add new task*" id="task" name="task">
								<label class="sr" for="task">Add a new task</label>
								<p class="warning">*Task will not be added if field is left empty.</p>
							<h2>Things to Do</h2>
							<?php 
								//Get Submission time
								date_default_timezone_set("America/New_York");
								$submissionTime = new DateTime();

								$tasksTotal = mysqli_num_rows($result);
					

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

										//Store database data into variable
										$item = $row['item'];
									?>
				
									<div class="checkbox__wrapper">
										<div>
											<?php if(!isset($_POST['item'])) { ?>
												<input class="complete" name="item[]" value="<?php echo $uniqueID ?>" id="complete<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
											<?php } else { ?>
												<input class="uncheck" name="item[]" value="<?php echo $uniqueID ?>" id="complete<?php echo $uniqueID ?>" <?php if ($row['status'] == '1') : echo "checked='checked'"; endif; ?> type="checkbox">
											<?php }?>
											<label id="checkLabel" for="item"><?php echo $item ?></label>
										</div>
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

							<input placeholder="Update task" type="text" id="updateTask" name="update">
							<label class="sr" for="fname">First name:</label>
							<input min="1" max="<?php echo $tasksTotal ?>" type="number" id="selectTask" name="taskSelect">
							<label class="taskSelect" for="fname">Select a task number by row to update &nbsp;<strong>(Required)</strong></label>

								<div class="flex__wrapper">
									<div class="marker">
										<?php if ($tasksTotal !== 0) : ?>
											<p id="tasksRemaining"></p>
										<?php endif;?> 
									</div>
							<?php //End mysqli fetch while loop 
							} ?>

							<?php // Show Add tasks button if there are no tasks
							if ($tasksTotal == 0) : ?>
								<div class="flex__wrapper">
									<div class="marker">
										<p id="tasksRemaining"></p>
									</div>
									<div class="btn__wrapper">
										<a tabindex="0" id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
									</div>
								</div>
							<?php // Show all buttons if there is at least one task
							else : ?>
								<div class="btn__wrapper">
									<a tabindex="0" id="add" type="submit" value="Add task" class="btn slideFromLeft" aria-label="Add task">Add task</a>
									<a tabindex="0" id="update" href="#" class="btn slideFromLeft" aria-label="Update tasks">Update tasks</a>
									<a tabindex="0" id="clear" href="#" class="btn slideFromLeft" aria-label="Uncheck tasks">Uncheck tasks</a>
									<a tabindex="0" id="delete" href="#" class="btn slideFromLeft" aria-label="Dlete tasks">Delete tasks</a>
								</div>
						
								<?php endif; ?>
							</div>
							<div class="download__wrapper">
								<a download="Tasks.csv" id="download" href="<?php echo $link . 'wp-content/themes/todo/tasks.csv' ?>" aria-label="Download tasks">Download CSV of Tasks</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>