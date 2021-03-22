$(document).ready(function(){
    console.log("Document loaded")
    $('.modal').modal();
    $('.tanken').click( function (){
        var id = $(this).parent().attr('data-id')
        // console.log(id)
        $('#elementIDTnk').text(" '" + id + "' ");
    });
    $('.edit').click( function (){
        var id = $(this).parent().attr('data-id')
        // console.log(id)
        $('#elementIDEdi').text(" '" + id + "' ");
    });
    $('.delete').click( function (){
        var id = $(this).parent().attr('data-id')
        // console.log(id)
        $('#elementIDDel').text(" '" + id + "' ");
    });
  });