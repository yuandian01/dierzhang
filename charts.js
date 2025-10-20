// 图表管理脚本
let currentTab = 'tab-line';
let charts = {};

// 显示标签页
function showTab(tabId) {
    // 隐藏所有标签页
    document.querySelectorAll('.chart-container').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 移除所有按钮的激活状态
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的标签页
    document.getElementById(tabId).classList.add('active');
    
    // 激活对应的按钮
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');
    
    currentTab = tabId;
    
    // 初始化图表（如果尚未初始化）
    setTimeout(() => {
        initializeChart(tabId);
    }, 100);
}

// 初始化图表
function initializeChart(tabId) {
    if (charts[tabId]) return; // 图表已初始化
    
    switch(tabId) {
        case 'tab-line':
            initializeLineChart();
            break;
        case 'tab-bar':
            initializeBarChart();
            break;
        case 'tab-horizontal-bar':
            initializeHorizontalBarChart();
            break;
        case 'tab-area':
            initializeAreaChart();
            break;
        case 'tab-histogram':
            initializeHistogram();
            break;
        case 'tab-pie':
            initializePieChart();
            break;
    }
}

// 2.1 折线图
function initializeLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    const highTempData = [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31];
    const lowTempData = [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16];
    const days = Array.from({length: 15}, (_, i) => `第${i+1}天`);
    
    charts['tab-line'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: '最高气温 (°C)',
                    data: highTempData,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '最低气温 (°C)',
                    data: lowTempData,
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '未来15天气温变化趋势'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '温度 (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '天数'
                    }
                }
            }
        }
    });
}

function updateLineChart() {
    if (!charts['tab-line']) return;
    
    const highTempInput = document.getElementById('highTempData').value;
    const lowTempInput = document.getElementById('lowTempData').value;
    
    try {
        const newHighData = highTempInput.split(',').map(Number);
        const newLowData = lowTempInput.split(',').map(Number);
        
        charts['tab-line'].data.datasets[0].data = newHighData;
        charts['tab-line'].data.datasets[1].data = newLowData;
        charts['tab-line'].update();
    } catch (error) {
        alert('请输入有效的数字数据，用逗号分隔');
    }
}

// 2.2 柱形图
function initializeBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    const years = ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'];
    const gmvData = [10770, 16780, 24440, 30920, 37670, 48200, 57270];
    
    charts['tab-bar'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'GMV (亿元)',
                data: gmvData,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '阿里巴巴GMV增长趋势'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'GMV (亿元)'
                    }
                }
            }
        }
    });
}

function updateBarChart() {
    if (!charts['tab-bar']) return;
    
    const type = document.getElementById('barType').value;
    
    if (type === 'stacked') {
        // 模拟两组数据用于堆积展示
        charts['tab-bar'].data.datasets = [
            {
                label: '淘宝GMV',
                data: [8000, 12000, 18000, 22000, 26000, 32000, 38000],
                backgroundColor: 'rgba(255, 99, 132, 0.8)'
            },
            {
                label: '天猫GMV',
                data: [2770, 4780, 6440, 8920, 11670, 16200, 19270],
                backgroundColor: 'rgba(54, 162, 235, 0.8)'
            }
        ];
        charts['tab-bar'].options.scales.x = { stacked: true };
        charts['tab-bar'].options.scales.y = { stacked: true };
    } else {
        charts['tab-bar'].data.datasets = [{
            label: 'GMV (亿元)',
            data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
            backgroundColor: 'rgba(54, 162, 235, 0.8)'
        }];
        charts['tab-bar'].options.scales.x = { stacked: false };
        charts['tab-bar'].options.scales.y = { stacked: false };
    }
    
    charts['tab-bar'].update();
}

// 2.3 条形图
function initializeHorizontalBarChart() {
    const ctx = document.getElementById('horizontalBarChart').getContext('2d');
    
    const substitutionRates = [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67];
    const labels = [
        "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件", 
        "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品", 
        "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器", 
        "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务", 
        "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
    ];
    
    charts['tab-horizontal-bar'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.slice(0, 10),
            datasets: [{
                label: '网购替代率',
                data: substitutionRates.slice(0, 10),
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '商品种类网购替代率排行'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                        display: true,
                        text: '替代率'
                    }
                }
            }
        }
    });
}

function updateHorizontalBarChart() {
    if (!charts['tab-horizontal-bar']) return;
    
    const count = parseInt(document.getElementById('barCount').value);
    const sortOrder = document.getElementById('barSort').value;
    
    const substitutionRates = [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67];
    const labels = [
        "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件", 
        "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品", 
        "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器", 
        "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务", 
        "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
    ];
    
    // 创建索引数组并排序
    let indices = substitutionRates.map((_, index) => index);
    if (sortOrder === 'desc') {
        indices.sort((a, b) => substitutionRates[b] - substitutionRates[a]);
    } else {
        indices.sort((a, b) => substitutionRates[a] - substitutionRates[b]);
    }
    
    const sortedLabels = indices.slice(0, count).map(i => labels[i]);
    const sortedData = indices.slice(0, count).map(i => substitutionRates[i]);
    
    charts['tab-horizontal-bar'].data.labels = sortedLabels;
    charts['tab-horizontal-bar'].data.datasets[0].data = sortedData;
    charts['tab-horizontal-bar'].update();
}

// 2.4 面积图
function initializeAreaChart() {
    const chartDom = document.getElementById('areaChart');
    charts['tab-area'] = echarts.init(chartDom);
    
    const option = {
        title: {
            text: '物流公司费用统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['公司A', '公司B', '公司C'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            name: '费用 (万元)'
        },
        series: [
            {
                name: '公司A',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290]
            },
            {
                name: '公司B',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368]
            },
            {
                name: '公司C',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288]
            }
        ]
    };
    
    charts['tab-area'].setOption(option);
    
    // 响应式调整
    window.addEventListener('resize', function() {
        charts['tab-area'].resize();
    });
}

// 2.5 直方图
function initializeHistogram() {
    const ctx = document.getElementById('histogramChart').getContext('2d');
    
    // 生成随机数据
    const randomData = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
    
    charts['tab-histogram'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 8}, (_, i) => `${i*12.5}-${(i+1)*12.5}`),
            datasets: [{
                label: '数据分布',
                data: calculateHistogramData(randomData, 8),
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '数据分布直方图'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '频数'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '数值区间'
                    }
                }
            }
        }
    });
}

function calculateHistogramData(data, bins) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binSize = (max - min) / bins;
    const histogram = Array(bins).fill(0);
    
    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
        histogram[binIndex]++;
    });
    
    return histogram;
}

function updateHistogram() {
    if (!charts['tab-histogram']) return;
    
    const binCount = parseInt(document.getElementById('binCount').value);
    const dataType = document.getElementById('dataType').value;
    
    let data;
    if (dataType === 'normal') {
        // 生成正态分布数据
        data = Array.from({length: 100}, () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 15 + 50;
        });
    } else {
        // 生成均匀分布数据
        data = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
    }
    
    const histogramData = calculateHistogramData(data, binCount);
    const binLabels = Array.from({length: binCount}, (_, i) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binSize = (max - min) / binCount;
        return `${(min + i * binSize).toFixed(1)}-${(min + (i+1) * binSize).toFixed(1)}`;
    });
    
    charts['tab-histogram'].data.labels = binLabels;
    charts['tab-histogram'].data.datasets[0].data = histogramData;
    charts['tab-histogram'].update();
}

// 2.6 饼图
function initializePieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    const billData = [800, 100, 1000, 200, 300, 200, 200, 200];
    const categories = ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'];
    
    charts['tab-pie'] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: billData,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '支付宝月账单消费分布'
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function updatePieChart() {
    if (!charts['tab-pie']) return;
    
    const pieType = document.getElementById('pieType').value;
    
    if (pieType === 'doughnut') {
        charts['tab-pie'].type = 'doughnut';
        charts['tab-pie'].options.cutout = '50%';
    } else {
        charts['tab-pie'].type = 'pie';
        charts['tab-pie'].options.cutout = 0;
    }
    
    charts['tab-pie'].update();
}



// 页面加载完成后初始化第一个图表
document.addEventListener('DOMContentLoaded', function() {
    initializeLineChart();
    
    // 添加窗口调整大小监听
    window.addEventListener('resize', function() {
        Object.values(charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            } else if (chart && chart.update) {
                chart.update('resize');
            }
        });
    });
});