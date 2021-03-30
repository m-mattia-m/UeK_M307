$(document).ready(function () {
    console.log('Document Ready');
    $('#liste').load('./seiten/liste.html', function () {
        $.getScript("js/liste.js");
    });
    $('#form').load('./seiten/form.html', function () {
        $.getScript("js/form.js");
    });
})