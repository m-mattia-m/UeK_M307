// console.log("es tut!")
$('#modal-title').html(modus);
$('#elementID').html(" '" + id + "' ");

if(id>0){
$.ajax({
    type: "GET",
    url: "data/api.php?id=" + id,
    // data: "data",
    dataType: "JSON",
    success: function (response) {
        console.log(response);
        $('#name').val(response.data[0].name);
        $('#kraftstoff').val(response.data[0].kraftstoff);
        $('#color').val(response.data[0].farbe);
        $('#tank').val(response.data[0].betankungen);
        $('#bauart').val(response.data[0].bauart);
        $('#id').val(response.data[0].id);

    }

});
}