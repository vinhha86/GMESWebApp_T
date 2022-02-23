Ext.define('GSmartApp.view.pcontract.PContract_POrder_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Req',
    id:'PContract_POrder_Req',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditPorderReq'
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
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderReqStore}'
    },
    columns:[
        // {
        //     xtype: 'checkcolumn',
        //     dataIndex : 'is_calculate',
        //     width: 30,
        //     listeners: {
        //         checkchange: 'onCheckCalculate'
        //     }
        // },
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrder_Req'
                },                                
                // {
                //     iconCls: 'x-fa fas fa-magic',
                //     tooltip: 'Tạo lệnh',
                //     handler: 'onPOrderCreate'
                // },{
                //     iconCls: 'x-fa fas fa-trash',
                //     tooltip: 'Xóa',
                //     handler: 'onXoaPorderReq'
                // }
            ]
        },
        {
            header:'Phân xưởng',
            dataIndex:'granttoorgcode',
            flex: 1,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '' + value + ' PX' : '1 PX');
            }
        },
        {
            header:'SL yêu cầu',
            align: 'end',
            dataIndex:'totalorder',
            width: 75,
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            // align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // getEditor: function (record) {
            //     if (!record.get('is_calculate')) {
            //         return Ext.create('Ext.grid.CellEditor', {
            //             field: {
            //                 xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false
            //             }
            //         })
            //     }
            // }
        },
    ],
    // dockedItems: [{
    //     dock: 'top',
    //     padding: '0 0 10 5',
    //     height: 30,
    //     xtype: 'toolbar',
    //     items: [{
    //         xtype: 'checkboxfield',
    //         labelStyle: "font-size:11px",
    //         fieldStyle: 'font-size:11px;text-align:right',
    //         fieldLabel: 'Tự động chia số lượng:',
    //         hideTrigger:true,
    //         labelAlign: 'left',
    //         labelWidth: 120,
    //         flex: 1,
    //         bind: {
    //             value: '{po_selected.isauto_calculate}'
    //         }
    //     },'->'
	// 	,{
    //         xtype:'button',
    //         itemId:'btnAdd_PorderReq',
    //         ui: 'header',
	// 		tooltip: 'Thêm yêu cầu SX',
    //         iconCls: 'x-fa fa-plus',
    //         handler: 'onAddPorderReq'
    //     }]
    // }]
});

