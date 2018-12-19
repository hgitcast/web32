$(function () {
    // 三大步
    var myChart1 = echarts.init(document.querySelector('.one'));

    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数', "销量", "收藏"]
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '销量',
            type: 'bar',
            data: [20, 10, 68, 34, 10, 2]
        },
        {
            name: '收藏',
            type: 'bar',
            data: [10, 18, 48, 55, 32, 9]
        }]
    };

    myChart1.setOption(option);



})
$(function () {
    // 三大步

    var myChart2 = echarts.init(document.querySelector('.two'));

    var option = {
        title: {
            text: '热门品牌',
            subtext: '2018 权威统计',
            x: 'center',
            textStyle: {
                color: "#252525",
                fontSize: 30
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪达斯', '特步', '老北京', '361°']
        },
        series: [
            {
                name: '热门品牌',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 451, name: '耐克' },
                    { value: 321, name: '阿迪达斯' },
                    { value: 222, name: '特步' },
                    { value: 678, name: '老北京' },
                    { value: 330, name: '361°' }
                ],
                // 控制额外的阴影样式效果
                itemStyle: {
                    emphasis: {
                        shadowBlur: 100,
                        shadowOffsetX: 20,
                        shadowColor: 'gold'
                    }
                }
            }
        ]
    };

    myChart2.setOption(option);



})