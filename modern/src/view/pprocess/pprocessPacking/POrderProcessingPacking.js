Ext.define('GSmartApp.view.pprocess.pprocessPacking.POrderProcessingPacking', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderProcessingPacking',
    reference:'POrderProcessingPacking',
    // controller: 'POrderProcessingQualityControlController',
	// viewModel: {
    //     type: 'POrderProcessingViewModel'
    // },    
    header: false,
    bodyPadding: 0,
    defaults: {
        margin:'0 0 10 0'
    },
    layout: 'hbox',

    items: [{
        // Nhập kho hoàn thiện
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Nhập kho hoàn thiện:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'p_amountstocked',
                bind: {
                    value: '{amountstocked}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'p_amountstockedsum',
                bind: {
                    value: '{amountstockedsum}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '+1',
                cls: 'btnPlus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onStockingTap'
                }
            },{
                xtype: 'button',
                text: '+10',
                cls: 'btnPlus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onStockingTap'
                }
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '-1',
                cls: 'btnMinus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onStockingTap'
                }
            },{
                xtype: 'button',
                text: '-10',
                cls: 'btnMinus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onStockingTap'
                }
            }]
        }]
    },{
        // Đóng gói
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Đóng gói:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'p_amountpacked',
                bind: {
                    value: '{amountpacked}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'p_amountpackedsum',
                bind: {
                    value: '{amountpackedsum}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '+1',
                cls: 'btnPlus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onPackingTap'
                }
            },{
                xtype: 'button',
                text: '+10',
                cls: 'btnPlus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onPackingTap'
                }
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '-1',
                cls: 'btnMinus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onPackingTap'
                }
            },{
                xtype: 'button',
                text: '-10',
                cls: 'btnMinus',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onPackingTap'
                }
            }]
        }]
    }]
});