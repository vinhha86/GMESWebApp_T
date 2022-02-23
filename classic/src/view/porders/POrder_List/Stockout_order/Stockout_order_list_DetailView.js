Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_list_DetailView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_order_list_DetailView',
    id: 'Stockout_order_list_DetailView',
    controller: 'Stockout_order_list_DetailViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Stockout_order_d_Store}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã NPL',
            dataIndex: 'materialCode',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                margin: 1,
                reference: 'ValueFilterFieldMaNPL',
                width: '99%',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterValueMaNPLKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Tên NPL',
            dataIndex: 'materialName',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                margin: 1,
                reference: 'ValueFilterFieldTenNPL',
                width: '99%',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterValueTenNPLKeyup',
                    buffer: 500
                }
            }
        }, {
            text: 'Màu NPL',
            dataIndex: 'tenMauNPL',
            width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        }, {
            text: 'Thẻ kho',
            dataIndex: 'data_spaces',
            flex: 1,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = '';
				value = value.toUpperCase();
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},            
        }, {
            text: 'Cỡ khổ',
            dataIndex: 'coKho',
            width: 80
        }, {
            text: 'ĐVT',
            dataIndex: 'unitName',
            width: 70
        }, 
        // {
        //     text: 'SL giữ',
        //     dataIndex: 'totalyds_lock',
        //     width: 80,
        //     renderer: function (value, metaData, record) {
        //         value = value == null ? "" : value + ' y';
        //         return value;
        //     },
        //     bind: {
        //         hidden: '{isHiddenYard}'
        //     }
        // },
        // {
        //     text: 'SL giữ',
        //     dataIndex: 'totalmet_lock',
        //     width: 80,
        //     renderer: function (value, metaData, record) {
        //         value = value == null ? "" : value + ' m';
        //         return value;
        //     },
        //     bind: {
        //         hidden: '{!isHiddenYard}'
        //     }
        // }, 
        {
            text: 'Cây Y/C',
            dataIndex: 'totalpackage',
            width: 60,
            editor: {
                xtype: 'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            renderer: function (value, metaData, record) {
                value = value == null ? "" : value;
                return value;
            }
        }, {
            text: 'SL Y/C (Y)',
            dataIndex: 'totalyds',
            width: 80,
            renderer: function (value, metaData, record) {
                return value + " y";
            },
            bind: {
                hidden: '{isHiddenYard}'
            }
        },
        {
            text: 'SL Y/C (M)',
            dataIndex: 'totalmet',
            width: 80,
            renderer: function (value, metaData, record) {
                return value + " m";
            },
            bind: {
                hidden: '{!isHiddenYard}'
            }
        }
    ]
});

