Ext.define('GSmartApp.view.stockin.Encode_porder_search', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_porder_search',
    id:'Encode_porder_search',
    controller: 'Encode_porder_search_Cotroller',
    viewModel: {
        type: 'Encode_porder_search_ViewModel'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderStore}'
    },
    reference: 'Encode_porder_search',
    columns:[{
        text:'Mã lệnh',
        dataIndex:'ordercode',
        width: 90
    },{
        text:'Mã vạch',
        dataIndex:'skucode',
        width: 150
    },{
        text:'Tên SP',
        dataIndex:'productName',
        flex: 1
    },{
        text:'Ngày SX',
        xtype: 'datecolumn',
        format: 'd/m/Y',
        dataIndex:'orderdate',
        width: 120
    },{
        text:'Năm SX',
        dataIndex:'productionyear',
        width: 90
    },{
        text:'Mùa',
        dataIndex:'season',
        width: 90
    },{
        text:'SL',
        dataIndex:'totalorder',
        width: 60
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        border: true,
        style:"background-color : white;",
        items:[{
            xtype:'textfield',
            fieldLabel: 'Mã lệnh',
            margin: 5,
            itemId: 'ordercode',
            bind: {
                value: '{ordercode}'
            }
        },{
            xtype:'textfield',
            fieldLabel: 'Mã vạch',
            margin: 5,
            itemId: 'skucode',
            bind: {
                value: '{skucode}'
            }
        },{
            xtype:'button',
            itemId: 'btnTimKiem',
            tooltip: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            margin: 5
        }]
    },{
        dock: 'bottom',
        layout: 'hbox',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward'
        }]
    }]
});

