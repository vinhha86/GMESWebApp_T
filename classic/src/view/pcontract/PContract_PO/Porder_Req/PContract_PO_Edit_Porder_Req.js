Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Porder_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Porder_Req',
    id: 'PContract_PO_Edit_Porder_Req',
    controller: 'PContract_PO_Edit_PordersController',
    IdPcontract: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'porderGanttDropGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeDropOrg'
        }
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
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE',
    //     checkOnly: true
    // },
    bind: {
        store: '{porderReqStore}'
    },
    columns: [{
        xtype: 'checkcolumn',
        dataIndex: 'is_calculate',
        width: 25
    }, {
        xtype: 'actioncolumn',
        // id: 'PContract_PO_Edit_Porder_Req_deletebutton',
        width: 20,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        header: 'PX',
        dataIndex: 'granttoorgcode',
        flex: 1,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? '' + value + ' PX' : '1 PX');
        }
    },
    {
        header: 'Phân xưởng',
        itemId: 'amount_inset',
        hidden: true,
        dataIndex: 'amount_inset',
        flex: 1,
        summaryType: 'average'
    },
    {
        header: 'SL',
        align: 'end',
        dataIndex: 'totalorder',
        width: 75,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: 'renderValue',
        getEditor: function (record) {
            if (!record.get('is_calculate')) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'numberfield', hideTrigger: true, allowBlank: true, maxValue: 9999999, selectOnFocus: false
                    }
                })
            }
        }
    },],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 30,
        items: [{
            xtype: 'checkboxfield',
            labelStyle: "font-size:11px",
            fieldStyle: 'font-size:11px;text-align:right',
            fieldLabel: 'Tự động chia số lượng:',
            hideTrigger: true,
            labelAlign: 'left',
            labelWidth: 120,
            flex: 1,
            bind: {
                value: '{po.isauto_calculate}'
            }
        },
            '->',
        {
            xtype: 'button',
            itemId: 'btnThemOrg',
            ui: 'header',
            tooltip: 'Thêm đơn vị',
            iconCls: 'x-fa fa-plus',
            handler: 'onThemOrg',
            bind: {
                hidden: '{hidden_btnThemOrg}'
            }
        }, {
            xtype: 'button',
            ui: 'header',
            tooltip: 'Thêm đơn vị',
            iconCls: 'x-fa fa-plus',
            handler: 'onThemOrg',
            bind: {
                hidden: '{ishidden_luu_linegiaohang}'
            }
        }]
    },
        // {
        //     dock: 'bottom',
        //     xtype: 'displayfield',
        //     height: 30,
        //     labelStyle: "font-size:11px;",
        //     fieldStyle: 'font-size:11px;text-align:right',
        //     bind: {
        //         value: '{porder_req.sum_set}'
        //     }
        // }
    ]
});

