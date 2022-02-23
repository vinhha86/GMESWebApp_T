Ext.define('GSmartApp.view.sku.SkuSearchWindow', {
    extend: 'Ext.window.Window',
    xtype: 'skusearchwindow',
    viewModel: {
        type: 'skusearch'
    },
    requires: [
        'GSmartApp.view.sku.SkuSearchCriteria',
        'GSmartApp.view.sku.ProductList',
        'GSmartApp.view.sku.SkuList'
    ],
    controller: 'skusearch',
    title: 'Tìm kiếm nguyên phụ liệu - Sản phẩm',
    // width: 1200,
    // height: 500,
    margin:10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },  
    resizable: true,
    modal: true,
    items:[
        {
            title:'', 
            width: 350,  
            margin: 2,
            xtype: 'SkuSearchCriteria'
        },        
        {
            title:'Danh sách Sản phẩm/ Nguyên phụ liệu', 
            // id: 'grid_productsearch',
            flex: 1,  
            margin: 2,
            xtype: 'ProductList'
        },
        {
            title:'Chi tiết màu, cỡ', 
            id: 'grid_skusearch',
            flex: 1,  
            margin: 2,
            xtype: 'SkuList',
            bind: {
                hidden: '{isHidden_sku}'
            }
        },
        // {
        //     title:'Danh sách đơn hàng', 
        //     id: 'grid_contractsearch',
        //     flex: 1,  
        //     margin: 2,
        //     xtype: 'ContractList'
        // }
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }
});
