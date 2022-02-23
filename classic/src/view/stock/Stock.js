Ext.define('GSmartApp.view.stock.Stock', {
    extend: 'Ext.form.Panel',
    xtype: 'Stock',
    id:'stock',
    controller: 'StockController',
    viewModel:{
        type:'StockViewModel'
    },
    layout: 'border',
    height: 500,
    items: [
        {
            region: 'center',
            width: '30%',
            // width: 350,
            title: 'Danh sách khoang',
            xtype: 'StockMenu',
            border: true,
            margin: 1
        
        },
        {
            region: 'east',
            width: '70%',
            // flex: 1,
            title: 'Danh sách NPL',
            xtype: 'StockMaterialList',  
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
                // {
                //     xtype:'textfield',
                //     labelWidth: 0,
                //     margin: '5 1 5 1',
                //     emptyText: "Mã hàng",
                //     itemId: 'txtMaHang',
                //     reference: 'ValueFilterFieldMaHang',
                //     width: 150,
                //     // flex: 1,
                //     bind: {
                //         value: '{searchObj.maHang}'
                //     },
                //     enableKeyEvents: true,
                //     listeners: {
                //         keyup: 'onMaHangFilterKeyup',
                //         buffer: 500
                //     }
                // },
                {
                    xtype: 'combo',
                    margin: '5 1 5 1',
                    itemId:'txtMaHangId',
                    fieldLabel: 'Mã NPL',
                    width: 350,
                    labelWidth: 70,
                    hideLabel: false,			
                    bind:{
                        // store: '{SKUStore}',
                        // hidden: '{isBarcodeHidden}',
                        value: '{searchObj.maHangId}'
                    },
                    store: {
                        type: 'Sku_AutoComplete',
                        // pageSize: 10
                    },
                    displayField: 'skuCode_color',
                    valueField: 'id',
                    listConfig: {
                        loadingText: 'Tải mã hàng...',
                        emptyText: 'Không có mã hàng phù hợp.',
                    },
                    anyMatch: true,
                    minChars: 2,
                    queryMode: 'remote',
                    queryParam: 'code',		
                    enableKeyEvents : true,
                    listeners: {
                        select: 'onSelectMaHangId'
                        // keypress: 'onPressEnterSkucode'
                    },
                    matchFieldWidth: false,
                    listConfig: {
                        listeners: {
                            beforeshow: function(picker) {
                                picker.minWidth = picker.up('combobox').getSize().width;
                            }
                        }
                    },
                },
                {
                    xtype:'textfield',
                    labelWidth: 0,
                    margin: '5 1 5 1',
                    // emptyText: "Đơn hàng",
                    itemId: 'txtDonHang',
                    reference: 'ValueFilterFieldDonHang',
                    fieldLabel: 'Đơn hàng',
                    width: 250,
                    labelWidth: 70,
                    // flex: 1,
                    bind: {
                        value: '{searchObj.donHang}'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onDonHangFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    xtype:'textfield',
                    labelWidth: 0,
                    margin: '5 1 5 1',
                    // emptyText: "Đơn hàng",
                    itemId: 'txtMaSP',
                    reference: 'ValueFilterFieldMaSP',
                    fieldLabel: 'Mã SP',
                    width: 250,
                    labelWidth: 70,
                    // flex: 1,
                    bind: {
                        value: '{searchObj.maSP}'
                    },
                    enableKeyEvents: true,
                    // listeners: {
                    //     keyup: 'onMaSPFilterKeyup',
                    //     buffer: 500
                    // }
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