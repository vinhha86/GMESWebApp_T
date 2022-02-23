Ext.define('GSmartApp.view.currency.KeHoachVaoChuyenView', {
    extend: 'Ext.grid.Panel',
    xtype: 'KeHoachVaoChuyenView',
    id: 'KeHoachVaoChuyenView',
    controller: 'KeHoachVaoChuyenViewController',
    reference: 'KeHoachVaoChuyenView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip: ""
    }],
    bind: {
        store: '{KeHoachVaoChuyenStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Khách hàng',
        dataIndex: 'buyername',
        width: 100,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'buyernameFilter',
            width: 96,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onbuyernameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Mã Sản phẩm',
        dataIndex: 'productcode',
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'productcodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onproductcodeKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'PO Lines',
        dataIndex: 'po_Lines',
        renderer: function (value, metaData) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        flex: 1
    }, {
        text: 'Tổ',
        dataIndex: 'granttoorgname',
        width: 100
    }],
    dockedItems: [{
        dock: 'top',
        items: [{
            layout: 'hbox',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Làm mới danh sách',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onReload'
            }, {
                xtype: 'displayfield',
                fieldStyle: "font-weight: bold; font-size: 14px; color: black",
                labelWidth: 0,
                bind: {
                    value: 'Kế hoạch vào chuyền'
                }
            }]
        }
        ]
    }]
});

