Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_SKU_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_P_Edit_Product_SKU_View',
    itemId: 'Stockin_P_Edit_Product_SKU_View',
    reference: 'Stockin_P_Edit_Product_SKU_View',
    controller: 'Stockin_P_Edit_Product_SKU_ViewController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    // viewConfig: {
    //     stripeRows: false,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true,
    // },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
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
        store:'{SKUStore}'
    },
    columns:[
        // {
        //     xtype: 'checkcolumn',
        //     dataIndex: 'isChecked',
        //     width: 50,
        //     headerCheckbox: true,
        //     sortable: false,
        //     menuDisabled: true,
        //     // text: 'MyCheck',
        //     listeners: {
        //         checkchange: 'onCheckcolumnCheckChange',
        //         headercheckchange: 'onHeaderCheckChange'
        //     }
        // },
        { 
            header: 'Mã SP', 
            dataIndex: 'code', 
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
            header: 'Màu', 
            dataIndex: 'mauSanPham', 
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
            header: 'Cỡ', 
            dataIndex: 'coSanPham', 
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
    ],
});

