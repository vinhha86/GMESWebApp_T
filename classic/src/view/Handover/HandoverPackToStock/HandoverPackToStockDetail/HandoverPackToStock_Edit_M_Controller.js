Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_Edit_M_Controller',
	init: function() {
		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();
		
		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore(21, 30);
	},
	control:{
		'#linegiaohang': {
			keypress: 'onEnterLinegiaohang'
		},
		'#btnTimPOLine': {
			click: 'onTimLine'
		},
		'#btnTimStockout': {
			click: 'onTimStockout'
		},
		// '#cbo_POrder_ListStore': {
		// 	select: 'on_cbo_POrder_ListStore_select'
		// },
		// '#cbo_POrder_ListGrantStore': {
		// 	select: 'on_cbo_POrder_ListGrantStore_select'
		// }
    },
	onEnterLinegiaohang: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
	},
	onTimStockout: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách phiếu xuất kho',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_P_Select',
				viewModel: {
					data: {
						status: 1 //Da duyet
					}
				}				
			}]
		});
		form.show();

		form.down('#Stockout_P_Select').on('Chon', function (data) {
			// console.log(data);
			me.onLoadStockoutData(data);
			form.close();
		})
	},	
	onLoadStockoutData: function(data){
		var viewModel = this.getViewModel();
		viewModel.set('stockin.stockoutid_link', data.id);
		viewModel.set('stockin.stockout_code', data.stockoutcode);
		var list = [];
		for(var i=0; i<data.stockout_d.length; i++){
			var data_stockout = data.stockout_d[i];
			var stockind_new = new Object();
			stockind_new.id = null;
			stockind_new.skucode = data_stockout.skucode;
			stockind_new.skuname = data_stockout.skuname;
			stockind_new.sku_product_code = data_stockout.product_code;
			// stockind_new.product_name = data.productname;
			stockind_new.p_skuid_link = data_stockout.productid_link;
			stockind_new.color_name = data_stockout.color_name;
			stockind_new.size_name = data_stockout.size_name;
			stockind_new.totalpackage = data_stockout.totalpackagecheck;
			stockind_new.unitid_link = data_stockout.unitid_link;
			stockind_new.unit_name = data_stockout.unitname;
			stockind_new.stockoutid_link = data_stockout.id;
			stockind_new.colorid_link = data_stockout.color_id;
			stockind_new.skuid_link = data_stockout.skuid_link;
			stockind_new.sizeid_link = data_stockout.sizeid_link;

			var list_epc = [];
			for(var k=0; k<data_stockout.stockout_packinglist.length; k++){
				var stockout_pklist = data_stockout.stockout_packinglist[k];
				var epc_new = new Object();

				epc_new.id = null;
				epc_new.skuid_link = stockout_pklist.skuid_link;
				epc_new.skutypeid_link = stockout_pklist.skutypeid_link;
				epc_new.colorid_link = stockout_pklist.colorid_link;
				epc_new.unitid_link = stockout_pklist.unitid_link;
				epc_new.lotnumber = stockout_pklist.lotnumber;
				epc_new.packageid = stockout_pklist.packageid;

				epc_new.ydsorigin = stockout_pklist.ydsorigin;
				epc_new.met_origin = stockout_pklist.met_origin;
				epc_new.width = stockout_pklist.width;
				epc_new.ydscheck = null;
				epc_new.met_check = null;
				epc_new.width_check = null;

				epc_new.netweight = stockout_pklist.netweight;
				epc_new.grossweight = stockout_pklist.grossweight;
				epc_new.m3 = stockout_pklist.m3;
				epc_new.epc = stockout_pklist.epc;
				epc_new.barcode = stockout_pklist.barcode;

				epc_new.rssi = 0;
				epc_new.status = -1;

				list_epc.push(epc_new);
			}
			stockind_new.stockin_packinglist = list_epc;

			list.push(stockind_new);
		}

		viewModel.set('stockin.stockin_d', list);
		var store = viewModel.getStore('StockinD_Store');
		store.removeAll();
		// store.setData(list);
		store.insert(0, list);
		store.commitChanges();
	},		
	onTimLine: function () {
		var viewModel = this.getViewModel();
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách line giao hàng',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_POLINE_Main',
				viewModel: {
					data: {
						po_buyer: grid.down('#linegiaohang').getValue()
					}
				}
			}]
			// items: [{
			// 	xtype: 'Stockout_POLINE',
			// 	viewModel: {
			// 		data: {
			// 			po_buyer: grid.down('#linegiaohang').getValue()
			// 		}
			// 	}
			// }]
		});
		form.show();

		form.down('#Stockin_POLINE_Main').on('Chon', function (select, poData) {
			// console.log(select);
			// console.log(poData);
			viewModel.set('stockin.pcontract_poid_link', poData.id);
			viewModel.set('stockin.contract_number', poData.po_buyer);

			// me.onLoadPOLineData(data);

			//
			var mainView = Ext.getCmp('Stockin_P_Edit');
        	if(mainView) mainView.setLoading(true);

			var StockinD_Store = viewModel.getStore('StockinD_Store');
			StockinD_Store.removeAll();
			viewModel.set('stockin.stockin_d', []);
			viewModel.set('stockin.porderid_link', null);

			var POrder_ListStore = viewModel.getStore('POrder_ListStore');
			POrder_ListStore.removeAll();
			POrder_ListStore.POrderPOLine_loadby_po_async(poData.id);
			POrder_ListStore.load({
				scope: this,
				callback: function(records, operation, success) {
					if(mainView) mainView.setLoading(false);
					if(!success){
						 // this.fireEvent('logout');
					} else {
					}
				}
			});

			var list = [];
			for(var i=0; i<select.length; i++){
				var data = select[i].data;
				var stockind_new = new Object();
				stockind_new.id = null;
				stockind_new.skucode = data.skuCode;
				stockind_new.skuname = data.skuName;
				stockind_new.sku_product_code = data.productcode;
				stockind_new.product_name = data.productname;
				stockind_new.p_skuid_link = data.productid_link;
				stockind_new.color_name = data.mauSanPham;
				stockind_new.size_name = data.coSanPham;
				stockind_new.totalpackage = 0;
				stockind_new.colorid_link = data.color_id;
				stockind_new.skuid_link = data.skuid_link;
				stockind_new.sizeid_link = data.sku.size_id;
				stockind_new.totalpackage = data.so_luong_yeu_cau == null ? 0 : data.so_luong_yeu_cau;

				list.push(stockind_new);
			}

			viewModel.set('stockin.stockin_d', list);
			var store = viewModel.getStore('StockinD_Store');
			store.removeAll();
			// store.setData(list);
			store.insert(0, list);
			store.commitChanges();

			form.close();
		})
	},	
	onLoadPOLineData: function(data){
		var viewModel = this.getViewModel();
		var params = new Object();
		params.pcontract_poid_link = data.id;

		var mainView = Ext.getCmp('HandoverPackToStock_Edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						var stockind_new = new Object();
						stockind_new.id = null;
						stockind_new.skucode = data.skuCode;
						stockind_new.skuname = data.skuName;
						stockind_new.sku_product_code = data.productcode;
						stockind_new.product_name = data.productname;
						stockind_new.p_skuid_link = data.productid_link;
						stockind_new.color_name = data.mauSanPham;
						stockind_new.size_name = data.coSanPham;
						stockind_new.totalpackage = data.pquantity_total;
						stockind_new.unitid_link = data.unitid_link;
						stockind_new.unit_name = data.unitname;
						stockind_new.stockoutid_link = null;
						stockind_new.colorid_link = data.color_id;
						stockind_new.skuid_link = data.skuid_link;
						stockind_new.sizeid_link = data.sizeid_link;

						list.push(stockind_new);
					}

					viewModel.set('stockin.stockin_d', list);
					var store = viewModel.getStore('StockinD_Store');
					store.removeAll();
					// store.setData(list);
					store.insert(0, list);
					store.commitChanges();
				}
			})
	},	
	on_cbo_POrder_ListStore_select: function(combo, rec, eOpts){
		var viewModel = this.getViewModel();
		var porderid_link = rec.get('id');
		var POrder_ListGrantStore = viewModel.getStore('POrder_ListGrantStore');

		var mainView = Ext.getCmp('HandoverPackToStock_Edit');
        if(mainView) mainView.setLoading(true);

		POrder_ListGrantStore.loadStore_async(porderid_link);
		POrder_ListGrantStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(mainView) mainView.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
				}
			}
		});
	},
	on_cbo_POrder_ListGrantStore_select: function(combo, rec, eOpts){
		var viewModel = this.getViewModel();
		var porder_grantid_link = rec.get('id');
		var pcontract_poid_link = viewModel.get('stockin.pcontract_poid_link');
		// load sku
		var params = new Object();
		params.pordergrantid_link = porder_grantid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		var mainView = Ext.getCmp('HandoverPackToStock_Edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.post('/api/v1/porderlist/getgrantskubygrantid_and_po', Ext.JSON.encode(params),
			function (success, response, options) {
        if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) { 
					console.log(response);
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						var stockind_new = new Object();
						stockind_new.id = null;
						stockind_new.skucode = data.skucode;
						stockind_new.skuname = data.skuname;
						stockind_new.sku_product_code = data.sku_product_code;
						stockind_new.product_name = data.product_name;
						stockind_new.p_skuid_link = data.productid_link;
						stockind_new.color_name = data.mauSanPham;
						stockind_new.size_name = data.coSanPham;
						stockind_new.totalpackage = data.grantamount;
						stockind_new.colorid_link = data.colorid_link;
						stockind_new.skuid_link = data.skuid_link;
						stockind_new.sizeid_link = data.sizeid_link;

						list.push(stockind_new);
					}

					viewModel.set('stockin.stockin_d', list);
					var store = viewModel.getStore('StockinD_Store');
					store.removeAll();
					// store.setData(list);
					store.insert(0, list);
					store.commitChanges();
				}
			})
	},
})