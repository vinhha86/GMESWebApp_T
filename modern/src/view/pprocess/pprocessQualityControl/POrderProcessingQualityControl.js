Ext.define('GSmartApp.view.pprocess.pprocessQualityControl.POrderProcessingQualityControl', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderProcessingQualityControl',
    reference:'POrderProcessingQualityControl',
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
        // QC
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'QC:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'qc_amountkcs',
                bind: {
                    value: '{amountkcs}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'qc_amountkcssum',
                bind: {
                    value: '{amountkcssum}'
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
                    tap: 'onQCTap'
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
                    tap: 'onQCTap'
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
                    tap: 'onQCTap'
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
                    tap: 'onQCTap'
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
                reference: 'qc_amountkcsreg',
                // label: 'KH ngày:',
                bind: {
                    value: '{amountkcsreg}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        }]
    },{
        // Lỗi
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Lỗi:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'qc_amounterror',
                bind: {
                    value: '{amounterror}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'qc_amounterrorsum',
                bind: {
                    value: '{amounterrorsum}'
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
                    tap: 'onErrorTap'
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
                    tap: 'onErrorTap'
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
                    tap: 'onErrorTap'
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
                    tap: 'onErrorTap'
                }
            }]
        },{
            // Đạt
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'label',
                html: 'Đạt:',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'qc_amountkcscomplete',
                // label: 'Đạt:',
                bind: {
                    value: '{amountkcscomplete}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        }]
    }]
});