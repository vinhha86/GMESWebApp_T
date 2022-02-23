Ext.define('GSmartApp.view.pprocess.pprocessOutputTarget.POrderProcessingOutputTarget', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderProcessingOutputTarget',
    reference:'POrderProcessingOutputTarget',
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
        // Khoán ra chuyền
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Khoán ra chuyền:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'ot_amounttarget',
                bind: {
                    value: '{amounttarget}'
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
                    tap: 'onOutputTargetTap'
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
                    tap: 'onOutputTargetTap'
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
                    tap: 'onOutputTargetTap'
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
                    tap: 'onOutputTargetTap'
                }
            }]
        }]
    },{
        // Đăng ký QC
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Đăng ký QC:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'ot_amountkcsreg',
                bind: {
                    value: '{amountkcsreg}'
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
                    tap: 'onQCRegTap'
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
                    tap: 'onQCRegTap'
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
                    tap: 'onQCRegTap'
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
                    tap: 'onQCRegTap'
                }
            }]
        }]
    }]
});