Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_P_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {

	},
	control: {
		'#stockout_p_edit_d': {
			afterrender: 'onAfterrender'
		},
		'#btnTonKho': {
			click: 'onBtnTonKho'
		},
		// '#btnTonKhoPOLine': {
		// 	click: 'onBtnTonKhoPOLine'
		// },
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
		'#btnStart': {
			click: 'onStart'
		},
		'#btnStop': {
			click: 'onStop'
		},
		'#cmbGroupStockout': {
			select: 'onSelectGroupStockout'
		},
		'#btnTimSP': {
			click: 'onTimSP'
		},
		'#Sku_AutoComplete': {
			beforeQuery: 'Sku_AutoComplete_beforeQuery',
			keypress: 'onPressEnterSkucode',
		},
		'#btnThemSP': {
			click: 'onBtnThemSP'
		},
	},
	onAfterrender: function(){
		var viewModel = this.getViewModel();
		var StockoutD_Store = viewModel.getStore('StockoutD_Store');

		StockoutD_Store.getSorters().removeAll();
		StockoutD_Store.getSorters().add({
			property: 'skucode',
            direction: 'ASC'
		});
	},
	onTimSP: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var pcontract_poid_link = viewModel.get('stockout.pcontract_poid_link');

		if (pcontract_poid_link != null && pcontract_poid_link != 0 && pcontract_poid_link != '' && !isNaN(pcontract_poid_link)) {
			me.onTimLine();
		} else {
			var form = Ext.create({
				xtype: 'skusearchwindow',
				width: 1200,
				height: 500,
				reference: 'skusearchwindow',
				viewModel: {
					data: {
						sourceview: 'Stockout_P_EditController',
						searchtype: 1,
						pcontractid_link: null,
						type: 10,
						orgcustomerid_link: null,
						isHidden_sku: false,
						isHiddenSkuSearchCriteria_Attr_actioncolumn: false,
						isHiddenSkuSearchCriteria_Attr_btnThemMoi: false
					}
				}
			});
			form.show();

			form.getController().on('product_sku_selected', function (select) {
				console.log(select);
				me.onAdd_Stockout_D(select);
				form.close();
			});
		}
	},
	onTimLine: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var po_buyer = viewModel.get('stockout.contract_number');
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách SP',
			closeAction: 'destroy',
			width: 600,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_POLINE_Main',
				viewModel: {
					data: {
						po_buyer: po_buyer,
						isDsPOLineHidden: true,
					}
				}
			}]
		});
		form.down('#Stockin_POLINE_Sku').setWidth('100%');
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
			for (var i = 0; i < select.length; i++) {
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
				stockoutd_new.totalpackagecheck = 0;
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
	onAdd_Stockout_D: function (select) {
		// console.log(select);
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var list = viewModel.get('stockout.stockout_d');
		if (list == null) {
			list = [];
		}
		for (var i = 0; i < select.length; i++) {
			var data = select[i].data;

			var isExist = m.checkSkuInDList(select[i]); // console.log(isExist);
			if (!isExist) {
				var stockoutd_new = new Object();
				stockoutd_new.id = null;
				stockoutd_new.skucode = data.code;
				stockoutd_new.sku_product_code = data.product_code;
				stockoutd_new.skuname = data.name;
				stockoutd_new.product_name = data.product_name;
				stockoutd_new.p_skuid_link = data.productid_link;
				stockoutd_new.color_name = data.color_name;
				stockoutd_new.size_name = data.size_name;
				stockoutd_new.unitid_link = data.unitid_link;
				stockoutd_new.unit_name = data.unit_name;
				stockoutd_new.colorid_link = data.color_id;
				stockoutd_new.skuid_link = data.id;
				stockoutd_new.sizeid_link = data.size_id;
				list.push(stockoutd_new);
			}
		}

		viewModel.set('stockout.stockout_d', list);
		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		StockoutD_Store.removeAll();
		StockoutD_Store.insert(0, list);
		StockoutD_Store.commitChanges();
	},
	onSelectGroupStockout: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
		var me = this;

		me.setSlNhap();
		if (record.get('id') == 1) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', false);
		}
		if (record.get('id') == 2) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', false);
			viewModel.set('isManualHidden', true);
		}
		if (record.get('id') == 3) {
			viewModel.set('isRFIDHidden', false);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', true);

			var devicestore = viewModel.getStore('DeviceInvStore');
			devicestore.loadStore(3);
		}
	},
	setSlNhap: function () {
		// console.log('here');
		// set gia tri sl nhap mac dinh = sl yeu cau
		var m = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');

		if (stockout.status == -1) { // 
			var stockout_d = viewModel.get('stockout.stockout_d');
			if (stockout_d == null) stockout_d = [];
			for (var i = 0; i < stockout_d.length; i++) {
				stockout_d[i].totalpackagecheck = 0;
			}
			viewModel.set('stockout.stockout_d', stockout_d);
			// viewModel.set('stockin', response.data);
			store.setData(stockout_d);
			store.commitChanges();
		}
		// console.log(stockin);
	},
	onhiddenMaster: function () {
		var view = this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_p_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
	onBtnTonKho: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockid_link = viewModel.get('stockout.orgid_from_link');
		if (stockid_link == 0 || stockid_link == null || isNaN(stockid_link)) {
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Bạn cần chọn đơn vị xuất kho",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		}

		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		var data = StockoutD_Store.getData();
		var items = data.items;
		// console.log(items); // skuid_link
		var skuIdList = [];
		for (var i = 0; i < items.length; i++) {
			var skuid_link = items[i].get('skuid_link');
			skuIdList.push(skuid_link);
		}
		// console.log(stockid_link);
		// console.log(skuIdList);
		// console.log(items);

		var params = new Object();
		params.stockid_link = stockid_link;
		params.skuIdList = skuIdList;

		var mainView = Ext.getCmp('stockout_p_edit');
		if (mainView) mainView.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/warehouse/check_inStock', Ext.JSON.encode(params),
			function (success, response, options) {
				if (mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
						// console.log(response);
						for (var i = 0; i < response.data.length; i++) {
							var obj = response.data[i];
							var rec = StockoutD_Store.findRecord('p_skuid_link', obj.skuid_link, 0, false, true, true);
							if(rec){
								rec.set('totalSLTon', obj.totalpackage);
							}
							StockoutD_Store.commitChanges();
							// console.log(rec);
						}
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
	},
	// onBtnTonKhoPOLine: function () {
	// 	var m = this;
	// 	var me = this.getView();
	// 	var viewModel = this.getViewModel();
	// 	var stockid_link = viewModel.get('stockout.orgid_from_link');
	// 	if (stockid_link == 0 || stockid_link == null || isNaN(stockid_link)) {
	// 		Ext.MessageBox.show({
	// 			title: "Thông báo",
	// 			msg: "Bạn cần chọn đơn vị xuất kho",
	// 			buttons: Ext.MessageBox.YES,
	// 			buttonText: {
	// 				yes: 'Đóng',
	// 			}
	// 		});
	// 		return;
	// 	}

	// 	// var pcontract_poid_link = viewModel.get('stockout.pcontract_poid_link');
	// 	// if (pcontract_poid_link == 0 || pcontract_poid_link == null || isNaN(pcontract_poid_link)) {
	// 	// 	Ext.MessageBox.show({
	// 	// 		title: "Thông báo",
	// 	// 		msg: "Bạn cần chọn PO Line",
	// 	// 		buttons: Ext.MessageBox.YES,
	// 	// 		buttonText: {
	// 	// 			yes: 'Đóng',
	// 	// 		}
	// 	// 	});
	// 	// 	return;
	// 	// }

	// 	var form = Ext.create('Ext.window.Window', {
	// 		height: 600,
	// 		closable: true,
	// 		resizable: false,
	// 		modal: true,
	// 		border: false,
	// 		title: 'Danh sách tồn kho SP',
	// 		closeAction: 'destroy',
	// 		width: 1100,
	// 		bodyStyle: 'background-color: transparent',
	// 		layout: {
	// 			type: 'fit', // fit screen for window
	// 			padding: 5
	// 		},
	// 		items: [{
	// 			xtype: 'Stockout_P_TonKho',
	// 			viewModel: {
	// 				data: {
	// 					stockid_link: stockid_link,
	// 					pcontract_poid_link: pcontract_poid_link
	// 				}
	// 			}
	// 		}]
	// 	});
	// 	form.show();
	// },
	Sku_AutoComplete_beforeQuery: function () {
		var viewModel = this.getViewModel();
		var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
		var typeFrom = 10;
		var typeTo = 20;
		Sku_AutoComplete.proxy.extraParams = {
			typeFrom: typeFrom,
			typeTo: typeTo,
		}
	},
	onPressEnterSkucode: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			m.onBtnThemSP();
		}
	},
	onBtnThemSP: function () {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var skucodeCbbox = m.down('#Sku_AutoComplete');

		if (skucodeCbbox) {
			var selectedRecord = skucodeCbbox.getSelectedRecord();
			if (selectedRecord) {
				// check danh sách d đã có vải này chưa, có thông báo, chưa có thêm
				var isExist = me.checkSkuInDList(selectedRecord);
				if (isExist) { // thông báo
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Đã có loại thành phẩm này trong danh sách',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				} else { // thêm
					me.addSkuToDList(selectedRecord.data);
					skucodeCbbox.setValue(null);
					skucodeCbbox.focus();
				}
			} else {
				console.log('no or null selectedRecord');
			}
		}
	},
	checkSkuInDList: function (selectedRecord) {
		var me = this;
		var m = this.getView();
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
			viewModel.set('stockout.stockout_d', []);
		}
		// console.log(stockout_d);
		return false;
	},
	addSkuToDList: function (data) {
		// console.log(data);
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var store = m.getStore();

		var stockout_dObj = new Object();
		stockout_dObj.skuid_link = data.id;
		stockout_dObj.skucode = data.code;
		stockout_dObj.skuname = data.name;
		stockout_dObj.sku_product_code = data.product_code;
		stockout_dObj.colorid_link = data.color_id;
		stockout_dObj.color_name = data.mauSanPham;
		stockout_dObj.size_name = data.coSanPham;
		stockout_dObj.totalpackage = null;
		stockout_dObj.totalpackagecheck = null;
		stockout_dObj.stockout_packinglist = [];

		stockout_d.push(stockout_dObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();
	},

	onMenu_Stockout_P_Edit_D: function (grid, rowIndex, colIndex, item, e, record) {
		var m = this;
		var menu_grid = new Ext.menu.Menu({
			xtype: 'menu',
			anchor: true,
			//padding: 10,
			minWidth: 150,
			viewModel: {},
			items: [
				{
					text: 'Chi tiết chíp',
					itemId: 'btnMenu_Stockout_P_Edit_D_Chi_tiet',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
					handler: function () {
						// console.log(record);
						m.onEPCDetail(grid, rowIndex);
					},
				},
				{
					text: 'Xoá dòng hàng',
					itemId: 'btnMenu_Stockout_P_Edit_D_Delete',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
					handler: function () {
						// console.log(record);
						m.onDeleteStockoutD(grid, rowIndex);
					}
				},
			]
		});
		// HERE IS THE MAIN CHANGE
		var position = [e.getX() - 10, e.getY() - 10];
		e.stopEvent();
		menu_grid.record = record;
		menu_grid.showAt(position);
	},
	// onEPCDetail: function (grid, rowIndex, colIndex) {
	// 	var m = this;
	// 	var me = this.getView();
	// 	var viewModel = this.getViewModel();
	// 	var record = grid.store.getAt(rowIndex);
	// 	var stockout = viewModel.get('stockout');
	// 	var form = Ext.create({
	// 		xtype: 'Stockout_EPC_Window',
	// 		reference: 'Stockout_EPC_Window'
	// 	});
	// 	var formViewModel = form.getViewModel();
	// 	formViewModel.set('stockout_d', record);
	// 	formViewModel.set('isAutoChecked', true);
	// 	form.show();
	// },
	onEPCDetail: function (grid, rowIndex, colIndex) {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var record = grid.store.getAt(rowIndex);
		var stockout = viewModel.get('stockout');

		var form = Ext.create('Ext.window.Window', {
			height: 600,
			width: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách thành phẩm',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_EPC_Window',
				viewModel: {
					data: {
						stockout: stockout,
						stockout_d: record,
						isAutoChecked: true,
					}
				}
			}]
		});
		form.show();

		form.down('#Stockout_EPC_Window').getController().on('LuuLoaiThanhPham_Done', function () {
			// console.log('here');
			var stockout_p_edit = Ext.getCmp('stockout_p_edit');
			if(stockout_p_edit){
				stockout_p_edit.getController().getInfo(stockout.id);
			}
		});
	},
	onDeleteStockoutD: function (grid, rowIndex) {
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var data = grid.getStore().getAt(rowIndex);

		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có chắc chắn xóa thành phẩm ' + data.get('skucode') + '?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			buttonText: {
				yes: 'Có',
				no: 'Không'
			},
			fn: function (btn) {
				if (btn === 'yes') {
					// Xoá, check id
					var id = data.get('id');
					// if (isNaN(id) || id == null || id == 0) { // chưa có trong db
					// 	me.deleteRow_Stockout_D(data);
					// } else { // đã có trong db
					// 	me.deleteRowDb_Stockout_D(data);
					// }
					me.deleteRow_Stockout_D(data);
				}
			}
		});
	},
	deleteRow_Stockout_D: function (data) {
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		for (var i = 0; i < stockout_d.length; i++) {
			if (stockout_d[i].id == id) {
				stockout_d.splice(i, 1);
				break;
			}
		}
		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		if (StockoutD_Store) {
			StockoutD_Store.removeAll();
			StockoutD_Store.insert(0, stockout_d);
			StockoutD_Store.commitChanges();
		}
		viewModel.set('stockout.stockout_d', stockout_d);
		// console.log(stockout);
	},
	deleteRowDb_Stockout_D: function (data) {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		m.setLoading(true);

		var params = new Object();
		params.id = id;
		GSmartApp.Ajax.postJitin('/api/v1/stockout_d/stockoutd_delete', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				m.setLoading(false);
				if (success) {
					if (response.respcode == 200) {
						for (var i = 0; i < stockout_d.length; i++) {
							if (stockout_d[i].id == id) {
								stockout_d.splice(i, 1);
								break;
							}
						}
						var StockoutD_Store = viewModel.getStore('StockoutD_Store');
						if (StockoutD_Store) {
							StockoutD_Store.removeAll();
							StockoutD_Store.insert(0, stockout_d);
							StockoutD_Store.commitChanges();
						}
						viewModel.set('stockout.stockout_d', stockout_d);
						// console.log(stockout);
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	renderCount: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},

	onDItemEdit: function (editor, context, eOpts) {
		// console.log(context);
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var store = me.getStore();
		var stockoutD_data = context.record.data;

		if (context.value == "" || context.value == context.originalValue || isNaN(context.value)) {
			store.rejectChanges();
			return;
		}
		if (context.field == 'totalpackage') {
			stockoutD_data.totalpackage = parseFloat(stockoutD_data.totalpackage);
		}
		if (context.field == 'totalpackagecheck') {
			stockoutD_data.totalpackagecheck = parseFloat(stockoutD_data.totalpackagecheck);
		}
		store.commitChanges();
	},

	onStart: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');
		var session = GSmartApp.util.State.get('session');

		var listcode = [];
		var listepc = viewModel.get('listepc');

		var host = config.getHost();
		var port = config.getPort();
		var clientid = config.getClientid();
		var deviceId = viewModel.get('deviceid_link');
		var device = viewModel.get('device');

		if (device == null || deviceId == null) {
			Ext.Msg.show({
				title: 'Thông báo',
				msg: "Bạn chưa chọn thiết bị",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng'
				}
			})
		}
		else {
			var termid = config.getTermid();
			/* Generate token */
			me.stoken = Ext.Number.randomInt(100000, 999999);

			me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
			GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
				console.log(topic);
				if (topic.includes("cmd")) {
					console.log('cmd data:' + message);
					var jsonObj = Ext.JSON.decode(message);

					if (jsonObj.ct == 1) {
						if (jsonObj.respcode == 0) {
							me.channel.dta = 'gsm5/transaction/inv/' + jsonObj.respdata.token;
							GSmartApp.Mqtt.client.subscribe(me.channel.dta);
							console.log('register dta ch:' + me.channel.dta);

							viewModel.set('clsbtn', "blue-button");
							viewModel.set('clsbtnStart', "");
							viewModel.set('clsbtnStop', "red-button");
							viewModel.set('isStart', true);

							GSmartApp.util.State.set('CMD', 'CMD_STOP_INV');
							GSmartApp.util.State.set('sendChannel', me.sendChannel);
						}
					}

					//Khi het time out tu dong goi nut Stop
					if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
						me.onStop();
					}
				} else if (topic.includes("transaction")) {
					var jsonObj = Ext.JSON.decode(message);
					// console.log(jsonObj);
					for (var x in jsonObj) {
						var jsonObj_epc = jsonObj[x].epc.trim();
						if (!listepc.has(jsonObj_epc)) {
							listepc.set(jsonObj_epc, jsonObj_epc);
							var sku = store.findRecord('skucode', jsonObj[x].skucode);
							//Nếu chưa có bản ghi nào chứa skucode trả về thì insert vào grid
							if (!sku) {
								//chưa có thì thêm vào listcode để lấy thông tin từ server
								// console.log(jsonObj[x]);
								// console.log(jsonObj[x].skucode);
								listcode.push(jsonObj[x].skucode);

								//Tạo Object để lưu thông tin stockoutd và gắn stockout_packinglist vào stockoutd
								var stockoutd = new Object({
									stockout_packinglist: [],
									id: null,
									totalpackage: null,
									totalpackagecheck: 1,
									orgrootid_link: session.rootorgid_link,
									skucode: jsonObj[x].skucode,
									lastuserupdateid_link: session.id,
									timecreate: new Date()
								});

								//Tạo Object để lưu thông tin stockout_packinglist
								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 0) {
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									stockoutd.status = -1;
								} else {
									epc_item.status = 0;
									stockoutd.status = 0;
								}
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();
								epc_item.encryptdatetime = new Date();
								epc_item.rssi = 1;

								stockoutd.stockout_packinglist.push(epc_item);

								//Cập nhật lại stockout trong viewModel
								stockout.stockout_d.push(stockoutd);
								viewModel.set('stockout', stockout);

								//Thêm stockout_d vào grid
								store.insert(0, stockoutd);
							}
							else {
								// console.log(sku);
								var stockout_packinglist = sku.get('stockout_packinglist');
								stockout_packinglist = stockout_packinglist == null ? [] : stockout_packinglist;

								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								epc_item.status = jsonObj[x].epcstate;
								if (jsonObj[x].epcstate == 0) {
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									sku.set('status', -1);
								} else {
									epc_item.status = 0;
									
								}
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();
								epc_item.encryptdatetime = new Date();
								epc_item.rssi = 1;
								stockout_packinglist.push(epc_item);
								
								sku.set('stockout_packinglist', stockout_packinglist);
								var totalpackagecheck = sku.get('totalpackagecheck') == null ? 0 : sku.get('totalpackagecheck');
								sku.set('totalpackagecheck', totalpackagecheck + 1);
							}
						}else {
						// console.log('listepc.has(jsonObj_epc)');
						// console.log(listepc);
						}
					}
					//Lấy thông tin từ server
					me.UpdateInfoSKU(listcode, store);
		}
	}, function() {
		me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
		me.funcid = '2'; /* FuncId: 2 -  StockIn; 3-StockOut*/
		var cmd = { ct: 0, cid: "CMD_START_INV", srcid: termid, reqdata: { timeout: 120000, token: me.stoken, funcid: me.funcid } };
		console.log("Device channel:" + me.sendChannel);
		var message = new Paho.Message(Ext.JSON.encode(cmd));
		message.destinationName = me.sendChannel;
		message.qos = 0;
		GSmartApp.Mqtt.client.send(message);

	}, function() {
		console.log('Loi connect');
		var viewModel = me.getViewModel();
		viewModel.set('clsbtn', "red-button");
		viewModel.set('clsbtnStart', "blue-button");
		viewModel.set('clsbtnStop', "");
		viewModel.set('isStart', false);
	});
		}
	},
onStop: function () {
	var me = this;
	var viewModel = me.getViewModel();
	viewModel.set('clsbtn', "red-button");
	viewModel.set('clsbtnStart', "blue-button");
	viewModel.set('clsbtnStop', "");
	viewModel.set('isStart', false);
	var termid = GSmartApp.Ajax.getTermid();
	if (GSmartApp.Mqtt.client) {
		var cmd = { ct: 0, cid: "CMD_STOP_INV", srcid: termid, reqdata: { token: me.stoken, funcid: me.funcid } };
		console.log("Device channel:" + me.sendChannel);
		if(me.sendChannel == null) me.sendChannel = '???';
		var message = new Paho.Message(Ext.JSON.encode(cmd));
		message.destinationName = me.sendChannel;
		message.qos = 0;
		GSmartApp.Mqtt.client.send(message);
	}
	me.channel.dta = null;
	GSmartApp.Mqtt.onDisconnect();
	GSmartApp.Mqtt.deviceid_link = 0;
},
UpdateInfoSKU: function (listcode, store) {
	var params = new Object();
	params.listcode = listcode;

	// console.log(listcode);
	// var mainView = Ext.getCmp('stockout_p_edit');
	// if (mainView) mainView.setLoading(true);

	GSmartApp.Ajax.postJitin('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
		function (success, resp, options) {
			// if (mainView) mainView.setLoading(false);
			if (success) {
				var resp = Ext.decode(resp.responseText);
				if (resp.respcode == 200) {
					//Lấy bản ghi chứa skucode trong grid
					listcode = [];
					for (var i = 0; i < resp.data.length; i++) {
						var sku = resp.data[i];
						var record = store.findRecord('skucode', sku.code);

						if(record != null){
							record.set('skuname', sku.name);
							record.set('skuid_link', sku.id);
							record.set('sku_product_code', sku.product_code);
							record.set('product_code', sku.product_code);
							record.set('sizeid_link', sku.sizeid_link);
							record.set('unit_name', sku.unit_name);
							record.set('size_name', sku.size_name);
							record.set('color_name', sku.color_name);
							record.set('colorid_link', sku.colorid_link);
							record.set('p_skuid_link', sku.productid_link);
							record.set('skutypeid_link', sku.skutypeid_link);
							record.set('unitprice', sku.unitprice);
						}
					}
				}
			}
		})
},
})