<?php
error_reporting(0); // disable error reporting
ini_set('display_errors', 0); // hide errors from user

header('Content-Type: application/json'); // set content type to json

define('MYSQL_SERVER', 'localhost');
define('MYSQL_USER', 'root');
define('MYSQL_PASSWORD', '');
define('MYSQL_DB', 'm307_kay');
define('DATA_SOURCE', 'kay_apps');

// get Parameters
$id = @$_GET['id'];
$action = @$_GET['action'];
$limit = @$_GET['limit'];

initializeDB();

// evaluate action type
switch ($action) {
    case 'get':
        getData();
        break;
    case 'update':
        updateData();
        break;
    case 'create':
        insertData();
        break;
    case 'delete':
        deleteData();
        break;
    default:
        apiResponse(array(), array('Route not found'), array(), 404);
        break;
}
exitAPI();

function initializeDB()
{
    global $con;
    if ($con = mysqli_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PASSWORD)) {
        if (!($con->select_db(MYSQL_DB))) { //check if db exists
            $query = "CREATE DATABASE IF NOT EXISTS " . MYSQL_DB . " DEFAULT CHARACTER SET utf8;";
            $con->query($query);
            if (!($con->select_db(MYSQL_DB))) {
                // this code is exicuted when it was not possible to create a db
                apiResponse(array(), array('User has no DB create rights. Manual creation needed'), array(), 400);
                exitAPI();
            }
            $schema = "CREATE TABLE IF NOT EXISTS kay_apps (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                datum DATE NOT NULL,
                preis DECIMAL(7,2),
                kategorie VARCHAR(255),
                rating DECIMAL(7,2),
                stat TINYINT,
                additional_information VARCHAR(1024) NULL
            );";
            $con->query($schema);

            // add data
            $data = "INSERT INTO kay_apps(name,datum,preis,kategorie,rating,stat) VALUES
                ('Todos!','2016.12.01',15.50,'Work',4.50,1),
                ('SlashnGo','2017.02.01',12.00,'Games',3.75,0),
                ('Uzmosy','2017.03.01',10.50,'Social',4.00,1);";
            $con->query($data);
        }
    } else {
        apiResponse(array(), array('No connection to DB possible'), array(), 400);
        exitAPI();
    }
}

function getData()
{
    global $con;
    global $limit;
    apiResponse(getDataArray(), array(), array(), 200);
}

function getDataArray()
{
    global $con;
    global $limit;
    global $id;

    if (isset($id) && !empty($id)) {
        $query = "SELECT * FROM " . DATA_SOURCE . " WHERE id =" . $id . ";";
    } else {
        // check if there is a limit correctly set
        if (isset($limit) && !empty($limit) && @($limit != 0)) {
            $query = "SELECT * FROM " . DATA_SOURCE . " LIMIT " . $limit . ";";
        } else {
            $query = "SELECT * FROM " . DATA_SOURCE . ";";
        }
    }
    $result = $con->query($query);
    return $result->fetch_all(MYSQLI_ASSOC);
}

function insertData()
{
    global $id;
    global $con;

    $write = true;

    // get data from arguments
    $name = @$_POST['name'];
    $datum = @$_POST['datum'];
    $preis = @$_POST['preis'];
    $kategorie = @$_POST['kategorie'];
    $rating = @$_POST['rating'];
    $stat = @$_POST['stat'];


    // check for validity (e.g. was sent via POST)
    if (isset($name) && isset($datum)) {

        if(empty($stat)){
            $stat = 0;
        }

        if(empty($preis)){
            $preis = 0;
        }

        // format the input
        $name = formatInput($name);
        $datum = formatInput($datum);
        $preis = formatInput($preis);
        $kategorie = formatInput($kategorie);
        $rating = formatInput($rating);
        $stat = formatInput($stat);
        
        // check length
        if (!validateLength($name)) $write = false;
        if (!validateLength($datum)) $write = false;
        if (!validateUnrequiredLength($preis)) $write = false;
        if (!validateUnrequiredLength($kategorie)) $write = false;
        if (!validateUnrequiredLength($rating)) $write = false;
        
        
        // if insert check successful
        if ($write) {
            $query = "INSERT INTO kay_apps(name,datum,preis,kategorie,rating,stat) VALUES ('" . $name . "','" . $datum . "'," . $preis . ",'" . $kategorie . "'," . $rating . "," . $stat .");";
            $con->query($query);
            apiResponse(getDataArray(), array(), array("Successfully created Record."), 200);
        } else {
            apiResponse(getDataArray(), array('Validation failed'), array(), 400);
        }
    } else {
        apiResponse(array(), array('Not all arguments specified or not with POST'), array(), 400);
    }
}

function updateData()
{
    global $id;
    global $con;

    $write = true;

    // get data from arguments
    $name = @$_POST['name'];
    $datum = @$_POST['datum'];
    $preis = @$_POST['preis'];
    $kategorie = @$_POST['kategorie'];
    $rating = @$_POST['rating'];
    $stat = @$_POST['stat'];

    // check for validity (e.g. was sent via POST)
    if (isset($name) && isset($datum)) {
        
        if(empty($stat)){
            $stat = 0;
        }

        if(empty($preis)){
            $preis = 0;
        }

        $name = formatInput($name);
        $datum = formatInput($datum);
        $preis = formatInput($preis);
        $kategorie = formatInput($kategorie);
        $rating = formatInput($rating);
        $stat = formatInput($stat);
        
        // check length
        if (!validateLength($name)) $write = false;
        if (!validateLength($datum)) $write = false;
        if (!validateUnrequiredLength($preis)) $write = false;
        if (!validateUnrequiredLength($kategorie)) $write = false;
        if (!validateUnrequiredLength($rating)) $write = false;

        // if insert check successful
        if ($write) {
            $query = "UPDATE " . DATA_SOURCE . " SET name='" . $name . "', datum='" . $datum . "', preis=" . $preis . ", kategorie='" . $kategorie . "', rating=" . $rating . ", stat=" . $stat . " WHERE id=" . $id . ";";
            $con->query($query);
            apiResponse(getDataArray(), array(), array("Successfully updated Record. '" . $id . "'"), 200);
        } else {
            apiResponse(getDataArray(), array('Validation failed'), array(), 400);
        }
    } else {
        apiResponse(array(), array('Not all arguments specified'), array(), 400);
    }
}

function deleteData()
{
    global $id;
    global $con;

    // check if id was set
    if (isset($id) && !empty($id)) {
        $query = "DELETE FROM " . DATA_SOURCE . " WHERE id=" . $id . ";";
        $con->query($query);

        apiResponse(getDataArray(), array(), array('Successfully deleted record \'' . $id . '\''), 200);
    } else {
        apiResponse(array(), array('Cannot delete. Argument \'id\' missing'), array(), 400);
    }
}

// API FUNCTIONS

//returns a formated json -> apiResponse($data: Array, $error: Array, $success: Array, $status: int)
function apiResponse($data, $error, $success, $status = 200)
{
    // status code must be sent before first content -> http_response_code($status);
    $response = array('data' => $data, 'error' => $error, 'success' => $success);
    echo json_encode($response);
    exitAPI();
}

function exitAPI()
{
    global $con;
    $con->close();
    exit(); // this is needed if you want to force quit
}

function formatInput($var)
{
    $var = trim($var);
    $var = htmlspecialchars($var);
    return $var;
}

function validateEmail($var)
{
    $emailParts = explode('@', $var); // splitts up email
    if (filter_var($var, FILTER_VALIDATE_EMAIL)) { // regex check
        return (checkdnsrr($emailParts[1], 'MX')); // searches dns entry
    } else {
        return false;
    }
}

function validateLength($var)
{
    return (strlen($var) > 0 && strlen($var) <= 255);
}

function validateUnrequiredLength($var)
{
    return (strlen($var) <= 255);
}

function validateDate($date)
{
    if (DateTime::createFromFormat('Y-m-d', $date)) {
        return true;
    } else {
        return false;
    }
}