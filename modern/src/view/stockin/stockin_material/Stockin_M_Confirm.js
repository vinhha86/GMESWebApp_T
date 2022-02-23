Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Confirm', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Confirm',
    id:'Stockin_M_Confirm',
    reference: 'Stockin_M_Confirm',
    viewModel: {
        type: 'Stockin_M_ConfirmViewModel'
    },
    controller: 'Stockin_M_ConfirmController',
    
    layout : 'center',
    flex: 1,
    autoSize: true,

    requires: [
        'Ext.Toast'
    ],

    items: [

    ],

    buttons: [{
        text: 'Thoát',
        // iconCls: 'x-fa fa-window-close',
        itemId: 'btnThoat'
    },{
        text: 'Xác nhận',
        // iconCls: 'x-fa fa-check',
        itemId: 'btnLuu'
    }]
})