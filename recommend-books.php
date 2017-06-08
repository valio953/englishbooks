<?php

include_once (dirname (__FILE__) . '/includes/Books.php');
$books = new Books();

$get_categories = $books->get_categories();
?>

<!DOCTYPE html>
<html>
<head>
	<title>English Bookstore</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>

<body>
	<header>
		<section id="navbar">
			<article class="nav">
				<ul>
					<li><a href="storefront.php"><img  id="logo-image" src="img/logo-white.png"></a></li>
					<li class="nav-link"><a href="https://www.google.dk/maps/place/English+Bookstore+v%2FBeth+Merit/@56.150102,10.1969275,17z/data=!3m1!4b1!4m5!3m4!1s0x464c3f8d11dad5df:0xdfe7ecf32383a789!8m2!3d56.150099!4d10.1991162?hl=en" target="_blank"><img  id="location-icon" src="img/locationicon.png"></a></li>
          <li class="nav-link"><a href="storefront.php#request-book">Request a book</a></li>
          <li class="nav-link"><a href="storefront.php#recommend">Get a recommendation</a></li>
          <li class="nav-link"><a href="storefront.php#browse-books">Browse books</a></li>
				</ul>
			</article>
		</section>
	</header>

	<main>
		<section id="sctn_books_recommendation">
			<div id="my_camera"></div>
			<div id="results"></div>
			<!-- A button for taking snaps -->
			<form>
				<input type="button" class="recommend-btn" value="Get books recommendation" onClick="take_snapshot()">
			</form>
		</section>
	</main>

	<footer>
		<section id="storefront-footer">
			<article id="fb-stf">
				<a href="https://www.facebook.com/englishbooksaarhus" target="_blank"><button class="facebook-btn">Follow us on Facebook</button></a>
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
				<a href="adminpage.php"><button class="login-btn">Login as admin</button></a>
			</article>
		</section>
	</footer>

	<script src="js/script.js" type="text/javascript"></script>
	<script src="js/books.js" type="text/javascript"></script>
    <script src="js/webcam.min.js" type="text/javascript"></script>
    <script src="js/emotions.js" type="text/javascript"></script>
	<script type="text/javascript">
		function displayBlock(modal_id) {
			var modal = document.getElementById("add-book-modal-" + modal_id);
			modal.style.display = "block";
		}

		function displayNone(modal_id) {
			var modal = document.getElementById("add-book-modal-" + modal_id);
			modal.style.display = "none";
		}
	</script>

</body>
</html>
