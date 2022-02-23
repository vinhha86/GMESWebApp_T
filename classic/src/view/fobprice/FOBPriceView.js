Ext.define('GSmartApp.view.fobprice.FOBPriceView', {
    extend: 'Ext.grid.Panel',
    xtype: 'FOBPriceView',
    id: 'FOBPriceView',
    viewModel: {
        type: 'FOBPriceViewViewModel'
    },
    controller: 'FOBPriceViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onFobEdit',
                // beforeedit: 'onBeforeFobEdit'
            }     
        }
    },
    reference: 'FOBPriceView',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{PriceStore}'
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
            isDisabled: 'isButtonDisabled'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên giá',
        dataIndex:'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'fobPriceNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFobPriceNameFilterKeyup',
                buffer: 500
            }
        },
        // editor: {
        //     completeOnEnter: true,
        //     field: {
        //         xtype: 'textfield',
        //         allowBlank: false,
        //         blankText:'Không được để trống tên giá',
        //         itemId:'txtName',
        //         listeners:{
        //             change:'onChange',
        //             focusleave:'onFocusLeave'
        //         }
        //     }
        // }
        editor:{
            xtype:'textfield',
            // maskRe: /[0-9.]/,
            selectOnFocus: true
        },
    },{
        xtype: 'numbercolumn',
		format:'0,000.00',
        text:'Hao hụt',
        dataIndex:'lost_percent',
        flex: 1,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true,
            maxLength: 10
        },
    },{
        xtype: 'numbercolumn',
		format:'0,000',
        text:'Giá',
        dataIndex:'price',
        flex: 1,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true,
            maxLength: 10
        },
    },{ 
        xtype: 'checkcolumn',
        text: 'Mặc định',
        dataIndex: 'isdefault',
        headerCheckbox: false,
        width: 100,
        listeners: {
            beforecheckchange: 'onBeforecheckchange',
            checkchange: 'onCheckchange'
        }
    }],
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
            blankText: 'Nhập tên giá để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});

