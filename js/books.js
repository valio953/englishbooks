var books = {
    adminGetBooks: function()
    {
        var adminTableSrc = '<tr class="header"> \
                                <th style="width:20%;">ISBN</th> \
                                <th style="width:25%;">Title</th> \
                                <th style="width:25%;">Author</th> \
                                <th style="width:10%;">Price</th> \
                                <th style="width:10%;">Reserved</th> \
                                <th style="width:10%;">Delete</th> \
                            </tr>';
        var i, tooltipText = '';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parse_response = JSON.parse(response);
                
                for(i=0; i<parse_response.length; i++){
                    adminTableSrc += '<tr>';
                	adminTableSrc += '<td>' + parse_response[i].book_isbn + '</td>';
                	adminTableSrc += '<td>' + parse_response[i].book_title + '</td>';
                	adminTableSrc += '<td>' + parse_response[i].book_author + '</td>';
                	adminTableSrc += '<td>' + (parse_response[i].book_price || "") + ' Kr.</td>';
                    if (parse_response[i].book_reserved === ("no" || "" || null)) {
                        adminTableSrc += '<td><i class="fa fa-circle-o"></i></td>';
                    } else {
                        adminTableSrc += '<td class="tooltip"><i class="fa fa-check-circle-o"></i>';
                        adminTableSrc += '<ul class="tooltiptext ul-nostyle">';
                        adminTableSrc += '<li>' + (parse_response[i].book_reservation_name || "") + '</li>';
                        adminTableSrc += '<li>' + (parse_response[i].book_reservation_email || "") + '</li>';
                        adminTableSrc += '</ul>';
                        adminTableSrc += '</td>';
                    }
                	adminTableSrc += '<td><a href="javascript:books.removeBook(' + parse_response[i].book_isbn + ');" class="a-nostyle"><i class="fa fa-trash-o"></i></a></td>';
                	adminTableSrc += '</tr>';
                }
                document.getElementById("myTable").innerHTML = adminTableSrc;
            }
        };
        
        xhttp.open("GET", "includes/receiver.php?req=get_books", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },
    
    /* Admin function to check ISBN is returning the correct book */
    checkISBN: function()
    {
        var isbn = document.getElementById("input_isbn").value;
        
        // checking the book with AJAX to avoid refreshing the page
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parse_response = JSON.parse(response);
                document.getElementById("p_result").innerHTML = parse_response.title + " by " + parse_response.author;
            }
        };
        
        xhttp.open("GET", "includes/receiver.php?req=check_book&isbn=" + isbn, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },
    
    /* JS function for sending data to the server for adding a book to the DB. Data send with AJAX */
    addBook: function()
    {
        var isbn = document.getElementById("input_isbn").value;
        var price = document.getElementById("input_price").value;
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parse_response = JSON.parse(response);
                console.log(parse_response);
                if (parse_response === true) {
                    document.getElementById("p_result").innerHTML = "You added new book successfully!";
                    setInterval(function(){books.adminGetBooks();},3000);
                }
            }
        };
        xhttp.open("GET", "includes/receiver.php?req=add_book&isbn=" + isbn + "&price=" + price, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },
    
    removeBook: function(isbn)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                books.adminGetBooks();
            }
        };
        xhttp.open("GET", "includes/receiver.php?req=remove_book&isbn=" + isbn, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
	},
    
    /* USER */
    getBooks: function()
    {
        var bookCardsSrc = '', i;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parse_response = JSON.parse(response);
                console.log(parse_response);
                
                for(i=0; i<parse_response.length; i++){
                    bookCardsSrc += '<article class="book-card">';
					bookCardsSrc += '					<img class="book-cover" src="' + parse_response[i].book_img + '">';
					bookCardsSrc += '					<p class="b-title">' + parse_response[i].book_title + '</p>';
					bookCardsSrc += '					<p class="b-author">' + parse_response[i].book_author + '</p>';
					bookCardsSrc += '					<article class="b-price-reserve">';
					bookCardsSrc += '					    <p class="b-price">' + parse_response[i].book_price + ' Kr.</p>';
					bookCardsSrc += '					    <button onclick="displayBlock(' + parse_response[i].book_isbn + ');" id="add-book-btn-' + parse_response[i].book_isbn + '" class="reserve-btn">';
					bookCardsSrc += '						    <span>Reserve</span>';
					bookCardsSrc += '					    </button>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '					<!-- The Modal -->';
					bookCardsSrc += '					<article id="add-book-modal-' + parse_response[i].book_isbn + '" class="modal">';
					bookCardsSrc += '						<!-- Modal content -->';
                    bookCardsSrc += '                       <article class="add-book-modal-content">';
					bookCardsSrc += '						<article class="add-book-modal-header">';
					bookCardsSrc += '							<span onclick="displayNone(' + parse_response[i].book_isbn + ');" class="close" id="close-' + parse_response[i].book_isbn + '">&times;</span>';
					bookCardsSrc += '							<h3>Reserve a book</h3>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '						<article class="add-book-modal-body">';
					bookCardsSrc += '							<p>You are about to reserve: ' + parse_response[i].book_title + '</p>';
					bookCardsSrc += '							<input id="input_reserve_name_' + parse_response[i].book_isbn + '" type="text" placeholder="Enter your name" />';
					bookCardsSrc += '							<input id="input_reserve_email_' + parse_response[i].book_isbn + '" type="email" placeholder="Enter your email" />';
					bookCardsSrc += '							<button class="reserve-btn" onclick="books.reserveBook(' + parse_response[i].book_isbn + ');">RESERVE BOOK</button>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '</article>';
					bookCardsSrc += '</article>';
                }
                document.getElementById("book-cards").innerHTML = bookCardsSrc;
                
            }
        };
        
        xhttp.open("GET", "includes/receiver.php?req=get_books", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },
    
    reserveBook: function(isbn)
    {
        console.log(isbn);
        var reservationName = document.getElementById("input_reserve_name_" + isbn).value;
        var reservationEmail = document.getElementById("input_reserve_email_" + isbn).value;
        console.log(reservationName);
        console.log(reservationEmail);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                console.log(response);
                //document.getElementById("p_result").innerHTML = response;
            }
        };
        
        xhttp.open("POST", "includes/receiver.php?req=reserve_book&isbn=" + isbn + "&rname=" + encodeURIComponent(reservationName) + "&remail=" + encodeURIComponent(reservationEmail), true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    }
}