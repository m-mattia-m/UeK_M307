$('.modal').modal();

var id;
var modus;

function showModal(id, modus) {
    this.id = id;
    this.modus = modus;
    $('data-modal').load("sites/modal.html", function () {
        $.getScript("js/modal.js", function () {
            $('#modal-title').html(modus);
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#modal'));
            instance.open();
        });
    });

}

$('.save').click(function () {
    console.log("save")
    M.toast({html: modus + " - Saved", classes: 'green white-text'})
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({html: modus + " - Canceled", classes: 'red white-text'})
})

$('#post').click(function (){
    console.log("test")
    // e.preventDefault();
    var send = true;
    var name = $('#name').val();
    var kraftstoff = $('#kraftstoff').val();
    var color = $('#color').val();
    var bauart = $('#bauart').val();
    var tank = $('#tank').val();
    
    $.ajax({
        type: "POST",
        url: "./data/api.php",
        data: {
            name: name,
            kraftstoff: kraftstoff,
            color: color,
            bauart: bauart,
            tank: tank
        },
        dataTyp: "html",
        success: function(response) {
            console.log(response)
            $('#responsePHP').append(response);
        }
    })

    console.log(name)
    console.log(kraftstoff)
    console.log(color)
    console.log(bauart)
    console.log(tank)
})