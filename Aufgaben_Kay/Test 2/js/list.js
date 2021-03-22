$('data-table').data('limit', 10); // set default table limit
getData(); // initial data fetch
$("table.data-table").tablesorter(); // initialize tablesorter (plugin used to show an number of datasets)

// sort buttons (has to do with limiting the table)
$('button.sort').click(function (e) {
    e.preventDefault();
    var limit = Number($(this).data('value'));
    $('data-table').data('limit', limit); // persistent limit even after reload of table
    getData(limit);
});

// funktioniert noch nicht
$('.checkBox').click(function (e) {
    e.preventDefault();
});


function getData() {
    $.ajax({
        type: "GET",
        url: "data/api.php?action=get&limit=0", // limit = 0 -> gets all
        data: "",
        dataType: "json",
        success: function (data) {
            var template = $('#list').html(); // template for new records
            var html = Mustache.render(template, data); // render html with data
            $('#table-body').html(html); // assign to table
            // pagination
            $('#ul-pagination').html(''); // reset the existing pagination
            $('#table-body').pageMe({
                pagerSelector: '#ul-pagination',
                activeColor: 'grey darken-3',
                prevText: 'Previous',
                nextText: 'Next',
                showPrevNext: true,
                hidePageNumbers: false,
                perPage: Number($('data-table').data('limit'))
            });

            $("table.data-table").trigger('update'); // tablesorter trigger update
            showResponseToasts(data); // show possible errors

            $('.mode-edit').click(function (e) {
                e.preventDefault();
                let id = $(this).parent().data('id');
                showModal(id);
            });

            $('.mode-delete').click(function (e) {
                e.preventDefault();
                let id = $(this).parent().data('id');
                showDeleteModal(id);
            });

            // checkboxes
            $('#table-row .stat').each(function () {
                if ($(this).html() == 1) {
                    $(this).parent().find('.checkBox').prop('checked', true);

                } else {
                    $(this).parent().find('.checkBox').prop('checked', false);
                }
            });
            //This isn't working now
            $('.checkBox').click(function (e) {
                e.preventDefault();
                let id = $(this).parent().data('id');
                let name = $(this).parent().data('name');
                let datum = $(this).parent().data('datum');
                let preis = $(this).parent().data('preis');
                let kategorie = $(this).parent().data('kategorie');
                let rating = $(this).parent().data('rating');
                $.ajax({
                    type: "POST",
                    url: "data/api.php?action=update&id=" + id,
                    data: {
                        'name': name,
                        'datum': datum,
                        'preis': preis,
                        'kategorie': kategorie,
                        'rating': rating,
                        'stat': 1
                    },
                    dataType: "json",
                    success: function (response) {
                        showResponseToasts(response);
                        getData();
                    }
                });
            });
            M.updateTextFields();
        }
    });

}