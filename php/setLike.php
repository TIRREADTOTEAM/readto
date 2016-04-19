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
	$userid= $_POST[0]['userid'];
	
	$sql = "SELECT * from book where book_name like ".$name;
	$result = mysql_query($sql);
	$book_id=0;
	while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {	 		
	        $book_id = $line['book_id'];
	        if($likecount=='toget')
	        $likecount = $line['like_count'];
	}


	
	$sql = "SELECT * from booklike where user_id =".$userid." and book_id=".$book_id;
	$check=0;
	$result = mysql_query($sql);
	while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {		 		
	        $check = 1;
	}

	if($flag=='setLike')
	{
		if($check==1)
		{
			$sql = "DELETE FROM booklike where book_id=".$book_id." and user_id=".$userid;
			$result = mysql_query($sql);	
			$likecount=$likecount-1;
		}	
		else
		{
			$sql = "INSERT INTO booklike(`like_id`,`book_id`,`user_id`) VALUES (NULL, ".$book_id.",".$userid.")";
			$result = mysql_query($sql);	
			$likecount=$likecount+1;
		}


		$sql = "UPDATE book SET like_count=".$likecount." WHERE book_name like ".$name;
		$result = mysql_query($sql);
	}
	else
	{
		if($check==1)
		{
			echo "Yo\n";
		}
		else
		{
			echo "No\n";
		}
	}

	
	mysql_close($link);
	echo $likecount;
?>