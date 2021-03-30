<?php
// Instanz erstellen und Konstruktor aufrufen
$var = new daten();
// Instanz löschen und Destruktor aufrufen
$var = NULL;
/**
* Meine Klasse
* @author   	Name
* @copyright	Name
* @license		OpenSource
* @version  	1.0
* @category 	Controller 
*/ 
class daten{
    private $database = 'data/meinedatei.sqlite3';
    /**
    * Constructor
    * @param nothing
    * @return  nothing
    */
    function __construct(){
        echo '<br>api.php -> Konstruktor';
    }
    function __destruct(){
        echo '<br>api.php -> Destrukor';
    }
}