Ext.define('GSmartApp.view.pcontract.PContract_FOB_Price', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_FOB_Price',
    id: 'PContract_FOB_Price',
    viewModel: {
        type: 'PContract_FOB_Price_ViewModel'
    },
    controller: 'PContract_FOB_Price_ViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    reference: 'PContract_FOB_Price',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{PriceStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên giá',
        dataIndex:'name',
        flex: 1
    }],
    dockedItems: [{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        },{
            xtype: 'button',
            text: 'Chọn',
            itemId: 'btnChon',
            iconCls: 'x-fa fa-check',
            margin: 5
        },{
            flex:1
        },]
    }]
});

