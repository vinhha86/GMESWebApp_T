Ext.define('GSmartApp.view.sewingtrim.SewingTrimSelectAttribueView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SewingTrimSelectAttribueView',
    id: 'SewingTrimSelectAttribueView',
    controller: 'SewingTrimSelectAttribueViewController',
    IdProduct : 0,
    viewModel: {
        type : 'SewingTrimDetailViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{AttributeStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Thuộc tính',
        dataIndex: 'name',
        flex: 1
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward'
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            border: false,
            flex : 1
        },]
    }]
});

