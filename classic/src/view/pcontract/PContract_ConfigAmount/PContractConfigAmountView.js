Ext.define('GSmartApp.view.pcontract.PContractConfigAmountView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractConfigAmountView',
    id: 'PContractConfigAmountView',
    viewModel: {
        type: 'PContractConfigAmountViewModel'
    },
    controller: 'PContractConfigAmountViewController',
    reference: 'PContractConfigAmountView',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractConfigAmountStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Số lượng từ',
        dataIndex: 'amount_from',
        flex: 1,
        align: 'end',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        editor:{
            field: {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger:true,
                fieldStyle:{
                    'text-align':'right',
                    'color': 'blue'
                },
                listeners:{
                    change: 'onAmountFromChange',
                    focusleave: 'onAmountFromFocusLeave'
                }
            }
        }
    }, {
        text: 'Số lượng đến',
        dataIndex: 'amount_to',
        flex: 1,
        align: 'end',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        editor:{
            field: {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger:true,
                fieldStyle:{
                    'text-align':'right',
                    'color': 'blue'
                },
                listeners:{
                    change: 'onAmountToChange',
                    focusleave: 'onAmountToFocusLeave'
                }
            }
        }
    }, {
        text: 'Số lượng thêm',
        dataIndex: 'amount_plus',
        flex: 1,
        align: 'end',
        editor:{
            field: {
                xtype: 'numberfield',
                allowDecimals: true,
                hideTrigger:true,
                fieldStyle:{
                    'text-align':'right',
                    'color': 'blue'
                },
                listeners:{
                    change: 'onAmountPlusChange',
                    focusleave: 'onAmountPlusFocusLeave'
                }
            }
        }
    }, {
        text: 'Cách tính',
        dataIndex: 'type',
        renderer: function (value){
            switch (value){
                case 0: return 'Cộng';
                case 1: return 'Phần trăm';
                default: return '';
            }
        },
        flex: 1,
        editor:{
            field: {
                xtype: 'combobox',
                bind:{
                    store:'{PContractConfigAmountTypeStore}',
                    value: '{data.type}'
                },
                displayField: 'typeString',
                valueField: 'type',
                editable: false,
                allowBlank: false,
                listeners:{
                    change: 'onTypeChange',
                    focusleave: 'onTypeFocusLeave'
                }
            }
        }
    }, ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoi'
            },
            {
                flex: 1,
                border: false
            }
        ]
    }]
});

