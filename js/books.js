var books = {
    getBooks: function()
    {
        //var searchstring = document.getElementById("input_search").value;
        //console.log(searchstring);
        var i;
        var booksTableSrc = '<tr class="header"> \
                            <th style="width:20%;">ISBN</th> \
                            <th style="width:25%;">Title</th> \
                            <th style="width:25%;">Author</th> \
                            <th style="width:10%;">Price</th> \
                            <th style="width:10%;">Reserved</th> \
                            <th style="width:10%;">Delete</th> \
                      </tr>';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log(123); return
            var response = this.responseText;
            var parse_response = JSON.parse(response);
            console.log(parse_response);
            for(i=0; i<parse_response.length; i++)
            {
                booksTableSrc += '<tr>';
                booksTableSrc += '<td>' + parse_response[i].book_isbn + '</td>';
                booksTableSrc += '<td>' + parse_response[i].book_title + '</td>';
                booksTableSrc += '<td>' + parse_response[i].book_author + '</td>';
                booksTableSrc += '<td>' + parse_response[i].book_price + '</td>';
                booksTableSrc += '<td></td>';
                booksTableSrc += '<td></td>';
                booksTableSrc += '</tr>';
            }
            document.getElementById("myTable").innerHTML = booksTableSrc;
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
            var response = this.responseText;
            var parse_response = JSON.parse(response);
            document.getElementById("p_result").innerHTML = parse_response.title + " by " + parse_response.author;
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
            var response = this.responseText;
            document.getElementById("p_result").innerHTML = response;
        };
        
        xhttp.open("GET", "includes/receiver.php?req=add_book&isbn=" + isbn + "&price=" + price, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    }
}