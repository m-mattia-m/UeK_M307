$(function () {
    $('.modal').modal();
    /**-------load js folder-------- */
    $('.tabellen-inhalt').load("sites/liste.html", function () {
        $.getScript("js/liste.js");
    });

    /**----------------------------- */
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        setDefaultDate: true,
        firstDay: 1
   });
   
    
    $('#Auto_save_or_edit').click(function() {
      /*--------------------required field-------------------- */
      var kraftstoff = $('#kraftstoff').val();
      var name = $('#name').val();
      var nameOk = true;
      var kraftstoffOk = true;

      if (name.length < 3) {
          $('#name').addClass('orange lighten-4');
          M.toast({ html: 'Name bitte min. 3 Zeichen lang', classes: 'red black-text' });
          nameOk = false;
      } 
      if  (kraftstoff.length < 1) {
          $('#name').addClass('orange lighten-4');
          M.toast({ html: 'Krafstoff muss ausgefüllt werden', classes: 'red black-text' });
          kraftstoffOk = false;
      }


      /**------------------------------------------------------ */
      if (nameOk == true && kraftstoffOk == true){
            var name_value = $("#name").val();
            var kraftstoff_value = $("#kraftstoff").val();
            var farbe_value = $("#farbe").val();
            var bauart_value = $("#bauart").val();
            var tank_value = $("#tank").val();
            var id_value = $("#id").val();
            var date_value = $("#date").val();


            //console.log("the id value is:" +id_value);

            //console.log(name_value + kraftstoff_value + farbe_value + bauart_value + tank_value + id_value + date_value); //alle values sind vorhanden


            if (id_value > 0){
                //console.log("update");


                $.ajax({
                    type: "post",
                    url: "api.php?action=update",
                    data: {
                        name: name_value,
                        kraftstoff: kraftstoff_value,
                        farbe: farbe_value,
                        bauart: bauart_value,
                        tank: tank_value,
                        id: id_value,
                        date: date_value
                    },
                    dataType: "json",
                    success: function (response) {

                    /**------------response validation -> did it work? ---------------*/
                    if (response['error'].length > 0) {
                        for (var i = 0; i < response['error'].length; i++) {
                            var str = response['error'][i].msg;
                            M.toast({ html: str, classes: 'red' });
                        }
                    }
                    if (response['success'].length > 0) {
                        for (var i = 0; i < response['success'].length; i++) {
                            var str = response['success'][i].msg;
                            M.toast({ html: str, classes: 'green' });
                        }
                    }
                    /**-----------------------------------------------------------------*/
                    M.toast({ html: "Your item " + id + "was updated", classes: 'green' });


                    showData();                    
                    }
                });

            } else {

                //console.log("insert something new");

                $.ajax({
                    type:"POST",
                    url: 'api.php?action=insert',
                    data: {
                        name: name_value,
                        kraftstoff: kraftstoff_value,
                        farbe: farbe_value,
                        bauart: bauart_value,
                        tank: tank_value,
                        date: date_value
                    },
                    dataType: 'json',
                    success: function(response) {
                    //console.log("the response is:");
                    //console.log(response);
        


                    /**------------response validation -> did it work? --------------- */
                    if (response['error'].length > 0) {
                        for (var i = 0; i < response['error'].length; i++) {
                            var str = response['error'][i].msg;
                            M.toast({ html: str, classes: 'red' });
                        }
                    }
                    if (response['success'].length > 0) {
                        for (var i = 0; i < response['success'].length; i++) {
                            var str = response['success'][i].msg;
                            M.toast({ html: str, classes: 'green' });
                        }
                    }
                    /**-----------------------------------------------------------------*/    
                
                    var mymodal = M.Modal.getInstance($('.modal'));
                    mymodal.close();
                    M.toast({ html: 'Auto konnte erfolgreich hinzugefügt werden', classes: 'green white-text' });
                
                    showData();
                    }
            });
     
        }
    }


    });
    
}); 