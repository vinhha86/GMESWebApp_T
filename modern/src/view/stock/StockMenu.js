Ext.define('GSmartApp.view.stock.StockMenu', {
    extend: 'Ext.grid.Tree',
    xtype: 'StockMenu',
    id: 'StockMenu',
    cls: 'StockMenu',
    controller: 'StockMenuController',
    width: '100%',
    height: '100%',

    requires: [
        'Ext.Dialog'
    ],

    rootVisible: false,
    striped: false,
    hideHeaders: true,
    expanderOnly: false,
    bind:{
        store:'{StockTreeStore}'
    },

    columns:[
        {
            // text:'Khoang',
            dataIndex:'name',
            xtype: 'treecolumn',
            flex: 1,
            renderer: function (value, record, dataIndex, cell, column) {
                // iconCls set trong store
                if(record.get('type') == 0){
                    // metaData.iconCls = 'x-fa fa-building';
                }
                if(record.get('type') == 1){
                    // metaData.iconCls = 'x-fa fa-industry';
                }
                if(record.get('type') == 2){
                    // metaData.iconCls = 'x-fa fa-home';
                }
                if(record.get('type') == 3){
                    if(record.get('khoangKhongXacDinh') == true){
                        // metaData.iconCls = 'x-fa fa-minus-square-o';
                        return 'Khoang ' + value;
                    }
                    if(record.get('khoangKhongXacDinh') == false){
                        // metaData.iconCls = 'x-fa fa-bars';
                        return 'Dãy ' + value;
                    }
                }
                if(record.get('type') == 4){
                    // metaData.iconCls = 'x-fa fa-square-o';
                    return 'Tầng ' + value; // Tầng
                }
                if(record.get('type') == 5){
                    // metaData.iconCls = 'x-fa fa-minus-square-o';
                    return 'Khoang ' + value; // Khoang
                }
                return value;
            }                     
        },
],
});

// Ext.define('GSmartApp.view.stock.StockMenu', {
//     extend: 'Ext.dataview.NestedList',
//     xtype: 'StockMenu',
//     id: 'StockMenu',
//     controller: 'StockMenuController',

//     requires: [
//         'Ext.Dialog'
//     ],

//     title: 'Phân xưởng',
//     emptyText: 'Không có dữ liệu',
//     displayField: 'nameMobile',
//     useTitleAsBackText: false,
//     backText: '',
//     backButton: {
//         iconCls: 'x-fa fa-arrow-left',
//     },

//     bind:{
//         store:'{StockTreeStore}'
//     },

//     listeners: {
//         // leafchildtap: 'onLeafChildTap',
//         // itemtap : 'onItemTap'
//     }
// });