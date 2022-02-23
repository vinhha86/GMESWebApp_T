Ext.define('GSmartApp.view.stockout.POrderMaterials', {
    extend: 'Ext.grid.Panel',
    xtype: 'pordermaterials',
    reference: 'pordermaterials',
    controller: 'pordermaterials',
    border: true,
    columnLines:true,
    scrollable: true,
    autoLoad: true,
    store: {
        type: 'stockout_d_balance'
    },  
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Mã vải chính: {name} </b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],                 
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    columns: [
        { header: 'Mã NPL', dataIndex: 'skucode', width: 80},
        { header: 'Loại NPL', dataIndex: 'skutype', width: 80},  
        { header: 'Khổ vải', dataIndex: 'widthorder', width: 80},   
        // { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
        { header: 'Mã màu', dataIndex: 'color_code', width: 80},                                      
        { header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },          
        { header: 'Kiểm đo', dataIndex: 'totalydscheck', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'Khử co', dataIndex: 'totalydsprocessed', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'Xuất cắt', dataIndex: 'totalydsstockout', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        }, 
        { header: 'Chênh lệch', dataIndex: 'stockoutdif', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum', renderer: 'renderCell'
        },
        { header: 'Lệnh dùng chung', dataIndex: 'extrainfo', flex:1}
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                margin: '0 0 0 5',
                reference:'txt_ordercode',
                fieldLabel: 'Mã SX:',
                width: 150,
                labelWidth: 45,
                hideLabel: false,
                //emptyText: 'Mã SX'
            },
            {
                tooltip: 'Tìm Lệnh SX',
                margin: '0 0 0 5',
                //text: 'Thêm thẻ vải',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchOrderTap'
            }
    ]
    }]     
});
