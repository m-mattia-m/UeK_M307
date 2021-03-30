<?php


    //--------------textfield----------------
    function check_textfield($text, $laenge){
        if(strlen($text)<$laenge){
         $textfieldOK = true;
        } else {
        $textfieldOK = false;
        }

        return $textfieldOK;
    }

    //--------------textfield----------------
    function check_number($text, $laenge){
        if(strlen($text)< $laenge){
            if (is_numeric($text)){
                $textfieldOK = true;
            } else{
                $textfieldOK = false;
            }
        } else {
            $textfieldOK = false;
        }
        return $textfieldOK;
    }

    
/***--------------------------email----------- */
function check_email($text_to_check, $laenge){

    $DBwrite = true;
    if(strstr($text_to_check, '@') && strlen($text_to_check)< $laenge){

        if(!filter_var($text_to_check , FILTER_VALIDATE_EMAIL)){
            $DBwrite = false;
        }else{
            $array = explode('@', $text_to_check);

            //domain?
            if(checkdnsrr($array[1], 'MX')){
            }else{
                $DBwrite = false;   
            }
        }   
    }else{
        $DBwrite = false;
    }

        return $DBwrite;

}

/*--------------------date validation--------------- */
function check_date($date){
    if(strlen($date)>0){
    

      $dateOK = true;
                
      $dateExploded = explode("-", $date);

      if(count($dateExploded) != 3){
          $dateOK = false;
      }

      $day = $dateExploded[2];
      $month = $dateExploded[1];
      $year = $dateExploded[0];


      if(!checkdate($month, $day, $year)){
          $dateOK = false;
      }
    } else{
        $dateOK = true;
    }

      return $dateOK;
}
      /***------------------------------------------------ */

function remove_specials($text){
    $text_without_html = htmlspecialchars($text);
    $final_text = trim($text_without_html);

    return $final_text;
} 
/**
 * 
 * Pflichtfehlder nicht leer
 * Nicht länger als DBFelder
 * E-Mail -> e-mail?
 * Zahl -> zahl?
 * text -> text?
 * keine Rückmeldung als Frontend!!

 * 
 */

?>