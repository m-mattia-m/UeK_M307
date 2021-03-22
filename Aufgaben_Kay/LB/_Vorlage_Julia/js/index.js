$(function() {
    $('main').load("sites/liste.html", function() {
        $.getScript("js/liste.js");
    });
});