Ext.define('GSmartApp.view.DashBoardView.PieChartMarketType', {
    extend: 'Ext.panel.Panel',
    xtype: 'PieChartMarketType',
    controller: 'PieChartMarketTypeController',
    layout: 'fit',

    items: [
    {
        xtype: 'polar',
        width: '100%',
        height: '100%',
        reference: 'chart',
        captions: {
            // title: 'Pie Charts - Basic',
            subtitle: 'Thị trường'
        },
        theme: 'default',
        insetPadding: 30,
        innerPadding: 10,
        // store: {
        //     type: 'PieChartMarketTypeStore'
        // },
        bind: {
            store: '{PieChartMarketTypeStore}'
        },
        legend: {
            docked: 'bottom'
        },
        interactions: ['rotate'],
        series: [{
            type: 'pie',
            angleField: 'sum',
            label: {
                field: 'marketName',
                calloutLine: {
                    length: 40,
                    width: 2
                    // specifying 'color' is also possible here
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }
    ]
});