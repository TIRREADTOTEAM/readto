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

    $flag = $_POST[0]['flag'];
    $arr=array();
	if($flag == 'getPdf')
    {
        $sql = "SELECT * from book";
        $result = mysql_query($sql);
        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

            $str = '{"bookname":"'.$line['book_name'].'","bookloc":"'.$line['location'].'"}';
            //$arr1 = json_decode($str, true);
            array_unshift($arr, $str);
        }
        print json_encode($arr);
    }


	mysql_close($link);
?>