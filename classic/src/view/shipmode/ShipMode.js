Ext.define('GSmartApp.view.shipmode.ShipMode', {
    extend: 'Ext.grid.Panel',
    xtype: 'ShipMode',
    id: 'ShipMode',
    viewModel: {
        type: 'ShipModeViewModel'
    },
    controller: 'ShipModeController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    reference: 'ShipMode',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{ShipModeStore}'
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
            handler: 'onXoa',
            // isDisabled: 'isButtonDisabled'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên phương thức vận chuyển',
        dataIndex:'name',
        flex: 1,
        // items: {
        //     xtype: 'textfield',
        //     fieldStyle: "",
        //     reference: 'fobPriceNameFilter',
        //     width: '99%',
        //     flex: 1,
        //     margin: 2,
        //     enableKeyEvents: true,
        //     listeners: {
        //         keyup: 'onFobPriceNameFilterKeyup',
        //         buffer: 500
        //     }
        // },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên giá',
                itemId:'txtName'
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
            itemId:'txtThemMoi',
            margin: 5,
            flex: 1,
            allowBlank: false,
            blankText: 'Nhập phương thức vận chuyển để thêm mới'
        }]
    }],
    listeners:{
        // rowclick: 'onRowClick',
        // dblclick: 'onRowClick'
    }
});

