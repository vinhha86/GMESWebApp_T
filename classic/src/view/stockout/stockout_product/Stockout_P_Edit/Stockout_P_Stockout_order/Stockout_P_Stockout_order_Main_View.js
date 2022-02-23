Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_Main_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockout_P_Stockout_order_Main_View',
    itemId: 'Stockout_P_Stockout_order_Main_View',
    controller: 'Stockout_P_Stockout_order_Main_ViewController',
    viewModel:{
        type:'Stockout_P_Stockout_order_Main_ViewModel'
    },
	layout: {
        type: 'border',
        align: 'stretch'
    },
    items: [
        {
            region: 'center',
            xtype: 'Stockout_P_Stockout_order_View',
            // width: '30%',
            margin: 1
        },
        {
            region: 'south',
            xtype: 'Stockout_P_Stockout_order_D_View',
            margin: 1,
            height: '50%',
        }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    xtype:'button',
                    text:  'Thoát',
                    margin: 3,
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    flex: 1
                },
                {
                    xtype:'button',
                    text: 'Chọn',
                    margin: 3,
                    iconCls: 'x-fa fa-check',
                    itemId:'btnSelect',
                },
            ]
        }
    ],
});
