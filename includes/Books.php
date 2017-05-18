<?php

class Books {
    
    // DB credentials
    private $host      = "localhost";
    private $user      = "root";
    private $pass      = "123456";
    private $dbname    = "englishbookstore";
 
    private $dbh;
    
    public function __construct(){
        // Set DSN
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
        
        // Create a new PDO instanace
        try {
            $this->dbh = new PDO($dsn, $this->user, $this->pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        }
        catch (PDOException $e) {

            echo $e->getMessage();
        }
    }
    
    /* Admin function: Looking for book into GoodReads Database by book's ISBN
     * Using GoodReads API */
    public function admin_check_book_isbn($params) {
        // GoodReads API app key
        $GRkey = "cdNKGwcNSIFRq8lIqPQW8Q";
        $isbn = $params["isbn"];
        
        $grapi_src = file_get_contents("https://www.goodreads.com/search/index.xml?key=" . $GRkey . "&q=" . $isbn);

        $grapi_xml_str = simplexml_load_string($grapi_src,'SimpleXMLElement',LIBXML_NOCDATA);
        $grapi_json = json_encode($grapi_xml_str);
        $grapi_array = json_decode($grapi_json,TRUE);
       
        $btitle = $grapi_array["search"]["results"]["work"]["best_book"]["title"];
        $bauthor = $grapi_array["search"]["results"]["work"]["best_book"]["author"]["name"];
        //$btitle = $grapi_xml_str->search->results->work->best_book->title;
        //$bauthor = $grapi_xml_str->search->results->work->best_book->author->name;
        
        $result = array("title" => $btitle, "author" => $bauthor);
        return $result;
    }
    
    /* Admin function: Get specific book's details from GoodReads DB and store them into local DB
     * Use GoodReads API */
    public function admin_add_book($params) {
        // GoodReads API app key
        $GRkey = "cdNKGwcNSIFRq8lIqPQW8Q";
        $isbn = $params["isbn"];
        
        $grapi_src = file_get_contents("https://www.goodreads.com/book/isbn/" . $isbn . "?key=" . $GRkey);

        $grapi_xml_str = simplexml_load_string($grapi_src,'SimpleXMLElement',LIBXML_NOCDATA);
        $grapi_json = json_encode($grapi_xml_str);
        $grapi_array = json_decode($grapi_json,TRUE);
       
        $btitle = $grapi_array["book"]["title"];
        $bauthor = $grapi_array["book"]["authors"]["author"]["name"];
        $bauthor_gr_id = $grapi_array["book"]["authors"]["author"]["id"];
        $bdescription = $grapi_array["book"]["description"];
        $bimg = $grapi_array["book"]["image_url"];
        
        $rst_addbook = $this->dbh->prepare('
            INSERT INTO
            books
            (
                book_isbn,
                book_category,
                book_title,
                book_description,
                book_img,
                book_regdate
              )
            VALUES
            (
                :isbn,
                5,
                :title,
                :description,
                :img,
                NOW()
            )
        ');
        $rst_addbook->execute(array(
            ":isbn" => $isbn,
            ":title" => $btitle,
            ":description" => $bdescription,
            ":img" => $bimg
        ));
        
        $rst_addauthor = $this->dbh->prepare('
            INSERT INTO
            authors
            (
                author_gr_id,
                author_name
              )
            VALUES
            (
                :gr_id,
                :name
            )
        ');
        $rst_addauthor->execute(array(
            ":gr_id" => $bauthor_gr_id,
            ":name" => $bauthor
        ));
        
        $rst_connect_authors_book = $this->dbh->prepare('
            INSERT INTO
            authors_books
            (
                ab_author,
                ab_book
              )
            VALUES
            (
                :author,
                :book
            )
        ');
        $rst_connect_book_authors->execute(array(
            ":author" => $bauthor_gr_id,
            ":book" => $isbn
        ));
        
        return "success";
    }
    
}