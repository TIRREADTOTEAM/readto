<?php
	include "db.php";
	$link = mysql_connect($servername, $username, $password)
    or die('Could not connect: ' . mysql_error());

	mysql_select_db('readto') or die('Could not select database'); 
	



	$postdata=file_get_contents("php://input");
	$_POST = json_decode($postdata,true);
	$pageno = $_POST[0]['pageno'];
    $scrollpos = $_POST[0]['scrollpos'];
    $comment = $_POST[0]['data'];
    $date = $_POST[0]['date'];
    $book = $_POST[0]['book'];
    $flag = $_POST[0]['flag'];
	
	if($flag == 'getComment')
	{
		
		$sql = "SELECT * from book where book_name like '".$book."'";
		$result = mysql_query($sql);
		while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
		 		
		        $book_id = $line['book_id'];
		}
		$sql = "SELECT * from comment where book_id = ".$book_id." and page_no = ".$pageno;
		
		$result = mysql_query($sql);
		$arr=array();
		while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
		 		
		        $comment = $line['comment'];
			    $date = $line['date'];
			    $scrollpos = $line['scroll_pos'];
			    $id = $line['html_id'];
			    $left = $line['left_pos'];
			    $str = '{"style":{"position": "absolute","top":'.$scrollpos.',"left":'.$left.',"display":"block","width":"20%","height":"20%"},"id":"'.$id.'", "data":"'.$comment.'"}';
			    //$arr1 = json_decode($str, true);
			    array_push($arr, $str);
		}
		print json_encode($arr);
	}
	
	else if($flag == 'saveComment')
	{
		$id= $_POST[0]['id'];
		$left= $_POST[0]['leftval'];
		$sql = "SELECT * from book where book_name like '".$book."'";
		
		$result = mysql_query($sql);
		
		 while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
		 		
		        $book_id = $line['book_id'];
		}
		$sql = "INSERT INTO comment (`comment_id`, `comment`, `html_id`,`book_id`, `page_no`,`left_pos`, `scroll_pos`, `date`) values (NULL,'".$comment."','".$id."','".$book_id."','".$pageno."','".$left."','".$scrollpos."','".$date."')";
		$result = mysql_query($sql);
	}
	
	mysql_close($link);
?>