$(document).ready(function() { var t = ["#4fc6e1", "#077AC3", "#f7b84b", "#f1556c", "#1abc9c"],
        c = $("#status-chart").data("colors");
    c && (t = c.split(","));

    function e() { $("#status-chart").sparkline([20, 40, 30, 10, 28], { type: "pie", width: "220", height: "220", sliceColors: t }) } var i;
    e(), $(window).resize(function(t) { clearTimeout(i), i = setTimeout(function() { e() }, 300) }) });