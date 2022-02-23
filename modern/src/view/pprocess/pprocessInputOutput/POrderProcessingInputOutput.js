Ext.define('GSmartApp.view.pprocess.pprocessInputOutput.POrderProcessingInputOutput', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderProcessingInputOutput',
    reference:'POrderProcessingInputOutput',
    // controller: 'POrderProcessingInputOutputController',
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
        // Vào chuyền
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Vào chuyền:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                cls: 'valueField',
                reference: 'io_amountinput',
                bind: {
                    value: '{amountinput}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    // change: 'onIo_amountinputChange',
                }
            },{
                xtype: 'numberfield',
                cls: 'valueField',
                reference: 'io_amountinputsum',
                bind: {
                    value: '{amountinputsum}'
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
                    tap: 'onInputTap'
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
                    tap: 'onInputTap'
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
                    tap: 'onInputTap'
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
                    tap: 'onInputTap'
                }
            }]
        }]
    },{
        // Ra chuyền
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Ra chuyền:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                cls: 'valueField',
                reference: 'io_amountoutput',
                bind: {
                    value: '{amountoutput}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                cls: 'valueField',
                reference: 'io_amountoutputsum',
                bind: {
                    value: '{amountoutputsum}'
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
                    tap: 'onOutputTap'
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
                    tap: 'onOutputTap'
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
                    tap: 'onOutputTap'
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
                    tap: 'onOutputTap'
                }
            }]
        },{
            // Kế hoạch ngày
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'label',
                html: 'KH ngày:',
                flex: 1
            },{
                xtype: 'numberfield',
                cls: 'valueField',
                reference: 'io_amounttarget',
                // label: 'KH ngày:',
                bind: {
                    value: '{amounttarget}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        }]
    },]
});