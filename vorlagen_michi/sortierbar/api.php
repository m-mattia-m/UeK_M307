
<?php

require 'data/validations.php';

//globale definitonen
define('MYSQL_HOST', 'localhost');
define('MYSQL_USER', 'root');
define('MYSQL_PW', '');
define('MYSQL_DB', 'auto_db');


    checkDB();
    
    $con = new mysqli(MYSQL_HOST,MYSQL_USER,MYSQL_PW,MYSQL_DB);    
    
    $action = @$_GET['action'];

    if(!$action){
        $action = 'getData';
    }

    switch ($action){
        case 'getData':
            $sql = "SELECT * FROM autos";
            $results = $con->query($sql);
            $i=0;

            //array instanzieren
            $array = array();
            while($res = mysqli_fetch_array($results)){

                foreach($res as $key => $val){
                    $array['data'][$i][$key] = $val;
                }
                $i++;
            }
            $array['success'] = array();
            $array['error'] = array();
            $array['sql'] = $sql;

            //json zurrückgeben
            echo json_encode($array);
        
            break;


        case 'getData_of_row':
            $id = $_GET['id'];
            $sql = "SELECT * FROM autos WHERE id=$id";
            $results = $con->query($sql);
            $i=0;
            $array = array();
            while($res = mysqli_fetch_array($results)){
                foreach($res as $key => $val){
                    $array['data'][$i][$key] = $val;
                }
                $i++;
            }
            $array['success'] = array();
            $array['error'] = array();
            $array['sql'] = $sql;
            echo json_encode($array);
        
            break;

               case 'getData_of_row':
            $id = $_GET['id'];
            $sql = "SELECT * FROM autos WHERE id=$id";
            $results = $con->query($sql);
            $i=0;
            $array = array();
            while($res = mysqli_fetch_array($results)){
                foreach($res as $key => $val){
                    $array['data'][$i][$key] = $val;
                }
                $i++;
            }
            $array['success'] = array();
            $array['error'] = array();
            $array['sql'] = $sql;
            echo json_encode($array);
        
            break;

            //update gibt kein resultat
            case 'update':
            $id = $_POST['id'];
            $name = $_POST['name'];
            $kraftstoff = $_POST['kraftstoff'];
            $farbe = $_POST['farbe'];
            $bauart = $_POST['bauart'];
            $tank = $_POST['tank'];
            $date = $_POST['date'];

        
            /** ----------------remove unusefull things------------------- */
            $name_final = remove_specials($name);
            $kraftstoff_final = remove_specials($kraftstoff);
            $farbe_final = remove_specials($farbe);
            $bauart_final = remove_specials($bauart);
            $tank_final = remove_specials($tank);
            $id_final = remove_specials($id);
            /**------------------------------------------------------------- */

            /** ----------------backend validation------------------- */
            $name_OK = check_textfield($name_final,255);
            $kraftstoff_OK = check_textfield($kraftstoff_final,255);
            $farbe_OK = check_textfield($farbe_final,255);
            $bauart_OK = check_textfield($bauart_final,255);
            $tank_OK = check_number($tank_final,255);
            $id_OK = check_number($id_final,255);
        
            /*special validation (if its empty) */
            if(isset($_POST['date'])){
                $date_final = remove_specials($date);
                $date_OK = check_date($date_final);
            }else{
                $dateOk = true;
            }
        

            /**-------------------------------------------------------------*/
            if ($name_OK && $kraftstoff_OK && $farbe_OK && $bauart_OK && $tank_OK && $id_OK == true){
                    $sql = "UPDATE autos SET name = '$name', kraftstoff= '$kraftstoff', farbe='$farbe', bauart='$bauart', betankungen=$tank, date='$date' WHERE id = $id;";

                    $con->query($sql);

        
                    $array = array();
                    $array['success'] = array();
                    $array['error'] = array();
                    $array['sql'] = $sql;
                    echo json_encode($array);
                } 
                break;

    case 'tanken':
        $id = $_GET['id'];
        $sql = "UPDATE autos SET betankungen= betankungen +1 WHERE id = $id";
        $con->query($sql);
        $array = array();
        $array['success'] = array();
        $array['success'][]['msg'] = "Tanken erfolgreich";
        $array['error'] = array();
        $array['sql'] = $sql;
        echo json_encode($array);

    break;
        case 'insert':
            $name = $_POST['name'];
            $kraftstoff = $_POST['kraftstoff'];
            $farbe = $_POST['farbe'];
            $bauart = $_POST['bauart'];
            $tank = $_POST['tank'];
            $date = $_POST['date'];

        
            /** ----------------remove unusefull things------------------- */
            $name_final = remove_specials($name);
            $kraftstoff_final = remove_specials($kraftstoff);
            $farbe_final = remove_specials($farbe);
            $bauart_final = remove_specials($bauart);
            $tank_final = remove_specials($tank);
            /**------------------------------------------------------------- */

            /** ----------------backend validation------------------- */
            $name_OK = check_textfield($name_final,255);
            $kraftstoff_OK = check_textfield($kraftstoff_final,255);
            $farbe_OK = check_textfield($farbe_final,255);
            $bauart_OK = check_textfield($bauart_final,255);
            $tank_OK = check_number($tank_final,255);

        
            /*special validation (if its empty) */
            if(isset($_POST['date'])){
                $date_final = remove_specials($date);
                $date_OK = check_date($date_final);
            }else{
                $dateOk = true;
            }
        

            /**-------------------------------------------------------------*/

            if ($name_OK && $kraftstoff_OK && $farbe_OK && $bauart_OK && $tank_OK == true){
            /**---------------------------------------------------------------- */
                $sql = "INSERT INTO `autos` (`id`, `name`, `kraftstoff`, `farbe`, `bauart`, `betankungen`,`date`) VALUES (NULL, '$name', '$kraftstoff', '$farbe', '$bauart', $tank,'$date');";

                $con->query($sql);
    
                $array['success'] = array();
                $array['error'] = array();
                $array['sql'] = $sql;
                echo json_encode($array);
            } 
            break;
        
            case 'delete':
                $id = $_GET['id'];
                $sql = "DELETE FROM autos WHERE ID=$id";
                echo $sql;
                $con->query($sql);
                $array = array();
                $array['success'] = array();
                $array['error'] = array();
                $array['sql'] = $sql;
                echo json_encode($array);
    }



function checkDB(){    
    if ($con = mysqli_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PW)){
        //echo "<br>verbunden";   
        if ($con -> select_db(MYSQL_DB)){
            //echo "<br>db vorhanden";   
        } else {
            //echo "<br>db nicht vorhanden";
            $sql_create_db = "CREATE DATABASE " . MYSQL_DB . " DEFAULT CHARACTER SET utf8";

            $con -> query($sql_create_db);
            $con -> select_db(MYSQL_DB);

            $sql_create_table = "CREATE TABLE IF NOT EXISTS autos (
                id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                kraftstoff VARCHAR(255) NOT NULL,
                farbe VARCHAR(255) NOT NULL,
                bauart VARCHAR(255) NOT NULL,
                betankungen INTEGER NOT NULL DEFAULT 0
            )";

            $sql_create__view = "CREATE VIEW v_autos_name AS Select * from autos ORDER BY name";

            $sql_insert = "INSERT INTO autos (name, kraftstoff, farbe, bauart) 
            VALUES ('Passat', 'Diesel', '#000000', 'Limousine');";

            $con -> query($sql_create_table);
        }   
    }
}
?>
