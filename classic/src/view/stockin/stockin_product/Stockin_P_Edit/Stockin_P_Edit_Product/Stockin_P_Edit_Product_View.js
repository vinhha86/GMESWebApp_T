Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_P_Edit_Product_View',
    itemId: 'Stockin_P_Edit_Product_View',
    reference: 'Stockin_P_Edit_Product_View',
    controller: 'Stockin_P_Edit_Product_ViewController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    // viewConfig: {
    //     stripeRows: false,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true,
    // },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>{name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{ProductStore}'
    },
    columns:[
        { 
            header: 'Mã SP(Buyer)', 
            dataIndex: 'buyercode', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldKhoang',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueKhoangKeyup',
			// 		buffer: 500
			// 	}
			// },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
        { 
            header: 'Tên SP', 
            dataIndex: 'buyername', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldKhoang',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueKhoangKeyup',
			// 		buffer: 500
			// 	}
			// },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
        // { 
        //     header: 'PO', 
        //     dataIndex: '111111111111', 
        //     sortable: false,
        //     menuDisabled: true,
        //     flex: 1,
		// 	// items: {
		// 	// 	xtype: 'textfield',
		// 	// 	fieldStyle: "",
		// 	// 	margin: 1,
		// 	// 	reference: 'ValueFilterFieldKhoang',
		// 	// 	width: '99%',
		// 	// 	enableKeyEvents: true,
		// 	// 	listeners: {
		// 	// 		keyup: 'onFilterValueKhoangKeyup',
		// 	// 		buffer: 500
		// 	// 	}
		// 	// },
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
		// 		metaData.tdAttr = 'data-qtip="' + value + '"';
		// 		return value;
		// 	},
		// 	// summaryType: 'count',
		// 	// summaryRenderer: 'renderCount',
        // },
    ],
});

