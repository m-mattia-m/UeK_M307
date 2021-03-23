$(document).ready(function(){

    console.log("Document loaded")
    $('.modal').modal();
    $('.add').click( function (){
        var id = $(this).parent().attr('data-id')
        console.log(id)
        showModal(id, "Add");
    });
    $('.delete').click( function (){
        var id = $(this).parent().attr('data-id')
        console.log(id)
        showModal(id, "Delete");
    });
    $('.edit').click( function (){
        var id = $(this).parent().attr('data-id')
        console.log(id)
        showModal(id, "Edit");
    });
  });