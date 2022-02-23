Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart_Chart', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrderStatusChart_Chart',
    controller: 'POrderStatusChart_ChartController',
    requires: ['Ext.chart.theme.Muted'],
    layout: 'fit',

    items: [
    {
        xtype: 'cartesian',
        width: '100%',
        height: '100%',
        // captions: {
        //     // title: {
        //     //     text: 'Số lượng ra chuyền/ngày tháng hiện tại',
        //     //     alignTo: 'chart'
        //     // },
        //     subtitle: {
        //         text: 'Trạng thái lệnh',
        //         alignTo: 'chart'
        //     }
        // },
        theme: 'Muted',
        interactions: ['itemhighlight'],
        // interactions: [
        //     {
        //         type: 'itemhighlight'
        //     },
        //     {
        //         type: 'iteminfo',
        //         tooltip: {
        //             renderer: 'onEditTipRender'
        //         },
        //     }
        // ],
        animation: {
            duration: 200
        },
        bind:{
            store:'{POrderStatusChartStore}',
            captions: '{captions}'
        },
        // legend: {
        //     type: 'dom',
        //     docked: 'bottom'
        // },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['sum'],
            grid: true,
            // maximum: 1,
            // minimum: 1,
            // title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'statusName',
            // title: {
            //     text: 'Phân xưởng',
            //     translationX: -30
            // },
            grid: true,
            label: {
                rotate: {
                    degrees: -20
                }
            },
        }],
        series: {
            type: 'bar',
            stacked: false,
            title: ['Số lượng'],
            xField: 'statusName',
            yField: ['sum'],
            label: {
                field: ['sum'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: false,
            style: {
                inGroupGapWidth: -7
            },
            tooltip: {
                trackMouse: false,
                // width: 140,
                // height: 28,
                renderer: 'onTooltipRender',
                // renderer: function (toolTip, record, ctx) {
                //     toolTip.setHtml(record.get('sum'));
                // },
            },
            renderer: 'onBarRender',
        }
    }
    ]
});