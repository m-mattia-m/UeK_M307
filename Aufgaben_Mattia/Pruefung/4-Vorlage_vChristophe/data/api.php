<?php
define('DB_NAME', 'M307');
define('DB_USER', 'root');
define('DB_PSWD', '');
define('DB_HOST', '127.0.0.1');
define('DB_TABLE', 'autos');

$neuesAuto = new auto();

class auto{
    private $requestMethod = "GET";
    private $array = array();
    private $conn = null;
    
    public function __construct()
    {
        $this->checkdb();

        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
        $this->{$this->requestMethod}();

        echo json_encode($this->array);
    }

    function checkdb(){
        if($this->conn = new mysqli(DB_HOST, DB_USER, DB_PSWD)){
            if(!$this->conn->select_db(DB_NAME)){
                $sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME . " DEFAULT CHARACTER SET utf8";
                $this->conn->query($sql);
                $this->conn->select_db(DB_NAME);
    
                $sql = "CREATE TABLE IF NOT EXISTS autos (
                    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    kraftstoff VARCHAR(255) NOT NULL,
                    farbe VARCHAR(255) NOT NULL,
                    bauart VARCHAR(255) NOT NULL,
                    betankungen INTEGER NOT NULL DEFAULT 0
                )";
                $this->conn->query($sql);
    
                $sql = "INSERT INTO autos (name, kraftstoff, farbe, bauart) 
                VALUES ('Passat', 'Diesel', '#000000', 'Limousine'),
                ('Scross 4x4', 'Benzin', '#006666', 'SUV'),
                ('Vito 119CDI', 'Diesel', '#008888', 'Limousine');";
                $this->conn->query($sql);
            }
        }
    }


    function GET(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $sql = "SELECT * FROM autos WHERE id = " .$_GET['id'];
        }else{
            $sql = "SELECT * FROM autos";
        }
        $this->array['data'] = array();
        $results = $this->conn->query($sql);
        $i=0;
        while($datensatz = mysqli_fetch_array($results)){
            foreach($datensatz as $key => $value){
                $this->array['data'][$i][$key] = $value;
            }
            $i++;
        }

        $this->array['sql'] = $sql;
        $this->array['success'] = "Liste Erfolgreich geladen";
        $this->array['error'] = "fehlermeldung";
    }
    function TANKEN(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){

            $sql = " UPDATE autos SET betankungen = betankungen+1 WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
            $this->conn->query($sql);
        }
    }
    function DELETE(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $sql = " DELETE FROM autos WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
            $this->conn->query($sql);
        }
    }
    function POST(){
        // echo "-post-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-update - id=" . $_GET['id'] . "-";
            $sql = "UPDATE autos (name, kraftstoff, farbe, bauart) 
            VALUES ('Passat2', 'Diesel2', '#000000', 'Limousine2');";
        }else{
            // echo "-insert - id=fehlt-";
            $name = $_GET['name'];
            $kraftstoff = $_GET['kraftstoff'];
            $farbe = $_GET['color'];
            $bauart = $_GET['bauart'];
            $tank = $_GET['tank'];
            $sql = "INSERT INTO autos ('name', 'kraftstoff', 'farbe', 'bauart', 'betankungen') 
            VALUES ('$name', '$kraftstoff', '$farbe', '$bauart', '$tank');";
        }

        $this->array['sql'] = $sql;
        $results = $this->con->query($sql);
        $this->array['success'] = "Post Success";
        $this->array['error'] = "Post Error";
    }
   
   
    public function __destruct()
    {
        $this->conn->close();
    }
}