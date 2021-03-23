$(function () {
    // footer with year
    var date = new Date(); 
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () { });
    });

    // add item to list
    // $('.mode-new').click(function (e) {
    //     e.preventDefault();
    //     showModal(0);
    // });
});

