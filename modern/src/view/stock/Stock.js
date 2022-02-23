Ext.define('GSmartApp.view.stock.Stock', {
    extend: 'Ext.Container',
    xtype: 'Stock',
    id: 'stock',
    cls: 'Stock',
    reference: 'Stock',
    viewModel: {
        type: 'StockViewModel'
    },
    controller: 'StockController',
    height: '100%',
    layout: 'fit',
    width: '100%',
    items:[
        {
            xtype: 'panel',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            margin: '1',
                            itemId:'Sku_AutoCompleteCbo',
                            // fieldLabel: 'Mã hàng',
                            label: 'Mã NPL:',
                            // width: 350,
                            flex: 1,
                            labelWidth: 100,
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
                            displayField: 'skuCode_color',
                            valueField: 'id',
                            listConfig: {
                                loadingText: 'Tải mã hàng...',
                                emptyText: 'Không có mã hàng phù hợp.',
                            },
                            anyMatch: true,
                            minChars: 2,
                            forceSelection: true,
                            queryMode: 'remote',
                            queryParam: 'code',		
                            multiSelect: false,
                            // enableKeyEvents : true,
                            // listeners: {
                            //     select: 'onSelectMaHangId'
                            //     // keypress: 'onPressEnterSkucode'
                            // }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype:'textfield',
                            margin: '1',
                            // emptyText: "Đơn hàng",
                            itemId: 'txtDonHang',
                            reference: 'ValueFilterFieldDonHang',
                            // fieldLabel: 'Đơn hàng',
                            label: 'Đơn hàng:',
                            // width: 250,
                            flex: 1,
                            labelWidth: 100,
                            // flex: 1,
                            bind: {
                                value: '{searchObj.donHang}'
                            },
                            enableKeyEvents: true,
                            // listeners: {
                            //     keyup: 'onDonHangFilterKeyup',
                            //     buffer: 500
                            // }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype:'textfield',
                            margin: '1',
                            // emptyText: "Đơn hàng",
                            itemId: 'txtMaSP',
                            reference: 'ValueFilterFieldMaSP',
                            // fieldLabel: 'Đơn hàng',
                            label: 'Mã SP:',
                            // width: 250,
                            flex: 1,
                            labelWidth: 100,
                            // flex: 1,
                            bind: {
                                value: '{searchObj.maSP}'
                            },
                            enableKeyEvents: true,
                            // listeners: {
                            //     keyup: 'onDonHangFilterKeyup',
                            //     buffer: 500
                            // }
                        },
                        {
                            xtype: 'button',
                            // text: 'Thoát',
                            itemId: 'btnSearch',
                            iconCls: 'x-fa fa-search',
                            // tooltip: 'Tìm kiếm',
                            margin: '1',
                            ui: 'action',
                        },
                        {
                            xtype: 'button',
                            // text: 'Thoát',
                            itemId: 'btnResetTree',
                            iconCls: 'x-fa fa-refresh',
                            // tooltip: 'Bỏ lọc',
                            margin: '1',
                            ui: 'action',
                        },
                        // {
                        //     xtype: 'button',
                        //     // text: 'Thoát',
                        //     itemId: 'btnBackNode',
                        //     iconCls: 'x-fa fa-arrow-left',
                        //     // tooltip: 'Bỏ lọc',
                        //     margin: '1',
                        //     ui: 'action',
                        // },
                    ]
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'StockMenu',
                },
                {
                    margin: 1,
                    // flex: 1,
                    width: '100%',
                    xtype: 'container',
                    bind: {
                        hidden: '{isdskhoangHidden}',
                        html: '{dskhoang}'
                    }
                }
            ],
            // bbar: [
            //     {
            //         xtype:'container',
            //         flex: 1,
            //         layout: 'vbox',
            //         items: [{
            //             xtype: 'textfield',
            //             margin: 1,
            //             border: true,
            //             cls: 'my-textfield',
            //             itemId: 'dskhoang',
            //             // label: 'DS chưa kiểm:',
            //             // labelWidth: 130,
            //             labelWidth: '100%',
            //             flex: 1,
            //             minWidth: 80,
            //             // maxWidth: 130,
            //             textAlign: 'left',
            //             placeholder: 'DS khoang',
            //             editable: false,
            //             readOnly: true,
            //             clearable: false,
            //             cls: 'lblField',
            //             bind: {
            //                 // value: '{dschuakiem}',
            //                 label: '{dskhoang}',
            //             },
            //         }],
            //         bind: {
            //             hidden: '{isdskhoangHidden}'
            //         }
            //     },
            // ],
            tbar: [
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId:'btnBack',
                    ui: 'action',
                },
                '->'
                ,
            ]
        }
    ]
});
