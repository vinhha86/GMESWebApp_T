Ext.define('GSmartApp.view.stockin.stockin_submaterial.stockin_subm_edit.Stockin_SubM_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_SubM_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {
		var viewModel = this.getViewModel();
		var devicestore = viewModel.getStore('DeviceInvStore');
		devicestore.loadStore(3);
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
	},
	control: {
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
		'#btnTimNPL': {
			click: 'onBtnTimNPL'
		},
		'#btnThemSP': {
			click: 'onBtnThemSP'
		},
		'#Sku_AutoComplete': {
			beforeQuery: 'Sku_AutoComplete_beforeQuery',
			keypress: 'onPressEnterSkucode',
		},
		'#cmbStockinGroup': {
			select: 'onSelectGroupStockin'
		},
		'#Stockin_SubM_Edit_D': {
			itemclick: 'onStockin_SubM_Edit_D_Itemclick'
		},
	},
	onSelectGroupStockin: function (combo, record, eOpts) {
		var viewmodel = this.getViewModel();
		if (record.get('id') == 1) {
			viewmodel.set('isRFIDHidden', true);
			viewmodel.set('isBarcodeHidden', true);
			viewmodel.set('isManualHidden', false);
		}
		if (record.get('id') == 2) {
			viewmodel.set('isRFIDHidden', true);
			viewmodel.set('isBarcodeHidden', false);
			viewmodel.set('isManualHidden', true);
		}
		if (record.get('id') == 3) {
			viewmodel.set('isRFIDHidden', false);
			viewmodel.set('isBarcodeHidden', true);
			viewmodel.set('isManualHidden', true);
		}
	},
	onDeviceChange: function (combo, newValue, oldValue, eOpts) {
		var me = this;
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if (device) {
			GSmartApp.util.State.set('device_inv', device.data);
		}

	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('StockIn_M_Edit_M');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
	onStart: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockinD_Store');
		var stockin = viewModel.get('stockin');
		var session = GSmartApp.util.State.get('session');

		var listcode = [];
		var listepc = viewModel.get('listepc');

		var host = config.getMqtthost();
		var port = config.getMqttport();
		var clientid = config.getClientid();
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = viewModel.getStore('DeviceInvStore').getById(deviceId);

		if (device == null || device.length == 0) {
			Ext.Msg.show({
				title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
				msg: null,
				buttons: [{
					itemId: 'ok',
					text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
					ui: 'action'
				}]
			});
		}
		else {
			var orgid_link = GSmartApp.util.State.get('orgid_link');
			var termid = config.getTermid();
			/* Generate token */
			me.stoken = Ext.Number.randomInt(100000, 999999);

			me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
			GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
				console.log(topic);
				if (topic.includes("cmd")) {
					var jsonObj = Ext.JSON.decode(message);
					// console.log(jsonObj);
					if (jsonObj.ct == 1) {
						if (jsonObj.cid == 'CMD_START_INV') {
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
						// console.log(jsonObj[x].epc)
						if (!listepc.has(jsonObj[x].epc)) {
							listepc.set(jsonObj[x].epc, jsonObj[x].epc);
							var sku = store.findRecord('skucode', jsonObj[x].skucode);

							//Nếu chưa có bản ghi nào chứa skucode trả về thì insert vào grid
							if (!sku) {
								//chưa có thì thêm vào listcode để lấy thông tin từ server
								listcode.push(jsonObj[x].skucode);

								//Tạo Object để lưu thông tin stockind và gắn stockin_packinglist và stockind
								var stockind = new Object({
									stockin_packinglist: [],
									id: null,
									totalpackage: 1,
									orgrootid_link: session.rootorgid_link,
									skucode: jsonObj[x].skucode,
									skuCode: jsonObj[x].skucode,
									lastuserupdateid_link: session.id,
									timecreate: new Date()
								});

								//Tại Object để lưu thông tin stockin_packinglist
								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 1) {
									epc_item.extrainfo = 'Chíp đã có trong kho!!! Không thể nhập';
									epc_item.status = -1;
									stockind.status = -1;
								} else {
									epc_item.status = 0;
									stockind.status = 0;
								}
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();
								epc_item.encryptdatetime = new Date();

								stockind.stockin_packinglist.push(epc_item);

								//Cập nhật lại stockin trong viewmodel
								stockin.stockin_d.push(stockind);
								viewModel.set('stockin', stockin);

								//Thêm stockind vào grid
								store.insert(0, stockind);
								store.commitChanges();
							}
							else {
								//Bản ghi đã tồn tại trong grid thì lấy ds packinglist ra để so sánh xem epc đã tồn tại trong packinglist hay chưa
								var stockinpackinglist = sku.get('stockin_packinglist');

								sku.set('totalpackage', sku.get('totalpackage') + 1);

								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 1) {
									epc_item.extrainfo = 'Chíp đã có trong kho!!! Không thể nhập';
									epc_item.status = -1;
									sku.set('status', -1);
								} else {
									epc_item.status = 0;
								}
								stockinpackinglist.push(epc_item);

							}
						}
					}

					//Lấy thông tin sku từ server để hiện lên grid
					console.log(store);
					me.UpdateInfoSKU(listcode, store);
				}
			}, function () {
				me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
				me.funcid = '2;' + orgid_link;
				var cmd = { ct: 0, cid: "CMD_START_INV", srcid: termid, reqdata: { timeout: 120000, token: me.stoken, funcid: me.funcid } };
				console.log("Device channel:" + me.sendChannel);
				var message = new Paho.Message(Ext.JSON.encode(cmd));
				message.destinationName = me.sendChannel;
				message.qos = 0;
				GSmartApp.Mqtt.client.send(message);

			}, function () {
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
		GSmartApp.Ajax.post('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
			function (success, resp, options) {
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
								record.set('skuCode', sku.code);
								record.set('skuid_link', sku.id);
								record.set('sku_product_code', sku.product_code);
								record.set('sizeid_link', sku.sizeid_link);
								record.set('size_name', sku.size_name);
								record.set('color_name', sku.color_name);
								record.set('colorid_link', sku.colorid_link);
								record.set('p_skuid_link', sku.productid_link);
								record.set('skutypeid_link', sku.skutypeid_link);
								record.set('unitid_link', sku.unitid_link);
								record.set('unit_name', sku.unit_name);
								record.set('porder_year', sku.porder_year);
								record.set('unitprice', sku.unitprice);
							}
						}
					}
				}
			})
	},
	onEPCDetail: function (grid, rowIndex, colIndex) {
		var record = grid.store.getAt(rowIndex);
		var form = Ext.create({
			xtype: 'stockin_epc_window',
			reference: 'stockin_epc_window'
		});
		var viewModel = form.getViewModel();
		viewModel.set('stockin_d', record);
		form.show();
	},
	Sku_AutoComplete_beforeQuery: function () {
		var viewModel = this.getViewModel();
		var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
		var typeFrom = 30;
		var typeTo = 40;
		Sku_AutoComplete.proxy.extraParams = {
			typeFrom: typeFrom,
			typeTo: typeTo,
		}
	},

	renderUnit: function (val, meta, record, rindex, cindex, store) {
		if (null != val) {
			var viewModel = this.getViewModel();
			var UnitStore = viewModel.getStore('UnitStore');
			if (null != UnitStore) {
				var objUnit = UnitStore.data.find('id', val);
				// console.log(objUnit.data);
				return objUnit.data.code;
			}
		}
	},
	
	onDItemEdit: function (editor, context, eOpts) {
		// console.log('onInvoiceDItemEdit');
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var store = me.getStore();
		var stockinD_data = context.record.data;

		if (context.value == "" || context.value == context.originalValue || isNaN(context.value)) {
			store.rejectChanges();
			return;
		}

		if (context.field == 'totalpackage') {
			stockinD_data.totalpackage = parseFloat(stockinD_data.totalpackage);
		}
		if (context.field == 'netweight') {
			stockinD_data.netweight = parseFloat(stockinD_data.netweight);
		}
		if (context.field == 'grossweight') {
			stockinD_data.grossweight = parseFloat(stockinD_data.grossweight);
		}
		if (context.field == 'm3') {
			stockinD_data.m3 = parseFloat(stockinD_data.m3);
		}
		if (context.field == 'met') {
			stockinD_data.met = parseFloat(stockinD_data.met);
		}
		if (context.field == 'yds') {
			stockinD_data.yds = parseFloat(stockinD_data.yds);
		}
		if (context.field == 'totalmet_origin') {
			stockinD_data.totalmet_origin = parseFloat(stockinD_data.totalmet_origin);
		}
		if (context.field == 'totalmet_check') {
			stockinD_data.totalmet_check = parseFloat(stockinD_data.totalmet_check);
		}
		if (context.field == 'totalydsorigin') {
			stockinD_data.totalydsorigin = parseFloat(stockinD_data.totalydsorigin);
		}
		if (context.field == 'totalydscheck') {
			stockinD_data.totalydscheck = parseFloat(stockinD_data.totalydscheck);
		}

		if (stockin.unitid_link == 1) {
			if (context.field == 'met' && (stockinD_data.unitprice != null || stockinD_data.unitprice != "")) {
				// console.log('yds');
				stockinD_data.yds = Ext.Number.roundToPrecision(stockinD_data.met / 0.9144, 2);
				stockinD_data.totalamount = Ext.Number.roundToPrecision(stockinD_data.met * stockinD_data.unitprice, 2);
			}
			if (context.field == 'unitprice' && (stockinD_data.met != null || stockinD_data.met != "")) {
				// console.log('unitprice');
				stockinD_data.totalamount = Ext.Number.roundToPrecision(stockinD_data.met * stockinD_data.unitprice, 2);
			}

			if (context.field == 'totalmet_origin') {
				stockinD_data.totalydsorigin = Ext.Number.roundToPrecision(stockinD_data.totalmet_origin / 0.9144, 2);
			}
		} else if (stockin.unitid_link == 3) {
			if (context.field == 'yds' && (stockinD_data.unitprice != null || stockinD_data.unitprice != "")) {
				// console.log('yds');
				stockinD_data.met = Ext.Number.roundToPrecision(stockinD_data.yds * 0.9144, 2);
				stockinD_data.totalamount = Ext.Number.roundToPrecision(stockinD_data.yds * stockinD_data.unitprice, 2);
			}
			if (context.field == 'unitprice' && (stockinD_data.yds != null || stockinD_data.yds != "")) {
				// console.log('unitprice');
				stockinD_data.totalamount = Ext.Number.roundToPrecision(stockinD_data.yds * stockinD_data.unitprice, 2);
			}

			if (context.field == 'totalydsorigin') {
				stockinD_data.totalmet_origin = Ext.Number.roundToPrecision(stockinD_data.totalydsorigin * 0.9144, 2);
			}
		}

		store.commitChanges();
	},
	onBtnTimNPL: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var skucode = viewModel.get('skucode');

		//Neu pcontractid_link != null --> Them tu don hàng
		if (null != viewModel.get('pcontractid_link')) {
			this.selectNPL_FromBalance();

		} else {
			//Neu pcontractid_link is null --> Them Phieu NK le
			var form = Ext.create({
				xtype: 'skusearchwindow',
				width: 1200,
				height: 500,
				reference: 'skusearchwindow',
				closeAction: 'destroy',
				viewModel: {
					data: {
						sourceview: 'Stockin_SubM_Edit_D',
						searchtype: 3,
						// pcontractid_link: viewModel.get('PContract.id'),
						// productid_link_notsearch: productid_link,
						isAddNPL: true,
						isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
						isHiddenSkuSearchCriteria_Attr_btnThemMoi: true,
						SKUCode: skucode
					}
				}
			});
			form.show();

			form.getController().on('InsertToStockin_SubM_Edit_D', function (records) {
				var stockin = viewModel.get('stockin');
				var stockin_d = viewModel.get('stockin.stockin_d');
				if (stockin_d == null) {
					stockin_d = new Array();
				}

				console.log(records);

				for (var i = 0; i < records.length; i++) {
					var npl = records[i];
					var found = stockin_d.some(item => item.skuid_link === npl.get('id'));
					// skucode, skuname, color_name, size_name
					// code, name, tenMauNPL, coKho
					if (!found) {
						var stockin_dObj = new Object();
						stockin_dObj.skuid_link = npl.get('id');
						stockin_dObj.skucode = npl.get('code');
						stockin_dObj.skuCode = npl.get('code');
						stockin_dObj.skuname = npl.get('name');
						stockin_dObj.colorid_link = npl.get('color_id');
						stockin_dObj.color_name = npl.get('mauSanPham');
						stockin_dObj.size_name = npl.get('coKho');
						stockin_dObj.sku_product_desc = npl.get('description');
						stockin_dObj.sku_product_color = npl.get('mauSanPham_product');
						stockin_dObj.totalpackage = 0;
						stockin_dObj.unitid_link = 2; // pcs
						stockin_d.push(stockin_dObj);
					}
				}
				me.getStore().loadData(stockin_d);
				me.getStore().commitChanges();
				form.close();
			})
		}
	},
	selectNPL_FromBalance: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var ls_productid_link = [];
		var StockinProduct_Store = viewModel.getStore('StockinProduct_Store')
		for (var i = 0; i < StockinProduct_Store.data.length; i++) {
			var the_product = StockinProduct_Store.data.items[i].data;
			console.log(the_product.productid_link);
			ls_productid_link[i] = the_product.productid_link;
		}
		var form = Ext.create('Ext.window.Window', {
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Chọn nguyên liệu nhập kho',
			closeAction: 'destroy',
			height: Ext.getBody().getViewSize().height * .95,
			width: Ext.getBody().getViewSize().width * .95,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Balance_Main',
				viewModel: {
					data: {
						pcontractid_link: viewModel.get('pcontractid_link'),
						ls_productid_link: ls_productid_link,
						balance_limit: 2, // 0: tinh het, 1: nguyen lieu, 2: phu lieu
					}
				}
			}]
		});
		form.show();

		form.down('#Balance_Main').getController().on('onSelect_Materials', function (records) {
			var stockin = viewModel.get('stockin');
			var stockin_d = viewModel.get('stockin.stockin_d');
			if (stockin_d == null) {
				stockin_d = new Array();
			}

			for (var i = 0; i < records.length; i++) {
				var npl = records[i];
				var found = stockin_d.some(item => item.skuid_link === npl.get('mat_skuid_link'));
				// skucode, skuname, color_name, size_name
				// code, name, tenMauNPL, coKho
				if (!found) {
					var stockin_dObj = new Object();
					stockin_dObj.skuid_link = npl.get('mat_skuid_link');
					stockin_dObj.skucode = npl.get('mat_sku_code');
					stockin_dObj.skuCode = npl.get('mat_sku_code');
					stockin_dObj.skuname = npl.get('mat_sku_name');
					stockin_dObj.sku_product_desc = npl.get('mat_sku_desc');

					stockin_dObj.colorid_link = npl.get('mat_sku_color_id');
					stockin_dObj.color_name = npl.get('mat_sku_color_name');
					stockin_dObj.size_name = npl.get('mat_sku_size_name');

					stockin_dObj.totalpackage = 0;
					stockin_dObj.netweight = 0;
					stockin_dObj.grossweight = 0;
					stockin_dObj.m3 = 0;
					stockin_dObj.unitprice = 0;
					stockin_dObj.totalamount = 0;
					stockin_dObj.yds = 0;
					stockin_dObj.unitid_link = stockin.unitid_link == null ? 2 : stockin.unitid_link;

					stockin_dObj.totalmet_origin = 0;
					stockin_dObj.totalmet_check = 0;
					stockin_dObj.totalydsorigin = 0;
					stockin_dObj.totalydscheck = 0;
					stockin_dObj.status = -1;

					// stockin_dObj.unitid_link = invoice_d.get('unitid_link');
					// stockin_dObj.unit_name = invoice_d.get('unitname');

					stockin_d.push(stockin_dObj);
				}
			}
			me.getStore().loadData(stockin_d);
			me.getStore().commitChanges();
			form.close();
		})
	},

	onMenu_Stockin_SubM_Edit_D_List: function (grid, rowIndex, colIndex, item, e, record) {
		var me = this;
		var menu_grid = new Ext.menu.Menu({
			xtype: 'menu',
			anchor: true,
			//padding: 10,
			minWidth: 150,
			viewModel: {},
			items: [
				{
					text: 'Chi tiết phụ liệu',
					itemId: 'btnMenu_Stockin_SubM_Edit_D_List_Pkl',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
					handler: function () {
						// console.log(record);
						me.onEPCDetail(grid, rowIndex);
					},
				},
				{
					text: 'Xoá dòng hàng',
					itemId: 'btnMenu_Stockin_SubM_Edit_D_List_Delete',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
					handler: function () {
						// console.log(record);
						me.onDeleteStockinD(grid, rowIndex);
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
	onDeleteStockinD: function (grid, rowIndex) {
		var me = this;
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');
		var data = grid.getStore().getAt(rowIndex);

		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có chắc chắn xóa nguyên phụ liệu ' + data.get('skuCode') + '?',
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
					if (isNaN(id) || id == null || id == 0) { // chưa có trong db
						me.deleteRow_Stockin_D(data);
					} else { // đã có trong db
						me.deleteRowDb_Stockin_D(data);
					}
				}
			}
		});
	},
	deleteRow_Stockin_D: function (data) {
		var me = this;
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');
		var stockin_d = viewmodel.get('stockin.stockin_d');
		var id = data.get('idx');

		// console.log(stockin_d);
		// console.log(data);
		// console.log(id);

		for (var i = 0; i < stockin_d.length; i++) {
			if (stockin_d[i].idx == id) {
				stockin_d.splice(i, 1);
				break;
			}
		}
		var stockin_dStore = viewmodel.getStore('StockinD_Store');
		if (stockin_dStore) {
			stockin_dStore.removeAll();
			stockin_dStore.insert(0, stockin_d);
			stockin_dStore.commitChanges();
		}
		viewmodel.set('stockin.stockin_d', stockin_d);
		// console.log(stockin);
	},
	deleteRowDb_Stockin_D: function (data) {
		var me = this;
		var m = this.getView();
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');
		var stockin_d = viewmodel.get('stockin.stockin_d');
		var id = data.get('id');

		m.setLoading(true);

		var params = new Object();
		params.id = id;
		GSmartApp.Ajax.postJitin('/api/v1/stockin_d/stockind_delete', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				m.setLoading(false);
				if (success) {
					if (response.respcode == 200) {
						for (var i = 0; i < stockin_d.length; i++) {
							if (stockin_d[i].id == id) {
								stockin_d.splice(i, 1);
								break;
							}
						}
						var stockin_dStore = viewmodel.getStore('StockinD_Store');
						if (stockin_dStore) {
							stockin_dStore.removeAll();
							stockin_dStore.insert(0, stockin_d);
							stockin_dStore.commitChanges();
						}
						viewmodel.set('stockin.stockin_d', stockin_d);
						// console.log(stockin);
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
	//
	onStockin_SubM_Edit_D_Itemclick: function (grid, record, item, index, e, eOpts) {
		// console.log(record.data);
	},
	onBtnThemSP: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var skucodeCbbox = me.down('#Sku_AutoComplete');

		if (skucodeCbbox) {
			var selectedRecord = skucodeCbbox.getSelectedRecord();
			if (selectedRecord) {
				// check danh sách d đã có vải này chưa, có thông báo, chưa có thêm
				var isExist = m.checkSkuInDList(selectedRecord);
				if (isExist) { // thông báo
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Đã có loại phụ liệu này trong danh sách',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				} else { // thêm
					m.addSkuToDList(selectedRecord.data);
					skucodeCbbox.setValue(null);
					skucodeCbbox.focus();
				}
			} else {
				console.log('no or null selectedRecord');
			}
		}
	},
	checkSkuInDList: function (selectedRecord) {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		// var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d');

		if (null != stockin_d) {
			var skuid_link = selectedRecord.get('id');
			for (var i = 0; i < stockin_d.length; i++) {
				if (stockin_d[i].skuid_link == skuid_link) {
					return true;
				}
			}
		} else {
			viewModel.set('stockin.stockin_d', []);
		}
		// console.log(stockin_d);
		return false;
	},
	addSkuToDList: function (data) {
		// console.log(data);
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d');
		var store = m.getStore();

		var stockin_dObj = new Object();
		stockin_dObj.skuid_link = data.id;
		stockin_dObj.skucode = data.code;
		stockin_dObj.skuCode = data.code;
		stockin_dObj.skuname = data.name;
		stockin_dObj.sku_product_code = data.product_code;
		stockin_dObj.colorid_link = data.color_id;
		stockin_dObj.color_name = data.mauSanPham;
		stockin_dObj.size_name = data.coSanPham;
		stockin_dObj.totalpackage = null;
		stockin_dObj.totalpackagecheck = null;
		stockin_dObj.stockin_packinglist = [];
		stockin_dObj.unitid_link = 2;

		stockin_d.push(stockin_dObj);
		store.setData([]);
		store.insert(0, stockin_d);
		store.commitChanges();
	},
	onPressEnterSkucode: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onBtnThemSP();
		}
	},

	onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'skuCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
	onFilterValueTenNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'skuname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },
})