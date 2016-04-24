<?php
/**
 * Created by PhpStorm.
 * User: swenagupta
 * Date: 4/23/16
 * Time: 7:45 PM
 */
include "db.php";
$link = mysql_connect($servername, $username, $password)
or die('Could not connect: ' . mysql_error());

mysql_select_db('readto') or die('Could not select database');




$postdata=file_get_contents("php://input");
$_POST = json_decode($postdata,true);
$book = $_POST[0]['name'];
$sql = "SELECT * from book where book_name like '".$book."'";
$result = mysql_query($sql);
while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

    $book_id = $line['book_id'];
    echo $book_id;
}

?>