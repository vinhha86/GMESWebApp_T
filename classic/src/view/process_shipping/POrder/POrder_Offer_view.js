Ext.define('GSmartApp.view.process_shipping.POrder.POrder_List.POrder_Offer_view', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Offer_view',
    id: 'POrder_Offer_view',
    controller: 'POrder_Offer_viewController',
    viewModel: {
        type: 'POrder_Offer_viewModel'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },
    columns: [
        {
            text: 'Mã sản phẩm',
            dataIndex: 'productcode',
            width: 150
        },
        {
            text: 'Phân xưởng',
            width: 90,
            dataIndex: 'donvi'
        },
        // {
        //     text: 'Ngày NPL về',
        //     width: 90,
        //     renderer: Ext.util.Format.dateRenderer('d/m/y'),
        //     dataIndex: 'matdate'
        // },
        // {
        //     text: 'Ngày RC',
        //     width: 70,
        //     renderer: Ext.util.Format.dateRenderer('d/m/y'),
        //     dataIndex: 'productiondate'
        // },
        {
            text: 'Ngày bắt đầu KH',
            width: 90,
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            dataIndex: 'start_date_plan'
        },
        {
            text: 'Ngày kết thúc KH',
            width: 90,
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            dataIndex: 'finish_date_plan'
        },
        {
            text: 'Tổ chuyền',
            flex: 1,
            dataIndex: 'granttoorgcode',
            renderer: function (value, metaData, record, rowIndex) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'SL Kế hoạch',
            dataIndex: 'totalamount_tt',
            renderer: function (value) {
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 75,
            align: 'end'
        }, {
            text: 'Đã map',
            dataIndex: 'isMap',
            disabled: true,
            xtype: 'checkcolumn',
            width: 50
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            dock: 'bottom',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Thoát',
                itemId: 'btnThoat',
                iconCls: 'x-fa fa-window-close',
                margin: 5
            }, {
                xtype: 'button',
                text: 'Chọn',
                margin: 5,
                itemId: 'btnChon',
                iconCls: 'x-fa fa-check',
                text: 'Chọn'
            }]
        }]
    }]
});

