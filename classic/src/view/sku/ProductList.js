Ext.define('GSmartApp.view.sku.ProductList', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductList',
    id: 'ProductList',
    // controller: 'ProductList_Controller',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Sku'
    ],
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    layout: 'fit',
    border: true,
    scrollable: true,
    bind: {
        store: '{ProductStore}'
    },
    flex: 1,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },
    columns: [
        {
            text: 'Ảnh',
            dataIndex: 'urlimage',
            width: 45,
            textAlign: 'center',
            renderer: function (value, meta, record) {
                return '<img style="width:40px; height:30px" src="data:image/gif;base64,' + value + '">';
            },
            listeners: {
                click: 'viewImg'
            }
        },
        {
            header: 'Mã SP (Buyer)', dataIndex: 'buyercode', width: 100,
            summaryType: 'count',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'buyercodeProductListFilter',
                width: '100%',
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onbuyercodeProductListFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            header: 'Mã NCC', dataIndex: 'partnercode', width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'partnercodeProductListFilter',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'partnercodeProductListFilterKeyup',
                    buffer: 500
                }
            },
        },
        {
            header: 'Tên', dataIndex: 'name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'nameProductListFilter',
                width: '100%',
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onnameProductListFilterKeyup',
                    buffer: 500
                }
            },
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    iconCls: 'x-fa fas fa-edit',
                    tooltip: 'Sửa thông tin',
                    handler: 'onEditProductList'
                }
            ]
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Chọn',
        iconCls: 'x-fa fa-check',
        handler: 'onSelectButton',
        itemId: 'btnChonSanPham',
        bind: {
            hidden: '{!isVisible_btnChonSP}'
        }
    },
    {
        minWidth: 80,
        text: 'Chọn SP',
        iconCls: 'x-fa fa-check',
        handler: 'onSelect_Products',
        itemId: 'btnSelect_Products',
        bind: {
            hidden: '{isHidden_Select_Products}'
        }
    },
    {
        minWidth: 80,
        itemID: 'btnAddProduct_ProductList',
        text: 'Tạo mới',
        iconCls: 'x-fa fa-magic',
        handler: 'onCreateProduct',
        bind: {
            hidden: '{isHidden_newProduct}'
        }
    },
        '->'
    ],
    listeners: {
        itemclick: 'onProductItemSelected'
    }
});
