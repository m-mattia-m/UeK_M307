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
            // console.log(instance);
            instance.open();
        });
    });

}

$('.save').click(function () {
    console.log("save")
    var id = $('#id').val();
    console.log('click submit');
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
        }
    })
    M.toast({html: modus + " - Saved", classes: 'green white-text'})
    getData();
});

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({html: modus + " - Canceled", classes: 'red white-text'})
})