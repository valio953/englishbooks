<?php

include_once (dirname (__FILE__) . '/includes/Books.php');
$books = new Books();
$get_all_books = $books->admin_get_books();

$table_content = '';
for($i=0; $i<count($get_all_books); $i++)
{
	$table_content .= 	'<tr>
							<td>' . $get_all_books[$i]['book_isbn'] . '</td>
							<td>' . $get_all_books[$i]['book_title'] . '</td>
							<td>' . $get_all_books[$i]['book_author'] . '</td>
							<td>' . $get_all_books[$i]['book_price'] . ' Kr.</td>
							<td><i class="fa fa-circle-o"></i></td>
							<td><i class="fa fa-trash-o"></i></td>
						</tr>';
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>English Bookstore - Admin page </title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
</head>

<body>

	<header>
		<section id="admin-navbar">
			<article class="nav">
				<ul>
					<li><a href="storefront.php"><img  id="logo-image" src="img/logo-white.png"></a></li>
					<li class="align-right"><button class="log-out-btn">Log out</button>
					<li id="storefront-link"><a href="storefront.php">Go to storefront</a></li>
				</ul>
			</article>
		</section>
	</header>

	<main>
		<section id="add-new-book">
			<!-- Trigger/Open The Modal -->
			<button id="add-book-btn" class="new-book-btn"><span>Add a new book</span></button>
			<!-- The Modal -->
			<article id="add-book-modal" class="modal">
			  <!-- Modal content -->
			  <article class="add-book-modal-content">
					<article class="add-book-modal-header">
				    <span class="close">&times;</span>
				    <h3>Add a new book</h3>
				  </article>
				  <article class="add-book-modal-body">
						<article id="add-book-form">
							<input id="input_isbn" type="text" placeholder="Enter ISBN" />
							<button id="scan-isbn-btn">SCAN ISBN</button>
							<input id="input_price" type="text" placeholder="Enter price" /> </br>
							<article class="dropdown">
								<button class="dropbtn">Choose category</button>
								<article class="dropdown-content">
									<a href="#">Action & Adventure</a>
									<a href="#">Business</a>
									<a href="#">Cooking</a>
									<a href="#">DIY</a>
									<a href="#">Health & Fitness</a>
									<a href="#">Romance</a>
									<a href="#">Travel</a>
									<a href="#">Sci-fi</a>
									<a href="#">Sports</a>
								</article>
							</article>
							</br>
							<button id="check-book-btn" onclick="books.checkISBN();">CHECK BOOK</button>
							<button id="reset-btn">RESET</button>
						</article>
						<article id="add-book-confirm">
							<p id="p_result">Showing book title and author from Goodreads API</p>
							<button class="add-btn" onclick="books.addBook();">ADD BOOK</button>
						</article>
				  </article>
			  </article>
			</article>
		</section>

		<section id="search-bar-admin">
			<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search books by title">
		</section>

		<section id="books-table">
			<table id="myTable">
			  <tr class="header">
					<th style="width:20%;">ISBN</th>
					<th style="width:25%;">Title</th>
					<th style="width:25%;">Author</th>
					<th style="width:10%;">Price</th>
			    <th style="width:10%;">Reserved</th>
			    <th style="width:10%;">Delete</th>
			  </tr>
				<?php echo $table_content;?>
			</table>
		</section>
	</main>

	<footer>
		<section id="admin-footer">
			<article id="bookstore-details">
				<p><i class="fa fa-map-marker"></i> Frederiks Allé 53, 8000 Aarhus C</p>
				<p><i class="fa fa-phone"></i> 52 90 28 35</p>
				<p><i class="fa fa-envelope"></i> books@stofanet.dk</p>
			</article>
			<article id="opening-hours">
				<p><i class="fa fa-clock-o"></i> Opening hours</p>
				<p>Wed, Thu, Fri <strong>2:30 PM to 5:30 PM</strong></p>
				<p>Sat <strong>11:00 AM to 1:30 PM</strong></p>
				<p>Sun, Mon <strong>CLOSED</strong></p>
			</article>
		</section>
	</footer>

	<script type="text/javascript" src="js/script.js"></script>
	<script src="js/books.js" type="text/javascript"></script>

</body>
</html>
