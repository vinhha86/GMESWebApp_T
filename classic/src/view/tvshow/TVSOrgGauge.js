Ext.define('GSmartApp.view.tvshow.TVSOrgGauge', {
    extend: 'Ext.container.Container',
    xtype: 'tvsorggauge',
    scrollable: true,
    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.ux.gauge.Gauge'
    ],

    layout: 'responsivecolumn',
    controller: 'tvsorggauge',
	viewModel: {
        type: 'tvsorgstatus'
    },    
    store: 'tvsorgstatus',
    listeners: {
        hide: 'onHideView'
    },

    items: [
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    height: 20,
                    html: 'TỔ 1'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org1',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org1',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org1',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }              
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 2'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org2',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org2',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org2',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 3'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org3',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org3',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org3',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 4'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org4',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org4',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org4',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 5'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org5',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org5',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org5',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 6'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org6',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org6',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org6',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 7'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org7',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org7',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org7',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 8'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org8',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org8',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org8',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 9'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org9',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org9',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org9',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 10'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org10',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org10',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org10',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 11'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org11',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org11',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org11',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 12'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org12',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org12',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org12',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 13'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org13',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org13',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org13',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 14'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org14',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org14',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org14',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 15'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org15',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org15',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org15',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
        {
            xtype: 'panel',
            style: 'border: 1px dotted blue;',
            padding: 5,
            height: 250,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            userCls: 'big-20 small-50',
            items:[
                {
                    xtype: 'label',
                    height: 20,
                    docked: 'top',
                    padding: '5 0 0 0',
                    style: 'display:inline-block;text-align:center;font-size:16px;font-weight:bold;color:darkred',
                    html: 'TỔ 16'
                },
                {
                    xtype: 'gauge',
                    id: 'gauge_org16',
                    height: 150,
                    ui: 'green',
                    value: 0,
                    textTpl: [
                        '<tpl>' +
                            '<span style="font-family: \'Comic Sans MS\'; font-size: 14px">' +
                            '{value:number("0")}%' +
                            '</span>' +
                        '</tpl>'
                    ],                    
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'label',
                    id: 'ordercode_org16',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Mã SX: '
                },          
                {
                    xtype: 'label',
                    id: 'golivedesc_org16',
                    docked: 'bottom',
                    padding: '0 0 5 0',
                    style: 'display:inline-block;text-align:center;font-size:14px;font-weight:bold;color:darkred',
                    flex: 1,
                    html: 'Giao hàng: '
                }                     
            ]
        },
    ]
    
});
