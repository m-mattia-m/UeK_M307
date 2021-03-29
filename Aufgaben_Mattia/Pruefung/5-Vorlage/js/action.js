function getData() {
    $.ajax({
        type: "get",
        url: "data/api.php",
        dataType: "JSON",
        success: function (response) {
            var template = $('#template').html();
            var html = Mustache.render(template, response);
            $('tbody').html(html);

            /* Wurden von hier gelöscht */
            $('.delete').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showDelModal(id);
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
            });

        }
    });
}

function post(id) {
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
            id: id,
            name: name,
            kraftstoff: kraftstoff,
            color: color,
            bauart: bauart,
            tank: tank
        },
        dataTyp: "html",
        success: function (response) {
            console.log(response)
            $('#responsePHP').append(response);
        }
    })
    console.log(id)
    console.log(name)
    console.log(kraftstoff)
    console.log(color)
    console.log(bauart)
    console.log(tank)
}

$('#tanken').click( function(){
    // e.preventDefault();
    console.log("tanken")
    $('.tanken').click(function () {
        var id = $(this).parent().attr('data-id')
        $.ajax({
            type: "TANKEN",
            url: "data/api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                console.log("tanken success");
                console.log(id)
                showMeldung(response);
            }
        });
    });
})
