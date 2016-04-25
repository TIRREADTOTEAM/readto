<?php
/* Variable Substitution */
$name = $_POST['Name'];
$isbn = $_POST['ISBN'];
$author = $_POST['Author'];
$path = $_FILES['fileToUpload']['name'];
/* Database Connection */
include "db.php";
$mysqli = new mysqli("127.0.0.1", $username, $password, $database);
/* DB Selection */
$mysqli->select_db("readto");
/* Name Refinement */
$name = $mysqli->real_escape_string($name);
$path = "pdf/" . basename($path);
$path = $mysqli->real_escape_string($path);
/* Insert */
$sql = "INSERT INTO `book` (`book_id`,`book_name`,`location`,`isbn`,`author`,`user_id`)
VALUES (3,'$name','$path','$isbn','$author',1)";

if ($mysqli->query($sql) === TRUE) {
	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $mysqli->error;
}

// Delete
/*$sql = "DELETE FROM `book` WHERE `book_id`=3";
if (mysqli_query($mysqli, $sql)) {
	echo "Record deleted successfully";
} else {
	echo "Error deleting record: " . mysqli_error($mysqli);
}*/
?>