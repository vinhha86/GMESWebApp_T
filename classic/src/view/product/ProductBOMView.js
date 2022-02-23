Ext.define('GSmartApp.view.product.ProductBOMView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductBOMView',
    id: 'ProductBOMView',
    controller: 'ProductBomViewController',
    IdProduct: 0,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}'
    }],
    bind: {
        store: '{ProductBom}',
        title: '{title}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 200,
        locked: true
    },{
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 100
    },{
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 100
    },{
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        width: 150
    }, {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 90,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'combo',
                    valueField: 'id',
                    displayField: 'name',
                    bind:{
                        store: '{UnitStore}'
                    },
                    queryMode: 'local'
                }
            })
        },
        renderer: function (value, metaData, record) {
            if (value != null) {
                var viewmodel = Ext.getCmp('ProductBOMMainView').getViewModel();
                var store = viewmodel.getStore('UnitStore');
                var idx = store.find('id', value);
                if (idx >= 0) {
                    var rec = store.getAt(idx);
                    return rec.data.name;
                } else {
                    return record.data.unitName;
                }
            } else {
                return '';
            }
        }
    }, {
        text: 'Định mức',
        dataIndex: 'amount',
        width: 90,
        xtype: 'numbercolumn',
        format: '0.000',
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    maskRe: /[0-9.]/,
                    selectOnFocus: true
                }
            })
        }
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 90,
        xtype: 'numbercolumn',
        format: '0.000',
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    maskRe: /[0-9.]/,
                    selectOnFocus: true
                }
            })
        },
        renderer: function (value, metaData, record) {
            return value+" %";
        }
    }, {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }]
});

