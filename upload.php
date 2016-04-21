<?php
// 2016-04-21 by Minuk Ma
// File Uploading Controller With PHP
// Got a lot of help from http://www.tizag.com/phpT/fileupload.php

// Where the file is going to be placed
$target_path = "pdf/";
/* Add the originial filename to our target path.
Result is "pdf/filename.extension "*/
$target_path = $target_path . basename( $_FILES['fileToUpload']['name']); 
/* Now all we hav to do is call the move_uploaded_file function and let PHP do
its magic. The move_uploaded_file function needs to know 1) The path of the
temporary file (check!) 2) The path where it is to be moved to (check!) */
if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_path)) {
    echo "The file ".  basename( $_FILES['fileToUpload']['name']). 
    " has been uploaded";
} else{
    echo "There was an error uploading the file, please try again!";
}
?>