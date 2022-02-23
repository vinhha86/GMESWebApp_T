Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.HandoverPackToStock_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {
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
		'#btnTimLenh': {
			click: 'onTimLenh'
		},
		'#btnTaiSP': {
			click: 'onTaiSanPham'
		},
		'#ordercode': {
			specialkey: 'onSpecialkey'
		},
		'#cmbStockinGroup': {
			select: 'onSelectGroupStockin'
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
	onTimSP: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
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

		form.getController().on('product_sku_selected', function (records) {
			// console.log(records);
			// m.onAdd_Stockin_D(select);
			var stockin = viewModel.get('stockin');
			var stockin_d = viewModel.get('stockin.stockin_d');
			if (stockin_d == null) {
				stockin_d = new Array();
			}

			for (var i = 0; i < records.length; i++) {
				var thanhpham = records[i];
				var found = stockin_d.some(item => item.skuid_link === thanhpham.get('id'));
				if (!found) {
					var stockin_dObj = new Object();
					stockin_dObj.skuid_link = thanhpham.get('id');
					stockin_dObj.skucode = thanhpham.get('code');
					stockin_dObj.skuname = thanhpham.get('name');
					stockin_dObj.sku_product_code = thanhpham.get('product_code');
					stockin_dObj.colorid_link = thanhpham.get('color_id');
					stockin_dObj.color_name = thanhpham.get('mauSanPham');
					stockin_dObj.size_name = thanhpham.get('coSanPham');
					stockin_dObj.totalpackage = null;
					stockin_dObj.totalpackagecheck = null;
					stockin_dObj.stockin_packinglist = [];

					stockin_d.push(stockin_dObj);
				}
			}
			// me.getStore().loadData(stockin_d);
			var StockinD_Store = viewModel.getStore('StockinD_Store');
			StockinD_Store.removeAll();
			StockinD_Store.insert(0, stockin_d);
			StockinD_Store.commitChanges();

			// console.log(stockin);
			// console.log(stockin_d);

			form.close();
		});
	},
	onAdd_Stockin_D: function (select) {
		var viewModel = this.getViewModel();
		var list = viewModel.get('stockin.stockin_d');
		if (list == null) {
			list = [];
		}
		for (var i = 0; i < select.length; i++) {
			var data = select[i].data;

			var stockind_new = new Object();
			stockind_new.id = null;
			stockind_new.skucode = data.code;
			stockind_new.product_code = data.product_code;
			stockind_new.product_name = data.product_name;
			stockind_new.p_skuid_link = data.productid_link;
			stockind_new.color_name = data.color_name;
			stockind_new.size_name = data.size_name;
			stockind_new.unitid_link = data.unitid_link;
			stockind_new.unit_name = data.unit_name;
			stockind_new.colorid_link = data.color_id;
			stockind_new.skuid_link = data.id;
			stockind_new.sizeid_link = data.size_id;
			list.push(stockind_new);
		}

		viewModel.set('stockin.stockin_d', list);
		var StockinD_Store = viewModel.getStore('StockinD_Store');
		StockinD_Store.removeAll();
		StockinD_Store.insert(0, list);
		StockinD_Store.commitChanges();
	},
	onSelectGroupStockin: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
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


			var devicestore = this.getViewModel().getStore('DeviceInvStore');
			devicestore.load_device_active(3);
		}
	},
	onDeviceChange: function (combo, rec, eOpts) {
		// var viewmodel = this.getViewModel();
		// viewmodel.set('deviceid_link', rec.get('id'));
		// viewmodel.set('device', rec);

	},
	onSpecialkey: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLenh();
		}
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('HandoverPackToStock_Edit_M');
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

		var host = config.getHost();
		var port = config.getPort();
		var clientid = config.getClientid();

		var deviceId = viewModel.get('deviceid_link');
		var device = viewModel.get('device');

		//kiem tra chua chon thiet bi thi thong bao
		if (deviceId == 0 || deviceId == null) {
			Ext.Msg.show({
				title: 'Thông báo',
				msg: "Bạn chưa chọn thiết bị",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng'
				}
			});
			return;
		}

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
						console.log(sku);
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

							if(jsonObj[x].epcstate != 1){
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();
								epc_item.encryptdatetime = new Date();
	
								stockind.stockin_packinglist.push(epc_item);
	
								//Cập nhật lại stockin trong viewModel
								stockin.stockin_d.push(stockind);
								viewModel.set('stockin', stockin);
	
								//Thêm stockind vào grid
								store.insert(0, stockind);
							}
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
				console.log();
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
		GSmartApp.Ajax.postJitin('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
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
	onTimLenh: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách lệnh sản xuất',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'HandoverPackToStock_Edit_POrder',
				viewModel: {
					data: {
						ordercode: grid.down('#ordercode').getValue()
					}
				}
			}]
		});
		form.show();

		form.down('#HandoverPackToStock_Edit_POrder').getController().on('Chon', function (data) {
			grid.down('#ordercode').setValue(data.po_buyer);
			me.onTaiSanPham(data.id);
			form.close();
		})
	},
	onTaiSanPham: function (porderid_link) {
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');

		var params = new Object();
		params.porderid_link = porderid_link;
		GSmartApp.Ajax.postJitin('/api/v1/porder/get_porder_sku_stockin', Ext.JSON.encode(params),
			function (success, resp, options) {
				if (success) {
					var resp = Ext.decode(resp.responseText);
					if (resp.respcode == 200) {
						var StockinD_Store = viewModel.getStore('StockinD_Store');
						if (StockinD_Store) {
							StockinD_Store.removeAll();
							StockinD_Store.insert(0, resp.data);
							StockinD_Store.commitChanges();
						}
						stockin.stockind = resp.data;
						stockin.stockin_d = resp.data;
						viewModel.set('stockin', stockin);
						viewModel.set('listepc', new Map());
					}
					else {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: "Mã lệnh sản xuất không đúng bạn vui lòng tìm kiếm lại!",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
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
		console.log(data);
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d');
		var store = m.getStore();

		var stockin_dObj = new Object();
		stockin_dObj.skuid_link = data.id;
		stockin_dObj.skucode = data.code;
		stockin_dObj.skuname = data.name;
		stockin_dObj.sku_product_code = data.product_code;
		stockin_dObj.colorid_link = data.color_id;
		stockin_dObj.color_name = data.mauSanPham;
		stockin_dObj.size_name = data.coSanPham;
		stockin_dObj.totalpackage = null;
		stockin_dObj.totalpackagecheck = null;
		stockin_dObj.stockin_packinglist = [];

		stockin_d.push(stockin_dObj);
		store.setData([]);
		store.insert(0, stockin_d);
		store.commitChanges();
	},

	onMenu_HandoverPackToStock_Edit_D: function (grid, rowIndex, colIndex, item, e, record) {
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
					itemId: 'btnMenu_HandoverPackToStock_Edit_D_Chi_tiet',
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
					itemId: 'btnMenu_HandoverPackToStock_Edit_D_Delete',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
					handler: function () {
						// console.log(record);
						m.onDeleteStockinD(grid, rowIndex);
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
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var data = grid.getStore().getAt(rowIndex);

		//xoa trong list epc khi xoa stockind
		var listepc = viewModel.get('listepc');
		for (var i = 0; i < data.stockin_packinglist.length; i++) {
			listepc.delete(data.stockin_packinglist[i].epc);
		}
		console.log(listepc);
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
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d');
		var id = data.get('idx');

		for (var i = 0; i < stockin_d.length; i++) {
			if (stockin_d[i].id == id) {
				stockin_d.splice(i, 1);
				break;
			}
		}
		var StockinD_Store = viewModel.getStore('StockinD_Store');
		if (StockinD_Store) {
			StockinD_Store.removeAll();
			StockinD_Store.insert(0, stockin_d);
			StockinD_Store.commitChanges();
		}
		viewModel.set('stockin.stockin_d', stockin_d);
		// console.log(stockin);
	},
	deleteRowDb_Stockin_D: function (data) {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d');
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
						var StockinD_Store = viewModel.getStore('StockinD_Store');
						if (StockinD_Store) {
							StockinD_Store.removeAll();
							StockinD_Store.insert(0, stockin_d);
							StockinD_Store.commitChanges();
						}
						viewModel.set('stockin.stockin_d', stockin_d);
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

	onDItemEdit: function (editor, context, eOpts) {
		console.log(context);
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
		store.commitChanges();
	},
})