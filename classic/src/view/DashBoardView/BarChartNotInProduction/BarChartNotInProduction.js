Ext.define('GSmartApp.view.DashBoardView.BarChartNotInProduction', {
    extend: 'Ext.panel.Panel',
    xtype: 'BarChartNotInProduction',
    controller: 'BarChartNotInProductionController',
    requires: ['Ext.chart.theme.Muted'],
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
                text: 'Chờ sản xuất',
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
            store:'{BarChartNotInProductionStore}'
        },
        legend: {
            type: 'dom',
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['sumChuaPhanChuyen', 'sumChuaSanXuat'],
            grid: true,
            // title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'orgCode',
            // title: {
            //     text: 'Phân xưởng',
            //     translationX: -30
            // },
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            },
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['Chưa phân chuyền', 'Chưa sản xuất'],
            xField: 'orgCode',
            yField: ['sumChuaPhanChuyen', 'sumChuaSanXuat'],
            label: {
                field: ['sumChuaPhanChuyen', 'sumChuaSanXuat'],
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