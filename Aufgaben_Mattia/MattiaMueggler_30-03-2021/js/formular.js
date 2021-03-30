// console.log("es tut!")
$('#modal-title').html(modus);
$('#elementID').html(" '" + id + "' ");



if(id>0){
    console.log(id)
$.ajax({
    type: "GET",
    url: "data/api.php?id=" + id,
    // data: "data",
    dataType: "JSON",
    success: function (response) {
        console.log(id);
        console.log(response);
        $('#artikelbezeichnung').val(response.data[0].artikel_Artikelbezeichnung);
        $('#kategorie').val(response.data[0].artikel_Kategorie);
        $('#zustand').val(response.data[0].artikel_Zustand);
        $('#preis').val(response.data[0].artikel_Preis);
        $('#bemerkungen').val(response.data[0].artikel_Bemerkungen);
        $('#id').val(response.data[0].id);

    }

});
}