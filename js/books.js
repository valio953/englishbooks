var books = {
    adminGetBooks: function(params)
    {
        var filter = "";
        
        if (params.page) {
            document.getElementById("hddnPage").value = params.page;
            $(".pagination li").removeClass("active");
            $("[data-page='" + params.page + "']").addClass("active");
            filter += "&page=" + params.page;
        } else {
            filter += "&page=" + $("#hddnPage").val();
        }
        
        var adminTableSrc = '<tr class="header"> \
                                <th style="width:20%;">ISBN</th> \
                                <th style="width:25%;">Title</th> \
                                <th style="width:25%;">Author</th> \
                                <th style="width:10%;">Price</th> \
                                <th style="width:10%;">Reserved</th> \
                                <th style="width:10%;">Delete</th> \
                            </tr>';
        var i, tooltipText = '', pageSrc = "";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parsed_response = JSON.parse(response);
                console.log(parsed_response);
                for(i=0; i<parsed_response.books.length; i++){
                    adminTableSrc += '<tr>';
                	adminTableSrc += '<td>' + parsed_response.books[i].book_isbn + '</td>';
                	adminTableSrc += '<td>' + parsed_response.books[i].book_title + '</td>';
                	adminTableSrc += '<td>' + parsed_response.books[i].book_author + '</td>';
                	adminTableSrc += '<td>' + (parsed_response.books[i].book_price || "") + ' Kr.</td>';
                    if (parsed_response.books[i].book_reserved === ("no" || "" || null)) {
                        adminTableSrc += '<td><i class="fa fa-circle-o"></i></td>';
                    } else {
                        adminTableSrc += '<td class="tooltip"><i class="fa fa-check-circle-o"></i>';
                        adminTableSrc += '<ul class="tooltiptext ul-nostyle">';
                        adminTableSrc += '<li>' + (parsed_response.books[i].book_reservation_name || "") + '</li>';
                        adminTableSrc += '<li>' + (parsed_response.books[i].book_reservation_email || "") + '</li>';
                        adminTableSrc += '</ul>';
                        adminTableSrc += '</td>';
                    }
                	adminTableSrc += '<td><a href="javascript:books.removeBook(' + parsed_response.books[i].book_isbn + ');" class="a-nostyle"><i class="fa fa-trash-o"></i></a></td>';
                	adminTableSrc += '</tr>';
                }
                document.getElementById("myTable").innerHTML = adminTableSrc;
                
                var minPage = Math.max(1, $("#hddnPage").val() - 2);
                var maxPage = Math.min(parsed_response.pages, parseInt($("#hddnPage").val()) + 2);
                for (i = minPage;i <= maxPage;i++) {
                    pageSrc += "<a href=\"javascript:books.getBooks({page:" + i + "})\" class=\"" + (i == $("#hddnPage").val() ? "active" : "") + "\">" + i + "</a>";
                }
                
                document.getElementsByClassName("pagination")[0].innerHTML = pageSrc;
            }
        };

        xhttp.open("GET", "includes/receiver.php?req=get_books" + filter, true);
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
                var parsed_response = JSON.parse(response);
                document.getElementById("p_result").innerHTML = parsed_response.title + " by " + parsed_response.author;
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
        var category = document.getElementById("input_categoryid").value;
        var price = document.getElementById("input_price").value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parsed_response = JSON.parse(response);
                if (parsed_response === true) {
                    document.getElementById("p_result").innerHTML = "You added new book successfully!";
                    setInterval(function(){books.adminGetBooks();},3000);
                }
            }
        };
        xhttp.open("GET", "includes/receiver.php?req=add_book&isbn=" + isbn + "&category=" + category + "&price=" + price, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },

    removeBook: function(isbn)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                books.adminGetBooks({page: 1});
            }
        };
        xhttp.open("GET", "includes/receiver.php?req=remove_book&isbn=" + isbn, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
	},

    /* USER */
    getNewestBooks: function()
    {
        var bookCardsSrc = '<h2 class="section-title">Latest Books</h2>';
        var i;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parsed_response = JSON.parse(response);

                for(i=0; i<parsed_response.length; i++){
                    bookCardsSrc += '<article class="book-card">';
					bookCardsSrc += '					<img class="book-cover" src="' + parsed_response[i].book_img + '">';
					bookCardsSrc += '					<p class="b-title">' + parsed_response[i].book_title + '</p>';
					bookCardsSrc += '					<p class="b-author">by ' + parsed_response[i].book_author + '</p>';
					bookCardsSrc += '					<article class="b-price-reserve">';
					bookCardsSrc += '					    <p class="b-price">' + parsed_response[i].book_price + ' Kr.</p>';
					bookCardsSrc += '					    <button onclick="displayBlock(' + parsed_response[i].book_isbn + ');" id="add-book-btn-' + parsed_response[i].book_isbn + '" class="btn-trigger-rmodal">';
					bookCardsSrc += '						    <span>Reserve</span>';
					bookCardsSrc += '					    </button>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '					<!-- The Modal -->';
					bookCardsSrc += '					<article id="add-book-modal-' + parsed_response[i].book_isbn + '" class="modal">';
					bookCardsSrc += '						<!-- Modal content -->';
                    bookCardsSrc += '                       <article class="add-book-modal-content">';
					bookCardsSrc += '						<article class="add-book-modal-header">';
					bookCardsSrc += '							<span onclick="displayNone(' + parsed_response[i].book_isbn + ');" class="close" id="close-' + parsed_response[i].book_isbn + '">&times;</span>';
					bookCardsSrc += '							<h3>Reserve a book</h3>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '						<article class="reserve-book-modal-body">';
					bookCardsSrc += '							<p>You are about to reserve: ' + parsed_response[i].book_title + '</p>';
					bookCardsSrc += '							<input class="input-rsv-text" id="input_reserve_name_' + parsed_response[i].book_isbn + '" type="text" placeholder="Enter your name" /><br/>';
					bookCardsSrc += '							<input class="input-rsv-text" id="input_reserve_email_' + parsed_response[i].book_isbn + '" type="email" placeholder="Enter your email" /><br/>';
					bookCardsSrc += '							<button class="reserve-btn" onclick="books.reserveBook(' + parsed_response[i].book_isbn + ');">RESERVE BOOK</button>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '</article>';
					bookCardsSrc += '</article>';
                }
                document.getElementById("latest-books").innerHTML = bookCardsSrc;

            }
        };

        xhttp.open("GET", "includes/receiver.php?req=get_last_books", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },

    getBooks: function(params)
    {
        params.category = (typeof params.category === 'undefined') ? '' : params.category;
        
        var filter = "";
        
        if (params.page) {
            document.getElementById("hddnPage").value = params.page;
            //var ele = document.getElementsByClassName("pagination")[0].getElementsByTagName("a");
            //console.log(ele);
            //removeClass(ele, "active");
            $(".pagination li").removeClass("active");
            $("[data-page='" + params.page + "']").addClass("active");
            filter += "&page=" + params.page;
        } else {
            filter += "&page=" + $("#hddnPage").val();
        }
        

        var bookCardsSrc = '', pageSrc = "", i;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parsed_response = JSON.parse(response);
                console.log(parsed_response);

                for(i=0; i<parsed_response.books.length; i++){
                    bookCardsSrc += '<article class="book-card">';
					bookCardsSrc += '					<img class="book-cover" src="' + parsed_response.books[i].book_img + '">';
					bookCardsSrc += '					<p class="b-title">' + parsed_response.books[i].book_title + '</p>';
					bookCardsSrc += '					<p class="b-author">by ' + parsed_response.books[i].book_author + '</p>';
					bookCardsSrc += '					<article class="b-price-reserve">';
					bookCardsSrc += '					    <p class="b-price">' + parsed_response.books[i].book_price + ' Kr.</p>';
					bookCardsSrc += '					    <button onclick="displayBlock(' + parsed_response.books[i].book_isbn + ');" id="add-book-btn-' + parsed_response.books[i].book_isbn + '" class="btn-trigger-rmodal">';
					bookCardsSrc += '						    <span>Reserve</span>';
					bookCardsSrc += '					    </button>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '					<!-- The Modal -->';
					bookCardsSrc += '					<article id="add-book-modal-' + parsed_response.books[i].book_isbn + '" class="modal">';
					bookCardsSrc += '						<!-- Modal content -->';
                    bookCardsSrc += '                       <article class="add-book-modal-content">';
					bookCardsSrc += '						<article class="add-book-modal-header">';
					bookCardsSrc += '							<span onclick="displayNone(' + parsed_response.books[i].book_isbn + ');" class="close" id="close-' + parsed_response.books[i].book_isbn + '">&times;</span>';
					bookCardsSrc += '							<h3>Reserve a book</h3>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '						<article class="add-book-modal-body">';
					bookCardsSrc += '							<p>You are about to reserve: ' + parsed_response.books[i].book_title + '</p>';
					bookCardsSrc += '							<input id="input_reserve_name_' + parsed_response.books[i].book_isbn + '" type="text" placeholder="Enter your name" />';
					bookCardsSrc += '							<input id="input_reserve_email_' + parsed_response.books[i].book_isbn + '" type="email" placeholder="Enter your email" />';
					bookCardsSrc += '							<button class="reserve-btn" onclick="books.reserveBook(' + parsed_response.books[i].book_isbn + ');">RESERVE BOOK</button>';
					bookCardsSrc += '						</article>';
					bookCardsSrc += '					</article>';
					bookCardsSrc += '</article>';
					bookCardsSrc += '</article>';
                }
                document.getElementById("book-cards").innerHTML = bookCardsSrc;
                
                var minPage = Math.max(1, $("#hddnPage").val() - 2);
                var maxPage = Math.min(parsed_response.pages, parseInt($("#hddnPage").val()) + 2);
                for (i = minPage;i <= maxPage;i++) {
                    pageSrc += "<a href=\"javascript:books.getBooks({page:" + i + "})\" class=\"" + (i == $("#hddnPage").val() ? "active" : "") + "\">" + i + "</a>";
                }
                
                document.getElementsByClassName("pagination")[0].innerHTML = pageSrc;
            }
        };

        xhttp.open("GET", "includes/receiver.php?req=get_books&category=" + params.category + filter, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },

    reserveBook: function(isbn)
    {
        console.log(isbn);
        var reservationName = document.getElementById("input_reserve_name_" + isbn).value;
        var reservationEmail = document.getElementById("input_reserve_email_" + isbn).value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                //console.log(response);
                //document.getElementById("p_result").innerHTML = response;
            }
        };

        xhttp.open("POST", "includes/receiver.php?req=reserve_book&isbn=" + isbn + "&rname=" + encodeURIComponent(reservationName) + "&remail=" + encodeURIComponent(reservationEmail), true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    },

    getCategories: function()
    {
        var bookCardsSrc = '', i;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var parsed_response = JSON.parse(response);
                console.log(parsed_response);
            }
        };

        xhttp.open("GET", "includes/receiver.php?req=get_categories", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    }
}
