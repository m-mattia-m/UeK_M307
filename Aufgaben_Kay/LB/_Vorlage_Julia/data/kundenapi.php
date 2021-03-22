<?php
// Error Meldungen ein- und ausstellen
// error_reporting(E_ALL);
// //error_reporting(E_ALL ^ E_NOTICE);
// ini_set("display_errors", 1);

//Datenbank deklarieren
define('MYSQL_HOST',"localhost");
define('MYSQL_USER',"root");  
define('MYSQL_PW',"");  
define('MYSQL_DB',"m307_julia"); 

//Verbindung mit DB aufbauen
$con = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PW, MYSQL_DB);

if (mysqli_connect_errno()) {
    //DB erstellen
    $con = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PW);
    $sqlstr = "CREATE DATABASE IF NOT EXISTS " . MYSQL_DB . " DEFAULT CHARACTER SET utf8";
    $con->query($sqlstr);
    $con->select_db(MYSQL_DB) or die('Datenbankverbindung nicht möglich');

    //Tabelle erstellen
    $sqlstr = "CREATE TABLE IF NOT EXISTS julia_kunden (
        kunde_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        kunde_firma VARCHAR(255),
        kunde_email VARCHAR(255),
        kunde_kategorie VARCHAR(255),
        kunde_rechnung VARCHAR(255),
        kunde_kontaktperson VARCHAR(255)
    )";
    $con->query($sqlstr);

    //Daten hinzufügen
    $sqlstr = "INSERT INTO julia_kunden(kunde_firma,kunde_email,kunde_kategorie,kunde_rechnung,kunde_kontaktperson) VALUES 
        ('Max AG','email@adresse.com','Privat','Ja','Hans Muster'),
        ('Linda GmbH','info@daxer.com','Medien','Ja','Max Volk'),
        ('Mario Ltd.','power@mario.com','Verkehr','Nein ','Stanley Ash')
    ";
    $con->query($sqlstr);
}

//Parameter abrufen
$id = @$_GET['id'];
$action = @$_GET['action'];
$show = @$_GET['show'];

switch ($action) {
    case 'delete':
        // echo 'delete';
        $array = array();
        $sqlstr = "DELETE FROM julia_kunden WHERE kunde_id=" . $id;
        $con->query($sqlstr);
        $array['meldung'][0] = 'löschen erfolgreich';
        echo json_encode($array);
        break;
    case 'insert':
        insertData();
        break;
    case 'getData':
        // echo 'getData';
        getData();
        break;
    default:
        // echo 'default';
        getData();
        break;
}

$con->close();

function insertData(){
    global $id;
    global $con;
    
    //Werte abrufen
    $firma = @$_POST['firma'];
    $email = @$_POST['email'];
    $kategorie = @$_POST['kategorie'];
    $rechnung = @$_POST['rechnung'];
    $kontaktperson = @$_POST['kontaktperson'];

    $write = false;
    //Email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)){
        $write = true;
    } else{
        $array['meldung'][0] = 'Keine korrekte Email Adresse';
        echo json_encode($array);
    }


    if($write == true){
        $array = array();
        // echo 'insert';
        
        if(0==$id){
            //insert
            $sqlstr = "INSERT INTO julia_kunden(kunde_firma,kunde_email,kunde_kategorie,kunde_rechnung,kunde_kontaktperson) VALUES 
                ('" . $firma . "','" . $email . "','" . $kategorie . "','" . $rechnung . "','" . $kontaktperson . "')";
        } else {
            //Update
            $sqlstr = "UPDATE julia_kunden SET
                kunde_firma = '".$firma."', kunde_email = '".$email."', kunde_kategorie = '".$kategorie."', kunde_rechnung = '".$rechnung."', kunde_kontaktperson = '".$kontaktperson."'
                WHERE kunde_id=" . $id;
        }
        // echo $sqlstr;
        $con->query($sqlstr);
        // $array['meldung'][0] = $sqlstr;
        // echo json_encode($array);
    }
}

function getData(){
    global $con;
    global $id;
    global $show;
    $array = array();

    //DB SQL
    if(0==$id){
        $sqlstr = "SELECT * FROM julia_kunden";    
    } else{
        $sqlstr = "SELECT * FROM julia_kunden WHERE kunde_id=" .$id;    
    }

    switch ($show){
        case 1:
            $sqlstr = "SELECT * FROM julia_kunden LIMIT 1"; 
            break;
        case 5:
            $sqlstr = "SELECT * FROM julia_kunden LIMIT 5"; 
            break;
        case 10:
            $sqlstr = "SELECT * FROM julia_kunden LIMIT 10"; 
            break;
        default:
            break;
    }
    
    $results = $con->query($sqlstr);
    $i = 0;
    while ($res = mysqli_fetch_array($results)) {
        // echo '<pre>';
        // print_r($res);
        foreach ($res as $key => $value) {
            $array['data'][$i][$key] = $value;
        }
        $i++;
    }
    $array['meldung'][0] = 'getData erfolgreich';
    // echo '<pre>';
    // print_r($array);

    echo json_encode($array);
}