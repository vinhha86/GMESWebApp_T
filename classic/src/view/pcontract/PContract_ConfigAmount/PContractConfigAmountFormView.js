Ext.define('GSmartApp.view.pcontract.PContractConfigAmountFormView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractConfigAmountFormView',
    id:'PContractConfigAmountFormView',
    controller: 'PContractConfigAmountFormViewController',
    viewModel: {
        type: 'PContractConfigAmountViewModel'
    },
    layout: 'vbox',
    amountFrom: 0,
    items: [{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'numberfield',
            margin: 5,
            fieldLabel: 'Số lượng từ',
            reference: 'amount_from',
            allowBlank: false,
            minValue: 1,
            minText: 'Số lượng từ nhỏ nhất là 1',
            nanText: 'Sai định dạng',
            blankText: 'Không được để trống',
            allowDecimals: false,
            hideTrigger:true,
            fieldStyle:{
                'text-align':'right',
                // 'color': 'blue'
            },
            flex:1,
            labelWidth: 100
        },{
            xtype:'numberfield',
            margin: 5,
            fieldLabel: 'Số lượng đến',
            reference: 'amount_to',
            allowBlank: false,
            minValue: 1,
            minText: 'Số lượng đến nhỏ nhất là 1',
            nanText: 'Sai định dạng',
            blankText: 'Không được để trống',
            allowDecimals: false,
            hideTrigger:true,
            fieldStyle:{
                'text-align':'right',
                // 'color': 'blue'
            },
            flex:1,
            labelWidth: 100
        }]
    },{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'numberfield',
            margin: 5,
            fieldLabel: 'Số lượng thêm',
            reference: 'amount_plus',
            allowBlank: false,
            allowDecimals: true,
            minValue: 0,
            minText: 'Số lượng thêm nhỏ nhất là 0',
            negativeText: 'Số lượng thêm nhỏ nhất là 0',
            nanText: 'Sai định dạng',
            blankText: 'Không được để trống',
            hideTrigger:true,
            fieldStyle:{
                'text-align':'right',
                // 'color': 'blue'
            },
            flex:1,
            labelWidth: 100
        },{
            xtype:'combobox',
            margin: 5,
            bind:{
                store:'{PContractConfigAmountTypeStore}'
            },
            value: 0,
            fieldLabel: 'Cách tính',
            reference: 'type',
            displayField: 'typeString',
            valueField: 'type',
            queryMode: 'local',
            anyMatch: true,
            editable: false,
            allowBlank: false,
            flex:1,
            labelWidth: 100
        }]
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})