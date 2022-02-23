Ext.define('GSmartApp.view.charts.Charts', {
    extend: 'Ext.container.Container',
    xtype: 'charts',

    requires: [
        'GSmartApp.view.charts.Area',
        'GSmartApp.view.charts.Bar',
        'GSmartApp.view.charts.ChartsModel',
        'GSmartApp.view.charts.Gauge',
        'GSmartApp.view.charts.Pie3D',
        'GSmartApp.view.charts.Polar',
        'GSmartApp.view.charts.Stacked',
        'Ext.ux.layout.ResponsiveColumn'
    ],

    viewModel: {
        type: 'charts'
    },

    layout: 'responsivecolumn',

    defaults: {
        defaults: {
            animation : !Ext.isIE9m && Ext.os.is.Desktop
        }
    },

    items: [
        {
            xtype: 'chartsareapanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspie3dpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspolarpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsstackedpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsbarpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsgaugepanel',
            userCls: 'big-50 small-100'
        }
    ]
});
