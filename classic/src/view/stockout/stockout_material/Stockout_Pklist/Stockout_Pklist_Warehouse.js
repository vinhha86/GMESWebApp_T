Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Warehouse', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pklist_Warehouse',
    itemId: 'Stockout_Pklist_Warehouse',
    reference: 'Stockout_Pklist_Warehouse',
    controller: 'Stockout_Pklist_WarehouseController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>{name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
    ],
    bind:{
        store:'{WarehouseStore}'
    },
    columns:[
        {
            xtype: 'checkcolumn',
            dataIndex: 'isChecked',
            width: 50,
            headerCheckbox: true,
            sortable: false,
            menuDisabled: true,
            // text: 'MyCheck',
            listeners: {
                checkchange: 'onCheckcolumnCheckChange',
                headercheckchange: 'onHeaderCheckChange'
            }
        },
        { 
            header: 'Khoang', 
            dataIndex: 'spaceString', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldKhoang',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueKhoangKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			summaryType: 'count',
			summaryRenderer: 'renderCount',
        },
        { 
            header: 'Số Lot', 
            dataIndex: 'lotnumber', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldLot',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueLotKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Số cây', 
            dataIndex: 'packageid', 
            sortable: false,
            menuDisabled: true,
            flex: 1
        },
        { 
            header: 'Khổ (cm)', 
            dataIndex: 'width_met', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                var value = value == null ? 0 : Ext.util.Format.number(value, '0,000.00');
                return value * 100;
            }
        },
        { 
            header: 'Dài (m)', 
            dataIndex: 'met', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
            bind: {
                hidden: '{isMetColumnHidden}'
            }
        },
        { 
            header: 'Dài (y)', 
            dataIndex: 'yds', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
            bind: {
                hidden: '{isYdsColumnHidden}'
            }
        },
        { 
            header: 'Kg', 
            dataIndex: 'grossweight', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
            bind: {
                hidden: '{isKgColumnHidden}'
            }
        },
        { 
            header: 'Lbs', 
            dataIndex: 'grossweight_lbs', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
            bind: {
                hidden: '{isLbsColumnHidden}'
            }
        },
        { 
            header: 'Trạng thái', 
            dataIndex: 'warehouseStatusString',
            flex: 1,
            // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
            //     if(value == 'Chưa tở'){
            //         metaData.tdCls = 'redField';
            //     }else if(value == 'Đã tở'){
            //         metaData.tdCls = 'whiteField';
            //     }
			// 	return value;
			// },
        },
        {
			text: 'Ngày tở',
			xtype: 'datecolumn',
			format: 'd/m/Y',
			dataIndex: 'date_check',
            flex: 1,
            sortable: false,
            menuDisabled: true,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
			// 	return value;
			// }
		},
        { 
            header: 'Mã SP', 
            dataIndex: 'stockinProductString', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaSP',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaSPKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
    ],
});

