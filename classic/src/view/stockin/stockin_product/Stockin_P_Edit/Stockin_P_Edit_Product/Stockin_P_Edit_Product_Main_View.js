Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_Main_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockin_P_Edit_Product_Main_View',
    itemId: 'Stockin_P_Edit_Product_Main_View',
    controller: 'Stockin_P_Edit_Product_Main_ViewController',
    viewModel:{
        type:'Stockin_P_Edit_Product_Main_ViewModel'
    },
	layout: {
        type: 'border',
        align: 'stretch'
    },
    items: [
        {
            region: 'west',
            xtype: 'Stockin_P_Edit_Product_View',
            width: '30%',
            margin: 1
        },
        {
            region: 'center',
            xtype: 'Stockin_P_Edit_Product_SKU_View',
            margin: 1
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
