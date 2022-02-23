Ext.define('GSmartApp.view.endbuyer.EndBuyerView', {
    extend: 'Ext.grid.Panel',
    xtype: 'EndBuyerView',
    id: 'EndBuyerView',
    viewModel: {
        type: 'EndBuyerViewModel'
    },
    controller: 'EndBuyerViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'EndBuyerView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{OrgStore}'
    },
    columns: [ {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, {
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
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 120,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'endbuyerCodeFilter',
            width: 116,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onEndbuyerCodeFilterKeyup',
                buffer: 500
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên End Buyer',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'endbuyerNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onEndbuyerNameFilterKeyup',
                buffer: 500
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Thành phố',
        dataIndex: 'city',
        width: 150,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
        width: 150,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Người đại diện',
        dataIndex: 'contactperson',
        width: 150,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Email',
        dataIndex: 'email',
        width: 150,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 150,
        flex: 1,
        align: 'end',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu đại diện',
        dataIndex: 'clsName',
        width: 150,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }]
    }]
});

