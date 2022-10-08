<?php
/**
 * Template part for displaying page content in front-page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package todo
 */

?>
<?php if (isset($_POST['task'])) :
	$task = $_POST['task'];
endif;?>

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
							// for ($x = 0; $x <= 2; $x++) { ?>
							<?php 
							// foreach( $task as $newTask ) { 
							
							// OUTPUT DATA OF EACH ROW
								if (mysqli_num_rows($result) > 0) {
									while ($row = mysqli_fetch_assoc($result)) { ?>
										<div class="checkbox__wrapper">
											<input type="checkbox" id="item" name="item">
											<label id="checkLabel" for="item"><?php echo $row["item"]?></label>
										</div>
									<?php }
								}
							?>
							<div class="btn__wrapper">
								<a id="delete" href="#" class="btn" aria-label="Clear tasks">Clear tasks</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>