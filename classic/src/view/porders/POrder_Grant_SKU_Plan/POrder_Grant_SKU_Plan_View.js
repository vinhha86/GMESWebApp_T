Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_SKU_Plan_View',
    itemId: 'POrder_Grant_SKU_Plan_View',
    cls: 'POrder_Grant_SKU_Plan_View',
    reference: 'POrder_Grant_SKU_Plan_View',
    controller: 'POrder_Grant_SKU_Plan_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                validateedit: 'onDateAmountEdit',
            }             
        }
    },
    features: [
        // {
        //     id: 'group',
        //     ftype: 'groupingsummary',
        //     groupHeaderTpl: '<b>NPL: {name}</b>',
        //     hideGroupedHeader: false,
        //     enableGroupingMenu: false,
        // },
        {
            ftype: 'summary',
            dock: 'top'
        }
    ],
    bind:{
        store: '{POrderGrant_SKU_Store}',
    },
    columns: [
		{
			text: 'Mã SP(Buyer)', 
			dataIndex: 'ma_SanPham',
			width: 150,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Màu', 
			dataIndex: 'mau_SanPham',
			width: 100,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Cỡ', 
			dataIndex: 'co_SanPham',
			width: 85,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
            xtype: 'numbercolumn',
			format: '0,000',
			align: 'right',
			text: 'SL Y/C', 
			dataIndex: 'grantamount',
			width: 85,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                // metaData.tdCls = (value < 0) ? 'redCls' : 'greenCls';
                var me = this;
                var columns = me.getColumns();

                var total = 0;

                for(var i=0;i<columns.length;i++){
                    var column = columns[i];
                    var fullColumnIndex = column.fullColumnIndex;
                    var dataIndex = column.dataIndex;
                    if(fullColumnIndex >= 4){ // cot thu 5 tro di (ngay)
                        total+=record.get(dataIndex) == null ? 0 : record.get(dataIndex);
                    }
                }

                if(total < value){
                    metaData.tdCls = 'redCls';
                }else{
                    metaData.tdCls = 'whiteCls';
                }
                
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
                
			},
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
		},
	],
	
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'top',
        items:[{
            xtype:'textfield',
            itemId: 'slTong',
            vtype: 'dollar',
            margin: 2,
            fieldLabel: 'SL Tổng',
            reference: 'slTong',
            allowBlank: true,
            editable: false,
            readOnly: true,
            // maskRe: /[0-9.]/,
            bind:{
                value :'{total_porderGrant_SKU_grantamount}'
            },
            fieldStyle:{
                'text-align':'right'
            },
            width: 160,
            // flex: 1,
            labelWidth: 60,
            // listeners:{
            //     render: function(c) {
            //         console.log(c); 
            //         Ext.QuickTips.register({
            //             target: c.getEl(),
            //             text: c.value,
            //             enabled: true,
            //             showDelay: 20,
            //             trackMouse: true,
            //             autoShow: true,
            //         });
            //     }
            // }
        },{
            xtype:'textareafield',
            itemId: 'lineinfo',
            margin: 2,
            fieldLabel: 'Lines',
            reference: 'lineinfo',
            allowBlank: true,
            editable: false,
            readOnly: true,
            // maskRe: /[0-9.]/,
            bind:{
                value :'{lineinfo}'
            },
            fieldStyle:{
                // 'text-align':'right'
            },
            // width: 200,
            flex: 1,
            labelWidth: 40,
            // listeners:{
            //     render: function(c) {
            //         // console.log(c); 
            //         Ext.QuickTips.register({
            //             target: c.getEl(),
            //             text: c.getValue(),
            //             enabled: true,
            //             showDelay: 20,
            //             trackMouse: true,
            //             autoShow: true
            //         });
            //     }
            // }
        }]
    },{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                margin: 3,
                xtype:'button',
                text:  'Thoát',
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnThoat'
            },
            {
                margin: 3,
                xtype:'button',
                text:  'Test',
                iconCls: 'x-fa fa-check',
                itemId: 'btnTest',
                hidden: true
            },
        ]
    }],
});



// Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_View', {
//     extend: 'Ext.pivot.Grid',
//     xtype: 'POrder_Grant_SKU_Plan_View',
//     itemId:'POrder_Grant_SKU_Plan_View',
//     cls: 'POrder_Grant_SKU_Plan_View',
//     controller: 'POrder_Grant_SKU_Plan_Controller',
//     // viewModel: {
//     //     type: 'POrder_Grant_SKU_Plan_ViewModel'
//     // },
//     requires: [
//         'Ext.pivot.plugin.Exporter',
//         'Ext.pivot.plugin.Configurator',
//         'Ext.pivot.plugin.CellEditing'
//     ],
//     // title: 'Bảng Tổng hợp CMP',
//     // width: 750,
//     // height: 350,
//     // collapsible: true,
//     multiSelect: true,
//     columnLines: true,
//     viewConfig: {
//         scrollable: true,
//         stripeRows: false
//     },

//     selModel: {
//         type: 'rowmodel'
//         // type: 'spreadsheet'
//     },
//     bind:{
//         store:'{POrderGrant_SKU_PlanStore}'
//     },
//     plugins: {
//         // pivotexporter: true
//         pivotcellediting: {
//             clicksToEdit: 2,
//             // define here the type of editing: 'overwrite', 'increment',
//             // 'percentage', 'uniform'
//             defaultUpdater: 'overwrite',
//             listeners: {
//                 beforeedit: 'onBeforeedit',
//                 validateedit: 'onAmount_Edit'
//             }       
//         }        
//     },       
//     // Set this to false if multiple dimensions are configured on leftAxis and
//     // you want to automatically expand the row groups when calculations are ready.
//     enableLocking: true,
//     startRowGroupsCollapsed: false,
//     startColGroupsCollapsed: false,
//     matrix: {
//         type: 'local',
//         // store: {
//         //     type: 'CMPStore'
//         // },

//         // Set layout type to "outline". If this config is missing then the default
//         // layout is "outline"
//         viewLayoutType: 'outline',
//         textRowLabels: 'Mã SP',
//         compactViewColumnWidth: 180,
//         rowGrandTotalsPosition: 'last',
//         colGrandTotalsPosition: 'last',
//         textGrandTotalTpl: 'Tổng:',
//         textTotalTpl: 'Tổng ({name})',
//         // Configure the aggregate dimensions. Multiple dimensions are supported.
//         aggregate: [
//             {
//                 dataIndex: 'amount',
//                 header: 'Tổng',
//                 aggregator: 'sum',
//                 width: 100,
//                 editor: {
//                     xtype: 'numberfield',
//                     hideTrigger:true, 
//                     allowBlank: false, 
//                     maxValue: 99999, 
//                     minValue: 0,
//                     maskRe: /[0-9]/,
//                     selectOnFocus: false
//                 },
//                 renderer: function(value){
//                     return Ext.util.Format.number(value, '0,000');
//                 }
//             },
//         ],

//         // Configure the left axis dimensions that will be used to generate
//         // the grid rows
//         leftAxis: [
//             {
//                 sortIndex: 'porder_grant_skuid_link',
//                 dataIndex: 'skuCode_string',
//                 header: 'Mã SP(Buyer) - Màu - Cỡ - Số lượng tổng',
//                 sortable: false,
//                 width: 400,
//                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                     // metaData.tdCls = (value < 0) ? 'redCls' : 'greenCls';
//                     if(record.get('isRowGrandTotal') == false){
//                         // console.log(value);
//                         // console.log(record);
//                         // console.log(store);
//                         // console.log('-----');

//                         var colNum = 1;
//                         while(record.get('c' + colNum) != null){
//                             colNum++;
//                         }
//                         var totalSum = record.get('c' + (colNum-1));
//                         var valueArr = value.split(" - ");
//                         var total = valueArr[valueArr.length - 1];
//                         if(!isNaN(totalSum) && !isNaN(total)){
//                             // console.log(total);
//                             // console.log(totalSum);
//                             if(totalSum < total){
//                                 // metaData.tdCls = 'redCls';
//                                 metaData.tdStyle = 'background-color: rgb(255, 125, 125);';
//                                 // console.log(metaData);
//                             }else{
//                                 // metaData.tdCls = 'whiteCls';
//                                 metaData.tdStyle = 'background-color: white;';
//                                 // console.log(metaData);
//                             }
//                         }
//                     }
//                     return value;
//                 }
//             },
//         ],

//         /**
//          * Configure the top axis dimensions that will be used to generate
//          * the columns.
//          *
//          * When columns are generated the aggregate dimensions are also used.
//          * If multiple aggregation dimensions are defined then each top axis
//          * result will have in the end a column header with children columns
//          * for each aggregate dimension defined.
//          */
//         topAxis: [
//             {
//                 sortIndex: 'date',
//                 dataIndex: 'date_string',
//                 header: 'Ngày',
//                 // labelRenderer: 'monthLabelRenderer'
//             }
//         ]
//     },
//     listeners: {
//         // pivotgroupexpand: 'onPivotGroupExpand',
//         // pivotgroupcollapse: 'onPivotGroupCollapse',
//         pivotupdate: 'onPivotUpdate',
//         // pivotitemclick: 'onPivotItemClick'
//     },

//     dockedItems:[{
//         layout:'hbox',
//         border: false,
//         dock:'top',
//         items:[{
//             xtype:'textfield',
//             itemId: 'slTong',
//             vtype: 'dollar',
//             margin: 2,
//             fieldLabel: 'SL Tổng',
//             reference: 'slTong',
//             allowBlank: true,
//             editable: false,
//             readOnly: true,
//             // maskRe: /[0-9.]/,
//             bind:{
//                 value :'{total_porderGrant_SKU_grantamount}'
//             },
//             fieldStyle:{
//                 'text-align':'right'
//             },
//             width: 160,
//             // flex: 1,
//             labelWidth: 60,
//             // listeners:{
//             //     render: function(c) {
//             //         console.log(c); 
//             //         Ext.QuickTips.register({
//             //             target: c.getEl(),
//             //             text: c.value,
//             //             enabled: true,
//             //             showDelay: 20,
//             //             trackMouse: true,
//             //             autoShow: true,
//             //         });
//             //     }
//             // }
//         },{
//             xtype:'textareafield',
//             itemId: 'lineinfo',
//             margin: 2,
//             fieldLabel: 'Lines',
//             reference: 'lineinfo',
//             allowBlank: true,
//             editable: false,
//             readOnly: true,
//             // maskRe: /[0-9.]/,
//             bind:{
//                 value :'{lineinfo}'
//             },
//             fieldStyle:{
//                 // 'text-align':'right'
//             },
//             // width: 200,
//             flex: 1,
//             labelWidth: 40,
//             // listeners:{
//             //     render: function(c) {
//             //         // console.log(c); 
//             //         Ext.QuickTips.register({
//             //             target: c.getEl(),
//             //             text: c.getValue(),
//             //             enabled: true,
//             //             showDelay: 20,
//             //             trackMouse: true,
//             //             autoShow: true
//             //         });
//             //     }
//             // }
//         }]
//     },{
//         dock: 'bottom',
//         layout: 'hbox',
//         border: false,
//         items: [
//             {
//                 margin: 3,
//                 xtype:'button',
//                 text:  'Thoát',
//                 iconCls: 'x-fa fa-window-close',
//                 itemId: 'btnThoat'
//             },
//         ]
//     }]
// });

