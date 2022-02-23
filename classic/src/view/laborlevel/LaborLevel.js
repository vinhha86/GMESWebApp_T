Ext.define('GSmartApp.view.laborlevel.LaborLevel', {
    extend: 'Ext.grid.Panel',
    xtype: 'LaborLevel',
    id: 'LaborLevel',
    viewModel: {
        type: 'LaborLevelViewModel'
    },
    controller: 'LaborLevelController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    reference: 'LaborLevel',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{LaborLevelStore}'
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
        text:'Mã bậc thợ',
        dataIndex:'code',
        // flex: 1,
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'laborLevelCodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onLaborLevelCodeFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                // allowBlank: false,
                // blankText:'Không được để trống mã bậc thợ',
                itemId:'txtCode',
                listeners:{
                    change:'onChangeCode',
                    focusleave:'onFocusLeaveCode'
                }
            }
        }
    },{
        text:'Tên bậc thợ',
        dataIndex:'name',
        // flex: 1,
        width: 250,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'laborLevelNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onLaborLevelNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên bậc thợ',
                itemId:'txtName',
                listeners:{
                    change:'onChangeName',
                    focusleave:'onFocusLeaveName'
                }
            }
        }
    },{
        text:'Hệ số',
        dataIndex:'rate',
        flex: 1,
        align: 'end',
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'numberfield',
                allowDecimals: true,
                hideTrigger:true,
                itemId:'txtRate',
                fieldStyle:{
                    'text-align':'right',
                    'color': 'blue'
                },
                listeners:{
                    change:'onChangeRate',
                    focusleave:'onFocusLeaveRate'
                }
            }
        }
    },{
        text:'Chú thích',
        dataIndex:'comment',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                // allowBlank: false,
                // blankText:'Không được để trống tên bậc thợ',
                itemId:'txtComment',
                listeners:{
                    change:'onChangeComment',
                    focusleave:'onFocusLeaveComment'
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
            emptyText: 'Mã bậc thợ',
            blankText: 'Nhập mã bậc thợ để thêm mới'
        },{
            xtype:'textfield',
            itemId:'txtName',
            margin: 5,
            // flex: 1,
            width: 250,
            allowBlank: false,
            emptyText: 'Tên bậc thợ',
            blankText: 'Nhập tên bậc thợ để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});