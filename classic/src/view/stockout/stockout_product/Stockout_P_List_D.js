Ext.define('GSmartApp.view.stockout.Stockout_P_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockout_P_List_D',
	itemId: 'Stockout_P_List_D',
    // controller: 'Stockout_P_List_D_Controller',
	cls: 'Stockout_P_List_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        // getRowClass: function(record, index) {
        //     var c = record.get('status');
		// 	var unitid_link = record.get('unitid_link');

		// 	var totalmet_origin = record.get('totalmet_origin') == null ? 0 : record.get('totalmet_origin');
		// 	var totalmet_check = record.get('totalmet_check') == null ? 0 : record.get('totalmet_check');
		// 	var totalydsorigin = record.get('totalydsorigin') == null ? 0 : record.get('totalydsorigin');
		// 	var totalydscheck = record.get('totalydscheck') == null ? 0 : record.get('totalydscheck');
		// 	var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
		// 	var netweight = record.get('netweight') == null ? 0 : record.get('netweight');
		// 	var grossweight_lbs = record.get('grossweight_lbs') == null ? 0 : record.get('grossweight_lbs');
		// 	var netweight_lbs = record.get('netweight_lbs') == null ? 0 : record.get('netweight_lbs');

		// 	if(
		// 		totalmet_origin == 0
		// 		&& totalmet_check == 0
		// 		&& grossweight == 0
		// 		&& netweight == 0
		// 		&& totalydsorigin == 0
		// 		&& totalydscheck == 0
		// 		&& grossweight_lbs == 0
		// 		&& netweight_lbs == 0
		// 	){
		// 		return 'epc-ok';
		// 	}
		// 	if(totalmet_check >= totalmet_origin && totalmet_check > 0 && (unitid_link == null || unitid_link == 1)){
		// 		return 'epc-ok';
		// 	}
		// 	if(totalydscheck >= totalydsorigin && totalydscheck > 0 && unitid_link == 3){
		// 		return 'epc-ok';
		// 	}
		// 	if(netweight >= grossweight && netweight > 0 && unitid_link == 4){
		// 		return 'epc-ok';
		// 	}
		// 	if(netweight_lbs >= grossweight_lbs && netweight_lbs > 0 && unitid_link == 5){
		// 		return 'epc-ok';
		// 	}
		// 	return 'epc-error';
        // }                     
    },
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onDItemEdit',
    //             // beforeedit: 'onPriceDItemBeforeEdit'
    //         }             
    //     }
    // },
	bind:{
		store: '{StockoutD_Store}'
	},

    columns: [
        {
			header: 'SKU', 
			dataIndex: 'skucode',
			width: 120,	
			summaryRenderer:function (grid, context) {
				return "Tổng cộng";
			}
		},{
			header: 'Mã SP', 
			dataIndex: 'sku_product_code',
            width: 120,
		},{
			header: 'Tên sản phẩm', 
			dataIndex: 'skuname',
			flex: 1
		},
        {
			text: 'Màu', 
			dataIndex: 'color_name',
			flex: 1
		},
        {
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 50
		},
        {
			text: 'Loại thành phẩm', 
			dataIndex: 'loaiThanhPham',
			flex: 1
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL tồn', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			dataIndex: 'totalSLTon'
		},
        {
            // header: 'Số lượng YC', dataIndex: 'totalpackage_req', width: 80,
            header: 'SL Y/C', dataIndex: 'totalpackage', width: 80,
            align:'right',
            xtype: 'numbercolumn',
            format: '0,000',
            summaryType: 'sum', summaryRenderer: 'renderCount',
            // editor:{
            //     xtype:'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     bind: {
            //         // editable: '{iseditSL_YC}',
            //     }
            // },
            // bind: {
            //     // hidden: '{is_SLYC_hidden}'
            // }
        },
        {
            header: 'SL xuất', dataIndex: 'totalpackagecheck', width: 90,
            align:'right',
            summaryType: 'sum', summaryRenderer: 'renderCount',
            // xtype: 'numbercolumn',
            // format: '0,000',
            // editor:{
            //     xtype:'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     bind: {
            //         // editable: '{iseditSL}'
            //     }
            // }
        },
    ],

});

