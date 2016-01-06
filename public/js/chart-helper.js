avalon.config({
    loader: false//原来是true!!!!!!!!!!1
})
var CHART_HELPER = function () {
    return require.config({
        paths: {
            "echarts": "" + "/vendors/echart",
            "echarts/theme/jmb": "" + "/vendors/echart/themes/jmb",
            "echarts/theme/default": "" + "/vendors/echart/themes/default",
            "echarts/chart/line": "" + "/vendors/echart/charts/line",
            "echarts/chart/pie": "" + "/vendors/echart/charts/pie",
            "echarts/chart/bar": "" + "/vendors/echart/charts/bar",
            "echarts/chart/map": "" + "/vendors/echart/charts/map"
        }
    }), {
        drawLineChart: function (e, t, a, r) {
            var i = [], o = !1;
            a.length > 1 && (o = !0);
            for (var l = 0; l < t.length; l++)i.push({
                name: a[l],
                type: "line",
                itemStyle: {normal: {areaStyle: {type: "default"}}},
                data: t[l]
            });
            var n = {
                tooltip: {
                    trigger: "axis", formatter: function (e) {
                        return Number(e[0].value).toFixed(2) + ""
                    }
                },
                legend: {show: o, data: a},
                calculable: !0,
                xAxis: [{type: "category", boundaryGap: !1, data: r, axisLabel: {rotate: 45}}],
                grid: {y2: 50},
                yAxis: [{
                    type: "value", axisLabel: {
                        formatter: function (e) {
                            return e + ""
                        }
                    }
                }],
                series: i
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/line"], function (t, a) {
                var r = t.init(e, a);
                r.setOption(n)
            })
        }, drawBarChart: function (e, t, a, r) {
            var i = [], o = !1;
            a.length > 1 && (o = !0);
            for (var l = 0; l < t.length; l++)i.push({
                name: a[l],
                type: "bar",
                stack: "sum",
                itemStyle: {normal: {barBorderRadius: 0, label: {show: !1}}},
                data: t[l]
            });
            var n = {
                tooltip: {
                    trigger: "axis", axisPointer: {type: "shadow"}, formatter: function (e) {
                        var t = [];
                        return e[0] && t.push(e[0].name + "<br/>" + e[0].seriesName + " : " + Number(e[0].value).toFixed(2) + ""), e[1] && t.push(e[1].seriesName + " : " + (e[1].value).toFixed(2) + ""), t.join("<br>")
                    }
                },
                legend: {show: !1, orient: "horizontal", x: "center", y: "top", selectedMode: !1, data: a},
                calculable: !0,
                xAxis: [{type: "category", data: r, axisLabel: {rotate: 45}}],
                grid: {y2: 50},
                yAxis: [{
                    type: "value", axisLabel: {
                        formatter: function (e) {
                            return parseFloat(e).toFixed(2) + ""
                        }
                    }
                }],
                series: i
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/bar"], function (t, a) {
                var r = t.init(e, a);
                r.setOption(n)
            })
        }, drawPieChart: function (e, t) {
            var a = [], r = 0;
            if (t.length > 6)for (var i = 0; i < t.length; i++)5 > i ? a.push(t[i]) : (r += parseFloat(t[i].value), i === t.length - 1 && a.push({
                name: "其他",
                value: r
            })); else a = t;
            for (var o = [], i = 0; i < a.length; i++)o.push(a[i]);
            var l = {
                tooltip: {trigger: "item", formatter: "{b} : {d}%"},
                legend: {orient: "vertical", x: "right", data: o},
                calculable: !0,
                series: [{
                    name: "访问来源",
                    type: "pie",
                    radius: ["60%", "90%"],
                    center: ["40%", "50%"],
                    itemStyle: {normal: {label: {show: !1}, labelLine: {show: !1}}, emphasis: {label: {show: !1}}},
                    data: a
                }]
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/pie"], function (t, a) {
                var r = t.init(e, a);
                r.setOption(l)
            })
        }, drawMatrixPieChart: function (e, t, a) {
            for (var r = [], i = 0; i < a.length; i++)r.push(a[i].name);
            var o = {
                tooltip: {trigger: "item", formatter: "{b} : {d}%"},
                legend: {orient: "vertical", x: "right", data: r},
                calculable: !1,
                series: [{
                    type: "pie",
                    selectedMode: "single",
                    radius: [0, "50%"],
                    center: ["40%", "50%"],
                    itemStyle: {normal: {label: {position: "inner"}, labelLine: {show: !1}}},
                    data: t
                }, {
                    type: "pie",
                    radius: ["60%", "90%"],
                    center: ["40%", "50%"],
                    itemStyle: {normal: {label: {show: !1}, labelLine: {show: !1}}, emphasis: {label: {show: !1}}},
                    data: a
                }]
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/pie"], function (t, a) {
                var r = t.init(e, a);
                r.setOption(o)
            })
        }, drawMapChart: function (e, t, a, r) {
            for (var i = [], o = 0; o < t.length; o++)i.push({
                name: a[o],
                type: "map",
                mapType: "china",
                roam: !1,
                itemStyle: {normal: {label: {show: !0}}, emphasis: {label: {show: !0}}},
                data: t[o]
            });
            var l = {
                tooltip: {
                    trigger: "item", formatter: function (e) {
                        var t;
                        return t = "-" != e.value ? (e.value).toFixed(0) : 0, e.name + "<br/>" + t + ""
                    }
                },
                dataRange: {show: !1, min: 0, max: r, x: "left", y: "bottom", text: ["高", "低"], calculable: !0},
                series: i
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/map"], function (t, a) {
                var r = t.init(e, a);
                r.clear(), r.setOption(l)
            })
        }, drawMatrixMapChart: function (e, t, a, r) {
            for (var i = [{
                name: "全国",
                type: "map",
                roam: !1,
                hoverable: !1,
                mapType: "china",
                itemStyle: {
                    normal: {
                        borderColor: "rgba(100,149,237,1)",
                        borderWidth: .5,
                        areaStyle: {color: "#1b1b1b"}
                    }
                },
                data: [],
                geoCoord: {
                    "上海": [121.4648, 31.2891],
                    "新疆": [87.9236, 43.5883],
                    "甘肃": [103.5901, 36.3043],
                    "北京": [116.4551, 40.2539],
                    "江苏": [118.8062, 31.9208],
                    "广西": [108.479, 23.1152],
                    "江西": [116.0046, 28.6633],
                    "安徽": [117.29, 32.0581],
                    "内蒙古": [111.4124, 40.4901],
                    "黑龙江": [127.9688, 45.368],
                    "天津": [117.4219, 39.4189],
                    "山西": [112.3352, 37.9413],
                    "广东": [113.5107, 23.2196],
                    "四川": [103.9526, 30.7617],
                    "西藏": [91.1865, 30.1465],
                    "云南": [102.9199, 25.4663],
                    "浙江": [119.5313, 29.8773],
                    "湖北": [114.3896, 30.6628],
                    "辽宁": [123.1238, 42.1216],
                    "山东": [117.1582, 36.8701],
                    "海南": [110.3893, 19.8516],
                    "河北": [114.4995, 38.1006],
                    "福建": [119.4543, 25.9222],
                    "青海": [101.4038, 36.8207],
                    "陕西": [109.1162, 34.2004],
                    "贵州": [106.6992, 26.7682],
                    "河南": [113.4668, 34.6234],
                    "重庆": [107.7539, 30.1904],
                    "宁夏": [106.3586, 38.1775],
                    "吉林": [125.8154, 44.2584],
                    "湖南": [113.0823, 28.2568]
                }
            }], o = 0; o < t.length; o++) {
                for (var l = [], n = 0; n < t[o].length; n++)l.push(t[o][n][1]);
                i.push({
                    name: r[o],
                    type: "map",
                    mapType: "china",
                    data: [],
                    markLine: {
                        smooth: !0,
                        effect: {show: !0, scaleSize: 1, period: 30, color: "#fff", shadowBlur: 10},
                        itemStyle: {normal: {borderWidth: 1, lineStyle: {type: "solid", shadowBlur: 10}}},
                        data: t[o]
                    },
                    markPoint: {
                        symbol: "emptyCircle",
                        symbolSize: function () {
                            return 10
                        },
                        effect: {show: !0, shadowBlur: 0},
                        itemStyle: {normal: {label: {show: !1}}, emphasis: {label: {position: "top"}}},
                        data: l
                    }
                })
            }
            for (var s = {}, h = !0, c = 0; c < r.length; c++)0 !== c && (h = !1), s[r[c]] = h;
            var m = {
                backgroundColor: "#1b1b1b",
                tooltip: {
                    trigger: "item", formatter: function (e) {
                        var t = "";
                        return t = "-" != e[2] ? e[1] + " " + (e[3]).toFixed(0) + "" : e[1]
                    }
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: r,
                    selectedMode: "single",
                    selected: s,
                    textStyle: {color: "#fff"}
                },
                dataRange: {show: !1, min: 0, max: 1e7, calculable: !0, textStyle: {color: "#fff"}},
                series: i
            };
            require(["echarts", "echarts/theme/jmb", "echarts/chart/map"], function (t, a) {
                var r = t.init(e, a);
                r.clear(), r.setOption(m)
            })
        }
    }
}();