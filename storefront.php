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
    <section id="reserve">
      <!-- Trigger/Open The Modal -->
      <button id="add-book-btn" class="reserve-btn"><span>Reserve</span></button>
      <!-- The Modal -->
      <article id="add-book-modal" class="modal">
        <!-- Modal content -->
        <article class="add-book-modal-content">
          <article class="add-book-modal-header">
            <span class="close">&times;</span>
            <h3>Reserve a book</h3>
          </article>
          <article class="add-book-modal-body">
            <input id="input_isbn" type="text" placeholder="Enter your name" />
            <input id="input_isbn" type="text" placeholder="Enter your email" />
            <button class="add-btn">RESERVE BOOK</button>
          </article>
        </article>
      </article>
    </section>
  </main>

  <script type="text/javascript" src="js/script.js"></script>
  <script src="js/books.js" type="text/javascript"></script>

</body>
</html>
