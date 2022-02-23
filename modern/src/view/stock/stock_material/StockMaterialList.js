Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList', {
    extend: 'Ext.grid.Grid',
    xtype: 'StockMaterialList',
    itemId: 'StockMaterialList',
    controller: 'StockMaterialListController',
    cls: 'StockMaterialList',

    requires: [
        // 'Ext.grid.plugin.MultiSelection',
        'Ext.grid.plugin.RowExpander',
    ],
    
    width: '99%',
    plugins: {
        rowexpander: true,
        // multiselection: true,
    },
    // mode : 'MULTI',

    itemConfig: {
        body: {
            tpl: '<div class="content">' +
                    // '<div class="content1">' +
                    //     '<div class="content1-sub1"><b>Mã NPL:</b></div>'+
                    //     '<div class="content1-sub1">{skucode}</div>' +
                    //     '<div class="content1-sub1"><b>Màu:</b></div>'+
                    //     '<div class="content1-sub1">{colorname}</div>' +
                    // '</div>' +

                    '<div class="content1">' +
                        '<div class="content1-sub1"><b>Mã NPL:</b></div>'+
                        '<div class="content1-sub2">{skuCode}</div>' +
                    '</div>' +

                    '<div class="content1">' +
                        '<div class="content1-sub1"><b>Sản phẩm:</b></div>'+
                        '<div class="content1-sub2">{stockinProductString}</div>' +
                    '</div>' +

                    '<div class="content1">' +
                        '<div class="content1-sub1"><b>Số Lot:</b></div>'+
                        '<div class="content1-sub1">{lotnumber}</div>' +
                        '<div class="content1-sub1"><b>Số cây:</b></div>'+
                        '<div class="content1-sub1">{packageid}</div>' +
                    '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1"><b>Invoice:</b></div>'+
                    //     '<div class="content1-sub1">{invoice}</div>' +
                    //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    //     '<div class="content1-sub1">{timecreate:date("d/m/y")}</div>' +
                    // '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1"><b>Invoice:</b></div>'+
                    //     '<div class="content1-sub2">{invoice}</div>' +
                    // '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    //     // '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
                    //     '<div class="content1-sub2">{timecreate:date("d/m/y")}</div>' +
                    // '</div>' +

                    // '<div class="content2">'+
                    //     '<div class="content2-sub1">Màu:</div>'+
                    //     '<div class="content2-sub2">{sku_product_color}</div>' +
                    // '</div>' +

                    '<div class="content1">' +
                        '<div class="content1-sub1"><b>Đơn hàng:</b></div>'+
                        '<div class="content1-sub1">{contractcode}</div>' +
                        '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
                        '<div class="content1-sub1">{width_met*100}</div>' +
                    '</div>' +
                    '<div class="content1">' +
                        '<div class="content1-sub1"><b>Met:</b></div>'+
                        '<div class="content1-sub1">{met}</div>' +
                        '<div class="content1-sub1"><b>Yard:</b></div>'+
                        '<div class="content1-sub1">{yds}</div>' +
                    '</div>' +

                '</div>',
        }
    },

    selectable:{
        mode: 'multi',
        rows: true,
        checkbox: true,
        checkboxColumnIndex: 0,
        checkboxDefaults: {
            xtype: 'selectioncolumn',
            text: null,
            width: 30
        },
        checkboxSelect: true,
        // checkOnly : true,
    },
    bind: {
        store: '{WarehouseStore}'
    },

    columns: [
        {
            text: 'Mã NPL',
            flex: 1,
            minWidth: 100,
            dataIndex: 'skuCode',
            align: 'center',
        }, 
        {
            text: 'Màu',
            flex: 1,
            minWidth: 100,
            dataIndex: 'colorname',
            align: 'center',
        }, 
        {
            text: 'Dài (m) - Khổ',
            flex: 1,
            minWidth: 100,
            dataIndex: 'met',
            renderer: function(value, record){
                var met = record.get('met') == null ? 0 : record.get('met');
                var width_met = record.get('width_met') == null ? 0 : record.get('width_met');
                return met + ' - ' + width_met*100;
            },
            align: 'center',
        }, 
        // {
        //     text: 'Số LOT - Số cây',
        //     flex: 1,
        //     dataIndex: 'lotnumber',
        //     renderer: function(value, record){
        //         return record.get('lotnumber') + ' - ' + record.get('packageid');
        //     }
        // },
    ]
});

// Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList', {
//     extend: 'Ext.dataview.List',
//     xtype: 'StockMaterialList',
//     itemId: 'StockMaterialList',
//     controller: 'StockMaterialListController',
//     // viewModel: {
//     //     type: 'StockMaterialListViewModel',
//     // },
//     cls: 'StockMaterialList',

//     // height: 400,
//     // width: 400,
//     width: '99%',
//     // loadingHeight: 400,
//     // itemTpl: '{epc}',

//     itemTpl: new Ext.XTemplate(
//         '<tpl for=".">',
//             '<div class="content">' +
//                 '<div class="content1">' +
//                     '<div class="content1-sub1"><b>Mã NPL:</b></div>'+
//                     '<div class="content1-sub1">{skucode}</div>' +
//                     '<div class="content1-sub1"><b>Màu:</b></div>'+
//                     '<div class="content1-sub1">{colorname}</div>' +
//                 '</div>' +

//                 '<div class="content1">' +
//                     '<div class="content1-sub1"><b>Số Lot:</b></div>'+
//                     '<div class="content1-sub1">{lotnumber}</div>' +
//                     '<div class="content1-sub1"><b>Số cây:</b></div>'+
//                     '<div class="content1-sub1">{packageid}</div>' +
//                 '</div>' +

//                 '<div class="content1">' +
//                     '<div class="content1-sub1"><b>Invoice:</b></div>'+
//                     '<div class="content1-sub1">{invoice}</div>' +
//                     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
//                     '<div class="content1-sub1">{timecreate:date("d/m/y")}</div>' +
//                 '</div>' +

//                 // '<div class="content1">' +
//                 //     '<div class="content1-sub1"><b>Invoice:</b></div>'+
//                 //     '<div class="content1-sub2">{invoice}</div>' +
//                 // '</div>' +

//                 // '<div class="content1">' +
//                 //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
//                 //     // '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
//                 //     '<div class="content1-sub2">{timecreate:date("d/m/y")}</div>' +
//                 // '</div>' +

//                 // '<div class="content2">'+
//                 //     '<div class="content2-sub1">Màu:</div>'+
//                 //     '<div class="content2-sub2">{sku_product_color}</div>' +
//                 // '</div>' +

//                 '<div class="content1">' +
//                     '<div class="content1-sub1"><b>Đơn hàng:</b></div>'+
//                     '<div class="content1-sub1">{contractcode}</div>' +
//                     '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
//                     '<div class="content1-sub1">{width_met*100}</div>' +
//                 '</div>' +
//                 '<div class="content1">' +
//                     '<div class="content1-sub1"><b>Met:</b></div>'+
//                     '<div class="content1-sub1">{met}</div>' +
//                     '<div class="content1-sub1"><b>Yard:</b></div>'+
//                     '<div class="content1-sub1">{yds}</div>' +
//                 '</div>' +

//             '</div>',
//         '</tpl>'
//     ),

//     grouped: false,
//     selectable:{
//         mode: 'multi'
//     },
//     bind: {
//         store: '{WarehouseStore}'
//     },
    
// //     items: [{
// //         xtype:'button',
// //         iconCls: 'x-fa fa-plus',
// //         itemId:'btnChuyenKhoang',
// //         text: 'Chuyển khoang',
// //         ui: 'action',
// //         margin: 1,
// //         scrollDock: 'end'
// //    }]
// });