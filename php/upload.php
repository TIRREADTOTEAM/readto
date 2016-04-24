<?php
// 2016-04-21 by Minuk Ma
// File Uploading Controller With PHP
// Got a lot of help from http://www.tizag.com/phpT/fileupload.php

// Where the file is going to be placed
$target_path = "../pdf/";
$savetargetpath = "pdf/";
/* Add the originial filename to our target path.
Result is "pdf/filename.extension "*/
$target_path = $target_path . basename( $_FILES['fileToUpload']['name']);
/* Now all we hav to do is call the move_uploaded_file function and let PHP do
its magic. The move_uploaded_file function needs to know 1) The path of the
temporary file (check!) 2) The path where it is to be moved to (check!) */
$name=$_POST['Name'];
$isbn=$_POST['ISBN'];
$author=$_POST['author'];
$path=$savetargetpath. basename( $_FILES['fileToUpload']['name']);

include "db.php";
$link = mysql_connect($servername, $username, $password)
or die('Could not connect: ' . mysql_error());

mysql_select_db('readto') or die('Could not select database');
$name = mysql_escape_string(mysql_escape_string($name));
$path = mysql_escape_string(mysql_escape_string($path));
$sql = "INSERT INTO book (`book_id`, `book_name`, `location`,`isbn`, `author`, `user_id`) values (NULL,'".$name."','".$path."','".$isbn."','".$author."','1')";
$result = mysql_query($sql);
echo $sql;
if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_path)) {
    //echo "The file ".  basename( $_FILES['fileToUpload']['name']).
    //" has been uploaded";
    header('Location: ../loadallpdfs.html');
} else{
    echo "There was an error uploading the file, please try again!";
}
?>