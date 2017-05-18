<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <form action="javascript:void(0);" accept-charset="utf-8">
            <input type="text" id="input_isbn">
            <button onclick="books.checkISBN();">Check</button>
            <button onclick="books.addBook();">Add</button>
        </form>
        
        <p id="p_result"></p>
        
        <script src="js/books.js" type="text/javascript"></script>
    </body>
</html>