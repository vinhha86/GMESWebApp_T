Ext.define('GSmartApp.view.attribute.ProductSelectAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductSelectAttributeView',
    id: 'ProductSelectAttributeView',
    controller: 'ProductSelectAttributeViewCotroller',
    IdAttribute: 0,
    IdProduct: 0,
    viewModel: {
        type: 'ProductDetailViewModel'
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
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'ValueFilterField',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueKeyup',
                buffer: 500
            }
        }
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'textfield',
            margin: 3,
            itemId: 'txtAttributeValueAdd',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keypress: 'onEnterAddAttributeValue'
            }
        }, {
            xtype: 'button',
            text: 'Thêm',
            margin: 3,
            itemId: 'btnAddAttributeValue',
            iconCls: 'x-fa fa-plus'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [{
            border: false,
            flex: 1
        }, {
            xtype: 'button',
            text: 'Lưu',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }, {
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

