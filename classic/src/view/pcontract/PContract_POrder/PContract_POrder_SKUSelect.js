Ext.define('GSmartApp.view.pcontract.PContract_POrder_SKUSelect', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_SKUSelect',
    id: 'PContract_POrder_SKUSelect',
    controller: 'PContract_POrder_SKUSelectController',
    viewModel: 'PContractViewModel',
    pcontract_poid_link: null,
    pcontractid_link: null,
    porderid_link: null,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns:[
        // {
        //     text: 'STT',
        //     width: 30,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // },
        {
            text:'SKU',
            dataIndex:'skuCode',
            flex: 1
        },
        {
            text:'Màu',
            dataIndex:'mauSanPham',
            width: 100
        },
        {
            text:'Cỡ',
            dataIndex:'coSanPham',
            width: 70
        },
        {
            text:'SL Tổng',
            dataIndex:'pquantity_total',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">'+ value ;
            }
        }
    ],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            border: false,
            flex : 1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

