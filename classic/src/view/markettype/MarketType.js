Ext.define('GSmartApp.view.markettype.MarketType', {
    extend: 'Ext.grid.Panel',
    xtype: 'MarketType',
    id: 'MarketType',
    viewModel: {
        type: 'MarketTypeViewModel'
    },
    controller: 'MarketTypeController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    reference: 'MarketType',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{MarketStore}'
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
        text:'Mã thị trường',
        dataIndex:'code',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'marketTypeCodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onMarketTypeCodeFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống mã thị trường',
                itemId:'txtCode',
                listeners:{
                    change:'onChangeCode',
                    focusleave:'onFocusLeaveCode'
                }
            }
        }
    },{
        text:'Tên thị trường',
        dataIndex:'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'marketTypeNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onMarketTypeNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên thị trường',
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
            emptyText: 'Mã thị trường',
            blankText: 'Nhập mã thị trường để thêm mới'
        },{
            xtype:'textfield',
            itemId:'txtName',
            margin: 5,
            // flex: 1,
            width: 250,
            allowBlank: false,
            emptyText: 'Tên thị trường',
            blankText: 'Nhập tên thị trường để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});