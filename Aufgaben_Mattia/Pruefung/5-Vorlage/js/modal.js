var id;
var modus;

$('.save').click(function () {
    console.log("save")
    post(this.id);
    M.toast({
        html: modus + " - Saved",
        classes: 'green white-text'
    });
    getData();
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({
        html: modus + " - Canceled",
        classes: 'red white-text'
    });
})
