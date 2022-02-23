Ext.define('GSmartApp.view.packingtype.PackingType', {
    extend: 'Ext.grid.Panel',
    xtype: 'PackingType',
    id: 'PackingType',
    viewModel: {
        type: 'PackingTypeViewModel'
    },
    controller: 'PackingTypeController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    reference: 'PackingType',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{PackingStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 30,
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
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Mã phương thức đóng gói',
        dataIndex:'code',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'packingTypeCodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPackingTypeCodeFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống mã phương thức đóng gói',
                itemId:'txtCode',
                listeners:{
                    change:'onChangeCode',
                    focusleave:'onFocusLeaveCode'
                }
            }
        }
    },{
        text:'Tên phương thức đóng gói',
        dataIndex:'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'packingTypeNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPackingTypeNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên phương thức đóng gói',
                itemId:'txtName',
                listeners:{
                    change:'onChangeName',
                    focusleave:'onFocusLeaveName'
                }
            }
        }
    },],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 90,
            itemId: 'btnThemMoi'
        },{
            xtype:'textfield',
            itemId:'txtCode',
            margin: 5,
            // flex: 1,
            width: 250,
            allowBlank: true,
            emptyText: 'Mã phương thức đóng gói',
            blankText: 'Nhập mã p/thức đóng gói để thêm mới'
        },{
            xtype:'textfield',
            itemId:'txtName',
            margin: 5,
            // flex: 1,
            width: 250,
            allowBlank: false,
            emptyText: 'Tên phương thức đóng gói',
            blankText: 'Nhập tên p/thức đóng gói để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});