Ext.define('GSmartApp.view.sizeset.SizesetView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SizesetView',
    id: 'SizesetView',
    IdSizeset: 0,
    viewModel: {
        type: 'SizesetViewModel'
    },
    controller: 'SizesetViewController',
    reference: 'SizesetView',
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
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
        store: '{SizesetStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        // dataIndex: 'sortvalue',
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên dải cỡ',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'sizesetNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSizesetNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên dải cỡ',
                itemId:'txtName',
                listeners:{
                    focusenter: 'onNameFocus',
                    change: 'onNameChange',
                    focusleave: 'onNameFocusLeave'
                }
            }
        }
    }, {
        text: 'Chú thích',
        dataIndex: 'comment',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống chú thích',
                itemId:'txtComment',
                listeners:{
                    focusenter: 'onCommentFocus',
                    change: 'onCommentChange',
                    focusleave: 'onCommentFocusLeave'
                }
            }
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'attrValues',
        flex: 1
    },],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoi'
            },
            
            {
                xtype:'textfield',
                itemId:'txtname',
                // fieldLabel: 'Tên dải size',
                margin: 5,
                flex: 1,
                allowBlank: false,
                blankText: 'Nhập tên dải cỡ',
                emptyText: 'Tên dải cỡ'
            },
            {
                xtype:'textfield',
                itemId:'txtcomment',
                // fieldLabel: 'Chú thích',
                margin: 5,
                flex: 1,
                allowBlank: true,
                blankText: 'Nhập chú thích',
                emptyText: 'Chú thích'
            },
            {
                flex: 1,
                border: false
            }
        ]
    }]
});

