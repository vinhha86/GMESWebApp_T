Ext.define('GSmartApp.view.handover.Handover_kho_tocut_EditController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Handover_kho_tocut_EditController',
	init: function () {
		var devicestore = this.getViewModel().getStore('DeviceInvStore');
		devicestore.loadStore(3);
	},
	listen: {
		controller: {
			'*': {
				loaddata: 'onLoadData',
				newdata: 'onNewData',
				urlBack: 'onUrlBack'
			}
		}
	},
	control: {
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
		'#loaitien': {
			select: 'onSelectCurency'
		},
		'#btnConfirm': {
			click: 'onConfirm'
		}
	},
	channel: { cmd: null, dta: null },
	renderCell: function (value, record) {
		if (null == value) value = 0;
		return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	renderSum: function (value, summaryData, dataIndex) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	onhiddenMaster: function () {
		var view = this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_m_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
	onSelectCurency: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
		viewModel.set('stockout.vat_exchangerate', record.data.exrate);
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
	onUrlBack: function (type) {
		this.redirectTo("handover_kho_tocut");
	},
	onLoadData: function (id, type) {
		this.getInfo(id);
	},
	getInfo: function (id) {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var listepc = viewModel.get('listepc');

		var params = new Object();
		params.id = id;
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					viewModel.set('stockout', response.data);
					for (var i = 0; i < response.listepc.length; i++) {
						listepc.set(response.listepc[i].epc, response.listepc[i].epc);
					}
					store.setData(response.data.stockoutd);

					if (response.data.stockouttypeid_link == 1) { // xuat den cat
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(3, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(17, false);
					}
					if (response.data.stockouttypeid_link == 2) { // xuat den to sx
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(3, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(14, false);
					}
				}
			})
	},
	onNewData: function (type, id) {
		// console.log('onNewData'); console.log(id); 
		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');
		viewModel.set('stockout.stockoutdate', new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.orgid_from_link', session.org_grant_id_link);
		viewModel.set('listepc', new Map());
		viewModel.set('stockout.stockouttypeid_link', id);
		viewModel.set('stockout.status', 0);

		// console.log(session);
		// set store org from
		if (id == 1) { // xuat den cat
			var OrgToStore = viewModel.getStore('OrgToStore');
			OrgToStore.loadStore(17, false);
		}
		if (id == 2) { // xuat den to sx
			var OrgToStore = viewModel.getStore('OrgToStore');
			OrgToStore.loadStore(14, false);
		}
	},
	CheckValidate: function () {
		var mes = "";
		var stockout = this.getViewModel().get('stockout');
		if (stockout.stockouttypeid_link == null || stockout.stockouttypeid_link == 0) {
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockout.orgid_from_link == null || stockout.orgid_from_link == 0) {
			mes = "Bạn chưa chọn nơi xuất";
		}
		else if (stockout.orgid_to_link == null || stockout.orgid_to_link == 0) {
			mes = "Bạn chưa chọn nơi nhập";
		}
		else if (stockout.stockoutd.length == 0) {
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
	onSave: function () {
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		// console.log(stockout);

		var stockout_d = stockout.stockout_d;
		if (stockout_d != null) {
			for (var i = 0; i < stockout_d.length; i++) {
				if (stockout_d[i].id == 0 || typeof stockout_d[i].id === 'string') {
					stockout_d[i].id = null;
				}

				var stockout_packinglist = stockout_d[i].stockout_packinglist;
				if (stockout_packinglist != null) {
					for (var j = 0; j < stockout_packinglist.length; j++) {
						if (stockout_packinglist[j].id == 0 || typeof stockout_packinglist[j].id === 'string') {
							stockout_packinglist[j].id = null;
						}
						if (stockout_packinglist[j].stockoutdid_link == 0 || typeof stockout_packinglist[j].stockoutdid_link === 'string') {
							stockout_packinglist[j].stockoutdid_link = null;
						}
					}
				}
			}
		}

		var params = new Object();
		params.data = [];
		params.data.push(stockout);

		me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create_material', Ext.JSON.encode(params),
			function (success, response, options) {
				me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lập phiếu thành công',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
						this.redirectTo("handover_kho_tocut/" + response.id + "/edit");
						m.getInfo(response.id);
					}
				} else {
					var response = Ext.decode(response.responseText);
					// if (null!=response.epc_err){
					// 	response.epc_err.forEach(function(record, recordIdx){
					// 		console.log(record.epc);
					// 	}, this);
					// }
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Lỗi lập phiếu: ' + response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
			})
	},
	onStart: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');
		var session = GSmartApp.util.State.get('session');
		listepc = viewModel.get('listepc');

		var listcode = [];

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
			var termid = config.getTermid();
			//var orgid_link = GSmartApp.util.State.get('orgid_link');
			//console.log('orgid_link:' + orgid_link);
			/* Generate token */
			me.stoken = Ext.Number.randomInt(100000, 999999);

			me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
			GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
				if (topic.includes("cmd")) {
					console.log('cmd data:' + message);
					var jsonObj = Ext.JSON.decode(message);

					if (jsonObj.ct == 1 && jsonObj.cid == 'CMD_START_INV') {
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

						} else {
							Ext.Msg.alert('Device:' + device, 'There are some problem when you start. Please press STOP before START!');
						}
					}

					//Khi het time out tu dong goi nut Stop
					if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
						me.onStop();
					}
				} else if (topic.includes("transaction")) {
					// console.log(message);
					var jsonObj = Ext.JSON.decode(message);
					for (var x in jsonObj) {
						// console.log('mqtt return object');
						// console.log(jsonObj[x]);
						//Nếu epc chưa có trong phiếu thì xử lý
						if (!listepc.has(jsonObj[x].epc)) {
							listepc.set(jsonObj[x].epc, jsonObj[x].epc);

							var sku = store.findRecord('skucode', jsonObj[x].skucode);
							// console.log(sku);

							if (sku == null) {
								//THêm sku vào để lấy thông tin từ server
								listcode.push(jsonObj[x].skucode);
								//Tạo Object để lưu thông tin stockoutd và gắn stockout_packinglist và stockind
								var stockoutd = new Object({
									stockoutpklist: [],
									id: null,
									totalpackage: 1,
									orgrootid_link: session.rootorgid_link,
									skucode: jsonObj[x].skucode,
									lastuserupdateid_link: session.id,
									timecreate: new Date()
								});

								//Tại Object để lưu thông tin stockout_packinglist
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

								stockoutd.stockoutpklist.push(epc_item);

								//Cập nhật lại stockin trong viewmodel
								stockout.stockoutd.push(stockoutd);
								console.log(stockoutd);
								viewModel.set('stockout', stockout);
								//Thêm stockind vào grid
								store.insert(0, stockoutd);
							}
							else {
								var stockoutpklist = sku.get('stockoutpklist');

								sku.set('totalpackage', sku.get('totalpackage') + 1);

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
								stockoutpklist.push(epc_item);
							}
						}
					}
					//Lấy thông tin từ server
					console.log(store);
					me.UpdateInfoSKU(listcode, store);
				}
			}, function () {
				me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
				me.funcid = '2'; /* FuncId: 2 -  StockIn; 3-StockOut*/
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
								record.set('skuid_link', sku.id);
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
	onEPCDetail: function (grid, rowIndex, colIndex) {
		var record = grid.store.getAt(rowIndex);
		var form = Ext.create({
			xtype: 'stockout_epc_indow',
			reference: 'stockout_epc_indow'
		});
		var viewModel = form.getViewModel();
		viewModel.set('stockout_d', record);

		form.show();
	},

	onViewPackingList: function (grid, rowIndex, colIndex) {
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
		var data = grid.getStore().getAt(rowIndex);
		var stockoutdid_link = data.get('id');

		// console.log(stockout);
		// console.log(data);
		// console.log(stockoutdid_link);

		// if(isNaN(invoicedid_link)){
		if (false) {
			// not existed in db
			Ext.Msg.show({
				title: 'Thông báo',
				msg: 'Cần lưu invoice trước khi thêm packing list cho ' + data.get('skucode'),
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		} else {
			var form = Ext.create('Ext.window.Window', {
				height: '90%',
				closable: true,
				resizable: false,
				modal: true,
				border: false,
				title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
				closeAction: 'destroy',
				width: 1200,
				bodyStyle: 'background-color: transparent',
				layout: {
					type: 'fit', // fit screen for window
					padding: 5
				},
				items: [{
					xtype: 'Handover_kho_tocut_packinglist'
				}],
				viewModel: {
					type: 'Handover_kho_tocut_packinglist_ViewModel',
					data: {
						packinglist: {
							stockoutdid_link: stockoutdid_link,
							stockoutid_link: viewmodel.get('stockout.id'),
							skuid_link: data.get('skuid_link')
						},
						stockout: stockout,
						stockoutDRec: data
					}
				}
			});
			form.show();
		}
	},

	onConfirm: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockoutId = stockout.id;
		var form = Ext.create('Ext.window.Window', {
			// height: 200,
			width: 315,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Duyệt',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Handover_kho_tocut_Edit_Confirm',
				viewModel: {
					type: 'Handover_kho_tocut_Edit_ConfirmViewModel',
					data: {
						stockout: stockout,
						stockoutId: stockoutId
					}
				}
			}]
		});
		form.show();

		form.down('#Handover_kho_tocut_Edit_Confirm').getController().on('Confirmed', function (receiver_userid_link) {

			me.receive_material(receiver_userid_link);
			form.close();
		})
	},
	receive_material: function (receiver_userid_link) {
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockoutId = stockout.id;
		var receiver_userid_link = receiver_userid_link;

		// viewModel.set('stockout.receiver_userid_link', receiver_userid_link);
		// viewModel.set('stockout.receive_date', new Date());
		// viewModel.set('stockout.status', 2);
		// viewModel.set('stockout.statusString', 'Đã nhận');

		var params = new Object();
		params.stockoutId = stockoutId;
		params.receiver_userid_link = receiver_userid_link;

		me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_receive_material', Ext.JSON.encode(params),
			function (success, response, options) {
				me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Nhận thành công',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
						Ext.getCmp('Handover_kho_tocut_Edit').down('#btnConfirm').setHidden(true);
						Ext.getCmp('Handover_kho_tocut_Edit').down('#statusString').setValue('Đã nhận');
						this.redirectTo("handover_kho_tocut/" + response.id + "/edit");
						m.getInfo(response.id);
					}
				} else {
					var response = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Lỗi nhận: ' + response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
			})
	}
});
