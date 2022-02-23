Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Shipping_Main',
    id: 'PContract_PO_Shipping_Main',
    layout: 'border',
    controller: 'PContract_PO_Shipping_Main_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_PO_Shipping_Main_ViewModel'
    },
    items: [
        {
            region: 'west',
            width: '40%',
            xtype: 'PContract_PO_Shipping_Info',
            border: true,
            margin: 1,
        },
        {
            region: 'center',
            xtype: 'PContract_PO_Shipping_D',
            border: true,
            margin: 1,
        },
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})