Ext.define('GSmartApp.view.handover.HandoverPackFromLine_Detail_PorderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackFromLine_Detail_PorderSearch',
    id: 'HandoverPackFromLine_Detail_PorderSearch',
    reference: 'HandoverPackFromLine_Detail_PorderSearch',
    controller: 'HandoverPackFromLine_Detail_PorderSearchController',
    viewModel:{
        // type:'HandoverPackFromLine_Detail_PorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{POrder_ListStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
        { header: 'Mã lệnh', dataIndex: 'ordercode', flex: 1},
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-window-close'
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
});

