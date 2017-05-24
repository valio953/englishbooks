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
          <li class="nav-link"><a href="storefront.php">Request a book</a></li>
          <li class="nav-link"><a href="storefront.php">Get a recommendation</a></li>
          <li class="nav-link"><a href="storefront.php">Browse books</a></li>
				</ul>
			</article>
		</section>
	</header>

	<main>

		<section id="latest-books">
			
		</section>

		<section id="recommend">
			<h3 class="section-title"> Not sure what book to read next? Try one of our recommendations based on your facial emotion.</h3>
			
			
			<!-- Trigger/Open The Modal -->
			<button class="recommend-btn"><span>Get a recommendation</span></button>
			
			<!-- The Modal -->
			<article id="books-recomendations-modal" class="modal">
			  <!-- Modal content -->
			  <article class="add-book-modal-content">
					<article class="add-book-modal-header">
				    <span class="close">&times;</span>
				    <h3>Add a new book</h3>
				  </article>
				  <article class="add-book-modal-body">
						<div id="my_camera"></div>
						<div id="results"></div>
						<!-- A button for taking snaps -->
						<form>
							<input type=button value="Take Large Snapshot" onClick="take_snapshot()">
						</form>
				  </article>
			  </article>
			</article>
			
		</section>

		<section id="browse-books">
			<h2 class="section-title">Browse books</h2>
			<article class="browse-books-content">
				<article id="categories">
					<h3>Categories</h3>
					<p>All</p>
					<p>Sci-fi</p>
					<p>Business</p>
					<p>Romance</p>
					<p>Travel</p>
					<p>Cooking</p>
					<p>Health & Fitness</p>
					<p>Action & Adventure</p>
					<p>DIY</p>
				</article>
				<article id="browse-book-cards">
					<article id="search-bar-storefront">
						<input type="text" id="storefront-book-search" placeholder="Search books by title">
					</article>
					<article id="book-cards">
						
					</article>
				</article>
			</article>
		</section>

		<section id="request-book">
			<h2 class="section-title">Request a book</h2>
			<p>Can't find what you were loooking for?</p>
			<p>Send us a message with the details of the book and we will get it for you!</p>
			<input id="req-form-name" type="text" placeholder="Enter your name" class="req-form"/> <br/>
			<input id="req-form-email" type="text" placeholder="Enter your email" class="req-form"/> <br/>
			<input id="req-form-title" type="text" placeholder="Enter the book title" class="req-form"/> <br/>
			<input id="req-form-author" type="text" placeholder="Enter the book author" class="req-form"/> <br/>
			<button>Send request</button>
		</section>

  </main>

  <footer>
		<section id="storefront-footer">
			<article id="fb-stf">
				<button class="facebook-btn">Follow us on Facebook</button>
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
    <script src="js/webcam.min.js" type="text/javascript"></script>
    <script src="js/emotions.js" type="text/javascript"></script>
	<script type="text/javascript">
		document.addEventListener("DOMContentLoaded", function(event) {
			books.getNewestBooks();
			books.getBooks();
		});

		function displayBlock(modal_id) {
			var modal = document.getElementById("add-book-modal-" + modal_id);
			modal.style.display = "block";
		}

		function displayNone(modal_id) {
			var modal = document.getElementById("add-book-modal-" + modal_id);
			modal.style.display = "none";
		}
		
		// Get the modal
		var modal = document.getElementById('books-recomendations-modal');
		// Get the button that opens the modal
		var btn = document.getElementsByClassName("recommend-btn")[0];
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		// When the user clicks the button, open the modal
		btn.onclick = function() {
			modal.style.display = "block";
		}
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
			modal.style.display = "none";
		}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
		
	</script>

</body>
</html>
