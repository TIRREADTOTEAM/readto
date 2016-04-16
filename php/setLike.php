<?php
	include "db.php";
	$link = mysql_connect($servername, $username, $password)
    or die('Could not connect: ' . mysql_error());

	mysql_select_db('readto') or die('Could not select database'); 
	



	$postdata=file_get_contents("php://input");
	$_POST = json_decode($postdata,true);
	
	$likecount = $_POST[0]['like'];
	$name = $_POST[0]['name'];
	$loc = $_POST[0]['loc'];
	$flag = $_POST[0]['flag'];	



	if($flag == 'getLike')
	{
		
		$sql = "SELECT * from book where book_name like ".$name;
		
		$result = mysql_query($sql);
		
		 while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
		 		
		        $likecount = $line['like_count'];
		 }
	}
	
	else if($flag == 'setLike')
	{
		
		$sql = "UPDATE book SET like_count=".$likecount." WHERE book_name like ".$name;
		$result = mysql_query($sql);
	}
	
	mysql_close($link);
	echo $likecount;
?>