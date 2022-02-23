Ext.define('GSmartApp.view.DashBoardView.BarChartOutputAmount', {
    extend: 'Ext.panel.Panel',
    xtype: 'BarChartOutputAmount',
    controller: 'BarChartOutputAmountController',
    requires: ['Ext.chart.theme.Muted'],
    // width: 650,

    // profiles: {
    //     classic: {
    //         width: 650
    //     },
    //     neptune: {
    //         width: 650
    //     },
    //     graphite: {
    //         width: 800
    //     },
    //     'classic-material': {
    //         width: 800
    //     }
    // },
    layout: 'fit',

    items: [
    {
        xtype: 'cartesian',
        width: '100%',
        height: '100%',
        captions: {
            // title: {
            //     text: 'Số lượng ra chuyền/ngày tháng hiện tại',
            //     alignTo: 'chart'
            // },
            subtitle: {
                text: 'Năng suất trung bình ngày',
                alignTo: 'chart'
            }
        },
        theme: 'Muted',
        interactions: ['itemhighlight'],
        animation: {
            duration: 200
        },
        // store: {
        //     type: 'two-year-sales'
        // },
        bind:{
            store:'{BarChartOutputAmountStore}'
        },
        legend: {
            type: 'dom',
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['sumOutput', 'sumError', 'sumStocked'],
            grid: true,
            title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'name',
            title: {
                text: 'Phân xưởng',
                translationX: -30
            },
            grid: true
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['Ra chuyền', 'Lỗi', 'Nhập kho'],
            xField: 'name',
            yField: ['sumOutput', 'sumError', 'sumStocked'],
            label: {
                field: ['sumOutput', 'sumError', 'sumStocked'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: true,
            style: {
                inGroupGapWidth: -7
            }
        }
    }
    ]
});