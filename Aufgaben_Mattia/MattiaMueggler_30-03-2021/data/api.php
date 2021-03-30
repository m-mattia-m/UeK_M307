<?php
define('DB_NAME', 'm307_mattia');
define('DB_USER', 'root');
define('DB_PSWD', '');
define('DB_HOST', '127.0.0.1');
define('DB_TABLE', 'mattia_artikel');

$neuesProdukt = new produkt();

class produkt{
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
    
                $sql = "CREATE TABLE IF NOT EXISTS mattia_artikel (
                    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    artikel_Artikelbezeichnung VARCHAR(255) NOT NULL,
                    artikel_Kategorie VARCHAR(255) NOT NULL,
                    artikel_Zustand VARCHAR(255) NOT NULL,
                    artikel_Preis FLOAT NOT NULL,
                    artikel_Bemerkungen VARCHAR(255) NOT NULL
                    artikel_Bemerkungen TIMESTAMP NOT NULL
                )";
                $this->conn->query($sql);
    
                $sql = "INSERT INTO mattia_artikel (artikel_Artikelbezeichnung, artikel_Kategorie, artikel_Zustand, artikel_Preis, artikel_Bemerkungen) 
                VALUES ('Apple MacBook Air 13.3', 'Computer **', 'Neu **', 1199.00, '13.30, WXGA+, Intel Core i7, 8GB, SSD', '2021-03-30 15:28:39'),
                ('Apple Magic Mouse 2', 'Zubehör', 'Gebraucht', 79.00, 'Neu entwickelt zum Wiederaufladen…', '2021-03-30 15:28:39'),
                ('Apple Thunderbolt/Ethernet', 'Kabel', 'Neu', 39.00, 'Mit dem Apple Thunderbolt auf Gigabit…', '2021-03-30 15:28:39');";
                $this->conn->query($sql);
            }
        }
    }


    function GET(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $sql = "SELECT * FROM mattia_artikel WHERE id = " .$_GET['id'];
            // $sql = "SELECT * FROM mattia_artikel ORDER BY timestamp DESC WHERE id = " .$_GET['id'];
        }else{
            $sql = "SELECT * FROM mattia_artikel";
            // $sql = "SELECT * FROM mattia_artikel ORDER BY timestamp DESC";
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

        // $this->array['sql'] = $sql;
        // $this->array['success'] = "Liste Erfolgreich geladen";
        // $this->array['error'] = "fehlermeldung";
    }

    function DELETE(){
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $sql = " DELETE FROM mattia_artikel WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
            $this->conn->query($sql);
        }
    }

    function POST(){

        $id                 = $_GET['id'];
        $Artikelbezeichnung = $_POST['Artikelbezeichnung'];
        $Kategorie          = $_POST['Kategorie'];
        $Zustand            = $_POST['Zustand'];
        $Preis              = $_POST['Preis'];
        $Bemerkungen        = $_POST['Bemerkungen'];

        $timestamp = date("Y-m-d H:i:s");
        // echo $timestamp;


        // echo " -- " . $id . "<br>" . $Artikelbezeichnung . "<br>" . $Kategorie . "<br>" . $Zustand . "<br>" . $Preis . "<br>" . $Bemerkungen; 

        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "edit Data -:" . $id;
            // Datensatz bearbeiten
            $sql = "UPDATE `mattia_artikel` SET `artikel_Artikelbezeichnung`='$Artikelbezeichnung' , `artikel_Kategorie`='$Kategorie' , `artikel_Zustand`='$Zustand',`artikel_Preis`='$Preis',`artikel_Bemerkungen`='$Bemerkungen' ,`timestamp`='$timestamp' WHERE `id`='$id';";
            $this->conn->query($sql);
            $this->array['sql'] = $sql;
        }else{
            // DB schreinben
            // echo "wird neu erstellt";
            $sql = "INSERT INTO mattia_artikel (`artikel_Artikelbezeichnung`, `artikel_Kategorie`, `artikel_Zustand`, `artikel_Preis`, `artikel_Bemerkungen`, `timestamp`) VALUES ('$Artikelbezeichnung', '$Kategorie', '$Zustand', '$Preis', '$Bemerkungen', '$timestamp');";
            $this->conn->query($sql);
            $this->array['sql'] = $sql;
        }
        
    }


    public function __destruct()
    {
        $this->conn->close();
    }
}