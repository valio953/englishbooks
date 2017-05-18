var books = {
    /* Admin function to check ISBN is returning the correct book */
    checkISBN: function()
    {
        var test_isbn = "9781847670700";
        var isbn = document.getElementById("input_isbn").value;
        console.log(isbn);
        
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
        console.log(isbn);
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            var response = this.responseText;
            document.getElementById("p_result").innerHTML = response;
        };
        
        xhttp.open("GET", "includes/receiver.php?req=add_book&isbn=" + isbn, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    }
}