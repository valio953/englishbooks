<?php
include_once (dirname (__FILE__) . '/Books.php');

switch($_REQUEST["req"])
{
    case "check_book":
		$books = new Books();
		echo json_encode($books->admin_check_book_isbn($_REQUEST));
		break;
	case "add_book":
		$books = new Books();
		echo json_encode($books->admin_add_book($_REQUEST));
		break;
}

?>