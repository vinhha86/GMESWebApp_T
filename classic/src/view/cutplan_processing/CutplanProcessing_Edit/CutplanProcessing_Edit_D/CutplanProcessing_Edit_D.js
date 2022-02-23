Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'CutplanProcessing_Edit_D',
	itemId: 'CutplanProcessing_Edit_D',
    cls: 'CutplanProcessing_Edit_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'CutplanProcessing_Edit_D_Controller',
	columnLines: true,
	rowLines: true,
    title: 'Chi tiết bàn cắt',
	// features: [{
	// 	ftype: 'summary',
	// 	dock: 'bottom'
	// }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onDItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
	bind:{
        // store:'{cutplanProcessing.cutplanProcessingD}',
		store: '{CutplanProcessingDStore}'
	},
	columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    tooltip: 'Xóa',
                    handler: 'onDeleteCutplanProcessingD'
                }
            ]
        },           
		{
			text: 'Mã NPL', 
			flex: 1,
			dataIndex: 'skucode',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldMaNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueMaNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
        {
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldTenNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueTenNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
        {
			text: 'Số lot', 
			dataIndex: 'lotnumber',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số cây', 
			dataIndex: 'packageid',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Dài cây', 
			dataIndex: 'met',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số lá', 
			dataIndex: 'la_vai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
        {
			text: 'Tiêu hao', 
			dataIndex: 'tieu_hao',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Đầu tấm', 
			dataIndex: 'con_lai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
        {
			text: 'Phát sinh', 
			dataIndex: 'ps',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Lỗi vải', 
			dataIndex: 'met_err',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'container',
        margin: 2,
        flex: 1,
		items: [
            {
                layout: 'vbox',
                width: '100%',
                // flex: 1,
                items:[
                    {
                        layout: 'hbox',
                        width: '100%',
                        // flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'lotnumber',
                                fieldLabel: "Số Lot",
                                // allowBlank: false,
                                bind: {
                                    value: '{cutplanProcessingDObj.lotnumber}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'packageid',
                                fieldLabel: "Số cây",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                bind: {
                                    value: '{cutplanProcessingDObj.packageid}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'met',
                                fieldLabel: "Dài cây",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                editable: false,
                                readOnly: true,
                                cls: 'notEditable',
                                bind: {
                                    value: '{cutplanProcessingDObj.met}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                        ]
                    },
                    {
                        layout: 'hbox',
                        width: '100%',
                        // flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'la_vai',
                                fieldLabel: "Số lá",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                bind: {
                                    value: '{cutplanProcessingDObj.la_vai}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'tieu_hao',
                                fieldLabel: "Tiêu hao",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                editable: false,
                                readOnly: true,
                                cls: 'notEditable',
                                bind: {
                                    value: '{cutplanProcessingDObj.tieu_hao}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'met_err',
                                fieldLabel: "Lỗi vải",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                bind: {
                                    value: '{cutplanProcessingDObj.met_err}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                        ]
                    },
                    {
                        layout: 'hbox',
                        width: '100%',
                        // flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'con_lai',
                                fieldLabel: "Đầu tấm",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                // editable: false,
                                // readOnly: true,
                                bind: {
                                    value: '{cutplanProcessingDObj.con_lai}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'ps',
                                fieldLabel: "Phát sinh",
                                fieldStyle: "text-align:right;",
                                // allowBlank: false,
                                editable: false,
                                readOnly: true,
                                cls: 'notEditable',
                                bind: {
                                    value: '{cutplanProcessingDObj.ps}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype:'button',
                                text:  'Thêm',
                                iconCls: 'x-fa fa-check',
                                itemId: 'btnAddCutplanProcessingD',
                                margin: 2,
                                flex: 1,
                            },
                        ]
                    },
                ]
            }
	    ]
	}]
});

