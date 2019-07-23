<?php

/* MOST SIMPLE API */


// respond as JSON
//header("Content-Type: application/json");

$api =  new Api();
echo $api->result;

/**
 * Class Api
 */
class Api {

    /**
     * @var Methods
     */
    private $methodInstance;
    /**
     * @var false|string
     */
    public $result;

    /**
     * Api constructor.
     */
    function __construct() {
        // 1. pull request out of URL
        $method = $_GET["path"];

        // 2. create instance of target class
        $this->methods = new Methods();

        // 3. Call target-function
        $this->result = json_encode($this->methods->$method());
    }
}

/**
* Class Database
*/
class Database {
  private $_connection = null;
  public function connect() {
    if(!is_null($this->_connection)) { return $this->_connection; }
    $this->_connection = false;
    try {
        $dsn = "mysql:brentonstrine.com,dbname=brenton_testApi,charset=utf8mb4";
        $this->_connection = new PDO($dsn, "brenton_launchpad", "39mLbAArz");
        $this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        return array(
          "type"=>"error",
          "message"=>"Could not connect to database. " . $e->getMessage(),
          "request"=>$_GET);
    }
    return $this->_connection;
  }
}

/**
 * Class Methods
 */
class Methods {

    /**
     * @return array
     */
    function test(){
      if(!empty($_GET)) {
        return array("request"=>$_GET, "php_version"=>phpversion());
      } else {
        return array("message"=>"Payload was empty.");
      }
    }

    /**
     * @return array
     */
    function postComment(){
      //reject empty posts
      if(empty($_GET)) { return array("message"=>"Payload was empty."); }

      // Establish connection to database
      $db = new Database();
      $pdo = $db->connect();
      if($pdo->type === "error"){ return $pdo;}

      // build SQL quiery
      $sql = "INSERT INTO brenton_testApi.comments (username, message, replyto) VALUES "
            . "("
              . ":" . username
              . ", "
              . ":" . message
              . ", "
              . ":" . replyto
            . ")";
      $data = array(
        "username" => $_GET["username"],
        "message" => $_GET["message"],
        "replyto" => $_GET["replyto"]
      );
      try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);
      } catch (PDOException $e) {
        return array("type"=>"error", "message"=>"Could not connect to database. " . $e->getMessage(), "request"=>$_GET);
      }

      return array("type"=>"success", "message"=>"Posted comments to database.", "request"=>$_GET, "timestamp"=>time());
    }


    /**
     * @return array
     */
    function getComments(){
      // Establish connection to database
      $db = new Database();
      $pdo = $db->connect();
      if($pdo->type === "error"){ return $pdo;}

      // build SQL quiery
      $sql = "SELECT timestamp, username, message, replyto FROM brenton_testApi.comments";
      try {
        $stmt = $pdo->query($sql);
        $comments = array();
        while ($row = $stmt->fetch()) {
          array_push($comments, array(
              "timestamp"=>$row["timestamp"],
              "username"=>$row["username"],
              "message"=>$row["message"],
              "replyto"=>$row["replyto"]
          ));
        }
      } catch (PDOException $e) {
        return array("type"=>"error", "message"=>"Could not connect to database. " . $e->getMessage(), "request"=>$_GET);
      }

      return array("type"=>"success", "comments"=>$comments);
    }
}
?>
