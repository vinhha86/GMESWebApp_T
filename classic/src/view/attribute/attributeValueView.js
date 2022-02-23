Ext.define('GSmartApp.view.attribute.attributeValueView', {
    extend: 'Ext.grid.Panel',
    xtype: 'attributeValueView',
    id: 'attributeValueView',
    controller: 'attributeValueViewController',
    viewModel: {
        type: 'attributeValueViewModel'
    },
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        scrollable: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop'
        },
        listeners: {
            drop: 'onDrop',
        }     
    },
    bind: {
        store: '{AttributeValueStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoaAtt'
        }],
        sortable: false
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        // dataIndex: 'sortvalue',
        align: 'center',
        sortable: false
    }, {
        text: 'Giá trị',
        dataIndex: 'value',
        // flex: 1,
        width: 150,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'Không được để trống giá trị',
                itemId: 'txtValue'
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        sortable: false
    },{
        text: 'Mô tả',
        dataIndex: 'description',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: true,
                // blankText: 'Không được để trống giá trị',
                itemId: 'txtDescription'
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        sortable: false
    },],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 90,
            itemId: 'btnThemMoi'
        }, {
            xtype: 'button',
            margin: 5,
            text: 'Xóa',
            width: 50,
            itemId: 'btnXoa',
            hidden: true
        }, {
            xtype: 'textfield',
            itemId: 'txtThemMoi',
            margin: 5,
            flex: 1,
            allowBlank: false,
            blankText: 'Nhập giá trị thuộc tính để thêm mới',
            enableKeyEvents : true,
            listeners: {
                keypress: 'onEnterAddAttributeValue'
            }
        }, {
            xtype: 'button',
            margin: 5,
            text: 'Sắp xếp A-Z',
            width: 100,
            itemId: 'btnSort',
            bind: {
                hidden: '{isABCsortHidden}'
            }
        }, {
            xtype: 'button',
            margin: 5,
            text: 'Sắp xếp Z-A',
            width: 100,
            itemId: 'btnSortDesc',
            bind: {
                hidden: '{isABCsortHidden}'
            }
        }]
    }]
});

