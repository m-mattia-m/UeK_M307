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
$neuesAuto = new auto();

class auto{
    private $requestMethod = "GET";

    private $array = array();

    public function __construct()
    {
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
        // echo $this->requestMethod;
        $this->{$this->requestMethod}();

        echo json_encode($this->array);
    }
    function GET(){
        // echo "-get-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-get Daten - id=" . $_GET['id'] . "-";
            $sql = "Select * from autos WHERE id = " . $_GET['id'];
        }else{
            // echo "-get - alle Daten -";
            $sql = "Select * from autos ";
        }
        $this->array['sql'] = $sql;
        $this->array['success'] = "Liste erfolgreich geladen";
        $this->array['error'] = "test - meldung";

    }
    function TANKEN(){
        // echo "-tanken-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-id=" . $_GET['id'] . "-";

            $sql = "UPDATE autos SET betankung = betankung + 1 WHERE id = " . $_GET['id'];
            $this->array['sql'] = $sql;
        }else{
            // echo "-id=fehlt-";
        }
    }
    function DELETE(){
        // echo "-delete-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-delete - id=" . $_GET['id'] . "-";
            $sql = "DELETE from autos WHERE id = " .$_GET['id'];
            $this->array['sql'] = $sql;
        }else{
            // echo "-delete - id=fehlt-";
        }
    }
    function POST(){
        // echo "-post-";
        if(isset($_GET['id']) AND $_GET['id'] > 0){
            // echo "-update - id=" . $_GET['id'] . "-";
        }else{
            // echo "-insert - id=fehlt-";
        }
    }

    public function __destruct()
    {
        // echo 'destruct';
    }
}