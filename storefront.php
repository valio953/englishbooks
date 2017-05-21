<?php

include_once (dirname (__FILE__) . '/includes/Books.php');
$books = new Books();
$get_all_books = $books->admin_get_books();

$book_cards_from_db = '';
for($i=0; $i<count($get_all_books); $i++)
{
	$book_cards_from_db .= 	'<article class="book-card">
										<img class="book-cover" src="' . $get_all_books[$i]['book_img'] . '">
										<p>' . $get_all_books[$i]['book_title'] .'</p>
										<p>' . $get_all_books[$i]['book_author'] .'</p>
										<p>' . $get_all_books[$i]['book_price'] .' Kr.</p>
										<button id="add-book-btn-' . $get_all_books[$i]['book_isbn'] .'" class="reserve-btn">
											<span>Reserve</span>
										</button>
										<!-- The Modal -->
										<article id="add-book-modal-' . $get_all_books[$i]['book_isbn'] .'" class="modal">
											<!-- Modal content -->
											<article class="add-book-modal-content">
												<article class="add-book-modal-header">
													<span class="close" id="close-' . $get_all_books[$i]['book_isbn'] .'">&times;</span>
													<h3>Reserve a book</h3>
												</article>
												<article class="add-book-modal-body">
													<p>You are about to reserve: ' . $get_all_books[$i]['book_title'] .'</p>
													<input id="input_name" type="text" placeholder="Enter your name" />
													<input id="input_email" type="text" placeholder="Enter your email" />
													<button class="add-btn">RESERVE BOOK</button>
												</article>
											</article>
										</article>
										</article>
										<script type="text/javascript">
											var modal = document.getElementById("add-book-modal-' . $get_all_books[$i]['book_isbn'] .'");
											var btn = document.getElementById("add-book-btn-' . $get_all_books[$i]['book_isbn'] .'");
											var span = document.getElementById("close-' . $get_all_books[$i]['book_isbn'] .'");
											btn.onclick = function() {
											    modal.style.display = "block";
											}
											span.onclick = function() {
											    modal.style.display = "none";
											}
											window.onclick = function(event) {
											    if (event.target == modal) {
											        modal.style.display = "none";
											    }
											}
										</script>';
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>English Bookstore</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
</head>

<body>

	<header>
		<section id="navbar">
			<article class="nav">
				<ul>
					<li><a href="storefront.php"><img  id="logo-image" src="img/logo-white.png"></a></li>
          <li class="nav-link"><a href="storefront.php">Request a book</a></li>
          <li class="nav-link"><a href="storefront.php">Get a recommendation</a></li>
          <li class="nav-link"><a href="storefront.php">Browse books</a></li>
				</ul>
			</article>
		</section>
	</header>

	<main>
		<section id="browse-books">
			<h2>Browse books</h2>
			<?php echo $book_cards_from_db;?>
	</section>

  </main>

	<footer>
		<section id="storefront-footer">
			<article id="fb-stf">
				<p>facebook</p>
			</article>
			<article id="bookstore-details-stf">
				<p><i class="fa fa-map-marker"></i> Frederiks Allé 53, 8000 Aarhus C</p>
				<p><i class="fa fa-phone"></i> 52 90 28 35</p>
				<p><i class="fa fa-envelope"></i> books@stofanet.dk</p>
			</article>
			<article id="opening-hours-stf">
				<p><i class="fa fa-clock-o"></i> Opening hours</p>
				<p>Wed, Thu, Fri <strong>2:30 PM to 5:30 PM</strong></p>
				<p>Sat <strong>11:00 AM to 1:30 PM</strong></p>
				<p>Sun, Mon <strong>CLOSED</strong></p>
			</article>
			<article id="login-stf">
				<button class="login-btn">Login as admin</button>
			</article>
		</section>
	</footer>

  <script src="js/books.js" type="text/javascript"></script>

</body>
</html>
