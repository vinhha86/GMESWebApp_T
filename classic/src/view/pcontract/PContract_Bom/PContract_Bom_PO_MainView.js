Ext.define('GSmartApp.view.pcontract.PContract_Bom.PContract_Bom_PO_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_Bom_PO_MainView',
    id: 'PContract_Bom_PO_MainView',
    controller: 'PContract_Bom_PO_MainViewController',
    viewModel: {
        type: 'PContract_Bom_PO_MainViewModel'
    },
    layout: 'border',
    items: [{
        region: 'west',
        margin: 1,
        border: true,
        xtype: 'PContract_Bom_PO_VIew',
        width: '50%'
    }, {
        region: 'center',
        xtype: 'PContract_Bom_PO_SKUView',
        margin: 1,
        border: true
    }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Đóng',
            margin: 5,
            iconCls: 'x-fa fa-window-close',
            itemId: 'btnThoat'
        }]
    }]
})