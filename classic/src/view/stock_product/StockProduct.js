Ext.define('GSmartApp.view.stock_product.StockProduct', {
    extend: 'Ext.form.Panel',
    xtype: 'StockProduct',
    id:'stock_product',
    controller: 'StockProductController',
    viewModel:{
        type:'StockProductViewModel'
    },
    layout: 'border',
    height: 500,
    items: [
        {
            region: 'center',
            width: '30%',
            // width: 350,
            title: 'Danh sách kho',
            xtype: 'StockProductMenu',
            border: true,
            margin: 1
        
        },
        {
            region: 'east',
            width: '70%',
            // flex: 1,
            title: 'Danh sách thành phẩm',
            xtype: 'StockProductList',  
            border: true,
            margin: 1,
        },
    ],
    dockedItems:[
        {
            layout:'hbox',
            border: false,
            dock:'top',
            items:[
                {
                    xtype: 'combo',
                    margin: '5 1 5 1',
                    itemId:'Sku_AutoComplete',
                    fieldLabel: 'Mã thành phẩm',
                    width: 380,
                    labelWidth: 110,
                    hideLabel: false,			
                    bind:{
                        store: '{Sku_AutoComplete}',
                        // hidden: '{isBarcodeHidden}',
                        value: '{searchObj.maHangId}'
                    },
                    // store: {
                    //     type: 'Sku_AutoComplete',
                    //     // pageSize: 10
                    // },
                    displayField: 'code',
                    valueField: 'id',
                    listConfig: {
                        loadingText: 'Tải mã thành phẩm...',
                        emptyText: 'Không có mã thành phẩm phù hợp.',
                    },
                    anyMatch: true,
                    minChars: 2,
                    queryMode: 'remote',
                    queryParam: 'code',		
                    enableKeyEvents : true,
                    listeners: {
                        select: 'onSelectMaHangId'
                        // keypress: 'onPressEnterSkucode'
                    }
                },
                {
                    xtype: 'button',
                    // text: 'Thoát',
                    itemId: 'btnSearch',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'Tìm kiếm',
                    margin: '5 1 5 1',
                },
                {
                    xtype: 'button',
                    // text: 'Thoát',
                    itemId: 'btnResetTree',
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Bỏ lọc',
                    margin: '5 1 5 1',
                },
                // {
                //     flex:1,
                //     border: false
                // },
            ]
        }
    ],
})