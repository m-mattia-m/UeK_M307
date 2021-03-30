$('.modal').modal();

// $('data-table').data('limit', 10); // set default table limit

// wenn 0 werden alle Daten ausgelesen -> Default limit
var limit = 10;

// sort buttons (has to do with limiting the table)
$('button.sort').click(function (e) {
    e.preventDefault();
    limit = Number($(this).data('value'));
    console.log(limit)
    $('data-table').data('limit', limit); // persistent limit even after reload of table
    getData(limit);
});

$('.add').click(function () {
    var id = "addNewRecord"
    console.log(id)
    showModal(id, "Add");
});

// actionTablePosition = $('#actionTable').position()
// console.log("Position")
// console.log(actionTablePosition)
// console.log(actionTablePosition.top)
// console.log(actionTablePosition.left)
// $('#content').html('<a class="modal-trigger add" href="#modal" id="fixedButton"><i class="material-icons tableHover add">add</i></a>').css({"top": actionTablePosition.top, "left": actionTablePosition.left});
// $('#fixedButton').css({"color" : "blue"});
// // "top": actionTablePosition.top, "left": actionTablePosition.left




$("table.data-table").tablesorter();


getData();

function getData() {

    console.log("load Data")

    $.ajax({
        type: "GET",
        // url: "data/api.php?limit=" + limit,
        url: "data/api.php?limit=0",
        dataType: "JSON",
        success: function (response) {
            var template = $('#template').html();
            var html = Mustache.render(template, response);
            $('tbody').html(html);

            function showMeldung(response) {
                if (response['error']) {
                    console.error(response['error']);
                }
                if (response['success']) {
                    console.warn(response['success'])
                }
            }

            /* Table sorter trigger Update */
            $("table.data-table").trigger('update');
            
            /* Pagination */
            $('#ul-pagination').html('');
            $('#carTable').pageMe({
                pagerSelector: '#ul-pagination',
                activeColor: 'blue',
                prevText: 'prev',
                nextText: 'next',
                showPrevNext: true,
                hidePageNumbers: false,
                perPage: limit,
            });

            $('.delete').click(function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id')
                showDelModal(id);
                console.log(id)

            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id')
                $.ajax({
                    type: "TANKEN",
                    url: "data/api.php?id=" + id,
                    dataType: "JSON",
                    success: function (response) {
                        console.log("tanken success");
                        console.log(id)
                        showMeldung(response);
                        getData();
                    }
                });

            });

        }
    });
}


// $('#ul-pagination').html('');
// $('#carTable').pageMe({
//     pagerSelector: '#ul-pagination',
//     activeColor: 'blue',
//     prevText: 'prev',
//     nextText: 'next',
//     showPrevNext: true,
//     hidePageNumbers: false,
//     perPage: 5
// });