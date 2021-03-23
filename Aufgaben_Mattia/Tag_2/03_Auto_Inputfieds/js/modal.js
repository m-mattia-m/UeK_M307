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