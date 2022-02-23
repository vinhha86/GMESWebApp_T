Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_M_Controller',
	init: function() {
		// var viewModel = this.getViewModel();

		// var UserStore = viewModel.getStore('UserStore');
		// if(UserStore) UserStore.loadStore();
		// var StockoutTypeStore = viewModel.getStore('StockoutTypeStore');
		// if(StockoutTypeStore) StockoutTypeStore.loadStore();
	},
	control:{
		'#stockout_p_edit_m':{
			afterrender: 'onAfterrender'
		},
		'#linegiaohang': {
			keypress: 'onEnterLinegiaohang'
		},
		'#btnTimPOLine': {
			click: 'onTimLine'
		},
		'#lenhXuatKhoSearch': {
			keypress: 'onEnterTimLenhXuatKho'
		},
		'#btnTimLenhXuatKho': {
			click: 'onTimLenhXuatKho'
		},
		'#productSearchStringField': {
			keypress: 'onEnterProductSearchStringField'
		},
		'#btnTimSanPham': {
			click: 'onBtnTimSanPham'
		},
    },
	onAfterrender: function(){
		var viewModel = this.getViewModel();

		var UserStore = viewModel.getStore('UserStore');
		if(UserStore) UserStore.loadStore();
		var StockoutTypeStore = viewModel.getStore('StockoutTypeStore');
		if(StockoutTypeStore) StockoutTypeStore.loadStore();

        var orgfromstore = viewModel.getStore('OrgFromStore');
        if(orgfromstore) orgfromstore.getOrgFromForStockoutProduct();
		orgfromstore.getSorters().removeAll();
		orgfromstore.getSorters().add({
			property: 'name_andParent',
			direction: 'ASC'
		});

		var orgtostore = viewModel.getStore('OrgToStore');
		orgtostore.getSorters().removeAll();
		orgtostore.getSorters().add({
			property: 'name_andParent',
			direction: 'ASC'
		});

	},
	onEnterLinegiaohang: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
	},
	onTimLine: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
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
		});
		form.show();

		form.down('#Stockin_POLINE_Main').on('Chon', function (select, poData) {
			// console.log(select);
			// console.log(poData);
			viewModel.set('stockout.pcontract_poid_link', poData.id);
			viewModel.set('stockout.contract_number', poData.po_buyer);

			// me.onLoadPOLineData(data);

			var StockoutD_Store = viewModel.getStore('StockoutD_Store');
			StockoutD_Store.removeAll();
			viewModel.set('stockout.stockout_d', []);
			// viewModel.set('stockout.porderid_link', null);

			var list = [];
			for(var i=0; i<select.length; i++){
				var data = select[i].data;
				var stockoutd_new = new Object();
				stockoutd_new.id = null;
				stockoutd_new.skucode = data.skuCode;
				stockoutd_new.skuname = data.skuName;
				stockoutd_new.sku_product_code = data.productcode;
				stockoutd_new.product_name = data.productname;
				stockoutd_new.p_skuid_link = data.productid_link;
				stockoutd_new.color_name = data.mauSanPham;
				stockoutd_new.size_name = data.coSanPham;
				stockoutd_new.colorid_link = data.color_id;
				stockoutd_new.skuid_link = data.skuid_link;
				stockoutd_new.sizeid_link = data.sku.size_id;
				stockoutd_new.totalpackage = data.so_luong_yeu_cau == null ? 0 : data.so_luong_yeu_cau;
				stockoutd_new.totalpackagecheck = data.so_luong_yeu_cau == null ? 0 : 0;
				list.push(stockoutd_new);
			}

			viewModel.set('stockout.stockout_d', list);
			var store = viewModel.getStore('StockoutD_Store');
			store.removeAll();
			// store.setData(list);
			store.insert(0, list);
			store.commitChanges();

			form.close();
			// console.log(stockout);
		})
	},
	onTaiSanPham: function(data){
		var viewModel = this.getViewModel();
		viewModel.set('stockout.pcontract_poid_link', data.id);
		viewModel.set('stockout.contract_number', data.po_buyer);
		var params = new Object();
		params.pcontract_poid_link = data.id;

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						// console.log(data);
						var stockoutd_new = new Object();
						stockoutd_new.id = null;
						stockoutd_new.skucode = data.skucode;
						stockoutd_new.skuname = data.skuName;
						stockoutd_new.product_code = data.productcode;
						stockoutd_new.product_name = data.productname;
						stockoutd_new.p_skuid_link = data.productid_link;
						stockoutd_new.color_name = data.mauSanPham;
						stockoutd_new.size_name = data.coSanPham;
						stockoutd_new.totalpackage = data.pquantity_total;
						stockoutd_new.unitid_link = data.unitid_link;
						stockoutd_new.unit_name = data.unitname;
						stockoutd_new.stockoutid_link = null;
						stockoutd_new.colorid_link = data.color_id;
						stockoutd_new.skuid_link = data.skuid_link;
						stockoutd_new.sizeid_link = data.sizeid_link;

						list.push(stockoutd_new);
					}

					viewModel.set('stockout.stockout_d', list);
					var store = viewModel.getStore('StockoutD_Store');
					store.removeAll();
					store.setData(list);
				}
			})
	},
	onEnterTimLenhXuatKho: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLenhXuatKho();
		}
	},
	onTimLenhXuatKho: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var lenhXuatKhoSearch = viewModel.get('lenhXuatKhoSearch');
		// console.log(stockout);
		// console.log(lenhXuatKhoSearch);
		// return;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: '90%',
			width: '90%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách lệnh xuất kho',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_P_Stockout_order_Main_View',
				viewModel: {
					data: {
						stockout: stockout,
						lenhXuatKhoSearch: lenhXuatKhoSearch,
					}
				}
			}]
		});
		form.show();
		form.down('#Stockout_P_Stockout_order_Main_View').getController().on('Thoat', function () {
			form.close();
		});
		form.down('#Stockout_P_Stockout_order_Main_View').getController().on('ThemSanPham', function (select, stockout_order) {
			// console.log(select);
			// console.log(stockout_order);
			var pcontractid_link = stockout_order.pcontractid_link;
			var pcontract_poid_link = stockout_order.pcontract_poid_link;
			var productid_link = stockout_order.p_skuid_link;
			// var orgid_from_link = stockout_order.orgid_from_link;
			// var orgid_to_link = stockout_order.orgid_to_link;
			// return;
			viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
			viewModel.set('stockout.pcontractid_link', pcontractid_link);
			viewModel.set('stockout.pcontract_poid_link', pcontract_poid_link);
			viewModel.set('stockout.productid_link', productid_link);
			// viewModel.set('stockout.orgid_from_link', orgid_from_link);
			// viewModel.set('stockout.orgid_to_link', orgid_to_link);

			var StockoutD_Store = viewModel.getStore('StockoutD_Store');
			StockoutD_Store.removeAll();
			viewModel.set('stockout.stockout_d', []);

			var list = [];
			for(var i=0; i<select.length; i++){
				var data = select[i].data;
				var stockoutd_new = new Object();
				stockoutd_new.id = null;
				stockoutd_new.skucode = data.skucode_p;
				stockoutd_new.skuname = data.skuname_p;
				stockoutd_new.sku_product_code = data.product_code_p;
				stockoutd_new.product_name = data.product_code_p;
				stockoutd_new.p_skuid_link = data.p_skuid_link;
				stockoutd_new.color_name = data.color_name_p;
				stockoutd_new.size_name = data.size_name_p;
				stockoutd_new.colorid_link = data.colorid_link;
				stockoutd_new.skuid_link = data.p_skuid_link;
				stockoutd_new.totalSLTon = data.totalSLTon;
				// stockoutd_new.sizeid_link = data.sku.size_id;
				stockoutd_new.totalpackage = data.totalpackage == null ? 0 : data.totalpackage;
				stockoutd_new.totalpackagecheck = data.totalpackagecheck == null ? 0 : 0;
				list.push(stockoutd_new);
			}

			viewModel.set('stockout.stockout_d', list);
			var store = viewModel.getStore('StockoutD_Store');
			store.removeAll();
			// store.setData(list);
			store.insert(0, list);
			store.commitChanges();

			form.close();
			// console.log(stockout);
		})
	},
	onEnterProductSearchStringField: function (field, e) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			m.onTimSanPham();
		}
	},
	onBtnTimSanPham: function(){
		var m = this;
		m.onTimSanPham();
	},
	onTimSanPham: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var productSearchString = viewModel.get('productSearchString');

		if(productSearchString == null || productSearchString == ''){
			Ext.Msg.show({
				title: 'Thông báo',
				msg: 'Sản phẩm không được bỏ trống',
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				},
				fn: function () {
					// this.fireEvent('logout');
				}
			});
			return;
		}

		var stockout = viewModel.get('stockout');
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: '90%',
			width: '90%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách sản phẩm',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_P_Edit_Product_Main_View',
				viewModel: {
					data: {
						stockid_link: stockout.orgid_from_link,
						productSearchString: productSearchString,
					}
				}
			}]
		});
		form.show();

		form.down('#Stockin_P_Edit_Product_Main_View').getController().on('Thoat', function () {
			form.close();
		})

		form.down('#Stockin_P_Edit_Product_Main_View').getController().on('ThemSanPham', function (select) {
			console.log(select);

			for(var i = 0; i < select.length; i++){
				var selectedRecord = select[i];
				var isExist = m.checkSkuInDList(selectedRecord);
				if (isExist) { // không thêm

				} else { // thêm
					m.addSkuToDList(selectedRecord.data);
				}
			}
			form.close();
		})
	},	

	checkSkuInDList: function (selectedRecord) {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout_d = viewModel.get('stockout.stockout_d');

		if (null != stockout_d) {
			var skuid_link = selectedRecord.get('id');
			for (var i = 0; i < stockout_d.length; i++) {
				if (stockout_d[i].skuid_link == skuid_link) {
					return true;
				}
			}
		} else {
			viewModel.set('stockout_d.stockout_d', []);
		}
		return false;
	},
	addSkuToDList: function (data) {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var store = viewModel.getStore('StockoutD_Store');

		var stockout_dObj = new Object();
		stockout_dObj.skuid_link = data.id;
		stockout_dObj.skucode = data.code;
		stockout_dObj.skuCode = data.code;
		stockout_dObj.skuname = data.product_name;
		stockout_dObj.sku_product_name = data.product_name;
		stockout_dObj.sku_product_code = data.product_code;
		stockout_dObj.colorid_link = data.color_id;
		stockout_dObj.color_name = data.mauSanPham;
		stockout_dObj.size_name = data.coSanPham;
		stockout_dObj.totalSLTon = data.totalSLTon;
		stockout_dObj.totalpackage = null;
		stockout_dObj.totalpackagecheck = null;
		stockout_dObj.stockout_packinglist = [];

		stockout_d.push(stockout_dObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();
	},
})