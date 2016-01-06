var bigpipe = new Bigpipe();
bigpipe.ready('splashSummary', function (data) {
    mainCtr.splashSummary = data.value;
});
bigpipe.ready('sevenDaysFlash', function (data) {
    mainCtr.sevenDaysFlash = data.value;
});
bigpipe.ready('monthlyPrintLen', function (data) {
    mainCtr.monthlyPrintLen = monthlyDataFormat(data.list);
    drawSummaryChart($("#total-printlen"), '打印米数', mainCtr.monthlyPrintLen);
});
bigpipe.ready('monthlySignIn', function (data) {
    mainCtr.monthlySignIn = monthlyDataFormat(data.list);

});
bigpipe.ready('prodOrderType', function (data) {
    mainCtr.prodOrderType = data.value;
    CHART_HELPER.drawPieChart($("#prodOrderType")[0], data.value);
});
bigpipe.ready('prodOrderSize', function (data) {
    mainCtr.prodOrderSize = data.value;
    CHART_HELPER.drawPieChart($("#prodOrderSize")[0], data.value);
});
bigpipe.ready('signInActivity', function (data) {
    dataFormatForNull(data.list);
    mainCtr.signInActivity = data.list;
    CHART_HELPER.drawPieChart($("#signInActivity")[0], data.list);
});
bigpipe.ready('signInIdentity', function (data) {
    dataFormatForNull(data.list);
    mainCtr.signInIdentity = data.list;
    CHART_HELPER.drawPieChart($("#signInIdentity")[0], data.list);
});
bigpipe.ready('addressRegion', function (data) {
    data = filterAddressData(data);
    mainCtr.addressRegion = data.list;
    // 地图
    drawMapChart(data.list);
});
bigpipe.ready('patternSummary', function (data) {
    mainCtr.patternSummary = data.value;
});

bigpipe.ready('newsSummary', function (data) {
    mainCtr.newsSummary = data.value;
});

bigpipe.ready('monthlyView', function (data) {
    mainCtr.monthlyView = weeklyDataFormat(data.list);
    drawSummaryChart($("#total-view"), '花型浏览量', mainCtr.monthlyView);
});

bigpipe.ready('monthlyDownload', function (data) {
    mainCtr.monthlyDownload = weeklyDataFormat(data.list);
});

bigpipe.ready('monthlyFavor', function (data) {
    mainCtr.monthlyFavor = weeklyDataFormat(data.list);
});

bigpipe.ready('monthlyBuy', function (data) {
    mainCtr.monthlyBuy = weeklyDataFormat(data.list);
});
bigpipe.ready('monthlyRead', function (data) {
    mainCtr.monthlyRead = weeklyDataFormat(data.list);
    drawSummaryChart($("#total-read"), '资讯浏览量', mainCtr.monthlyRead);
});


var mainCtr = avalon.define({
    $id: 'MainController',

    $skipArray: [
        'monthlyPrintLen',
        'monthlySignIn',
        'prodOrderType',
        'prodOrderSize',
        'signInActivity',
        'signInIdentity',
        'addressRegion',

        'monthlyView',
        'monthlyDownload',
        'monthlyFavor',
        'monthlyBuy',
        'monthlyRead'
    ],

    monthlyPrintLen: [],
    monthlySignIn: [],
    prodOrderType:  {},
    prodOrderSize:  {},
    signInActivity: [],
    signInIdentity: [],
    addressRegion: [],

    monthlyView: [],
    monthlyDownload: [],
    monthlyFavor: [],
    monthlyBuy: [],
    monthlyRead: [],

    splashSummary: {
    totalPrintLen: 0,
        totalProdOrder: 0,
        totalSignIn: 0,
        totalIncome: 0
    },
    sevenDaysFlash:  {
        totalPrintLen: 0,
        totalProdOrder: 0,
        totalSignIn: 0,
        totalOrder: 0
    },
    patternSummary:  {
        totalPatternView: 0,
        totalPatternDownload: 0,
        totalPatternFavor: 0,
        totalPatternBuy: 0
    },
    newsSummary:  {
        totalNewsView: 0
    }
});

avalon.scan();

$(function(){
    $('.invest-month-report a[data-toggle="tab"]').on("shown.bs.tab", function (a) {
        if ($(a.target).attr("href").indexOf("TotalSignIn") > 0) {
            if ($(a.target).attr("data-drawed"))return;

            $(a.target).attr("data-drawed", !0);

            drawSummaryChart($("#total-signin"), '注册人数', mainCtr.monthlySignIn);
        }else if ($(a.target).attr("href").indexOf("TotalDownload") > 0) {
            if ($(a.target).attr("data-drawed"))return;

            $(a.target).attr("data-drawed", !0);

            drawSummaryChart($("#total-download"), '花型下载量', mainCtr.monthlyDownload);
        }else if ($(a.target).attr("href").indexOf("TotalFavor") > 0) {
            if ($(a.target).attr("data-drawed"))return;

            $(a.target).attr("data-drawed", !0);

            drawSummaryChart($("#total-favor"), '花型收藏量', mainCtr.monthlyFavor);
        }else if ($(a.target).attr("href").indexOf("TotalBuy") > 0) {
            if ($(a.target).attr("data-drawed"))return;

            $(a.target).attr("data-drawed", !0);

            drawSummaryChart($("#total-buy"), '直接打印量', mainCtr.monthlyBuy);
        }
    })
});


function dataFormatForNull(list){
    avalon.each(list, function(i, it){
        if(it['name'] == null || !it['name']){
            it['name'] = '未知';
        }
    });
}
function monthlyDataFormat(list){
    var pd = [];
    var now = new Date();
    var month = now.getMonth();

    for(var i = 23; i>=0; i--){
        var fg = false;
        var first = new Date(new Date().setDate(1));

        var m = avalon.filters.date(new Date(first.setMonth(month - i)), 'yyyy-MM');
        for(var j = 0; j < list.length; j++){
            if(list[j] && list[j].name == m){
                pd.push({
                    name: m,
                    value: list[j].value,
                    formattedValue: list[j].value
                });
                fg = true; break;
            }
        }
        if(!fg){
            pd.push({
                name: m,
                value: 0,
                formattedValue: 0
            });
        }
    }
    return pd;
}
function weeklyDataFormat(list){
    var pd = [], w = theWeek();
    var now = new Date();
    var years = now.getYear();
    if (years < 1000){
        years += 1900;
    }
    for(var i = w - 23; i <= w; i++){
        var fg = false;
        var y = years;
        var week = i;
        if(i <= 0){
            y = y-1;
            week = 52 + i;
        }
        for(var j = 0; j < list.length; j++){
            if(list[j] && Number(list[j].name) == week){
                pd.push({
                    name: y + '年' + week + '周',
                    value: list[j].value
                });
                fg = true; break;
            }
        }
        if(!fg){
            pd.push({
                name: y + '年' + week + '周',
                value: 0
            });
        }
    }
    return pd;
}

function theWeek() {
    var totalDays = 0;
    var now = new Date();
    var years = now.getYear();
    if (years < 1000){
        years += 1900;
    }
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;

    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }

    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
}