Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_POLINE_Main',
    itemId: 'Stockin_POLINE_Main',
    controller: 'Stockin_POLINE_Main_Controller',
    viewModel: {
        type: 'Stockin_POLINE_Main_ViewModel'
    },
	layout: {
        type: 'border',
        align: 'stretch'
    },
    items: [
        {
            region: 'center',
            xtype: 'Stockin_POLINE',
            width: '60%',
            margin: 1,
            border: true,
            bind: {
                hidden: '{isDsPOLineHidden}'
            },
        },
        {
            region: 'east',
            xtype: 'Stockin_POLINE_Sku',
            width: '40%',
            margin: 1,
            border: true
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        style: "background-color : white;",
        bind: {
            hidden: '{isDsPOLineHidden}'
        },
        items: [{
            xtype: 'textfield',
            itemId: 'POBuyer_txtField',
            fieldLabel: 'PO Buyer',
            margin: 5,
            bind: {
                value: '{po_buyer}'
            },
            enableKeyEvents : true,
        }, {
            xtype: 'button',
            itemId: 'btnTimKiem',
            tooltip: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            margin: 5
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1,
            border: false
        }, {
            xtype: 'button',
            text: 'Chọn',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-check'
        }, {
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});
