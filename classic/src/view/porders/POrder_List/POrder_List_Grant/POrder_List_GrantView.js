Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantView',
    id: 'POrder_List_GrantView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_GrantViewController',
    reference: 'POrder_List_GrantView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POrder_ListGrantStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tổ',
        dataIndex: 'granttoorgname',
        flex: 1,
    }, {
        text: 'Ngày VC',
        dataIndex: 'start_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        // flex: 1,
    }, {
        text: 'Ngày RC',
        dataIndex: 'finish_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        // flex: 1
    }, {
        text: 'Số lượng KH',
        dataIndex: 'grantamount',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
        align: 'end'
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Danh sách tổ chuyền'
        }
        ]
    }]
});

