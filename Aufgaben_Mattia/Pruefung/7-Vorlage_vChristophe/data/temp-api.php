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
    
                $sql = "CREATE TABLE IF NOT EXISTS " . DB_TABLE . " (
                    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    kraftstoff VARCHAR(255) NOT NULL,
                    farbe VARCHAR(255) NOT NULL,
                    bauart VARCHAR(255) NOT NULL,
                    betankungen INTEGER NOT NULL DEFAULT 0
                )";
                $this->conn->query($sql);
    
                $sql = "INSERT INTO " . DB_TABLE . " (name, kraftstoff, farbe, bauart) 
                VALUES ('Passat', 'Diesel', '#000000', 'Limousine'),
                ('Scross 4x4', 'Benzin', '#006666', 'SUV'),
                ('Vito 119CDI', 'Diesel', '#008888', 'Limousine');";
                $this->conn->query($sql);
            }
        }
    }


    function GET(){
        // if(isset($_GET['id']) AND $_GET['id'] > 0){
        //     $sql = "SELECT * FROM " . DB_TABLE . " WHERE id = " .$_GET['id'];
        // }else{
        //     $sql = "SELECT * FROM " . DB_TABLE;
        // }
        // $this->array['data'] = array();
        // $results = $this->conn->query($sql);
        // $i=0;
        // while($datensatz = mysqli_fetch_array($results)){
        //     foreach($datensatz as $key => $value){
        //         $this->array['data'][$i][$key] = $value;
        //     }
        //     $i++;
        // }

        // von hier

        $limit = $_GET['limit'] . "<br><br>";
        
        echo "limit: " . $limit;

        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $sql = "SELECT * FROM " . DB_TABLE . " WHERE id =" . $_GET['id'] . ";";
        } else {
            // check if there is a limit correctly set
            if (isset($limit) && !empty($limit) && $limit != 0) {
                $sql = "SELECT * FROM " . DB_TABLE . " LIMIT " . $limit . ";";
            } else {
                $sql = "SELECT * FROM " . DB_TABLE . ";";
            }
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

        //bis hier



        $this->array['sql'] = $sql;
        $this->array['success'] = "Liste Erfolgreich geladen";
        $this->array['error'] = "fehlermeldung";
    }


    function TANKEN(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){

            $sql = " UPDATE " . DB_TABLE . " SET betankungen = betankungen+1 WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
            $this->conn->query($sql);
        }
    }
    function DELETE(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $sql = " DELETE FROM " . DB_TABLE . " WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
            $this->conn->query($sql);
        }
    }
    function POST(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $name       = $_POST['name'];
            $kraftstoff = isset($_POST['kraftstoff']) ? $_POST['kraftstoff'] : '';
            $farbe      = isset($_POST['color']) ? $_POST['color'] : '';
            $bauart     = isset($_POST['bauart']) ? $_POST['bauart'] : '';
            $tank       = isset($_POST['tank']) ? $_POST['tank'] : 0;
            $id         = $_GET['id'];

            $sql = "UPDATE " . DB_TABLE . " SET `betankungen`=$tank , `name`='$name', `kraftstoff`='$kraftstoff', `farbe`='$farbe', `bauart`='$bauart' WHERE `id`=$id";
            echo $sql;
            $this->conn->query($sql);
        }

        else{
        
            $name       = $_POST['name'];
            $kraftstoff = isset($_POST['kraftstoff']) ? $_POST['kraftstoff'] : '';
            $farbe      = isset($_POST['color']) ? $_POST['color'] : '';
            $bauart     = isset($_POST['bauart']) ? $_POST['bauart'] : '';
            if(isset($_POST['tank'])){
                $tank = $_POST['tank'];
            }else{
                $tank = 0;
            }
            
            $sql = "INSERT INTO " . DB_TABLE . " (`name`, `kraftstoff`, `farbe`, `bauart`, `betankungen`) VALUES ('$name', '$kraftstoff', '$farbe', '$bauart', $tank)";
            $this->conn->query($sql);
        
        }
        
    }
   
    public function __destruct()
    {
        $this->conn->close();
    }
}