Ext.define('GSmartApp.view.salary.SalComPosition_Add', {
    extend: 'Ext.grid.Panel',
    xtype: 'SalComPosition_Add',
    id: 'SalComPosition_Add',
    controller: 'SalComPosition_Add_Cotroller',
    IdProduct : 0,
    viewModel: {
        type : 'SalComPosition_Add_Model'
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
        store: '{PositionStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Chức vụ',
        dataIndex: 'name',
        flex: 1
    }],
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

