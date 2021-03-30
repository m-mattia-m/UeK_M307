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
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            $name       = $_POST['name'];
            $kraftstoff = isset($_POST['kraftstoff']) ? $_POST['kraftstoff'] : '';
            $farbe      = isset($_POST['color']) ? $_POST['color'] : '';
            $bauart     = isset($_POST['bauart']) ? $_POST['bauart'] : '';
            $tank       = isset($_POST['tank']) ? $_POST['tank'] : 0;
            $id         = $_GET['id'];

            $sql = "UPDATE autos SET `betankungen`=$tank , `name`='$name', `kraftstoff`='$kraftstoff', `farbe`='$farbe', `bauart`='$bauart' WHERE `id`=$id";
            $this->conn->query($sql);
        }

        else{
            $write = true;
            // $name       = $_POST['name'];
            // if($write){
            //     $write = $this->chkstr($name);
            // }

            // if(isset($_POST['tank'])){
            //     $tank = $_POST['tank'];
            // }else{
            //     $tank = 0;
            // }

            // if($write){
            //     $write = $this->chkint($tank);
            // }

            // $kraftstoff = isset($_POST['kraftstoff']) ? $_POST['kraftstoff'] : '';
            // $bauart     = isset($_POST['bauart']) ? $_POST['bauart'] : '';

            // if(isset($_POST['color'])){
            //     $farbe = $_POST['color'];
            // }else{
            //     $farbe = "#000000";
            // }
            
            if($write){
                // DB schreinben
                $sql = "INSERT INTO autos (`name`, `kraftstoff`, `farbe`, `bauart`, `betankungen`) VALUES ('$name', '$kraftstoff', '$farbe', '$bauart', $tank)";
                $this->conn->query($sql);
            }
        
        }
        
    }
   
    function chkstr($str){
        // Pflichtfeld und Grösse in der DB
        if($str == "" AND strlen($str) < 5 AND strlen($str) > 255) return false;
        // unerlaubte Zeichen
        if(preg_match('/[\'%&<>]/', $str)){
            return false;
        }
        return true;
    }

    function chkdate_kurz($str){
        if (DateTime::createFromFormat('Y-m-d', $str)) {
            return true;    
        }else {
            return false;
        }
    }

    function chkdate($str){
        if (DateTime::createFromFormat('Y-m-d', $str)) {
            //return true;
            $array = explode('-', $str);
            if($array[1]<=0 OR $array[1]>12){
                return false; 
            }
            $monat31 = array(1,3,5,7,8,10,12);
            $monat30 = array(4,6,9,11);
            if (in_array($array[1], $monat31)) {
                if($array[2] > 31){
                    return false;
                }else{
                    return true; 
                }
            }
            if (in_array($array[1], $monat30)) {
                if($array[2] > 30){
                    return false; 
                }else{
                    return true; 
                }
            }
            if($array[1]==2){
                if($array[2] >= 29){
                    return false;
                }else{
                    return true;
                }
            }
        }else {
            return false;
        }
    }

    function chkint($zahl){
        if (is_integer($zahl)) {
            if($zahl > 2147483647 OR $zahl < 0){
                return false;
            }else{
                return true;
            }
        }else {
            return false;
        }
    }

    function chkmail_minimal($str){
        if($str <> "" AND strlen($str) > 5 AND strlen($str) < 255){
            if (filter_var($str, FILTER_VALIDATE_EMAIL)) {
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    function chkmail($str){
        if($str <> "" AND strlen($str) > 5 AND strlen($str) < 255){
            if (filter_var($str, FILTER_VALIDATE_EMAIL)) {
                //echo '<br>Könnte eine eMail sein';
                // meine @ google.com
                $array = explode('@', $str);
                if ( checkdnsrr($array[1], 'MX') ) {
                    //echo "<br>OK: DNS Record found";
                    $wegwerfAdressen = array();
                    $wegwerfAdressen[] = '10minutemail';
                    $wegwerfAdressen[] = 'instantlyemail';
                    $wegwerfAdressen[] = 'Tempmailer';
                    $wegwerfAdressen[] = 'emaildeutschland';
                    $wegwerfAdressen[] = 'dontmail';
                    $wegwerfAdressen[] = 'migmail';
                    $wegwerfAdressen[] = 'mailinator';
                    //echo '<br> Mail: ' . $array[1];
                    foreach($wegwerfAdressen as $adresse){
                        if(strstr($array[1], $adresse)){
                            //echo '<br>Check: Wegwerf - Email nicht gestattet.<br>';
                            return false;
                        }
                    }
                    return true;
                }else {
                    //echo "<br>Fehler: NO DNS Record found";
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function __destruct()
    {
        $this->conn->close();
    }
}