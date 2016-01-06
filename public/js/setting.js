$(document).ready(function () {
    function i() {
        if (0 == $(".js-ignore-pagemark").length) {
            var i, n = function (i) {
                i.addClass("active")
            }, e = $(".sidebar-collapse .nav"), a = 0;
            0 != e.length && (e.find("li").each(function () {
                i = $(this).find("a"), -1 != window.location.href.indexOf(i.attr("href")) && "/" != i.attr("href") && (n($(this)), a = 1)
            }), 0 === a && n(e.find("li").eq(1)))
        }
    }

    function n() {
        var i = $(window).height();
        $("#page-wrapper").css("min-height", i + "px")
    }

    i(), $(window).bind("load resize click scroll", function () {
        n()
    })
});