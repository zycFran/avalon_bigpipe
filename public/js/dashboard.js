//function drawSummaryChart(a) {
//    for (var r = [], t = [], e = ["打印米数"],
//             n = [],
//             i = [0, 0, 0, 0, 0, 0],
//             s = a.monthlyPrintLen,
//             o = a.monthlySignIn,
//             u = 0;
//         u < s.length; u++) {
//        r.push(s[u].name);
//        n.push(s[u].value);
//    }
//    for (var u = 0; u < o.length; u++) {
//        i.push(o[u].value);
//    }
//    for (var u = 0; u < s.length; u++) {
//        t.push(n[u] + i[u]);
//    }
//    CHART_HELPER.drawBarChart($("#total-printlen")[0], [n], e, r);
//
//    $('.invest-month-report a[data-toggle="tab"]').on("shown.bs.tab", function (a) {
//        if ($(a.target).attr("href").indexOf("TotalSignIn") > 0) {
//            if ($(a.target).attr("data-drawed"))return;
//
//            $(a.target).attr("data-drawed", !0);
//            e = ["注册人数"];
//            CHART_HELPER.drawBarChart($("#total-signin")[0], [i], e, r);
//        }
//    })
//}

function drawSummaryChart(dom, name, data){
    for (var r = [],
             n = [],
             s = data,
             u = 0;
         u < s.length; u++) {
        r.push(s[u].name);
        n.push(s[u].value || '');
    }
    CHART_HELPER.drawBarChart(dom[0], [n], [name], r);
}

function drawPieCharts(a) {

    // 生产单产品分布
    CHART_HELPER.drawPieChart($("#prodOrderType")[0], a.prodOrderType);
    // 定制面料长度分布
    CHART_HELPER.drawPieChart($("#prodOrderSize")[0], a.prodOrderSize);
    // 注册来源分布
    CHART_HELPER.drawPieChart($("#signInActivity")[0], a.signInActivity);
    // 注册身份分布
    CHART_HELPER.drawPieChart($("#signInIdentity")[0], a.signInIdentity);

    ////投资人年龄/性别分布
    //CHART_HELPER.drawMatrixPieChart($("#invest-user")[0], a.investUserSex, a.InvestUserAge);
    //
    //// 投资额渠道分布
    //CHART_HELPER.drawPieChart($("#invest-channel")[0], a.investChannel);
}
function drawPlatformMarginChart(a) {
    for (var r = a.platformMargin, t = [], e = [], n = [], i = ["平台保证金"], s = 0; s < r.length; s++){
        e.push(r[s].value);
        n.push(r[s].name);
    }
    t.push(e);
    CHART_HELPER.drawLineChart($("#margins")[0], t, i, n);
}

function drawMapChart(data) {
    var t = [], e = !0;

    var n = [];
    n.push(data);
    var i = n[0][0].value;

    $("#Map").show(function () {
        CHART_HELPER.drawMapChart($("#map-chart")[0], n, t, i);
        appendTopTen($("#Map"), n, e);
    }).addClass("active");
}

function appendTopTen(a, r, t) {
    var e = a.find(".topTen"), n = "<tr><td style='width:20px'>{0}</td><td>{1}</td><td class='text-right num'>{2}</td></tr>";
    e.html("");
    for (var i = 0; 10 > i; i++) {
        var s = n.replace("{0}", i + 1).replace("{1}", r[0][i].name).replace("{2}", t ? Number(r[0][i].value) : r[0][i].value);
        e.append(s)
    }
}
function amountFormat(a, r) {
    r = r > 0 && 20 >= r ? r : 2, a = parseFloat((a + "").replace(/[^\d\.-]/g, "")).toFixed(r) + "";
    var e = a.split(".")[0].split("").reverse(), n = a.split(".")[1];
    for (var t = "", i = 0; i < e.length; i++)t += e[i] + ((i + 1) % 3 == 0 && i + 1 != e.length ? "," : "");
    return t.split("").reverse().join("") + "." + n
}


function filterAddressData(data){
    data.list.forEach(function(it){
        if(it['name']){
            if(it['name'].indexOf('省') >= 0){
                it['name'] = it['name'].slice(0, it['name'].length - 1);
            }else if(it['name'].indexOf('新疆') >= 0){
                it['name'] = '新疆'
            }else if(it['name'].indexOf('内蒙') >= 0){
                it['name'] = '内蒙'
            }else if(it['name'].indexOf('北京') >= 0){
                it['name'] = '北京'
            }else if(it['name'].indexOf('重庆') >= 0){
                it['name'] = '重庆'
            }else if(it['name'].indexOf('上海') >= 0){
                it['name'] = '上海'
            }
        }
    });

    return data;
}