$(function () {
    // footer with year
    var date = new Date(); 
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () { });
    });

    $('#delModal').modal();
    $('#modal').modal();
    
    $('#sichern').click(function () {
        console.log("xxxxxxxxxxx")
        var id = $('#id').val();
        // console.log(id);
        // console.log('click submit');
        var send = true;
        var name = $('#name').val();
        var tank = $('#tank').val();

        // if(preg_match('/[\'%&<>]/', $tank)){
        //     return false;
        // }
        
        if (tank < 0) {
            send = false;
            M.toast({ html: 'Gültigen Wert bitte eingeben', classes: 'red black-text' });
        }
        if (name.length < 3  && name.length > 255) {
            console.log('zu klein oder zu gross (min. 3 max. 255 Zeichen)');
            $('#name').addClass('orange lighten-4');
            M.toast({ html: 'Name zu klein oder zu gross (min. 3 max. 255 Zeichen)', classes: 'red black-text' });
            send = false;
        }

        if(send){
            $.ajax({
                type: "POST",
                url: "data/api.php?id=" + id,
                data: {
                    name: $('#name').val(),
                    kraftstoff: $('#kraftstoff').val(),
                    color: $('#color').val(),
                    bauart: $('#bauart').val(),
                    tank: $('#tank').val()
                },
                dataType: "JSON",
                success: function (response) {
                    console.log('post success');
                    console.log(response);
                    console.log($('#name').val());
                    console.log($('#kraftstoff').val());
                    console.log($('#color').val());
                    console.log($('#bauart').val());
                    console.log($('#tank').val());
                    M.toast({html: modus + " - Saved", classes: 'green white-text'})
                    getData();
                }
            })
            getData();
        }

    });
    
    $('.cancel').click(function () {
        console.log("cancel")
        M.toast({html: modus + " - Canceled", classes: 'red white-text'})
    })

    $('.deleteToast').click(function () {
        console.log("deleted")
        $.ajax({
            type: "DELETE",
            url: "data/api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                console.log("delete success");
                getData();
            }
        });
        M.toast({html: "Successfull Deleted", classes: 'green white-text'})
    })
    
});

var id;
var modus;

function showDelModal(id) {
    this.id = id;
    this.modus = "Delete";
    $('#delModal-title').html("Delete");
    $('#elementID').html(" '" + id + "' ");
}

function showModal(id, modus) {
    this.id = id;
    this.modus = modus;
    $('#modal-content').load("sites/formular.html", function () {
        $.getScript("js/formular.js")
    });

}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }