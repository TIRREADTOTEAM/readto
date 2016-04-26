<?php
/**
 * Created by PhpStorm.
 * User: swenagupta
 * Date: 4/23/16
 * Time: 2:34 PM
 */

	include "db.php";
	$link = mysql_connect($servername, $username, $password)
    or die('Could not connect: ' . mysql_error());

	mysql_select_db('readto') or die('Could not select database');




	$postdata=file_get_contents("php://input");
	$_POST = json_decode($postdata,true);
	$pageno = $_POST[0]['pageno'];
    $summary = $_POST[0]['data'];
    $date = $_POST[0]['date'];
    $book = $_POST[0]['book'];
    $flag = $_POST[0]['flag'];

	if($flag == 'getSummary')
    {
        $top = $_POST[0]['top'];
        $sql = "SELECT * from book where book_name like '".$book."'";
        $result = mysql_query($sql);
        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

            $bookid = $line['book_id'];
        }
        $sql = "SELECT * from summary where book_id = ".$bookid." and page_no = ".$pageno." order by summary_id DESC LIMIT 2";

        $result = mysql_query($sql);
        $arr=array();
        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

            $summary = $line['summary'];


            $str = '{"style":{"position": "absolute","top":'.$top.',"left":"20","display":"block","width":"20%"},"id":"summary'.$bookid.$pageno.'", "data":"'.$summary.'"}';
            //$arr1 = json_decode($str, true);
            array_unshift($arr, $str);
        }
        print json_encode($arr);
    }

    else if($flag == 'setSummary')
    {
        $summary=$_POST[0]['data'];
        $sql = "SELECT * from book where book_name like '".$book."'";

        $result = mysql_query($sql);
       

        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

            $book_id = $line['book_id'];
        }
        $sql = "INSERT INTO summary (`summary_id`, `user_id`, `summary`,`book_id`, `page_no`, `date`) values (NULL,'1','".$summary."','".$book_id."','".$pageno."','".$date."')";
        $result = mysql_query($sql);
    }

	mysql_close($link);
?>