
var express = require('express');
var router = express.Router();
var ejs = require('ejs');

var data = {};

var base = "localhost:8080/";

var apis = [
    {
        explain: '平台数据总览',
        name: 'splashSummary',
        url: base + 'statistics/overview'
    },
    {
        explain: '平台7日数据播报',
        name: 'sevenDaysFlash',
        url: base + 'statistics/overview/week'
    },
    {
        explain: '按月统计打印米数',
        name: 'monthlyPrintLen',
        url: base + 'statistics/printLen/month'
    },
    {
        explain: '按月统计打注册人数',
        name: 'monthlySignIn',
        url: base + 'statistics/signIn/month'
    },
    //{
    //    explain: '生产单产品分布',
    //    name: 'prodOrderType',
    //    url: base + 'statistics/prodOrder/type'
    //},
    //{
    //    explain: '定制面料长度分布',
    //    name: 'prodOrderSize',
    //    url: base + 'statistics/prodOrder/size'
    //},
    {
        explain: '统计注册来源',
        name: 'signInActivity',
        url: base + 'statistics/signIn/activity'
    },
    {
        explain: '统计注册身份',
        name: 'signInIdentity',
        url: base + 'statistics/signIn/identity'
    },
    {
        explain: '收货地域分布',
        name: 'addressRegion',
        url: base + 'statistics/address/region'
    },

    {
        explain: '花型数据总揽',
        name: 'patternSummary',
        url: base + 'statistics/pattern/overview'
    },
    {
        explain: '资讯数据总揽',
        name: 'newsSummary',
        url: base + 'statistics/news/overview'
    },
    {
        explain: '按周统计花型浏览量',
        name: 'monthlyView',
        url: base + 'statistics/pattern/view/month'
    },
    {
        explain: '按周统计花型下载量',
        name: 'monthlyDownload',
        url: base + 'statistics/pattern/download/month'
    },
    {
        explain: '按周统计花型收藏量',
        name: 'monthlyFavor',
        url: base + 'statistics/pattern/favor/month'
    },
    {
        explain: '按周统计花型打印量',
        name: 'monthlyBuy',
        url: base + 'statistics/pattern/buy/month'
    },
    {
        explain: '按周统计资讯浏览量',
        name: 'monthlyRead',
        url: base + 'statistics/news/read/month'
    }
];

// 得到一个 eventproxy 的实例
//var eventproxy = require('eventproxy');
var superagent = require('superagent');

var total = apis.length;
router.get('/', function (req, res) {
    res.render('index', {
        title: "米印平台数据"
    }, function (err, str) {
        res.write(str);
    });

    total = apis.length;
    apis.forEach(function (api) {
        superagent.get(api.url).end(function (err, re) {
            console.log('fetch ' + api.name + ' successful');
            res.write('<script>bigpipe.set("' + api.name + '", ' + re.text + ');</script>');
            total--;
            if (total <= 0) {
                console.log("end");
                res.end();
            }
        });
    });
});
module.exports = router;