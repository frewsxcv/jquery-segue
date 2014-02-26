$(function () {
    $("#ex1 > p > button").click(function () {
        $("#ex1 *").segue();
    });

    $("#ex2 > p > button").click(function () {
        $("#ex2 *").segue();
    });
});
