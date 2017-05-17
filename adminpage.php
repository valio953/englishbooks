<!DOCTYPE html>
<html>
<head>
	<title>English Bookstore - Admin page </title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>

	<header>
		<section id="admin-navbar">
			<article class="nav">
				<ul>
					<li><a href="storefront.php">ADD LOGO</a></li>
					<button id="log-out-btn" class="align-right">Log out</button>
					<li class="align-right"><a href="storefront.php">Go to storefront</a></li>
				</ul>
			</article>
		</section>
	</header>

	<main>

		<section id="add-new-book">
			<!-- Trigger/Open The Modal -->
			<button id="add-book-btn" class="align-right">Add a new book</button>
			<!-- The Modal -->
			<article id="add-book-modal" class="modal">
			  <!-- Modal content -->
			  <article class="add-book-modal-content">
					<article class="add-book-modal-header">
				    <span class="close">&times;</span>
				    <h2>Add a new book</h2>
				  </article>
				  <article class="add-book-modal-body">
				    <h3>ISBN</h3>
						<input type="text" placeholder="Enter ISBN" />
						<button id="scan-isbn-btn">Scan ISBN</button>
						<h3>Price</h3>
						<input type="text" placeholder="Enter amount" /> <span>Kr.</span>
						<h3>Category</h3>
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
						<button id="check-book-btn">Check</button>
						<p>Showing book title and author from Goodreads API</p>
						<button id="add-book-btn">Add</button>
						<button id="reset-btn">Reset</button>
				  </article>
			  </article>
			</article>
		</section>

		<section id="search-bar-admin">
			<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
		</section>

		<section id="books-table">
			<table id="myTable">
			  <tr class="header">
			    <th style="width:60%;">Name</th>
			    <th style="width:40%;">Country</th>
			  </tr>
			  <tr>
			    <td>Alfreds Futterkiste</td>
			    <td>Germany</td>
			  </tr>
			  <tr>
			    <td>Berglunds snabbkop</td>
			    <td>Sweden</td>
			  </tr>
			  <tr>
			    <td>Island Trading</td>
			    <td>UK</td>
			  </tr>
			  <tr>
			    <td>Koniglich Essen</td>
			    <td>Germany</td>
			  </tr>
			</table>
		</section>
	</main>
	<footer>

	</footer>

	<script type="text/javascript" src="js/script.js"></script>

</body>
</html>
