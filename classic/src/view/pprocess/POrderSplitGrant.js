Ext.define('GSmartApp.view.pprocess.POrderSplitGrant', {
    extend: 'Ext.window.Window',
    xtype: 'pordersplitgrant',
    controller: 'pordersplitgrant',
    title: 'Chuyển/Tách chuyền',
    viewModel: 'pordersplitgrant',
    width: 640,
    height: 230,
    layout: 'hbox',
    //resizable: true,
    modal: true,
    items:[{
        xtype: 'panel',
        bodyPadding: 10,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            readOnly: true,
            textAlign: 'right',
            anchor: '100%',            
            fieldLabel: 'Tổ SX:',
            labelAlign: 'left',
            labelWidth: 120,
            bind: '{sourceorgid_link}',
        },{
            xtype: 'textfield',
            readOnly: true,
            textAlign: 'right',
            anchor: '100%',            
            fieldLabel: 'Mã SX:',
            labelAlign: 'left',
            labelWidth: 120,
            bind: '{ordercode}',
        },{
            xtype: 'numberfield',
            readOnly: true,
            anchor: '100%',            
            fieldLabel: 'Cắt TT:',
            labelAlign: 'left',
            labelWidth: 120,
            bind: '{amountorigin}'
        }]
    },{
        xtype: 'panel',
        bodyPadding: 10,
        layout: 'vbox',
        items: [{
            xtype: 'combobox',
            id: 'cbo_splitorg',
            reference:'cbo_splitorg',
            //margin: '0 5 0 5',
            fieldLabel: 'Tách sang Tổ SX:',
            labelAlign: 'left',
            labelWidth: 110,            
            store: {
                type: 'orgtosx'
            },
            displayField: 'name',
            valueField: 'id',
            bind: '{splittoorgid_link}'
        },{
            xtype: 'numberfield',
            reference:'num_amountsplit',
            minValue: 0,
            anchor: '100%',            
            fieldLabel: 'SL tách:',
            labelAlign: 'left',
            labelWidth: 110,
            bind: '{amountsplit}',
            listeners: {
                change: 'onSplitAmountChange'
            }
        }]
    }],
    fbar: [{
        minWidth: 80,
        text: 'Xác nhận',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],
    listeners:{
        activate: 'onActivate'
    }
});
