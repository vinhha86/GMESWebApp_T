Ext.define('GSmartApp.view.process_shipping.POrder.POrder_List.POrderView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderView',
    id: 'POrderView',
    controller: 'POrderViewController',
    reference: 'POrderView',
    viewConfig: {
        rowLines: true,
        columnLines: true,
        enableTextSelection: true
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    bind: {
        store: '{POrder_ListStore}'
    },
    columns: [
        // {
        //     text: 'Mã lệnh',
        //     dataIndex: 'ordercode',
        //     flex: 1,
        //     renderer: function (value, metaData, record, rowIndex) {
        //         var c = record.get('status');
        //         if (c == 0) {
        //             metaData.tdCls = 'process-free';
        //         } else if (c == 1) {
        //             metaData.tdCls = 'process-granted';
        //         } else if (c == 2) {
        //             metaData.tdCls = 'process-ready';
        //         } else if (c == 3) {
        //             metaData.tdCls = 'process-subprocess';
        //         } else if (c == 4) {
        //             metaData.tdCls = 'process-running';
        //         } else if (c == 5) {
        //             metaData.tdCls = 'process-done';
        //         } else if (c == 6) {
        //             metaData.tdCls = 'process-finish';
        //         }
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     },
        //     items: {
        //         xtype: 'textfield',
        //         fieldStyle: "",
        //         reference: 'ordercodeFilterField',
        //         width: '98%',
        //         margin: 1,
        //         enableKeyEvents: true,
        //         listeners: {
        //             keyup: 'onOrderCodeFilterKeyup',
        //             buffer: 500
        //         }
        //     }
        // },
        {
            text: 'Phân xưởng',
            width: 90,
            dataIndex: 'xuongSX'
        },
        {
            text: 'Tổ',
            width: 90,
            dataIndex: 'xuongTo'
        },
        {
            text: 'SL',
            dataIndex: 'grantamount',
            renderer: function (value) {
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 60,
            align: 'end'
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            margin: '10 5 0 5',
            ui: 'header',
            xtype: 'button',
            iconCls: 'x-fa fa-angle-double-down',
            itemId: 'btnThuGon',
            bind: {
                hidden: '{!IsOpen}'
            }
        },
        {
            margin: '10 5 0 5',
            ui: 'header',
            xtype: 'button',
            itemId: 'btnMoRong',
            iconCls: 'x-fa fa-angle-double-up',
            bind: {
                hidden: '{IsOpen}'
            }
        }, {
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Lệnh sản xuất'
        },
            '->'

        ]
    }]
});

