Ext.define('GSmartApp.view.taskgrant.TaskGrant', {
    extend: 'Ext.grid.Panel',
    xtype: 'TaskGrant',
    id: 'TaskGrant',
    viewModel: {
        type: 'TaskGrantViewModel'
    },
    controller: 'TaskGrantController',
    reference: 'TaskGrant',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TaskGrantStore}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }],
    columns: [{
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Đơn vị',
        dataIndex: 'orgName',
        flex: 1,
    }, {
        text: 'Loại công việc',
        dataIndex: 'taskName',
        flex: 1,
    }, {
        text: 'Người phụ trách',
        dataIndex: 'userName',
        flex: 1,
    }, ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoi'
            }
        ]
    }]
});

