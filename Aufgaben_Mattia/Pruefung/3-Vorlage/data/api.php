<?php
// $feld1 = "gfd";
// $id = 0;
// /* echo $feld1;
// echo $id; */
// print_r($_POST);
// print_r($_GET);
// $requestMethod = $_SERVER["REQUEST_METHOD"];
// echo $requestMethod;
//POST = insert oder update
// id==0, dann insert, else update
// GET = Daten JSON holen
// id==0, dann alle Datensätze, else nur ein Datensatz
// DELETE (id mitgeben)
// TANKEN (id mitgeben)
define('DB_NAME', 'M307');
define('DB_USER', 'root');
define('DB_PSWD', '');
define('DB_HOST', '127.0.0.1');
define('DB_TABLE', 'autos');

$neuesAuto = new auto();

class auto{
    private $requestMethod = "GET";
    private $array = array();
    private $con = null;
    
    public function __construct()
    {
        $this->checkdb();
        $this->con = new mysqli(DB_HOST, DB_USER, DB_PSWD, DB_NAME);


        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
        // echo $this->requestMethod;
        $this->{$this->requestMethod}();

        echo json_encode($this->array);
    }

    function checkdb(){
        // echo 'checkk...';
        $this->con = new mysqli(DB_HOST, DB_USER, DB_PSWD );

        if($this->con->select_db(DB_NAME)){
            // echo 'db vorhanden';
        }else{
            // echo 'db nicht vorhanden';
            $sql = "CREATE DATABASE " . DB_NAME . " DEFAULT CHARACTER SET utf8";
            $this->con->query($sql);
            $this->con->select_db(DB_NAME);

            $sql = "CREATE TABLE IF NOT EXISTS autos (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                kraftstoff VARCHAR(255) NOT NULL,
                farbe VARCHAR(255) NOT NULL,
                bauart VARCHAR(255) NOT NULL,
                betankungen INTEGER NOT NULL DEFAULT 0
            )";
            $this->con->query($sql);

            $sql = "INSERT INTO autos (name, kraftstoff, farbe, bauart) 
            VALUES ('Passat', 'Diesel', '#000000', 'Limousine');";
            $this->con->query($sql);
        }
        $this->con->close();
    }


    function GET(){
        // echo "-get-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-get Daten - id=" . $_GET['id'] . "-";
            $sql = "SELECT * FROM autos WHERE id = " .$_GET['id'];
        }else{
            // echo "-get - alle Daten -";
            $sql = "SELECT * FROM autos";
        }

        // Daten vom SQL Server holen und Array erstellen
        $this->array['data'] = array();
        $results = $this->con->query($sql);
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
        // echo "-tanken-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-id=" . $_GET['id'] . "-";
            $sql = "UPDATE autos SET betankungen = betankungen+1 WHERE id = " .$_GET['id'];
        }else{
            // echo "-id=fehlt-";
        }

        $this->array['sql'] = $sql;
        $results = $this->con->query($sql);
        $this->array['success'] = "Update Success";
        $this->array['error'] = "Update Error";
    }
    function DELETE(){
        // echo "-delete-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-delete - id=" . $_GET['id'] . "-";
            $sql = "DELETE FROM autos WHERE id = " .$_GET['id'];

        }else{
            // echo "-delete - id=fehlt-";
        }

        $this->array['sql'] = $sql;
        $results = $this->con->query($sql);
        $this->array['success'] = "Delete Success";
        $this->array['error'] = "Delete Error";
    }
    function POST(){
        // echo "-post-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-update - id=" . $_GET['id'] . "-";
            $sql = "UPDATE autos (name, kraftstoff, farbe, bauart) 
            VALUES ('Passat2', 'Diesel2', '#000000', 'Limousine2');";
        }else{
            // echo "-insert - id=fehlt-";
            $sql = "INSERT INTO autos (name, kraftstoff, farbe, bauart) 
            VALUES ('new', 'new', '#000000', 'new');";
        }

        $this->array['sql'] = $sql;
        $results = $this->con->query($sql);
        $this->array['success'] = "Post Success";
        $this->array['error'] = "Post Error";
    }
   
    public function __destruct()
    {
        $this->con->close();
    }
}