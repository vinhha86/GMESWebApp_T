Ext.define('GSmartApp.view.sewingtrim.SewingThreadSelectAttributeValueView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SewingThreadSelectAttributeValueView',
    id: 'SewingThreadSelectAttributeValueView',
    controller: 'SewingThreadSelectAttributeValueViewController',
    IdAttribute: 0,
    IdProduct : 0,
    viewModel: {
        type : 'SewingThreadDetailViewModel'
    },
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
        store: '{AttributeValueStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Giá trị',
        dataIndex: 'value',
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
            iconCls: 'x-fa fa-window-close'
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
});

